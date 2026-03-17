import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slugify";
import { isSlugUnique } from "@/lib/slug-check";
import type { Region } from "@/types";

export async function GET() {
  try {
    const regions = await readData<Region[]>("regions.json");
    const active = regions.filter((r) => r.isActive).sort((a, b) => a.order - b.order);
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Bölgeler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const regions = await readData<Region[]>("regions.json");

    const slug = body.slug || slugify(body.title);
    const unique = await isSlugUnique(slug, "region");
    if (!unique) {
      return NextResponse.json({ success: false, error: "Bu slug zaten kullanılıyor" }, { status: 400 });
    }

    const newRegion: Region = {
      id: Date.now().toString(),
      title: body.title,
      slug,
      district: body.district || "",
      city: body.city || "İstanbul",
      type: body.type || "district",
      description: body.description || "",
      content: body.content || "",
      image: body.image || "",
      geo: body.geo || { latitude: 0, longitude: 0 },
      seo: body.seo || { title: "", description: "", ogImage: "", robots: "index, follow", canonical: "" },
      faq: body.faq || [],
      order: regions.length + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    regions.push(newRegion);
    await writeData("regions.json", regions);
    return NextResponse.json({ success: true, data: newRegion }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Bölge eklenemedi" }, { status: 500 });
  }
}
