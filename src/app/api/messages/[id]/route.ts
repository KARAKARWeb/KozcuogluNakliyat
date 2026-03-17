import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Message } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const messages = await readData<Message[]>("messages.json");
    const index = messages.findIndex((m) => m.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Mesaj bulunamadı" }, { status: 404 });
    }

    messages[index] = { ...messages[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("messages.json", messages);
    return NextResponse.json({ success: true, data: messages[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Mesaj güncellenemedi" }, { status: 500 });
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
    const messages = await readData<Message[]>("messages.json");
    const filtered = messages.filter((m) => m.id !== id);

    if (filtered.length === messages.length) {
      return NextResponse.json({ success: false, error: "Mesaj bulunamadı" }, { status: 404 });
    }

    await writeData("messages.json", filtered);
    return NextResponse.json({ success: true, message: "Mesaj silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Mesaj silinemedi" }, { status: 500 });
  }
}
