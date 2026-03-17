import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Redirect } from "@/types";

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const items: { source: string; destination: string; type?: string; note?: string }[] = body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: "items dizisi gerekli" }, { status: 400 });
    }

    const redirects = await readData<Redirect[]>("redirects.json");
    let imported = 0;

    for (const item of items) {
      if (!item.source || !item.destination) continue;

      const exists = redirects.some((r) => r.source === item.source);
      if (exists) continue;

      redirects.push({
        id: (Date.now() + imported).toString(),
        source: item.source,
        destination: item.destination,
        type: (item.type as "301" | "302") || "301",
        note: item.note || "Toplu içe aktarma",
        hitCount: 0,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      imported++;
    }

    await writeData("redirects.json", redirects);
    return NextResponse.json({
      success: true,
      message: `${imported} yönlendirme içe aktarıldı`,
      data: { imported, skipped: items.length - imported },
    });
  } catch {
    return NextResponse.json({ success: false, error: "İçe aktarma başarısız" }, { status: 500 });
  }
}
