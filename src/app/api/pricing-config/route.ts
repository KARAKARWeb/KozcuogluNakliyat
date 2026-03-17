import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface HomeSize {
  id: string;
  label: string;
  basePrice: number;
  order: number;
  isActive: boolean;
}

interface PricingConfig {
  homeSizes: HomeSize[];
  districts: string[];
  extraCharges: {
    differentDistrict: number;
    weekendMultiplier: number;
  };
}

export async function GET() {
  try {
    const data = await readData<PricingConfig>("pricing-config.json");
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: "Fiyat ayarları yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    await writeData("pricing-config.json", body);
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: false, error: "Fiyat ayarları güncellenemedi" }, { status: 500 });
  }
}
