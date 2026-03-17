import Link from "next/link";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { Calculator, TrendingUp, Home, Building2, Truck, Package } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import { readData } from "@/lib/db";
import type { Metadata } from "next";

interface PricingPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  prices: { title: string; price: string; description?: string }[];
  factors?: { title: string; description: string }[];
  isActive: boolean;
}

async function getPricingPageBySlug(slug: string) {
  try {
    const pages = await readData<PricingPage[]>("pricing-pages.json");
    return pages.find(p => p.slug === slug && p.isActive);
  } catch {
    return null;
  }
}

const DEFAULT_FACTORS = [
  "Taşınacak eşya miktarı ve hacmi",
  "Taşıma mesafesi (şehir içi / şehirler arası)",
  "Kat yüksekliği ve asansör durumu",
  "Paketleme ve ambalajlama hizmeti",
  "Sigorta kapsamı",
  "Taşıma günü ve saati (hafta içi / hafta sonu)",
  "Özel eşya (piyano, antika, sanat eseri vb.)",
  "Depolama ihtiyacı",
];

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("evden-eve-nakliyat-fiyatlari");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Evden Eve Nakliyat Fiyatları 2026",
    description: seo?.description || "2026 güncel evden eve nakliyat fiyatları. İstanbul şehir içi ve şehirler arası nakliyat fiyat listesi.",
    alternates: { canonical: "/evden-eve-nakliyat-fiyatlari" },
    openGraph: {
      title: seo?.title || "Evden Eve Nakliyat Fiyatları 2026",
      description: seo?.description || "2026 güncel evden eve nakliyat fiyatları. İstanbul şehir içi ve şehirler arası nakliyat fiyat listesi.",
      url: "/evden-eve-nakliyat-fiyatlari",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function EvdenEveNakliyatFiyatlariPage() {
  const pageData = await getPageData("evden-eve-nakliyat-fiyatlari");
  const pricingPage = await getPricingPageBySlug("evden-eve-nakliyat-fiyatlari");
  
  const priceRanges = pricingPage?.prices || [];
  const factors = pricingPage?.factors?.map(f => f.description) || DEFAULT_FACTORS;
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Fiyatlarımız", url: "/fiyatlarimiz" }, { name: "Evden Eve Nakliyat Fiyatları" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pricingPage?.title || pageData?.sections?.hero?.title || "Evden Eve Nakliyat Fiyatları 2026"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pricingPage?.description || pageData?.sections?.hero?.content || "İstanbul ve tüm Türkiye için güncel nakliyat fiyat listesi"}</p>

          <Breadcrumb items={[{ label: "Fiyatlarımız", href: "/fiyatlarimiz" }, { label: "Evden Eve Nakliyat Fiyatları" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-[#122032]">2026 Güncel Fiyat Aralıkları</h2>
            <p className="mt-3 text-muted-foreground">Aşağıdaki fiyatlar ortalama değerlerdir. Kesin fiyat için ücretsiz keşif talep edin.</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {priceRanges.length > 0 ? (
              priceRanges.map((p, idx) => (
                <div key={idx} className="rounded-xl border p-5 transition hover:border-[#e3000f]/30 hover:shadow-md">
                  <Home className="h-8 w-8 text-[#e3000f]" />
                  <h3 className="mt-3 font-bold text-[#122032]">{p.title}</h3>
                  <p className="mt-1 text-lg font-semibold text-[#e3000f]">{p.price}</p>
                  {p.description && <p className="mt-2 text-xs text-muted-foreground">{p.description}</p>}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                <p>Fiyat bilgisi henüz eklenmemiş.</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href="/nakliyat-fiyat-hesaplama" className="inline-flex items-center gap-2 rounded-lg bg-[#e3000f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#c5000d]">
              <Calculator className="h-4 w-4" />
              Online Fiyat Hesapla
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-[#122032]">
              <TrendingUp className="mr-2 inline h-6 w-6 text-[#e3000f]" />
              Fiyatı Etkileyen Faktörler
            </h2>
            <ul className="mt-6 space-y-3">
              {factors.map((f, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e3000f]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 text-center md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#122032]">Ücretsiz Keşif ve Fiyat Teklifi</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            En doğru fiyat bilgisi için ücretsiz keşif hizmetimizden yararlanın. Uzman ekibimiz eşyalarınızı yerinde değerlendirerek size özel fiyat teklifi sunar.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="tel:4447436" className="rounded-lg border border-[#122032] px-6 py-3 text-sm font-medium text-[#122032] transition hover:bg-[#122032] hover:text-white">
              444 7 436
            </a>
            <Link href="/iletisim" className="rounded-lg bg-[#e3000f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#c5000d]">
              Ücretsiz Keşif Talep Et
            </Link>
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
