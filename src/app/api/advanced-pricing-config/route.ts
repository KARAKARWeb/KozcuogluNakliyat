import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-logger";
import { DEFAULT_ADVANCED_PRICING, type AdvancedPricingConfig } from "@/types/advanced-pricing";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const config = await readData<AdvancedPricingConfig>("advanced-pricing-config.json").catch(() => DEFAULT_ADVANCED_PRICING);
    return NextResponse.json({ success: true, data: config });
  } catch {
    return NextResponse.json({ success: false, error: "Veriler yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const updatedConfig: AdvancedPricingConfig = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await writeData("advanced-pricing-config.json", updatedConfig);
    await logActivity("update", "advanced-pricing-config", "config", "Gelişmiş fiyatlandırma ayarları güncellendi");

    return NextResponse.json({ success: true, data: updatedConfig });
  } catch {
    return NextResponse.json({ success: false, error: "Güncelleme başarısız" }, { status: 500 });
  }
}
