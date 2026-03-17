import Link from "next/link";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema, pricingPageSchema } from "@/lib/schemas";
import { ArrowRight } from "lucide-react";
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
  isActive: boolean;
}

async function getPricingPages() {
  try {
    const pages = await readData<PricingPage[]>("pricing-pages.json");
    return pages.filter(p => p.isActive);
  } catch {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("fiyatlarimiz");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Nakliyat Fiyatları",
    description: seo?.description || "İstanbul nakliyat fiyatları. Online fiyat hesaplama, şeffaf fiyatlandırma. Hemen teklif alın.",
    alternates: { canonical: "/fiyatlarimiz" },
    openGraph: {
      title: seo?.title || "Nakliyat Fiyatları",
      description: seo?.description || "İstanbul nakliyat fiyatları. Online fiyat hesaplama, şeffaf fiyatlandırma. Hemen teklif alın.",
      url: "/fiyatlarimiz",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function FiyatlarimizPage() {
  const pageData = await getPageData("fiyatlarimiz");
  const pricingPages = await getPricingPages();
  
  const priceCards = pricingPages.flatMap(page => 
    page.prices.slice(0, 1).map(price => ({
      title: price.title,
      range: price.price,
      link: `/${page.slug}`,
      popular: false
    }))
  );
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Fiyatlarımız" }]),
        pricingPageSchema([
          { name: "1+1 Ev Taşıma", lowPrice: "3500", highPrice: "6000" },
          { name: "2+1 Ev Taşıma", lowPrice: "5000", highPrice: "9000" },
          { name: "3+1 Ev Taşıma", lowPrice: "7000", highPrice: "13000" },
          { name: "4+1 Ev Taşıma", lowPrice: "10000", highPrice: "18000" },
          { name: "Villa Taşıma", lowPrice: "15000", highPrice: "30000" },
          { name: "Ofis Taşıma", lowPrice: "5000", highPrice: "20000" },
        ]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Nakliyat Fiyatları"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Şeffaf fiyatlandırma ile nakliyat maliyetinizi hemen öğrenin"}</p>

          <Breadcrumb items={[{ label: "Fiyatlarımız" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032]">Ev Taşıma Fiyatları</h2>
            <p className="mt-2 text-muted-foreground">Fiyatlar mesafe, kat ve eşya miktarına göre değişiklik gösterebilir</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {priceCards.length > 0 ? (
              priceCards.map((card, idx) => (
                <div key={idx} className={`relative rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg ${card.popular ? "border-[#e3000f]" : ""}`}>
                  {card.popular && (
                    <span className="absolute -top-3 left-4 rounded-full bg-[#e3000f] px-3 py-0.5 text-xs font-bold text-white">Popüler</span>
                  )}
                  <h3 className="text-lg font-semibold text-[#122032]">{card.title}</h3>
                  <p className="mt-3 text-2xl font-bold text-[#e3000f]">{card.range}</p>
                  <Link href={card.link} className="mt-4 block rounded-lg border border-[#e3000f] py-2.5 text-center text-sm font-medium text-[#e3000f] transition hover:bg-[#e3000f] hover:text-white">
                    Detaylı Bilgi
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                <p>Henüz fiyat bilgisi eklenmemiş.</p>
                <Link href="/nakliyat-fiyat-hesaplama" className="mt-4 inline-block text-[#e3000f] hover:underline">
                  Fiyat Hesaplama Aracını Kullanın →
                </Link>
              </div>
            )}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            * Fiyatlar tahmini olup, kesin fiyat için ücretsiz keşif talep ediniz.
          </p>
        </div>
      </section>

      <section className="bg-[#e3000f] py-12 text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 text-center md:flex-row md:justify-between md:px-6 md:text-left lg:px-8">
          <div>
            <h2 className="text-xl font-bold">Kesin fiyat için ücretsiz keşif</h2>
            <p className="mt-1 text-sm text-white/80">Adresinize gelerek detaylı fiyat teklifi sunalım</p>
          </div>
          <div className="flex gap-3">
            <a href="tel:4447436" className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-[#e3000f] transition hover:bg-white/90">444 7 436</a>
            <Link href="/iletisim" className="rounded-lg border border-white px-5 py-2.5 text-sm font-medium transition hover:bg-white/10">
              Keşif Talep Et <ArrowRight className="ml-1 inline h-4 w-4" />
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
