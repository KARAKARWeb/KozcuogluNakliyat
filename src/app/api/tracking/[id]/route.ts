import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { TrackingItem } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const items = await readData<TrackingItem[]>("tracking.json");
    const index = items.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Takip bulunamadı" }, { status: 404 });
    }

    items[index] = { ...items[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("tracking.json", items);
    return NextResponse.json({ success: true, data: items[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Takip güncellenemedi" }, { status: 500 });
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
    const items = await readData<TrackingItem[]>("tracking.json");
    const filtered = items.filter((t) => t.id !== id);

    if (filtered.length === items.length) {
      return NextResponse.json({ success: false, error: "Takip bulunamadı" }, { status: 404 });
    }

    await writeData("tracking.json", filtered);
    return NextResponse.json({ success: true, message: "Takip silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Takip silinemedi" }, { status: 500 });
  }
}
