import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { GalleryItem } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const gallery = await readData<GalleryItem[]>("gallery.json");
    const index = gallery.findIndex((g) => g.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Öğe bulunamadı" }, { status: 404 });

    gallery[index] = { ...gallery[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("gallery.json", gallery);
    return NextResponse.json({ success: true, data: gallery[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Öğe güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const gallery = await readData<GalleryItem[]>("gallery.json");
    const filtered = gallery.filter((g) => g.id !== id);
    if (filtered.length === gallery.length) return NextResponse.json({ success: false, error: "Öğe bulunamadı" }, { status: 404 });

    await writeData("gallery.json", filtered);
    return NextResponse.json({ success: true, message: "Öğe silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Öğe silinemedi" }, { status: 500 });
  }
}
