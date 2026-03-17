import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Solution } from "@/types";

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { orderedIds } = await req.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ success: false, error: "orderedIds dizisi gerekli" }, { status: 400 });
    }

    const solutions = await readData<Solution[]>("solutions.json");
    for (let i = 0; i < orderedIds.length; i++) {
      const solution = solutions.find((s) => s.id === orderedIds[i]);
      if (solution) {
        solution.order = i + 1;
        solution.updatedAt = new Date().toISOString();
      }
    }

    await writeData("solutions.json", solutions);
    return NextResponse.json({ success: true, message: "Sıralama güncellendi" });
  } catch {
    return NextResponse.json({ success: false, error: "Sıralama güncellenemedi" }, { status: 500 });
  }
}
