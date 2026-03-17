import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { User } from "@/types";

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: "Tum alanlar zorunlu" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, error: "Sifre en az 6 karakter olmali" }, { status: 400 });
    }

    const users = await readData<User[]>("users.json");
    const user = users[0];

    if (!user) {
      return NextResponse.json({ success: false, error: "Kullanici bulunamadi" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ success: false, error: "Mevcut sifre hatali" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    users[0] = { ...users[0], password: hashedPassword };
    await writeData("users.json", users);

    return NextResponse.json({ success: true, message: "Sifre basariyla degistirildi" });
  } catch {
    return NextResponse.json({ success: false, error: "Sifre degistirilemedi" }, { status: 500 });
  }
}
