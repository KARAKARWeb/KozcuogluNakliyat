import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { logActivity } from "@/lib/activity-logger";
import type { Service } from "@/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { slug } = await params;
    const body = await req.json();
    const services = await readData<Service[]>("services.json");
    const index = services.findIndex((s) => s.id === slug || s.slug === slug);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Hizmet bulunamadı" }, { status: 404 });
    }

    services[index] = {
      ...services[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await writeData("services.json", services);
    await logActivity("update", "service", services[index].id, `Hizmet güncellendi: ${services[index].title}`);
    return NextResponse.json({ success: true, data: services[index] });
  } catch {
    return NextResponse.json({ success: false, error: "Hizmet güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { slug } = await params;
    const services = await readData<Service[]>("services.json");
    const filtered = services.filter((s) => s.id !== slug && s.slug !== slug);

    if (filtered.length === services.length) {
      return NextResponse.json({ success: false, error: "Hizmet bulunamadı" }, { status: 404 });
    }

    await writeData("services.json", filtered);
    await logActivity("delete", "service", slug, `Hizmet silindi`);
    return NextResponse.json({ success: true, message: "Hizmet silindi" });
  } catch {
    return NextResponse.json({ success: false, error: "Hizmet silinemedi" }, { status: 500 });
  }
}
