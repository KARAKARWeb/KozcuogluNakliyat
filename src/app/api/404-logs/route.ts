import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Log404 } from "@/types";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const logs = await readData<Log404[]>("404-logs.json");
    const sorted = logs.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());
    return NextResponse.json({ success: true, data: sorted });
  } catch {
    return NextResponse.json({ success: false, error: "404 logları yüklenemedi" }, { status: 500 });
  }
}
