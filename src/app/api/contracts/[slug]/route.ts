import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Contract } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const contracts = await readData<Contract[]>("contracts.json");
    const contract = contracts.find((c) => c.slug === slug && c.isActive);
    if (!contract) return NextResponse.json({ success: false, error: "Sözleşme bulunamadı" }, { status: 404 });
    return NextResponse.json({ success: true, data: contract });
  } catch {
    return NextResponse.json({ success: false, error: "Sözleşme yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { slug } = await params;
    const body = await req.json();
    const contracts = await readData<Contract[]>("contracts.json");
    const index = contracts.findIndex((c) => c.id === slug || c.slug === slug);
    if (index === -1) return NextResponse.json({ success: false, error: "Sözleşme bulunamadı" }, { status: 404 });

    contracts[index] = { ...contracts[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("contracts.json", contracts);
    return NextResponse.json({ success: true, data: contracts[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Sözleşme güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { slug } = await params;
    const contracts = await readData<Contract[]>("contracts.json");
    const filtered = contracts.filter((c) => c.id !== slug && c.slug !== slug);
    if (filtered.length === contracts.length) return NextResponse.json({ success: false, error: "Sözleşme bulunamadı" }, { status: 404 });

    await writeData("contracts.json", filtered);
    return NextResponse.json({ success: true, message: "Sözleşme silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Sözleşme silinemedi" }, { status: 500 });
  }
}
