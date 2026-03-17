import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST() {
  const authError = await requireAdmin();
  if (authError) return authError;

  // TODO: FAZ 5 — İç linkleme motoru implementasyonu
  return NextResponse.json({
    success: true,
    message: "İç linkleme başlatıldı (placeholder — FAZ 5'te tamamlanacak)",
    data: { processed: 0, linked: 0 },
  });
}
