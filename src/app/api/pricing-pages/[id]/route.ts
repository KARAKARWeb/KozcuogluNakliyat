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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const pages = await readData<PricingPage[]>("pricing-pages.json").catch(() => []);
    const page = pages.find(p => p.id === id);
    
    if (!page) {
      return NextResponse.json({ success: false, error: "Sayfa bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: page });
  } catch {
    return NextResponse.json({ success: false, error: "Veri yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    console.log("📝 Pricing page güncelleniyor:", id, body);
    
    const pages = await readData<PricingPage[]>("pricing-pages.json").catch(() => []);
    const index = pages.findIndex(p => p.id === id);

    if (index === -1) {
      console.error("❌ Sayfa bulunamadı:", id);
      return NextResponse.json({ success: false, error: "Sayfa bulunamadı" }, { status: 404 });
    }

    pages[index] = {
      ...pages[index],
      slug: body.slug,
      title: body.title,
      description: body.description || "",
      prices: body.prices || [],
      isActive: body.isActive ?? true,
      seoTitle: body.seoTitle || "",
      seoDescription: body.seoDescription || "",
      updatedAt: new Date().toISOString(),
    };

    await writeData("pricing-pages.json", pages);
    console.log("✅ Pricing page kaydedildi:", pages[index]);
    
    await logActivity("update", "pricing-page", id, `Fiyat sayfası güncellendi: ${pages[index].title}`);

    return NextResponse.json({ success: true, data: pages[index] });
  } catch (error) {
    console.error("❌ Pricing page kaydetme hatası:", error);
    return NextResponse.json({ success: false, error: "Güncelleme başarısız" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const pages = await readData<PricingPage[]>("pricing-pages.json").catch(() => []);
    const filtered = pages.filter(p => p.id !== id);

    await writeData("pricing-pages.json", filtered);
    await logActivity("delete", "pricing-page", id, "Fiyat sayfası silindi");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Silme başarısız" }, { status: 500 });
  }
}
