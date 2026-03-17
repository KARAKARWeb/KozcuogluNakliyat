import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Rating, Review } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ pageSlug: string }> }
) {
  try {
    const { pageSlug } = await params;
    const ratings = await readData<Rating[]>("ratings.json");
    const rating = ratings.find((r) => r.pageSlug === pageSlug);

    if (!rating) {
      return NextResponse.json({
        success: true,
        data: { pageSlug, ratingValue: 0, reviewCount: 0, bestRating: 5, worstRating: 1 },
      });
    }
    return NextResponse.json({ success: true, data: rating });
  } catch {
    return NextResponse.json({ success: false, error: "Rating yüklenemedi" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ pageSlug: string }> }
) {
  try {
    const { pageSlug } = await params;
    const body = await req.json();
    const { rating } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Geçersiz puan" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Değerlendirmeniz için teşekkürler!" }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Değerlendirme kaydedilemedi" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ pageSlug: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { pageSlug } = await params;
    const body = await req.json();
    const ratings = await readData<Rating[]>("ratings.json");
    const index = ratings.findIndex((r) => r.pageSlug === pageSlug);

    if (index === -1) {
      const newRating: Rating = {
        id: Date.now().toString(),
        pageSlug,
        pageName: body.pageName || pageSlug,
        mode: body.mode || "manual",
        ratingValue: body.ratingValue || 0,
        reviewCount: body.reviewCount || 0,
        bestRating: 5,
        worstRating: 1,
        updatedAt: new Date().toISOString(),
      };
      ratings.push(newRating);
      await writeData("ratings.json", ratings);
      return NextResponse.json({ success: true, data: newRating }, { status: 201 });
    }

    ratings[index] = { ...ratings[index], ...body, updatedAt: new Date().toISOString() };
    await writeData("ratings.json", ratings);
    return NextResponse.json({ success: true, data: ratings[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Rating güncellenemedi" }, { status: 500 });
  }
}
