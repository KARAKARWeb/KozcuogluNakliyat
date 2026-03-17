import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import type { Log404 } from "@/types";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`404:${ip}`, 30, 60 * 1000);
  if (!limit.success) {
    return NextResponse.json({ success: false }, { status: 429 });
  }

  try {
    const { url, referrer } = await req.json();
    if (!url) return NextResponse.json({ success: false }, { status: 400 });

    const logs = await readData<Log404[]>("404-logs.json");
    const existing = logs.find((l) => l.url === url);

    if (existing) {
      existing.hitCount++;
      existing.lastSeen = new Date().toISOString();
    } else {
      logs.push({
        id: Date.now().toString(),
        url,
        referrer: referrer || "",
        userAgent: req.headers.get("user-agent") || "",
        hitCount: 1,
        status: "new",
        redirectId: null,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
      });
    }

    await writeData("404-logs.json", logs);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
