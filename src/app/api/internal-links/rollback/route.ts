import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST() {
  const authError = await requireAdmin();
  if (authError) return authError;

  // TODO: FAZ 5 — İç linkleme geri alma implementasyonu
  return NextResponse.json({
    success: true,
    message: "İç linkler geri alındı (placeholder — FAZ 5'te tamamlanacak)",
    data: { reverted: 0 },
  });
}
