import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { GalleryItem } from "@/types";

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { orderedIds } = await req.json();
    const gallery = await readData<GalleryItem[]>("gallery.json");
    for (let i = 0; i < orderedIds.length; i++) {
      const item = gallery.find((g) => g.id === orderedIds[i]);
      if (item) { item.order = i + 1; item.updatedAt = new Date().toISOString(); }
    }
    await writeData("gallery.json", gallery);
    return NextResponse.json({ success: true, message: "Sıralama güncellendi" });
  } catch {
    return NextResponse.json({ success: false, error: "Sıralama güncellenemedi" }, { status: 500 });
  }
}
