import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Vehicle } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const fleet = await readData<Vehicle[]>("fleet.json");
    const index = fleet.findIndex((v) => v.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Araç bulunamadı" }, { status: 404 });

    fleet[index] = { ...fleet[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("fleet.json", fleet);
    return NextResponse.json({ success: true, data: fleet[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Araç güncellenemedi" }, { status: 500 });
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
    const fleet = await readData<Vehicle[]>("fleet.json");
    const filtered = fleet.filter((v) => v.id !== id);
    if (filtered.length === fleet.length) return NextResponse.json({ success: false, error: "Araç bulunamadı" }, { status: 404 });

    await writeData("fleet.json", filtered);
    return NextResponse.json({ success: true, message: "Araç silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Araç silinemedi" }, { status: 500 });
  }
}
