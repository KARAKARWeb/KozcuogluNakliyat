import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Client } from "@/types";

export async function GET() {
  try {
    const clients = await readData<Client[]>("clients.json");
    const active = clients.filter((c) => c.isActive).sort((a, b) => a.order - b.order);
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Müşteriler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const clients = await readData<Client[]>("clients.json");

    const newClient: Client = {
      id: Date.now().toString(),
      name: body.name,
      logo: body.logo || "",
      website: body.website || "",
      isActive: true,
      order: clients.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    clients.push(newClient);
    await writeData("clients.json", clients);
    return NextResponse.json({ success: true, data: newClient }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Müşteri eklenemedi" }, { status: 500 });
  }
}
