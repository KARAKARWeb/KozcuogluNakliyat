import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Log404 } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const logs = await readData<Log404[]>("404-logs.json");
    const index = logs.findIndex((l) => l.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Log bulunamadı" }, { status: 404 });

    logs[index] = { ...logs[index], ...body };
    await writeData("404-logs.json", logs);
    return NextResponse.json({ success: true, data: logs[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Log güncellenemedi" }, { status: 500 });
  }
}
