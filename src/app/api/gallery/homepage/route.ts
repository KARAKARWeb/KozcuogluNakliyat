import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import type { GalleryItem } from "@/types";

export async function GET() {
  try {
    const gallery = await readData<GalleryItem[]>("gallery.json");
    const active = gallery.filter((g) => g.isActive).sort((a, b) => a.order - b.order).slice(0, 12);
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Galeri yüklenemedi" }, { status: 500 });
  }
}
