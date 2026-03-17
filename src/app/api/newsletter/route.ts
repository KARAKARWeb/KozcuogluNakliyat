import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter.json");

interface NewsletterSubscriber {
  id: string;
  email: string;
  source: string;
  subscribedAt: string;
  isActive: boolean;
}

function getSubscribers(): NewsletterSubscriber[] {
  if (!fs.existsSync(NEWSLETTER_FILE)) {
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify([]));
    return [];
  }
  return JSON.parse(fs.readFileSync(NEWSLETTER_FILE, "utf-8"));
}

function saveSubscribers(subscribers: NewsletterSubscriber[]) {
  fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));
}

export async function GET() {
  try {
    const subscribers = getSubscribers();
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error) {
    console.error("Get subscribers error:", error);
    return NextResponse.json(
      { success: false, error: "Aboneler alınamadı" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source = "website" } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "E-posta gerekli" },
        { status: 400 }
      );
    }

    const subscribers = getSubscribers();

    // Check if already subscribed
    const existing = subscribers.find((s) => s.email === email);
    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { success: false, error: "Bu e-posta zaten kayıtlı" },
          { status: 400 }
        );
      } else {
        // Reactivate
        existing.isActive = true;
        existing.subscribedAt = new Date().toISOString();
        saveSubscribers(subscribers);
        return NextResponse.json({
          success: true,
          message: "Aboneliğiniz yeniden aktif edildi",
        });
      }
    }

    // Add new subscriber
    const newSubscriber: NewsletterSubscriber = {
      id: `sub_${Date.now()}`,
      email,
      source,
      subscribedAt: new Date().toISOString(),
      isActive: true,
    };

    subscribers.push(newSubscriber);
    saveSubscribers(subscribers);

    // Track in analytics
    if (typeof global !== "undefined") {
      // Log for server-side tracking
      console.log("Newsletter signup:", { email, source });
    }

    return NextResponse.json({
      success: true,
      message: "Başarıyla abone oldunuz",
      data: newSubscriber,
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { success: false, error: "Abonelik işlemi başarısız" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, error: "E-posta gerekli" },
        { status: 400 }
      );
    }

    const subscribers = getSubscribers();
    const subscriber = subscribers.find((s) => s.email === email);

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: "Abone bulunamadı" },
        { status: 404 }
      );
    }

    subscriber.isActive = false;
    saveSubscribers(subscribers);

    return NextResponse.json({
      success: true,
      message: "Abonelikten çıkıldı",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Abonelikten çıkma işlemi başarısız" },
      { status: 500 }
    );
  }
}
