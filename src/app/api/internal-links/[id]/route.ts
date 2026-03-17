import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { InternalLink } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const links = await readData<InternalLink[]>("internal-links.json");
    const index = links.findIndex((l) => l.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Kural bulunamadı" }, { status: 404 });

    links[index] = { ...links[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("internal-links.json", links);
    return NextResponse.json({ success: true, data: links[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Kural güncellenemedi" }, { status: 500 });
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
    const links = await readData<InternalLink[]>("internal-links.json");
    const filtered = links.filter((l) => l.id !== id);
    if (filtered.length === links.length) return NextResponse.json({ success: false, error: "Kural bulunamadı" }, { status: 404 });

    await writeData("internal-links.json", filtered);
    return NextResponse.json({ success: true, message: "Kural silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Kural silinemedi" }, { status: 500 });
  }
}
