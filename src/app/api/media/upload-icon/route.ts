import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const filePath = formData.get("path") as string | null;

    if (!file || !filePath) {
      return NextResponse.json({ success: false, error: "Dosya ve yol gerekli" }, { status: 400 });
    }

    if (!filePath.startsWith("/icons/") && !filePath.startsWith("/uploads/")) {
      return NextResponse.json({ success: false, error: "Geçersiz yükleme yolu" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dest = path.join(process.cwd(), "public", filePath);
    await writeFile(dest, buffer);

    return NextResponse.json({ success: true, message: "İkon yüklendi" });
  } catch {
    return NextResponse.json({ success: false, error: "Yükleme başarısız" }, { status: 500 });
  }
}
