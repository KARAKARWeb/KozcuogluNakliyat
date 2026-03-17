import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/db";
import type { Review } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSlug = searchParams.get("page");

    if (!pageSlug) {
      return NextResponse.json({ success: false, error: "page parametresi gerekli" }, { status: 400 });
    }

    const reviews = await readData<Review[]>("reviews.json");
    const approved = reviews.filter((r) => r.status === "approved" && r.pageSlug === pageSlug);

    if (approved.length === 0) {
      return NextResponse.json({ success: true, data: { ratingValue: 0, reviewCount: 0, bestRating: 5, worstRating: 1 } });
    }

    const total = approved.reduce((sum, r) => sum + r.rating, 0);
    const avg = Math.round((total / approved.length) * 10) / 10;

    return NextResponse.json({
      success: true,
      data: {
        ratingValue: avg,
        reviewCount: approved.length,
        bestRating: 5,
        worstRating: 1,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Rating hesaplanamadı" }, { status: 500 });
  }
}
