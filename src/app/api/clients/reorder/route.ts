import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Client } from "@/types";

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { orderedIds } = await req.json();
    const clients = await readData<Client[]>("clients.json");
    for (let i = 0; i < orderedIds.length; i++) {
      const c = clients.find((x) => x.id === orderedIds[i]);
      if (c) { c.order = i + 1; c.updatedAt = new Date().toISOString(); }
    }
    await writeData("clients.json", clients);
    return NextResponse.json({ success: true, message: "Sıralama güncellendi" });
  } catch {
    return NextResponse.json({ success: false, error: "Sıralama güncellenemedi" }, { status: 500 });
  }
}
