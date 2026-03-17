import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { writeFile, mkdir, access } from "fs/promises";
import path from "path";
import { slugify } from "@/lib/slugify";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024;

async function fileExists(filePath: string): Promise<boolean> {
  try { await access(filePath); return true; } catch { return false; }
}

async function uniqueFileName(dir: string, baseName: string, ext: string): Promise<string> {
  let name = `${baseName}.${ext}`;
  if (!(await fileExists(path.join(dir, name)))) return name;
  let i = 1;
  while (await fileExists(path.join(dir, `${baseName}-${i}.${ext}`))) i++;
  return `${baseName}-${i}.${ext}`;
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ success: false, error: "Dosya gerekli" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Desteklenmeyen dosya tipi" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: "Dosya 5MB'dan büyük olamaz" }, { status: 400 });
    }

    const ext = file.type === "image/svg+xml" ? "svg" : "webp";
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const seoName = slugify(originalName);

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    const fileName = await uniqueFileName(uploadDir, seoName, ext);
    const buffer = Buffer.from(await file.arrayBuffer());

    if (ext === "webp" && file.type !== "image/webp" && file.type !== "image/svg+xml") {
      try {
        const sharp = (await import("sharp")).default;
        const webpBuffer = await sharp(buffer)
          .webp({ quality: 85 })
          .resize({ width: 1920, withoutEnlargement: true })
          .toBuffer();
        await writeFile(path.join(uploadDir, fileName), webpBuffer);
      } catch {
        await writeFile(path.join(uploadDir, fileName), buffer);
      }
    } else {
      await writeFile(path.join(uploadDir, fileName), buffer);
    }

    const url = `/uploads/${folder}/${fileName}`;

    return NextResponse.json({
      success: true,
      data: { url, fileName, folder, size: file.size },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Dosya yüklenemedi" }, { status: 500 });
  }
}
