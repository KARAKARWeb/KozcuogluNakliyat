import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import type { PricingModule } from "@/types";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`pricing:${ip}`, 20, 60 * 1000);
  if (!limit.success) {
    return NextResponse.json({ success: false, error: "Çok fazla hesaplama isteği" }, { status: 429 });
  }

  try {
    const { moduleSlug, values } = await req.json();

    if (!moduleSlug || !values) {
      return NextResponse.json({ success: false, error: "moduleSlug ve values gerekli" }, { status: 400 });
    }

    const modules = await readData<PricingModule[]>("pricing-modules.json");
    const mod = modules.find((m) => m.slug === moduleSlug && m.isActive);

    if (!mod) {
      return NextResponse.json({ success: false, error: "Modül bulunamadı" }, { status: 404 });
    }

    let price = mod.basePrice;
    const details: { label: string; impact: string; amount: number }[] = [];

    for (const field of mod.fields) {
      const value = values[field.id];
      if (value === undefined || value === null) continue;

      switch (field.priceImpact) {
        case "base":
          if (field.type === "select" && field.options) {
            const idx = field.options.indexOf(value);
            const multiplier = 1 + idx * 0.3;
            const amount = Math.round(mod.basePrice * multiplier - mod.basePrice);
            price += amount;
            details.push({ label: field.label, impact: `+${amount}₺`, amount });
          }
          break;
        case "multiplier":
          if (value) {
            const mult = 1.1;
            const amount = Math.round(price * (mult - 1));
            price += amount;
            details.push({ label: field.label, impact: `x${mult}`, amount });
          }
          break;
        case "addition":
          if (field.type === "number") {
            const amount = Number(value) * 200;
            price += amount;
            details.push({ label: field.label, impact: `+${amount}₺`, amount });
          } else if (field.type === "boolean" && value) {
            const amount = 1500;
            price += amount;
            details.push({ label: field.label, impact: `+${amount}₺`, amount });
          }
          break;
        case "discount":
          if (field.type === "boolean" && value) {
            const amount = -Math.round(price * 0.05);
            price += amount;
            details.push({ label: field.label, impact: `${amount}₺`, amount });
          }
          break;
      }
    }

    const minPrice = Math.round(price * 0.85);
    const maxPrice = Math.round(price * 1.15);

    return NextResponse.json({
      success: true,
      data: {
        estimatedPrice: Math.round(price),
        minPrice,
        maxPrice,
        details,
        currency: "TRY",
        note: "Bu fiyat tahminidir. Kesin fiyat için keşif talep edin.",
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Fiyat hesaplanamadı" }, { status: 500 });
  }
}
