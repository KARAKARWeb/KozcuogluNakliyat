import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Client } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const clients = await readData<Client[]>("clients.json");
    const index = clients.findIndex((c) => c.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Müşteri bulunamadı" }, { status: 404 });

    clients[index] = { ...clients[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("clients.json", clients);
    return NextResponse.json({ success: true, data: clients[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Müşteri güncellenemedi" }, { status: 500 });
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
    const clients = await readData<Client[]>("clients.json");
    const filtered = clients.filter((c) => c.id !== id);
    if (filtered.length === clients.length) return NextResponse.json({ success: false, error: "Müşteri bulunamadı" }, { status: 404 });

    await writeData("clients.json", filtered);
    return NextResponse.json({ success: true, message: "Müşteri silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Müşteri silinemedi" }, { status: 500 });
  }
}
