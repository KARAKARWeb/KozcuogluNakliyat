import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Quote } from "@/types";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const quotes = await readData<Quote[]>("quotes.json");
    const idx = quotes.findIndex((q) => q.id === id);
    if (idx === -1) return NextResponse.json({ success: false, error: "Teklif bulunamadı" }, { status: 404 });

    if (body.status) quotes[idx].status = body.status;
    if (body.adminNote !== undefined) quotes[idx].adminNote = body.adminNote;
    quotes[idx].updatedAt = new Date().toISOString();

    await writeData("quotes.json", quotes);
    return NextResponse.json({ success: true, data: quotes[idx] });
  } catch {
    return NextResponse.json({ success: false, error: "Güncelleme başarısız" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const quotes = await readData<Quote[]>("quotes.json");
    const filtered = quotes.filter((q) => q.id !== id);
    if (filtered.length === quotes.length) return NextResponse.json({ success: false, error: "Teklif bulunamadı" }, { status: 404 });

    await writeData("quotes.json", filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Silme başarısız" }, { status: 500 });
  }
}
