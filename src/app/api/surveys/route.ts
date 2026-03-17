import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";
import { surveyFormSchema } from "@/lib/validations";
import { logActivity } from "@/lib/activity-logger";
import { createNotification } from "@/lib/notify";
import { sendEmail } from "@/lib/mailer";
import { surveyRequestEmail } from "@/lib/email-templates";
import type { SurveyRequest, Settings } from "@/types";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const surveys = await readData<SurveyRequest[]>("survey-requests.json");
    const sorted = surveys.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, data: sorted });
  } catch {
    return NextResponse.json({ success: false, error: "Keşif talepleri yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`survey:${ip}`, 2, 5 * 60 * 1000);
  if (!limit.success) {
    return NextResponse.json({ success: false, error: "Çok fazla talep gönderdiniz. 5 dakika bekleyin." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = surveyFormSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Geçersiz form verisi";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const surveys = await readData<SurveyRequest[]>("survey-requests.json");

    const newSurvey: SurveyRequest = {
      id: Date.now().toString(),
      name: sanitize(body.name),
      phone: sanitize(body.phone),
      email: sanitize(body.email || ""),
      serviceType: body.serviceType || "",
      fromAddress: sanitize(body.fromAddress || ""),
      fromFloor: sanitize(body.fromFloor || ""),
      fromElevator: sanitize(body.fromElevator || ""),
      toAddress: sanitize(body.toAddress || ""),
      toFloor: sanitize(body.toFloor || ""),
      toElevator: sanitize(body.toElevator || ""),
      homeType: sanitize(body.homeType || ""),
      moveDate: body.moveDate || "",
      preferredDate: body.preferredDate || "",
      note: sanitize(body.note || ""),
      status: "pending",
      adminNote: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    surveys.push(newSurvey);
    await writeData("survey-requests.json", surveys);
    await logActivity("create", "survey", newSurvey.id, `Yeni keşif talebi: ${newSurvey.name}`);
    await createNotification("success", "Yeni Keşif Talebi", `${newSurvey.name} keşif talebi gönderdi`, "/admin/surveys");
    
    // E-posta gönder
    const settings = await readData<Settings>("settings.json");
    const toEmail = settings.integrations?.smtp?.to || settings.nap.email;
    sendEmail({
      to: toEmail,
      subject: `Yeni Keşif Talebi: ${newSurvey.name}`,
      html: surveyRequestEmail({ 
        name: newSurvey.name, 
        phone: newSurvey.phone, 
        email: newSurvey.email, 
        fromAddress: newSurvey.fromAddress,
        fromFloor: newSurvey.fromFloor,
        fromElevator: newSurvey.fromElevator,
        toAddress: newSurvey.toAddress,
        toFloor: newSurvey.toFloor,
        toElevator: newSurvey.toElevator,
        homeType: newSurvey.homeType,
        moveDate: newSurvey.moveDate,
        preferredDate: newSurvey.preferredDate, 
        note: newSurvey.note 
      })
    }).catch(err => console.error("E-posta gönderim hatası:", err));

    return NextResponse.json({ success: true, message: "Keşif talebiniz alındı. En kısa sürede dönüş yapacağız." }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Talep gönderilemedi" }, { status: 500 });
  }
}
