import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import { DEFAULT_ADVANCED_PRICING, type AdvancedPricingConfig } from "@/types/advanced-pricing";

export async function GET() {
  try {
    const config = await readData<AdvancedPricingConfig>("advanced-pricing-config.json").catch(() => DEFAULT_ADVANCED_PRICING);
    return NextResponse.json({ success: true, data: config });
  } catch {
    return NextResponse.json({ success: false, error: "Veriler yüklenemedi" }, { status: 500 });
  }
}
