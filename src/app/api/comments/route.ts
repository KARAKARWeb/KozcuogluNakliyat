import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const DATA_DIR = path.join(process.cwd(), "data");
const COMMENTS_FILE = path.join(DATA_DIR, "comments.json");

interface Comment {
  id: string;
  itemId: string;
  itemType: "blog" | "service" | "solution";
  author: string;
  email: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
  likes: number;
  isSpam: boolean;
  replies: Comment[];
}

function getComments(): Comment[] {
  if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify([]));
    return [];
  }
  return JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8"));
}

function saveComments(comments: Comment[]) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

// Basit spam filtreleme
function isSpamComment(content: string, email: string): boolean {
  const spamKeywords = ["viagra", "casino", "lottery", "click here", "buy now"];
  const contentLower = content.toLowerCase();
  
  // Spam anahtar kelime kontrolü
  if (spamKeywords.some(keyword => contentLower.includes(keyword))) {
    return true;
  }
  
  // Çok fazla link kontrolü
  const linkCount = (content.match(/https?:\/\//g) || []).length;
  if (linkCount > 3) {
    return true;
  }
  
  // Çok kısa veya çok uzun yorum
  if (content.length < 10 || content.length > 5000) {
    return true;
  }
  
  return false;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const itemId = searchParams.get("itemId");
    const itemType = searchParams.get("itemType");
    const approved = searchParams.get("approved");

    let comments = getComments();

    // Filtrele
    if (itemId) {
      comments = comments.filter((c) => c.itemId === itemId);
    }
    if (itemType) {
      comments = comments.filter((c) => c.itemType === itemType);
    }
    if (approved === "true") {
      comments = comments.filter((c) => c.isApproved);
    }

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { success: false, error: "Yorumlar alınamadı" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, itemType, author, email, content } = body;

    if (!itemId || !itemType || !author || !email || !content) {
      return NextResponse.json(
        { success: false, error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    // Spam kontrolü
    const isSpam = isSpamComment(content, email);

    const newComment: Comment = {
      id: uuidv4(),
      itemId,
      itemType,
      author,
      email,
      content,
      createdAt: new Date().toISOString(),
      isApproved: !isSpam, // Spam değilse otomatik onayla
      likes: 0,
      isSpam,
      replies: [],
    };

    const comments = getComments();
    comments.push(newComment);
    saveComments(comments);

    // Bildirim oluştur (spam değilse)
    if (!isSpam) {
      const notificationsPath = path.join(DATA_DIR, "notifications.json");
      if (fs.existsSync(notificationsPath)) {
        const notifications = JSON.parse(fs.readFileSync(notificationsPath, "utf-8"));
        notifications.push({
          id: uuidv4(),
          type: "comment",
          title: "Yeni Yorum",
          message: `${author} bir yorum yaptı`,
          timestamp: new Date().toISOString(),
          read: false,
        });
        fs.writeFileSync(notificationsPath, JSON.stringify(notifications, null, 2));
      }
    }

    return NextResponse.json({
      success: true,
      data: newComment,
      message: isSpam
        ? "Yorumunuz spam olarak işaretlendi ve incelemeye alındı"
        : "Yorumunuz başarıyla gönderildi",
    });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { success: false, error: "Yorum gönderilemedi" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isApproved, likes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Yorum ID gerekli" },
        { status: 400 }
      );
    }

    const comments = getComments();
    const commentIndex = comments.findIndex((c) => c.id === id);

    if (commentIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Yorum bulunamadı" },
        { status: 404 }
      );
    }

    if (typeof isApproved === "boolean") {
      comments[commentIndex].isApproved = isApproved;
    }
    if (typeof likes === "number") {
      comments[commentIndex].likes = likes;
    }

    saveComments(comments);

    return NextResponse.json({
      success: true,
      data: comments[commentIndex],
    });
  } catch (error) {
    console.error("Update comment error:", error);
    return NextResponse.json(
      { success: false, error: "Yorum güncellenemedi" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Yorum ID gerekli" },
        { status: 400 }
      );
    }

    const comments = getComments();
    const filteredComments = comments.filter((c) => c.id !== id);

    if (comments.length === filteredComments.length) {
      return NextResponse.json(
        { success: false, error: "Yorum bulunamadı" },
        { status: 404 }
      );
    }

    saveComments(filteredComments);

    return NextResponse.json({
      success: true,
      message: "Yorum silindi",
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    return NextResponse.json(
      { success: false, error: "Yorum silinemedi" },
      { status: 500 }
    );
  }
}
