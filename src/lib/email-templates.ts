const BRAND = {
  name: "Kozcuoğlu Nakliyat",
  phone: "444 7 436",
  email: "info@kozcuoglunakliyat.com.tr",
  url: "https://kozcuoglunakliyat.com.tr",
  color: "#e3000f",
  dark: "#122032",
};

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
<!-- Header -->
<tr><td style="background:${BRAND.dark};padding:24px 32px;text-align:center;">
<h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">${BRAND.name}</h1>
</td></tr>
<!-- Body -->
<tr><td style="padding:32px;">
${body}
</td></tr>
<!-- Footer -->
<tr><td style="background:#f9f9f9;padding:20px 32px;border-top:1px solid #eee;">
<p style="margin:0 0 4px;font-size:12px;color:#999;text-align:center;">${BRAND.name} | ${BRAND.phone} | ${BRAND.email}</p>
<p style="margin:0;font-size:11px;color:#bbb;text-align:center;">Bu e-posta otomatik olarak gönderilmiştir. Lütfen yanıtlamayınız.</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export function contactFormEmail(data: { name: string; phone: string; email: string; message: string }) {
  const body = `
<h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:18px;">Yeni İletişim Mesajı</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;width:120px;">Ad Soyad</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;font-weight:600;color:${BRAND.dark};">${data.name}</td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Telefon</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.phone}</td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">E-Posta</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.email}</td></tr>
</table>
<div style="background:#f9f9f9;border-radius:8px;padding:16px;margin-bottom:16px;">
<p style="margin:0 0 4px;font-size:12px;color:#999;">Mesaj:</p>
<p style="margin:0;font-size:14px;color:${BRAND.dark};line-height:1.6;">${data.message.replace(/\n/g, "<br>")}</p>
</div>
<p style="margin:0;font-size:12px;color:#999;">Tarih: ${new Date().toLocaleString("tr-TR")}</p>`;
  return layout("Yeni İletişim Mesajı", body);
}

export function surveyRequestEmail(data: { 
  name: string; 
  phone: string; 
  email: string; 
  fromAddress: string; 
  fromFloor?: string;
  fromElevator?: string;
  toAddress: string; 
  toFloor?: string;
  toElevator?: string;
  homeType?: string;
  moveDate?: string;
  preferredDate?: string; 
  note?: string;
}) {
  const body = `
<h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:18px;">Yeni Keşif Talebi</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;width:140px;">Ad Soyad</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;font-weight:600;color:${BRAND.dark};">${data.name}</td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Telefon</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.phone}</td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">E-Posta</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.email}</td></tr>
${data.homeType ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Ev Tipi</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;font-weight:600;color:${BRAND.color};">${data.homeType}</td></tr>` : ""}
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Çıkış Adresi</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.fromAddress}</td></tr>
${data.fromFloor ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Çıkış Kat</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.fromFloor}. Kat | Asansör: ${data.fromElevator || "Belirtilmedi"}</td></tr>` : ""}
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Varış Adresi</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.toAddress}</td></tr>
${data.toFloor ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Varış Kat</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.toFloor}. Kat | Asansör: ${data.toElevator || "Belirtilmedi"}</td></tr>` : ""}
${data.moveDate ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Taşıma Tarihi</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;font-weight:600;color:${BRAND.color};">${data.moveDate}</td></tr>` : ""}
${data.preferredDate ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#666;">Tercih Edilen Tarih</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:${BRAND.dark};">${data.preferredDate}</td></tr>` : ""}
</table>
${data.note ? `<div style="background:#f9f9f9;border-radius:8px;padding:16px;margin-bottom:16px;"><p style="margin:0 0 4px;font-size:12px;color:#999;">Not:</p><p style="margin:0;font-size:14px;color:${BRAND.dark};line-height:1.6;">${data.note.replace(/\n/g, "<br>")}</p></div>` : ""}
<p style="margin:0;font-size:12px;color:#999;">Tarih: ${new Date().toLocaleString("tr-TR")}</p>`;
  return layout("Yeni Keşif Talebi", body);
}

export function trackingStatusEmail(data: { trackingCode: string; customerName: string; status: string; nextStep?: string }) {
  const body = `
<h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:18px;">Taşıma Durumu Güncellendi</h2>
<p style="margin:0 0 16px;font-size:14px;color:#666;">Sayın ${data.customerName},</p>
<div style="background:${BRAND.dark};border-radius:8px;padding:20px;text-align:center;margin-bottom:20px;">
<p style="margin:0 0 4px;font-size:12px;color:#999;">Takip Kodu</p>
<p style="margin:0;font-size:24px;font-weight:700;color:#fff;letter-spacing:2px;">${data.trackingCode}</p>
</div>
<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin-bottom:16px;">
<p style="margin:0 0 4px;font-size:12px;color:#16a34a;">Mevcut Durum</p>
<p style="margin:0;font-size:16px;font-weight:600;color:#15803d;">${data.status}</p>
</div>
${data.nextStep ? `<p style="margin:0 0 16px;font-size:14px;color:#666;"><strong>Sonraki Adım:</strong> ${data.nextStep}</p>` : ""}
<p style="margin:0;font-size:13px;color:#666;">Sorularınız için bizi arayabilirsiniz: <strong>${BRAND.phone}</strong></p>`;
  return layout("Taşıma Durumu Güncellendi", body);
}

export function reviewNotificationEmail(data: { reviewerName: string; rating: number; comment: string; pageSlug?: string }) {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
  const body = `
<h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:18px;">Yeni Yorum Bildirimi</h2>
<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-bottom:16px;">
<p style="margin:0 0 4px;font-size:24px;color:#f59e0b;">${stars}</p>
<p style="margin:0 0 8px;font-size:14px;font-weight:600;color:${BRAND.dark};">${data.reviewerName}</p>
<p style="margin:0;font-size:14px;color:#666;line-height:1.6;">${data.comment}</p>
</div>
<p style="margin:0 0 16px;font-size:12px;color:#999;">Bu yorum onay bekliyor. Admin panelden onaylayabilir veya reddedebilirsiniz.</p>
<a href="${BRAND.url}/admin/reviews" style="display:inline-block;background:${BRAND.color};color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Yorumu İncele</a>`;
  return layout("Yeni Yorum Bildirimi", body);
}
