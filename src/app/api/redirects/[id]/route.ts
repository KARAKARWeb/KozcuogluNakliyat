import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Redirect } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const redirects = await readData<Redirect[]>("redirects.json");
    const index = redirects.findIndex((r) => r.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Yönlendirme bulunamadı" }, { status: 404 });

    redirects[index] = { ...redirects[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("redirects.json", redirects);
    return NextResponse.json({ success: true, data: redirects[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Yönlendirme güncellenemedi" }, { status: 500 });
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
    const redirects = await readData<Redirect[]>("redirects.json");
    const filtered = redirects.filter((r) => r.id !== id);
    if (filtered.length === redirects.length) return NextResponse.json({ success: false, error: "Yönlendirme bulunamadı" }, { status: 404 });

    await writeData("redirects.json", filtered);
    return NextResponse.json({ success: true, message: "Yönlendirme silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Yönlendirme silinemedi" }, { status: 500 });
  }
}
