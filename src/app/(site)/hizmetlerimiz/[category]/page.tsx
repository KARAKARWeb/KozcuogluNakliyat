import { notFound } from "next/navigation";
import Link from "next/link";
import { readData } from "@/lib/db";
import type { Service, Settings } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/schemas";
import { Truck, ChevronRight, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

async function getSettings() {
  return readData<Settings>("settings.json");
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const settings = await getSettings();
  const cat = (settings.serviceCategories || []).find((c) => c.slug === category);
  if (!cat) return { title: "Sayfa Bulunamadı" };
  return {
    title: cat.name,
    description: `Kozcuoğlu Nakliyat ${cat.description}`,
    alternates: { canonical: `/hizmetlerimiz/${category}` },
    openGraph: {
      title: cat.name,
      description: `Kozcuoğlu Nakliyat ${cat.description}`,
      url: `/hizmetlerimiz/${category}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const settings = await getSettings();
  return (settings.serviceCategories || []).map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const [services, settings] = await Promise.all([
    readData<Service[]>("services.json"),
    getSettings(),
  ]);
  const cat = (settings.serviceCategories || []).find((c) => c.slug === category);
  if (!cat) notFound();

  const filtered = services
    .filter((s) => s.isActive && s.category === cat.id)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <JsonLd data={[
        itemListSchema(cat.name, filtered.map((s) => ({ name: s.title, url: `/${s.slug}` }))),
        breadcrumbSchema([
          { name: "Kozcuoğlu Nakliyat", url: "/" },
          { name: "Hizmetlerimiz", url: "/hizmetlerimiz" },
          { name: cat.name },
        ]),
      ]} />
      {/* Hero */}
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{cat.name}</h1>
          <p className="mt-3 max-w-2xl text-gray-300">{cat.description}</p>
          <Breadcrumb items={[{ label: "Hizmetlerimiz", href: "/hizmetlerimiz" }, { label: cat.name }]} />
        </div>
      </section>

      {/* Hizmet Kartları */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Bu kategoride henüz hizmet eklenmemiş.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
              {filtered.map((s) => (
                <Link key={s.id} href={`/${s.slug}`} className="group rounded-xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fef2f2] text-[#e3000f]">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#122032] group-hover:text-[#e3000f]">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description.slice(0, 150)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#e3000f]">
                    Detaylı Bilgi <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
