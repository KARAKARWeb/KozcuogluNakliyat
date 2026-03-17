import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readData, writeData } from "@/lib/db";
import type { Policy } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const policies = await readData<Policy[]>("policies.json");
    const policy = policies.find((p) => p.id === id);
    
    if (!policy) {
      return NextResponse.json({ success: false, error: "Politika bulunamadı" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: policy });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const policies = await readData<Policy[]>("policies.json");
    const index = policies.findIndex((p) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Politika bulunamadı" }, { status: 404 });
    }
    
    policies[index] = {
      ...policies[index],
      ...body,
      id: id,
      updatedAt: new Date().toISOString(),
    };
    
    await writeData("policies.json", policies);
    
    return NextResponse.json({ success: true, data: policies[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
