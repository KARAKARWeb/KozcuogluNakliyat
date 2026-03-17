import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { PricingModule } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const modules = await readData<PricingModule[]>("pricing-modules.json");
    const mod = modules.find((m) => m.slug === slug && m.isActive);

    if (!mod) {
      return NextResponse.json({ success: false, error: "Modül bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: mod });
  } catch {
    return NextResponse.json({ success: false, error: "Modül yüklenemedi" }, { status: 500 });
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
    const modules = await readData<PricingModule[]>("pricing-modules.json");
    const index = modules.findIndex((m) => m.id === slug || m.slug === slug);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Modül bulunamadı" }, { status: 404 });
    }

    modules[index] = { ...modules[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("pricing-modules.json", modules);
    return NextResponse.json({ success: true, data: modules[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Modül güncellenemedi" }, { status: 500 });
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
    const modules = await readData<PricingModule[]>("pricing-modules.json");
    const filtered = modules.filter((m) => m.id !== slug && m.slug !== slug);

    if (filtered.length === modules.length) {
      return NextResponse.json({ success: false, error: "Modül bulunamadı" }, { status: 404 });
    }

    await writeData("pricing-modules.json", filtered);
    return NextResponse.json({ success: true, message: "Modül silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Modül silinemedi" }, { status: 500 });
  }
}
