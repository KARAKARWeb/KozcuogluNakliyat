import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Campaign } from "@/types";

export async function GET() {
  try {
    const campaigns = await readData<Campaign[]>("campaigns.json");
    const sorted = campaigns.sort((a, b) => a.order - b.order);
    return NextResponse.json({ success: true, data: sorted });
  } catch {
    return NextResponse.json({ success: false, error: "Kampanyalar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const campaigns = await readData<Campaign[]>("campaigns.json");

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      title: body.title,
      slug: body.slug || "",
      description: body.description || "",
      content: body.content || "",
      image: body.image || "",
      discountType: body.discountType || "percentage",
      discountValue: body.discountValue || 0,
      validFrom: body.validFrom || new Date().toISOString(),
      validThrough: body.validThrough || "",
      isActive: true,
      order: campaigns.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    campaigns.push(newCampaign);
    await writeData("campaigns.json", campaigns);
    return NextResponse.json({ success: true, data: newCampaign }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Kampanya eklenemedi" }, { status: 500 });
  }
}
