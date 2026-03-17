import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import type { Page } from "@/types";

export async function GET() {
  try {
    const pages = await readData<Page[]>("pages.json");
    return NextResponse.json({ success: true, data: pages });
  } catch {
    return NextResponse.json({ success: false, error: "Sayfalar yüklenemedi" }, { status: 500 });
  }
}
