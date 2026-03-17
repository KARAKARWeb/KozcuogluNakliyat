import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-logger";
import type { TrackingItem } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const kod = searchParams.get("kod");

    const items = await readData<TrackingItem[]>("tracking.json");

    if (kod) {
      const item = items.find((t) => t.trackingCode === kod);
      if (!item) {
        return NextResponse.json({ success: false, error: "Takip kodu bulunamadı" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: item });
    }

    const authError = await requireAdmin();
    if (authError) return authError;

    const sorted = items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, data: sorted });
  } catch {
    return NextResponse.json({ success: false, error: "Takip verileri yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const items = await readData<TrackingItem[]>("tracking.json");

    const trackingCode = `KN-${Date.now().toString(36).toUpperCase()}`;

    const newItem: TrackingItem = {
      id: Date.now().toString(),
      trackingCode,
      customerName: body.customerName || "",
      customerPhone: body.customerPhone || "",
      serviceType: body.serviceType || "",
      fromAddress: body.fromAddress || "",
      toAddress: body.toAddress || "",
      events: [
        {
          step: "request-received",
          label: "Talep Alındı",
          date: new Date().toISOString(),
          note: "",
          isCompleted: true,
        },
      ],
      currentStep: "request-received",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    items.push(newItem);
    await writeData("tracking.json", items);
    await logActivity("create", "tracking", newItem.id, `Yeni takip: ${newItem.customerName} (${newItem.trackingCode})`);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Takip oluşturulamadı" }, { status: 500 });
  }
}
