import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin, getSession } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";
import { reviewFormSchema } from "@/lib/validations";
import { logActivity } from "@/lib/activity-logger";
import { createNotification } from "@/lib/notify";
import { sendMail } from "@/lib/mail";
import { reviewNotificationEmail } from "@/lib/email-templates";
import type { Review } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const reviews = await readData<Review[]>("reviews.json");
    const session = await getSession();
    const { searchParams } = new URL(req.url);
    const pageSlug = searchParams.get("page");

    if (session) {
      const filtered = pageSlug ? reviews.filter((r) => r.pageSlug === pageSlug) : reviews;
      return NextResponse.json({ success: true, data: filtered });
    }

    const approved = reviews
      .filter((r) => r.status === "approved" && (!pageSlug || r.pageSlug === pageSlug))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, data: approved });
  } catch {
    return NextResponse.json({ success: false, error: "Yorumlar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`review:${ip}`, 3, 5 * 60 * 1000);
  if (!limit.success) {
    return NextResponse.json({ success: false, error: "Çok fazla yorum gönderdiniz. Lütfen bekleyin." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = reviewFormSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Geçersiz form verisi";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const reviews = await readData<Review[]>("reviews.json");

    const newReview: Review = {
      id: Date.now().toString(),
      name: sanitize(body.name),
      email: sanitize(body.email || ""),
      rating: Math.min(5, Math.max(1, Number(body.rating))),
      comment: sanitize(body.comment),
      serviceSlug: body.serviceSlug || "",
      pageSlug: body.pageSlug || "",
      status: "pending",
      adminReply: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    await writeData("reviews.json", reviews);
    await logActivity("create", "review", newReview.id, `Yeni yorum: ${newReview.name} (${newReview.rating}★)`);
    await createNotification("warning", "Yeni Yorum", `${newReview.name} ${newReview.rating}★ yorum gönderdi — onay bekliyor`, "/admin/reviews");
    sendMail(`Yeni Yorum: ${newReview.name} (${newReview.rating}★)`, reviewNotificationEmail({ reviewerName: newReview.name, rating: newReview.rating, comment: newReview.comment, pageSlug: newReview.pageSlug })).catch(() => {});
    return NextResponse.json({ success: true, message: "Yorumunuz gönderildi, onay bekliyor." }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Yorum gönderilemedi" }, { status: 500 });
  }
}
