import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Region } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const regions = await readData<Region[]>("regions.json");
    const region = regions.find((r) => r.slug === slug && r.isActive);

    if (!region) {
      return NextResponse.json({ success: false, error: "Bölge bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: region });
  } catch {
    return NextResponse.json({ success: false, error: "Bölge yüklenemedi" }, { status: 500 });
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
    const regions = await readData<Region[]>("regions.json");
    const index = regions.findIndex((r) => r.id === slug || r.slug === slug);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Bölge bulunamadı" }, { status: 404 });
    }

    regions[index] = { ...regions[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("regions.json", regions);
    return NextResponse.json({ success: true, data: regions[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Bölge güncellenemedi" }, { status: 500 });
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
    const regions = await readData<Region[]>("regions.json");
    const filtered = regions.filter((r) => r.id !== slug && r.slug !== slug);

    if (filtered.length === regions.length) {
      return NextResponse.json({ success: false, error: "Bölge bulunamadı" }, { status: 404 });
    }

    await writeData("regions.json", filtered);
    return NextResponse.json({ success: true, message: "Bölge silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Bölge silinemedi" }, { status: 500 });
  }
}
