import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import type { Policy } from "@/types";

export async function GET() {
  try {
    const policies = await readData<Policy[]>("policies.json");
    return NextResponse.json({ success: true, data: policies });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
