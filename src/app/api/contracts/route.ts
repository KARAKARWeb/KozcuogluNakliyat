import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slugify";
import { isSlugUnique } from "@/lib/slug-check";
import type { Contract } from "@/types";

export async function GET() {
  try {
    const contracts = await readData<Contract[]>("contracts.json");
    const active = contracts.filter((c) => c.isActive).sort((a, b) => a.order - b.order);
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Sözleşmeler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const contracts = await readData<Contract[]>("contracts.json");

    const slug = body.slug || slugify(body.title);
    const unique = await isSlugUnique(slug, "contract");
    if (!unique) {
      return NextResponse.json({ success: false, error: "Bu slug zaten kullanılıyor" }, { status: 400 });
    }

    const newContract: Contract = {
      id: Date.now().toString(),
      title: body.title,
      slug,
      content: body.content || "",
      seo: body.seo || { title: "", description: "", ogImage: "", robots: "index, follow", canonical: "" },
      isActive: true,
      order: contracts.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    contracts.push(newContract);
    await writeData("contracts.json", contracts);
    return NextResponse.json({ success: true, data: newContract }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Sözleşme eklenemedi" }, { status: 500 });
  }
}
