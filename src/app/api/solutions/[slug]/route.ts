import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Solution } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const solutions = await readData<Solution[]>("solutions.json");
    const solution = solutions.find((s) => s.slug === slug && s.isActive);

    if (!solution) {
      return NextResponse.json({ success: false, error: "Çözüm bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: solution });
  } catch {
    return NextResponse.json({ success: false, error: "Çözüm yüklenemedi" }, { status: 500 });
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
    const solutions = await readData<Solution[]>("solutions.json");
    const index = solutions.findIndex((s) => s.id === slug || s.slug === slug);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Çözüm bulunamadı" }, { status: 404 });
    }

    solutions[index] = { ...solutions[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("solutions.json", solutions);
    return NextResponse.json({ success: true, data: solutions[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Çözüm güncellenemedi" }, { status: 500 });
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
    const solutions = await readData<Solution[]>("solutions.json");
    const filtered = solutions.filter((s) => s.id !== slug && s.slug !== slug);

    if (filtered.length === solutions.length) {
      return NextResponse.json({ success: false, error: "Çözüm bulunamadı" }, { status: 404 });
    }

    await writeData("solutions.json", filtered);
    return NextResponse.json({ success: true, message: "Çözüm silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Çözüm silinemedi" }, { status: 500 });
  }
}
