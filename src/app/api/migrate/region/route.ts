import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readData, writeData } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import type { Region } from "@/types";

const WP_BASE = "https://kozcuoglunakliyat.com.tr";

async function fetchWpPost(slug: string) {
  const res = await fetch(`${WP_BASE}/wp-json/wp/v2/posts?slug=${slug}&_embed`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;
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
    const { access } = await import("fs/promises");
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

function extractDistrict(title: string): string {
  return title.replace(/\s*evden\s*eve\s*nakliyat.*/i, "").trim();
}

function extractIntercityCities(title: string): { from: string; to: string } {
  const clean = title.replace(/\s*evden\s*eve\s*nakliyat.*/i, "").trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return { from: parts[0], to: parts.slice(1).join(" ") };
  }
  return { from: clean, to: "" };
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const slug: string = body.slug;
    const regionType: string = body.type || "district";
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

    const seo = await fetchSeoFromPage(`${WP_BASE}/${slug}.html`);

    let image = "";
    if (featuredMedia) {
      image = await downloadImage(featuredMedia, "regions");
    }

    const regions = await readData<Region[]>("regions.json");

    const exists = regions.find((r) => r.slug === slug);
    if (exists) {
      return NextResponse.json({ success: false, error: `"${slug}" zaten mevcut` }, { status: 409 });
    }

    const maxOrder = regions.reduce((max, r) => Math.max(max, r.order || 0), 0);
    const newId = String(regions.length + 1);

    let district: string;
    let city: string;
    if (regionType === "intercity") {
      const cities = extractIntercityCities(title);
      district = cities.from;
      city = cities.to;
    } else {
      district = extractDistrict(title);
      city = "İstanbul";
    }

    const newRegion: Region = {
      id: newId,
      title,
      slug,
      district,
      city,
      type: regionType as "district" | "intercity",
      description: "",
      content,
      image,
      geo: { latitude: 0, longitude: 0 },
      seo: {
        title: seo.title || `${title} | Kozcuoğlu Nakliyat`,
        description: seo.description || "",
        ogImage: image,
        robots: "index, follow",
        canonical: "",
      },
      faq: [],
      order: maxOrder + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    regions.push(newRegion);
    await writeData("regions.json", regions);

    return NextResponse.json({
      success: true,
      data: {
        id: newRegion.id,
        title: newRegion.title,
        slug: newRegion.slug,
        seoTitle: newRegion.seo.title,
        seoDescription: newRegion.seo.description,
        image: newRegion.image,
        contentLength: content.length,
        descriptionLength: newRegion.description.length,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
