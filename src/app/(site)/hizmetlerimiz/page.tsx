import Link from "next/link";
import { readData } from "@/lib/db";
import type { Service, Settings } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/schemas";
import { Home, Building2, Package, ChevronRight, ArrowRight, Truck } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

const ICON_MAP: Record<string, typeof Home> = { Home, Building2, Package, Truck };
const COLOR_CYCLE = [
  "bg-blue-50 text-blue-600",
  "bg-emerald-50 text-emerald-600",
  "bg-amber-50 text-amber-600",
  "bg-violet-50 text-violet-600",
  "bg-rose-50 text-rose-600",
];

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("hizmetlerimiz");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Hizmetlerimiz",
    description: seo?.description || "Kozcuoğlu Nakliyat profesyonel nakliyat hizmetleri. Bireysel, kurumsal ve özel taşımacılık çözümleri.",
    alternates: { canonical: "/hizmetlerimiz" },
    openGraph: {
      title: seo?.title || "Hizmetlerimiz",
      description: seo?.description || "Kozcuoğlu Nakliyat profesyonel nakliyat hizmetleri. Bireysel, kurumsal ve özel taşımacılık çözümleri.",
      url: "/hizmetlerimiz",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function HizmetlerimizPage() {
  const [services, settings, pageData] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Settings>("settings.json"),
    getPageData("hizmetlerimiz"),
  ]);
  const active = services.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
  const cats = settings.serviceCategories || [];

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://kozcuoglunakliyat.com.tr/hizmetlerimiz#webpage",
        name: pageData?.sections?.hero?.title || "Hizmetlerimiz",
        description: pageData?.sections?.hero?.content || "Profesyonel nakliyat ve taşıma hizmetlerimiz",
        url: "https://kozcuoglunakliyat.com.tr/hizmetlerimiz",
        isPartOf: { "@id": "https://kozcuoglunakliyat.com.tr/#website" },
        about: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        publisher: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        inLanguage: "tr",
        mainEntity: { "@id": "https://kozcuoglunakliyat.com.tr/hizmetlerimiz#itemlist" },
      },
      {
        "@type": "ItemList",
        "@id": "https://kozcuoglunakliyat.com.tr/hizmetlerimiz#itemlist",
        name: "Nakliyat Hizmetlerimiz",
        description: "Kozcuoğlu Nakliyat hizmet kategorileri",
        numberOfItems: cats.length,
        itemListElement: cats.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Service",
            "@id": `https://kozcuoglunakliyat.com.tr/hizmetlerimiz/${c.slug}#service`,
            name: c.name,
            description: c.description,
            url: `https://kozcuoglunakliyat.com.tr/hizmetlerimiz/${c.slug}`,
            provider: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
            serviceType: c.name,
            category: "Nakliyat Hizmetleri",
          },
        })),
      },
      breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Hizmetlerimiz" }]),
    ],
  };

  return (
    <>
      <JsonLd data={schemas} />
      {/* Hero */}
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Hizmetlerimiz"}</h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            {pageData?.sections?.hero?.content || "Profesyonel nakliyat ve taşıma hizmetlerimiz ile güvenli, sigortalı ve zamanında teslimat garantisi sunuyoruz."}
          </p>
          <Breadcrumb items={[{ label: "Hizmetlerimiz" }]} />
        </div>
      </section>

      {/* Kategori Kartları */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {cats.map((cat, idx) => {
              const Icon = ICON_MAP[cat.icon] || Package;
              const color = COLOR_CYCLE[idx % COLOR_CYCLE.length];
              const count = active.filter((s) => s.category === cat.id).length;
              return (
                <Link key={cat.id} href={`/hizmetlerimiz/${cat.slug}`} className="group flex flex-col rounded-2xl border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h2 className="text-xl font-bold text-[#122032] group-hover:text-[#e3000f]">{cat.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t py-5">
                    <span className="text-xs font-medium text-muted-foreground">{count} hizmet</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#e3000f]">
                      Görüntüle <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {pageData?.sections?.seoText?.content && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
            <div className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline" dangerouslySetInnerHTML={{ __html: pageData.sections.seoText.content }} />
          </div>
        </section>
      )}
    </>
  );
}
