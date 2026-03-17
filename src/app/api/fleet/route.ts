import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Vehicle } from "@/types";

export async function GET() {
  try {
    const fleet = await readData<Vehicle[]>("fleet.json");
    const active = fleet.filter((v) => v.isActive).sort((a, b) => a.order - b.order);
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Araçlar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const fleet = await readData<Vehicle[]>("fleet.json");

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name: body.name,
      type: body.type || "",
      capacity: body.capacity || "",
      description: body.description || "",
      image: body.image || "",
      features: body.features || [],
      isActive: true,
      order: fleet.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    fleet.push(newVehicle);
    await writeData("fleet.json", fleet);
    return NextResponse.json({ success: true, data: newVehicle }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Araç eklenemedi" }, { status: 500 });
  }
}
