import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";
import { sendEmail } from "@/lib/mailer";
import { logActivity } from "@/lib/activity-logger";
import { createNotification } from "@/lib/notify";
import type { Quote, Settings } from "@/types";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const quotes = await readData<Quote[]>("quotes.json");
    const sorted = quotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, data: sorted });
  } catch {
    return NextResponse.json({ success: false, error: "Teklifler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`quote:${ip}`, 3, 10 * 60 * 1000);
  if (!limit.success) {
    return NextResponse.json({ success: false, error: "Çok fazla talep gönderdiniz. Lütfen bekleyin." }, { status: 429 });
  }

  try {
    const body = await req.json();

    if (!body.ad || !body.telefon || !body.hizmetTipi) {
      return NextResponse.json({ success: false, error: "Ad, telefon ve hizmet tipi zorunludur" }, { status: 400 });
    }

    if (body.honeypot) {
      return NextResponse.json({ success: true, message: "Teklif talebiniz alındı." });
    }

    const quotes = await readData<Quote[]>("quotes.json");

    const HIZMET_MAP: Record<string, string> = {
      "evden-eve": "Evden Eve Nakliyat",
      "ofis": "Ofis Taşıma",
      "villa": "Villa Taşıma",
      "parca": "Parça Eşya Taşıma",
      "depolama": "Eşya Depolama",
      "sehirlerarasi": "Şehirler Arası Nakliyat",
    };

    const newQuote: Quote = {
      id: Date.now().toString(),
      hizmetTipi: sanitize(body.hizmetTipi),
      cikisIl: sanitize(body.cikisIl || ""),
      cikisIlce: sanitize(body.cikisIlce || ""),
      cikisAdres: sanitize(body.cikisAdres || ""),
      varisIl: sanitize(body.varisIl || ""),
      varisIlce: sanitize(body.varisIlce || ""),
      varisAdres: sanitize(body.varisAdres || ""),
      evTipi: sanitize(body.evTipi || ""),
      cikisKat: sanitize(body.cikisKat || ""),
      varisKat: sanitize(body.varisKat || ""),
      cikisAsansor: sanitize(body.cikisAsansor || ""),
      varisAsansor: sanitize(body.varisAsansor || ""),
      asansorIhtiyac: sanitize(body.asansorIhtiyac || ""),
      esyaListesi: sanitize(body.esyaListesi || ""),
      ozelNotlar: sanitize(body.ozelNotlar || ""),
      ad: sanitize(body.ad),
      telefon: sanitize(body.telefon),
      email: sanitize(body.email || ""),
      tercihTarih: sanitize(body.tercihTarih || ""),
      depoYaka: sanitize(body.depoYaka || ""),
      depoEsyaTipi: sanitize(body.depoEsyaTipi || ""),
      depoSure: sanitize(body.depoSure || ""),
      depoAmbalaj: sanitize(body.depoAmbalaj || ""),
      depoNakliye: sanitize(body.depoNakliye || ""),
      status: "new",
      adminNote: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    quotes.push(newQuote);
    await writeData("quotes.json", quotes);

    const hizmetLabel = HIZMET_MAP[newQuote.hizmetTipi] || newQuote.hizmetTipi;
    const isDepo = newQuote.hizmetTipi === "depolama";

    const mailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="background:#122032;color:#fff;padding:24px 28px;">
          <h2 style="margin:0;font-size:20px;">Yeni Teklif Talebi</h2>
          <p style="margin:8px 0 0;color:#9ca3af;font-size:14px;">${new Date().toLocaleString("tr-TR")}</p>
        </div>
        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Hizmet Tipi</td><td style="padding:8px 0;font-weight:600;">${hizmetLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Ad Soyad</td><td style="padding:8px 0;font-weight:600;">${newQuote.ad}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Telefon</td><td style="padding:8px 0;font-weight:600;">${newQuote.telefon}</td></tr>
            ${newQuote.email ? `<tr><td style="padding:8px 0;color:#6b7280;">E-posta</td><td style="padding:8px 0;">${newQuote.email}</td></tr>` : ""}
            ${newQuote.tercihTarih ? `<tr><td style="padding:8px 0;color:#6b7280;">Tercih Tarihi</td><td style="padding:8px 0;">${newQuote.tercihTarih}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Çıkış</td><td style="padding:8px 0;">${newQuote.cikisIl}${newQuote.cikisIlce ? "/" + newQuote.cikisIlce : ""} ${newQuote.cikisAdres}</td></tr>
            ${!isDepo ? `<tr><td style="padding:8px 0;color:#6b7280;">Varış</td><td style="padding:8px 0;">${newQuote.varisIl}${newQuote.varisIlce ? "/" + newQuote.varisIlce : ""} ${newQuote.varisAdres}</td></tr>` : ""}
            ${newQuote.evTipi ? `<tr><td style="padding:8px 0;color:#6b7280;">Ev Tipi</td><td style="padding:8px 0;">${newQuote.evTipi}</td></tr>` : ""}
            ${newQuote.cikisKat ? `<tr><td style="padding:8px 0;color:#6b7280;">Çıkış Kat</td><td style="padding:8px 0;">${newQuote.cikisKat} | Asansör: ${newQuote.cikisAsansor}</td></tr>` : ""}
            ${!isDepo && newQuote.varisKat ? `<tr><td style="padding:8px 0;color:#6b7280;">Varış Kat</td><td style="padding:8px 0;">${newQuote.varisKat} | Asansör: ${newQuote.varisAsansor}</td></tr>` : ""}
            ${newQuote.asansorIhtiyac ? `<tr><td style="padding:8px 0;color:#6b7280;">Asansörlü Taşıma</td><td style="padding:8px 0;font-weight:600;">${newQuote.asansorIhtiyac}</td></tr>` : ""}
            ${isDepo && newQuote.depoYaka ? `<tr><td style="padding:8px 0;color:#6b7280;">Depo</td><td style="padding:8px 0;">${newQuote.depoYaka}</td></tr>` : ""}
            ${isDepo && newQuote.depoEsyaTipi ? `<tr><td style="padding:8px 0;color:#6b7280;">Eşya Tipi</td><td style="padding:8px 0;">${newQuote.depoEsyaTipi}</td></tr>` : ""}
            ${isDepo && newQuote.depoSure ? `<tr><td style="padding:8px 0;color:#6b7280;">Süre</td><td style="padding:8px 0;">${newQuote.depoSure}</td></tr>` : ""}
          </table>
          ${newQuote.esyaListesi ? `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" /><p style="font-size:14px;color:#6b7280;margin:0 0 4px;">Özel Eşyalar:</p><p style="font-size:14px;margin:0;">${newQuote.esyaListesi}</p>` : ""}
          ${newQuote.ozelNotlar ? `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" /><p style="font-size:14px;color:#6b7280;margin:0 0 4px;">Notlar:</p><p style="font-size:14px;margin:0;">${newQuote.ozelNotlar}</p>` : ""}
        </div>
        <div style="background:#f9fafb;padding:16px 28px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">Kozcuoğlu Nakliyat — Teklif Sistemi</p>
        </div>
      </div>
    `;

    // E-posta gönder
    const settings = await readData<Settings>("settings.json");
    const toEmail = settings.integrations?.smtp?.to || settings.nap.email;
    sendEmail({
      to: toEmail,
      subject: `Yeni Teklif Talebi: ${hizmetLabel} — ${newQuote.ad}`,
      html: mailHtml
    }).catch(err => console.error("E-posta gönderim hatası:", err));

    await logActivity("create", "quote", newQuote.id, `Yeni teklif: ${newQuote.ad} (${hizmetLabel})`);
    await createNotification("info", "Yeni Teklif Talebi", `${newQuote.ad} — ${hizmetLabel}`, "/admin/quotes");

    return NextResponse.json({ success: true, message: "Teklif talebiniz alındı." }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Teklif gönderilemedi" }, { status: 500 });
  }
}
