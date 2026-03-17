import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slugify";
import { isSlugUnique } from "@/lib/slug-check";
import { logActivity } from "@/lib/activity-logger";
import type { BlogPost } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";
    const posts = await readData<BlogPost[]>("blog-posts.json");

    if (isAdmin) {
      const session = await requireAdmin();
      if (session) return session;
      const sorted = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return NextResponse.json({ success: true, data: sorted });
    }

    const published = posts
      .filter((p) => p.isPublished)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return NextResponse.json({ success: true, data: published });
  } catch {
    return NextResponse.json({ success: false, error: "Blog yazıları yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const posts = await readData<BlogPost[]>("blog-posts.json");

    const slug = body.slug || slugify(body.title);
    const unique = await isSlugUnique(slug, "blog");
    if (!unique) {
      return NextResponse.json({ success: false, error: "Bu slug zaten kullanılıyor" }, { status: 400 });
    }

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: body.title,
      slug,
      excerpt: body.excerpt || "",
      content: body.content || "",
      image: body.image || "",
      category: body.category || "",
      tags: body.tags || [],
      author: body.author || "Kozcuoğlu Nakliyat",
      seo: body.seo || { title: "", description: "", ogImage: "", robots: "index, follow", canonical: "" },
      schemas: body.schemas || ["Article", "BreadcrumbList"],
      isPublished: body.isPublished ?? false,
      publishedAt: body.isPublished ? new Date().toISOString() : "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.push(newPost);
    await writeData("blog-posts.json", posts);
    await logActivity("create", "blog", newPost.id, `Yeni blog: ${newPost.title}`);
    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Blog yazısı eklenemedi" }, { status: 500 });
  }
}
