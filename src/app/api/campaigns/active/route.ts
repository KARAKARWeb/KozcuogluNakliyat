import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import type { Campaign } from "@/types";

export async function GET() {
  try {
    const campaigns = await readData<Campaign[]>("campaigns.json");
    const now = new Date();
    const active = campaigns.filter(
      (c) =>
        c.isActive &&
        new Date(c.validFrom) <= now &&
        (!c.validThrough || new Date(c.validThrough) >= now)
    );
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Kampanyalar yüklenemedi" }, { status: 500 });
  }
}
