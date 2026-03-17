import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface FooterData {
  ctaBar: { title: string; description: string; button1Text: string; button1Link: string; button2Text: string; button2Link: string };
  company: { name: string; description: string };
  copyright: string;
  legalLinks: { label: string; href: string }[];
  regionsTitle: string;
}

export async function GET() {
  try {
    const data = await readData<FooterData>("footer.json");
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: "Footer yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    await writeData("footer.json", body);
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: false, error: "Footer güncellenemedi" }, { status: 500 });
  }
}
