import nodemailer from "nodemailer";
import { readData } from "./db";
import type { Settings } from "@/types";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    const settings = await readData<Settings>("settings.json");
    const smtp = settings.integrations?.smtp;

    if (!smtp || !smtp.host || !smtp.user || !smtp.pass) {
      console.error("SMTP ayarları eksik veya hatalı");
      return { success: false, error: "SMTP ayarları yapılandırılmamış" };
    }

    // Nodemailer transporter oluştur
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port || 587,
      secure: smtp.port === 465, // 465 için true, 587 için false
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    // E-posta gönder
    const info = await transporter.sendMail({
      from: smtp.from || smtp.user,
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log("E-posta gönderildi:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("E-posta gönderim hatası:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Bilinmeyen hata" 
    };
  }
}

// Test e-postası gönder
export async function sendTestEmail(testEmail: string): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: testEmail,
    subject: "Test E-postası - Kozcuoğlu Nakliyat",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e3000f;">Test E-postası</h2>
        <p>Bu bir test e-postasıdır. SMTP ayarlarınız başarıyla yapılandırılmıştır.</p>
        <p style="color: #666; font-size: 14px;">
          Gönderim Zamanı: ${new Date().toLocaleString("tr-TR")}
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">
          Kozcuoğlu Nakliyat - E-posta Sistemi
        </p>
      </div>
    `,
    text: "Bu bir test e-postasıdır. SMTP ayarlarınız başarıyla yapılandırılmıştır.",
  });
}
