import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { SurveyRequest } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const surveys = await readData<SurveyRequest[]>("survey-requests.json");
    const index = surveys.findIndex((s) => s.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Talep bulunamadı" }, { status: 404 });
    }

    surveys[index] = { ...surveys[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("survey-requests.json", surveys);
    return NextResponse.json({ success: true, data: surveys[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Talep güncellenemedi" }, { status: 500 });
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
    const surveys = await readData<SurveyRequest[]>("survey-requests.json");
    const filtered = surveys.filter((s) => s.id !== id);

    if (filtered.length === surveys.length) {
      return NextResponse.json({ success: false, error: "Talep bulunamadı" }, { status: 404 });
    }

    await writeData("survey-requests.json", filtered);
    return NextResponse.json({ success: true, message: "Talep silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Talep silinemedi" }, { status: 500 });
  }
}
