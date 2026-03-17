import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { InternalLink } from "@/types";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const links = await readData<InternalLink[]>("internal-links.json");
    return NextResponse.json({ success: true, data: links });
  } catch {
    return NextResponse.json({ success: false, error: "İç linkler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const links = await readData<InternalLink[]>("internal-links.json");

    const newLink: InternalLink = {
      id: Date.now().toString(),
      keyword: body.keyword,
      targetUrl: body.targetUrl,
      maxLinks: body.maxLinks || 3,
      style: body.style || "text",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    links.push(newLink);
    await writeData("internal-links.json", links);
    return NextResponse.json({ success: true, data: newLink }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Kural eklenemedi" }, { status: 500 });
  }
}
