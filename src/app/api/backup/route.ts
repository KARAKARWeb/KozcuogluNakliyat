import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readData, writeData } from "@/lib/db";
import { logActivity } from "@/lib/activity-logger";
import path from "path";
import fs from "fs/promises";

const DATA_DIR = path.join(process.cwd(), "src", "data");

const DATA_FILES = [
  "settings.json",
  "services.json",
  "solutions.json",
  "regions.json",
  "blog-posts.json",
  "reviews.json",
  "messages.json",
  "survey-requests.json",
  "tracking.json",
  "projects.json",
  "fleet.json",
  "campaigns.json",
  "gallery.json",
  "contracts.json",
  "clients.json",
  "pages.json",
  "pricing-modules.json",
  "ratings.json",
  "internal-links.json",
  "redirects.json",
  "quotes.json",
  "404-logs.json",
  "notifications.json",
  "activity-logs.json",
  "users.json",
  "footer.json",
];

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const backup: Record<string, unknown> = {};

    for (const file of DATA_FILES) {
      try {
        const filePath = path.join(DATA_DIR, file);
        const content = await fs.readFile(filePath, "utf-8");
        backup[file] = JSON.parse(content);
      } catch {
        backup[file] = null;
      }
    }

    const json = JSON.stringify(backup, null, 2);
    const date = new Date().toISOString().slice(0, 10);

    await logActivity("export", "backup", "", `Yedek indirildi: kozcuoglu-backup-${date}.json`);
    return new NextResponse(json, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="kozcuoglu-backup-${date}.json"`,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Yedekleme oluşturulamadı" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Geçersiz yedek dosyası" }, { status: 400 });
    }

    let restored = 0;

    for (const file of DATA_FILES) {
      if (body[file] !== undefined && body[file] !== null) {
        try {
          const filePath = path.join(DATA_DIR, file);
          await fs.writeFile(filePath, JSON.stringify(body[file], null, 2), "utf-8");
          restored++;
        } catch {
          // skip
        }
      }
    }

    await logActivity("import", "backup", "", `Yedek geri yüklendi: ${restored} dosya`);
    return NextResponse.json({ success: true, message: `${restored} dosya geri yüklendi`, restored });
  } catch {
    return NextResponse.json({ success: false, error: "Geri yükleme başarısız" }, { status: 500 });
  }
}
