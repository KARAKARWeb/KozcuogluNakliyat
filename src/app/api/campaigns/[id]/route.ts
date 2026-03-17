import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-logger";
import type { Campaign } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const campaigns = await readData<Campaign[]>("campaigns.json");
    const index = campaigns.findIndex((c) => c.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Kampanya bulunamadı" }, { status: 404 });

    campaigns[index] = { ...campaigns[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("campaigns.json", campaigns);
    await logActivity("update", "campaign", id, `Kampanya güncellendi: ${campaigns[index].title}`);
    return NextResponse.json({ success: true, data: campaigns[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Kampanya güncellenemedi" }, { status: 500 });
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
    const campaigns = await readData<Campaign[]>("campaigns.json");
    const filtered = campaigns.filter((c) => c.id !== id);
    if (filtered.length === campaigns.length) return NextResponse.json({ success: false, error: "Kampanya bulunamadı" }, { status: 404 });

    await writeData("campaigns.json", filtered);
    await logActivity("delete", "campaign", id, `Kampanya silindi`);
    return NextResponse.json({ success: true, message: "Kampanya silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Kampanya silinemedi" }, { status: 500 });
  }
}
