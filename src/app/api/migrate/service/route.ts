import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readData, writeData } from "@/lib/db";
import { writeFile, mkdir, access } from "fs/promises";
import path from "path";
import type { Service } from "@/types";

const WP_BASE = "https://kozcuoglunakliyat.com.tr";

async function fetchWpPost(slug: string) {
  const res = await fetch(`${WP_BASE}/wp-json/wp/v2/posts?slug=${slug}&_embed`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    const pRes = await fetch(`${WP_BASE}/wp-json/wp/v2/pages?slug=${slug}&_embed`);
    const pData = await pRes.json();
    if (!Array.isArray(pData) || pData.length === 0) return null;
    return pData[0];
  }
  return data[0];
}

async function fetchSeoFromPage(pageUrl: string) {
  try {
    const res = await fetch(pageUrl);
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
      || html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
    const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i)
      || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:description["']/i);
    return {
      title: titleMatch?.[1]?.trim() || "",
      description: descMatch?.[1]?.trim() || ogDescMatch?.[1]?.trim() || "",
    };
  } catch {
    return { title: "", description: "" };
  }
}

async function downloadImage(mediaId: number, folder: string): Promise<string> {
  try {
    const res = await fetch(`${WP_BASE}/wp-json/wp/v2/media/${mediaId}`);
    const media = await res.json();
    const sourceUrl: string = media.source_url || media.guid?.rendered || "";
    if (!sourceUrl) return "";

    const imgRes = await fetch(sourceUrl);
    if (!imgRes.ok) return "";

    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const ext = path.extname(sourceUrl).replace(".", "") || "webp";
    const baseName = path.basename(sourceUrl, `.${ext}`).replace(/[^a-z0-9-]/gi, "-").toLowerCase();

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    let fileName = `${baseName}.${ext}`;
    let i = 1;
    while (true) {
      try {
        await access(path.join(uploadDir, fileName));
        fileName = `${baseName}-${i}.${ext}`;
        i++;
      } catch {
        break;
      }
    }

    await writeFile(path.join(uploadDir, fileName), buffer);
    return `/uploads/${folder}/${fileName}`;
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const slug: string = body.slug;
    const category: string = body.category || "bireysel";
    if (!slug) {
      return NextResponse.json({ success: false, error: "slug gerekli" }, { status: 400 });
    }

    const wpPost = await fetchWpPost(slug);
    if (!wpPost) {
      return NextResponse.json({ success: false, error: `WordPress'te "${slug}" bulunamadı` }, { status: 404 });
    }

    const title: string = wpPost.title?.rendered || "";
    const content: string = wpPost.content?.rendered || "";
    const featuredMedia: number = wpPost.featured_media || 0;

    const seo = await fetchSeoFromPage(`${WP_BASE}/${slug}`);

    let image = "";
    if (featuredMedia) {
      image = await downloadImage(featuredMedia, "services");
    }

    const services = await readData<Service[]>("services.json");

    const exists = services.find((s) => s.slug === slug);
    if (exists) {
      return NextResponse.json({ success: false, error: `"${slug}" zaten mevcut` }, { status: 409 });
    }

    const maxOrder = services.reduce((max, s) => Math.max(max, s.order || 0), 0);
    const newId = String(Date.now());

    const newService: Service = {
      id: newId,
      title,
      slug,
      category: category as Service["category"],
      description: "",
      shortDescription: "",
      image,
      icon: "Package",
      content,
      seo: {
        title: seo.title || `${title} | Kozcuoğlu Nakliyat`,
        description: seo.description || "",
        ogImage: image,
        robots: "index, follow",
        canonical: "",
      },
      schemas: ["Service", "BreadcrumbList"],
      faq: [],
      pricingModuleId: null,
      order: maxOrder + 1,
      isActive: true,
      showOnHomepage: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    services.push(newService);
    await writeData("services.json", services);

    return NextResponse.json({
      success: true,
      data: {
        id: newService.id,
        title: newService.title,
        slug: newService.slug,
        category: newService.category,
        seoTitle: newService.seo.title,
        image: newService.image,
        contentLength: content.length,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
