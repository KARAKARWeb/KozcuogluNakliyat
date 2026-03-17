import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readData } from "@/lib/db";
import type { Settings } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kozcuoglunakliyat.com.tr";

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { urls } = await req.json();
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ success: false, error: "URL listesi gerekli" }, { status: 400 });
    }

    const settings = await readData<Settings>("settings.json");
    const key = settings.integrations?.indexNowKey;
    if (!key) {
      return NextResponse.json({ success: false, error: "IndexNow key ayarlanmamış. Ayarlar > Entegrasyonlar'dan ekleyin." }, { status: 400 });
    }

    const fullUrls = urls.map((u: string) => u.startsWith("http") ? u : `${SITE_URL}${u}`);

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: new URL(SITE_URL).hostname,
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList: fullUrls,
      }),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return NextResponse.json({ success: true, submitted: fullUrls.length });
    }

    const text = await response.text();
    return NextResponse.json({ success: false, error: `IndexNow API hatası: ${response.status} - ${text}` }, { status: 502 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const settings = await readData<Settings>("settings.json");
  const key = settings.integrations?.indexNowKey;

  return NextResponse.json({
    success: true,
    hasKey: !!key,
    endpoint: "POST /api/indexnow",
    body: '{ "urls": ["/ev-tasima", "/ofis-tasima"] }',
  });
}
