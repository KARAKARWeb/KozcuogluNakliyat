import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Review } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const reviews = await readData<Review[]>("reviews.json");
    const index = reviews.findIndex((r) => r.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Yorum bulunamadı" }, { status: 404 });
    }

    reviews[index] = { ...reviews[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("reviews.json", reviews);
    return NextResponse.json({ success: true, data: reviews[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Yorum güncellenemedi" }, { status: 500 });
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
    const reviews = await readData<Review[]>("reviews.json");
    const filtered = reviews.filter((r) => r.id !== id);

    if (filtered.length === reviews.length) {
      return NextResponse.json({ success: false, error: "Yorum bulunamadı" }, { status: 404 });
    }

    await writeData("reviews.json", filtered);
    return NextResponse.json({ success: true, message: "Yorum silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Yorum silinemedi" }, { status: 500 });
  }
}
