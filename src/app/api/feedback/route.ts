import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { sanitize } from "@/lib/sanitize";
import { logActivity } from "@/lib/activity-logger";
import { createNotification } from "@/lib/notify";
import type { Message } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { issue, location, rating, screenshot, url, userAgent, timestamp } = body;

    const messages = await readData<Message[]>("messages.json");

    const screenshotInfo = screenshot && screenshot.length > 100 
      ? `📸 Ekran görüntüsü alındı (${Math.round(screenshot.length / 1024)}KB)\n${screenshot.substring(0, 100)}...`
      : screenshot 
        ? "📸 Ekran görüntüsü alındı" 
        : "❌ Ekran görüntüsü yok";

    const newMessage: Message = {
      id: Date.now().toString(),
      name: "Kullanıcı Geri Bildirimi",
      email: "feedback@system.local",
      phone: "-",
      subject: `Hata Bildirimi - ${sanitize(location)}`,
      message: `
📍 Konum: ${sanitize(location)}
🌐 URL: ${sanitize(url)}
⭐ Değerlendirme: ${rating}/5
📝 Açıklama: ${sanitize(issue)}
🖥️ User Agent: ${userAgent}
⏰ Tarih: ${new Date(timestamp).toLocaleString("tr-TR")}

${screenshotInfo}
      `.trim(),
      source: "contact",
      status: "unread",
      adminNote: screenshot && screenshot.length > 100 ? screenshot : "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    await writeData("messages.json", messages);
    await logActivity("create", "feedback", newMessage.id, `Yeni geri bildirim: ${rating}/5 - ${location}`);
    await createNotification("info", "Yeni Geri Bildirim", `Kullanıcı geri bildirimi: ${rating}/5 yıldız`, "/admin/messages");

    return NextResponse.json({ 
      success: true, 
      message: "Geri bildiriminiz alındı",
      id: newMessage.id 
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { success: false, message: "Bir hata oluştu" },
      { status: 500 }
    );
  }
}
