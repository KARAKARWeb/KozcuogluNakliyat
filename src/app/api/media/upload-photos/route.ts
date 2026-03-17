import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, stat, rm } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const ALLOWED_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 20;
const QUOTES_DIR = path.join(process.cwd(), "public", "uploads", "quotes");
const RETENTION_DAYS = 30;

function isImageBuffer(buf: Buffer): boolean {
  if (buf.length < 4) return false;
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return true;
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return true;
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46) return true;
  return false;
}

async function cleanOldQuotePhotos() {
  try {
    const folders = await readdir(QUOTES_DIR);
    const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
    for (const folder of folders) {
      const folderPath = path.join(QUOTES_DIR, folder);
      const s = await stat(folderPath);
      if (s.isDirectory() && s.mtimeMs < cutoff) {
        await rm(folderPath, { recursive: true, force: true });
      }
    }
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("photos") as File[];

    if (!files.length) {
      return NextResponse.json({ success: false, error: "Dosya gerekli" }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json({ success: false, error: `En fazla ${MAX_FILES} fotoğraf yüklenebilir` }, { status: 400 });
    }

    const folder = `quotes/${new Date().toISOString().slice(0, 10)}`;
    const dir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(dir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) continue;
      if (!ALLOWED_TYPES.includes(file.type)) continue;

      const ext = path.extname(file.name).toLowerCase() || ".jpg";
      if (!ALLOWED_EXTS.includes(ext)) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      if (!isImageBuffer(buffer)) continue;

      const safeName = `${randomUUID().slice(0, 12)}${ext}`;
      const dest = path.join(dir, safeName);
      await writeFile(dest, buffer);
      urls.push(`/uploads/${folder}/${safeName}`);
    }

    cleanOldQuotePhotos().catch(() => {});

    return NextResponse.json({ success: true, urls });
  } catch {
    return NextResponse.json({ success: false, error: "Yükleme başarısız" }, { status: 500 });
  }
}
