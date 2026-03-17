import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Redirect } from "@/types";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const redirects = await readData<Redirect[]>("redirects.json");
    return NextResponse.json({ success: true, data: redirects });
  } catch {
    return NextResponse.json({ success: false, error: "Yönlendirmeler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const redirects = await readData<Redirect[]>("redirects.json");

    const newRedirect: Redirect = {
      id: Date.now().toString(),
      source: body.source,
      destination: body.destination,
      type: body.type || "301",
      note: body.note || "",
      hitCount: 0,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    redirects.push(newRedirect);
    await writeData("redirects.json", redirects);
    return NextResponse.json({ success: true, data: newRedirect }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Yönlendirme eklenemedi" }, { status: 500 });
  }
}
