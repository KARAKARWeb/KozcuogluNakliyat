import { NextRequest, NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "E-posta adresi gerekli" }, { status: 400 });
    }

    const result = await sendTestEmail(email);

    if (result.success) {
      return NextResponse.json({ success: true, message: "Test e-postası gönderildi" });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Test e-posta hatası:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Bilinmeyen hata" 
    }, { status: 500 });
  }
}
