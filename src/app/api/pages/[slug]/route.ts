import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Page } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const pages = await readData<Page[]>("pages.json");
    const page = pages.find((p) => p.slug === `/${slug}` || p.id === slug);

    if (!page) {
      return NextResponse.json({ success: false, error: "Sayfa bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: page });
  } catch {
    return NextResponse.json({ success: false, error: "Sayfa yüklenemedi" }, { status: 500 });
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
    const pages = await readData<Page[]>("pages.json");
    const index = pages.findIndex((p) => p.slug === `/${slug}` || p.id === slug);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Sayfa bulunamadı" }, { status: 404 });
    }

    pages[index] = { ...pages[index], ...body };
    await writeData("pages.json", pages);
    return NextResponse.json({ success: true, data: pages[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Sayfa güncellenemedi" }, { status: 500 });
  }
}
