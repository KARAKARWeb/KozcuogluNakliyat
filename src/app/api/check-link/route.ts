import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { ok: false, error: "URL gerekli" },
        { status: 400 }
      );
    }

    try {
      const response = await fetch(url, {
        method: "HEAD",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; LinkChecker/1.0)",
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      return NextResponse.json({
        ok: response.ok,
        statusCode: response.status,
        url: url,
      });
    } catch (error) {
      return NextResponse.json({
        ok: false,
        statusCode: 0,
        url: url,
        error: "Link kontrol edilemedi",
      });
    }
  } catch (error) {
    console.error("Check link error:", error);
    return NextResponse.json(
      { ok: false, error: "Link kontrolü başarısız" },
      { status: 500 }
    );
  }
}
