import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  return null;
}

export async function getSession() {
  return getServerSession(authOptions);
}
