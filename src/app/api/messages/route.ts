import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";
import { contactFormSchema } from "@/lib/validations";
import { logActivity } from "@/lib/activity-logger";
import { createNotification } from "@/lib/notify";
import { sendEmail } from "@/lib/mailer";
import { contactFormEmail } from "@/lib/email-templates";
import type { Message, Settings } from "@/types";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const messages = await readData<Message[]>("messages.json");
    const sorted = messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, data: sorted });
  } catch {
    return NextResponse.json({ success: false, error: "Mesajlar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`message:${ip}`, 3, 5 * 60 * 1000);
  if (!limit.success) {
    return NextResponse.json({ success: false, error: "Çok fazla mesaj gönderdiniz. Lütfen bekleyin." }, { status: 429 });
  }

  try {
    const body = await req.json();

    if (body.honeypot) {
      return NextResponse.json({ success: true, message: "Mesajınız gönderildi." });
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Geçersiz form verisi";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const messages = await readData<Message[]>("messages.json");

    const newMessage: Message = {
      id: Date.now().toString(),
      name: sanitize(body.name),
      email: sanitize(body.email),
      phone: sanitize(body.phone || ""),
      subject: sanitize(body.subject || "İletişim Formu"),
      message: sanitize(body.message),
      source: body.source || "contact",
      status: "unread",
      adminNote: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    await writeData("messages.json", messages);
    await logActivity("create", "message", newMessage.id, `Yeni mesaj: ${newMessage.name}`);
    await createNotification("info", "Yeni Mesaj", `${newMessage.name} bir mesaj gönderdi`, "/admin/messages");
    
    // E-posta gönder
    const settings = await readData<Settings>("settings.json");
    const toEmail = settings.integrations?.smtp?.to || settings.nap.email;
    sendEmail({
      to: toEmail,
      subject: `Yeni İletişim Formu Mesajı: ${newMessage.name}`,
      html: contactFormEmail({ 
        name: newMessage.name, 
        phone: newMessage.phone, 
        email: newMessage.email, 
        message: newMessage.message 
      })
    }).catch(err => console.error("E-posta gönderim hatası:", err));

    return NextResponse.json({ success: true, message: "Mesajınız gönderildi." }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Mesaj gönderilemedi" }, { status: 500 });
  }
}
