import { NextRequest, NextResponse } from "next/server";

const REQUIRED_HREF = "https://kozcuoglunakliyat.com.tr";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ verified: false, error: "URL gerekli" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "KozcuogluEmbedBot/1.0" },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return NextResponse.json({ verified: false, error: "Sayfa erişilemedi" });
    }

    const html = await res.text();
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const headContent = headMatch ? headMatch[1] : html;

    const hasLink =
      headContent.includes(REQUIRED_HREF) &&
      (headContent.includes('rel="dofollow"') || headContent.includes("rel='dofollow'") || !headContent.includes('rel="nofollow"'));

    const hasAnchor = html.includes(`href="${REQUIRED_HREF}"`) || html.includes(`href="${REQUIRED_HREF}/"`);

    return NextResponse.json({ verified: hasLink || hasAnchor });
  } catch {
    return NextResponse.json({ verified: false, error: "Doğrulama başarısız" });
  }
}
