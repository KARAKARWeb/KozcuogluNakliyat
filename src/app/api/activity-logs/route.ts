import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  user: string;
  createdAt: string;
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const logs = await readData<ActivityLog[]>("activity-logs.json");
    const sorted = logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, data: sorted.slice(0, 200) });
  } catch {
    return NextResponse.json({ success: false, error: "Loglar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const logs = await readData<ActivityLog[]>("activity-logs.json");

    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action: body.action || "unknown",
      entity: body.entity || "",
      entityId: body.entityId || "",
      details: body.details || "",
      user: body.user || "admin",
      createdAt: new Date().toISOString(),
    };

    logs.unshift(newLog);
    if (logs.length > 500) logs.splice(500);
    await writeData("activity-logs.json", logs);

    return NextResponse.json({ success: true, data: newLog }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Log kaydedilemedi" }, { status: 500 });
  }
}
