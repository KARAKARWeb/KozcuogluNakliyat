import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Settings } from "@/types";

export async function GET() {
  try {
    const settings = await readData<Settings>("settings.json");
    return NextResponse.json({ success: true, data: settings });
  } catch {
    return NextResponse.json({ success: false, error: "Ayarlar yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const settings = await readData<Settings>("settings.json");
    const updated = { ...settings, ...body };
    await writeData("settings.json", updated);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Ayarlar güncellenemedi" }, { status: 500 });
  }
}
