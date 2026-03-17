import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const notifications = await readData<Notification[]>("notifications.json");
    const sorted = notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const unreadCount = sorted.filter((n) => !n.isRead).length;
    return NextResponse.json({ success: true, data: sorted, unreadCount });
  } catch {
    return NextResponse.json({ success: false, error: "Bildirimler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const notifications = await readData<Notification[]>("notifications.json");

    if (body.action === "markAllRead") {
      notifications.forEach((n) => (n.isRead = true));
      await writeData("notifications.json", notifications);
      return NextResponse.json({ success: true, message: "Tümü okundu olarak işaretlendi" });
    }

    if (body.action === "markRead" && body.id) {
      const n = notifications.find((n) => n.id === body.id);
      if (n) {
        n.isRead = true;
        await writeData("notifications.json", notifications);
      }
      return NextResponse.json({ success: true });
    }

    if (body.action === "clear") {
      await writeData("notifications.json", []);
      return NextResponse.json({ success: true, message: "Bildirimler temizlendi" });
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      type: body.type || "info",
      title: body.title || "",
      message: body.message || "",
      link: body.link || "",
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    notifications.unshift(newNotification);
    if (notifications.length > 100) notifications.splice(100);
    await writeData("notifications.json", notifications);

    return NextResponse.json({ success: true, data: newNotification }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "İşlem başarısız" }, { status: 500 });
  }
}
