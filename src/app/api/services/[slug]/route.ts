import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/db";
import type { Service } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const services = await readData<Service[]>("services.json");
    const service = services.find((s) => s.slug === slug && s.isActive);

    if (!service) {
      return NextResponse.json({ success: false, error: "Hizmet bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: service });
  } catch {
    return NextResponse.json({ success: false, error: "Hizmet yüklenemedi" }, { status: 500 });
  }
}
