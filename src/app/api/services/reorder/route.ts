import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Service } from "@/types";

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { orderedIds } = await req.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ success: false, error: "orderedIds dizisi gerekli" }, { status: 400 });
    }

    const services = await readData<Service[]>("services.json");

    for (let i = 0; i < orderedIds.length; i++) {
      const service = services.find((s) => s.id === orderedIds[i]);
      if (service) {
        service.order = i + 1;
        service.updatedAt = new Date().toISOString();
      }
    }

    await writeData("services.json", services);
    return NextResponse.json({ success: true, message: "Sıralama güncellendi" });
  } catch {
    return NextResponse.json({ success: false, error: "Sıralama güncellenemedi" }, { status: 500 });
  }
}
