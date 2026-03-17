import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { PricingModule } from "@/types";

export async function GET() {
  try {
    const modules = await readData<PricingModule[]>("pricing-modules.json");
    const active = modules.filter((m) => m.isActive).sort((a, b) => a.order - b.order);
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Fiyat modülleri yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const modules = await readData<PricingModule[]>("pricing-modules.json");

    const newModule: PricingModule = {
      id: body.id || Date.now().toString(),
      name: body.name,
      slug: body.slug,
      description: body.description || "",
      fields: body.fields || [],
      basePrice: body.basePrice || 0,
      assignedPages: body.assignedPages || [],
      isActive: true,
      order: modules.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    modules.push(newModule);
    await writeData("pricing-modules.json", modules);
    return NextResponse.json({ success: true, data: newModule }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Modül eklenemedi" }, { status: 500 });
  }
}
