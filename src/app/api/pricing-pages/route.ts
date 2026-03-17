import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-logger";

interface PriceItem {
  title: string;
  price: string;
  description?: string;
}

interface PricingPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  prices: PriceItem[];
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  // Public endpoint - header menüsü için gerekli, auth yok
  try {
    const pages = await readData<PricingPage[]>("pricing-pages.json").catch(() => []);
    return NextResponse.json({ success: true, data: pages });
  } catch {
    return NextResponse.json({ success: false, error: "Veriler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const pages = await readData<PricingPage[]>("pricing-pages.json").catch(() => [] as PricingPage[]);

    const newPage: PricingPage = {
      id: Date.now().toString(),
      slug: body.slug,
      title: body.title,
      description: body.description || "",
      prices: body.prices || [],
      isActive: body.isActive ?? true,
      seoTitle: body.seoTitle || "",
      seoDescription: body.seoDescription || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    pages.push(newPage);
    await writeData("pricing-pages.json", pages);
    await logActivity("create", "pricing-page", newPage.id, `Yeni fiyat sayfası: ${newPage.title}`);

    return NextResponse.json({ success: true, data: newPage }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Kayıt başarısız" }, { status: 500 });
  }
}
