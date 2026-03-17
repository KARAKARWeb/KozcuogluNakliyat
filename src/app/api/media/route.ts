import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";

interface MediaItem {
  url: string;
  name: string;
  folder: string;
  size: number;
  modified: string;
}

async function scanDir(dir: string, folder: string): Promise<MediaItem[]> {
  const items: MediaItem[] = [];
  try {
    const files = await readdir(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".gif"].includes(ext)) continue;
      const filePath = path.join(dir, file);
      const s = await stat(filePath);
      items.push({
        url: `/uploads/${folder}/${file}`,
        name: file,
        folder,
        size: s.size,
        modified: s.mtime.toISOString(),
      });
    }
  } catch {
    // dizin yoksa boş dön
  }
  return items;
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const uploadsRoot = path.join(process.cwd(), "public", "uploads");
  const folders = ["general", "regions", "services", "solutions", "blog", "gallery", "fleet", "clients"];

  const all: MediaItem[] = [];
  for (const folder of folders) {
    const items = await scanDir(path.join(uploadsRoot, folder), folder);
    all.push(...items);
  }

  all.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());

  return NextResponse.json({ success: true, data: all });
}

export async function DELETE(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { url } = await req.json();
    if (!url || !url.startsWith("/uploads/")) {
      return NextResponse.json({ success: false, error: "Geçersiz dosya yolu" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", url);
    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Dosya silinemedi" }, { status: 500 });
  }
}
