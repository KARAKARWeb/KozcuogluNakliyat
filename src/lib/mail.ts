import nodemailer from "nodemailer";
import { readData } from "./db";
import type { Settings } from "@/types";

export async function sendMail(subject: string, html: string) {
  const settings = await readData<Settings>("settings.json");
  const { smtp } = settings.integrations;

  if (!smtp.host || !smtp.user || !smtp.pass) {
    console.warn("[MAIL] SMTP ayarları eksik, mail gönderilemedi.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  try {
    await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error("[MAIL] Gönderim hatası:", err);
    return false;
  }
}
