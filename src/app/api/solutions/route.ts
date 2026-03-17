import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slugify";
import { isSlugUnique } from "@/lib/slug-check";
import type { Solution } from "@/types";

export async function GET() {
  try {
    const solutions = await readData<Solution[]>("solutions.json");
    const active = solutions.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Çözümler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const solutions = await readData<Solution[]>("solutions.json");

    const slug = body.slug || slugify(body.title);
    const unique = await isSlugUnique(slug, "solution");
    if (!unique) {
      return NextResponse.json({ success: false, error: "Bu slug zaten kullanılıyor" }, { status: 400 });
    }

    const newSolution: Solution = {
      id: Date.now().toString(),
      title: body.title,
      slug,
      description: body.description || "",
      shortDescription: body.shortDescription || "",
      image: body.image || "",
      icon: body.icon || "Wrench",
      content: body.content || "",
      seo: body.seo || { title: "", description: "", ogImage: "", robots: "index, follow", canonical: "" },
      schemas: body.schemas || ["Service", "BreadcrumbList"],
      faq: body.faq || [],
      order: solutions.length + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    solutions.push(newSolution);
    await writeData("solutions.json", solutions);

    return NextResponse.json({ success: true, data: newSolution }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Çözüm eklenemedi" }, { status: 500 });
  }
}
