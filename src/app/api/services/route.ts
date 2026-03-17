import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slugify";
import { isSlugUnique } from "@/lib/slug-check";
import { logActivity } from "@/lib/activity-logger";
import type { Service } from "@/types";

export async function GET() {
  try {
    const services = await readData<Service[]>("services.json");
    const active = services.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
    return NextResponse.json({ success: true, data: active });
  } catch {
    return NextResponse.json({ success: false, error: "Hizmetler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const services = await readData<Service[]>("services.json");

    const slug = body.slug || slugify(body.title);
    const unique = await isSlugUnique(slug, "service");
    if (!unique) {
      return NextResponse.json({ success: false, error: "Bu slug zaten kullanılıyor" }, { status: 400 });
    }

    const newService: Service = {
      id: Date.now().toString(),
      title: body.title,
      slug,
      category: body.category || "bireysel",
      description: body.description || "",
      shortDescription: body.shortDescription || "",
      image: body.image || "",
      icon: body.icon || "Package",
      content: body.content || "",
      seo: body.seo || { title: "", description: "", ogImage: "", robots: "index, follow", canonical: "" },
      schemas: body.schemas || ["Service", "BreadcrumbList"],
      faq: body.faq || [],
      pricingModuleId: body.pricingModuleId || null,
      order: services.length + 1,
      isActive: true,
      showOnHomepage: body.showOnHomepage !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    services.push(newService);
    await writeData("services.json", services);
    await logActivity("create", "service", newService.id, `Yeni hizmet: ${newService.title}`);

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Hizmet eklenemedi" }, { status: 500 });
  }
}
