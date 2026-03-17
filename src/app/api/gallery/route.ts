import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { GalleryItem } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");

    const gallery = await readData<GalleryItem[]>("gallery.json");
    let filtered = gallery.filter((g) => g.isActive);

    if (type) filtered = filtered.filter((g) => g.type === type);
    if (category) filtered = filtered.filter((g) => g.category === category);

    return NextResponse.json({ success: true, data: filtered.sort((a, b) => a.order - b.order) });
  } catch {
    return NextResponse.json({ success: false, error: "Galeri yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const gallery = await readData<GalleryItem[]>("gallery.json");

    const items = Array.isArray(body) ? body : [body];
    const newItems: GalleryItem[] = items.map((item, i) => ({
      id: (Date.now() + i).toString(),
      type: item.type || "image",
      title: item.title || "",
      description: item.description || "",
      url: item.url || "",
      thumbnail: item.thumbnail || item.url || "",
      category: item.category || "",
      isActive: true,
      order: gallery.length + i + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    gallery.push(...newItems);
    await writeData("gallery.json", gallery);
    return NextResponse.json({ success: true, data: newItems }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Galeri öğesi eklenemedi" }, { status: 500 });
  }
}
