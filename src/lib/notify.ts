import { readData, writeData } from "@/lib/db";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export async function createNotification(
  type: "info" | "warning" | "success" | "error",
  title: string,
  message: string,
  link?: string
) {
  try {
    const notifications = await readData<Notification[]>("notifications.json");

    notifications.unshift({
      id: Date.now().toString(),
      type,
      title,
      message,
      link: link || "",
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    if (notifications.length > 100) notifications.splice(100);
    await writeData("notifications.json", notifications);
  } catch {
    // silent fail
  }
}
