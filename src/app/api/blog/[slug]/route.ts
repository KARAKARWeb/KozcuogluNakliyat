import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-logger";
import type { BlogPost } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const posts = await readData<BlogPost[]>("blog-posts.json");
    const post = posts.find((p) => p.slug === slug && p.isPublished);

    if (!post) {
      return NextResponse.json({ success: false, error: "Yazı bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  } catch {
    return NextResponse.json({ success: false, error: "Yazı yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { slug } = await params;
    const body = await req.json();
    const posts = await readData<BlogPost[]>("blog-posts.json");
    const index = posts.findIndex((p) => p.id === slug || p.slug === slug);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Yazı bulunamadı" }, { status: 404 });
    }

    if (body.isPublished && !posts[index].publishedAt) {
      body.publishedAt = new Date().toISOString();
    }

    posts[index] = { ...posts[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("blog-posts.json", posts);
    await logActivity("update", "blog", posts[index].id, `Blog güncellendi: ${posts[index].title}`);
    return NextResponse.json({ success: true, data: posts[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Yazı güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { slug } = await params;
    const posts = await readData<BlogPost[]>("blog-posts.json");
    const filtered = posts.filter((p) => p.id !== slug && p.slug !== slug);

    if (filtered.length === posts.length) {
      return NextResponse.json({ success: false, error: "Yazı bulunamadı" }, { status: 404 });
    }

    await writeData("blog-posts.json", filtered);
    await logActivity("delete", "blog", slug, `Blog silindi`);
    return NextResponse.json({ success: true, message: "Yazı silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Yazı silinemedi" }, { status: 500 });
  }
}
