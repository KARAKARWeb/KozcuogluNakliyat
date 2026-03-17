import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Rating } from "@/types";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const ratings = await readData<Rating[]>("ratings.json");
    return NextResponse.json({ success: true, data: ratings });
  } catch {
    return NextResponse.json({ success: false, error: "Rating ayarları yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { pageSlug, pageName, mode, ratingValue, reviewCount } = body;

    if (!pageSlug || !pageName) {
      return NextResponse.json({ success: false, error: "Sayfa slug ve adı gerekli" }, { status: 400 });
    }

    const ratings = await readData<Rating[]>("ratings.json");
    
    // Aynı slug varsa hata ver
    if (ratings.some(r => r.pageSlug === pageSlug)) {
      return NextResponse.json({ success: false, error: "Bu slug için zaten rating var" }, { status: 400 });
    }

    const newRating: Rating = {
      id: Date.now().toString(),
      pageSlug,
      pageName,
      mode: mode || "manual",
      ratingValue: ratingValue || 5,
      reviewCount: reviewCount || 0,
      bestRating: 5,
      worstRating: 1,
      updatedAt: new Date().toISOString(),
    };

    ratings.push(newRating);
    await writeData("ratings.json", ratings);

    return NextResponse.json({ success: true, data: newRating }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Rating oluşturulamadı" }, { status: 500 });
  }
}
