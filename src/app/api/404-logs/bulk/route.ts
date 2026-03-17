import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Log404 } from "@/types";

export async function DELETE(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids)) {
      return NextResponse.json({ success: false, error: "ids dizisi gerekli" }, { status: 400 });
    }

    const logs = await readData<Log404[]>("404-logs.json");
    const filtered = logs.filter((l) => !ids.includes(l.id));
    const deleted = logs.length - filtered.length;

    await writeData("404-logs.json", filtered);
    return NextResponse.json({ success: true, message: `${deleted} log silindi` });
  } catch {
    return NextResponse.json({ success: false, error: "Loglar silinemedi" }, { status: 500 });
  }
}
