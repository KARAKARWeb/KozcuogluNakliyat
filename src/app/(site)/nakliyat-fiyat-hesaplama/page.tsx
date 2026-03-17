import dynamic from "next/dynamic";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { SnippetOptimizedList } from "@/components/site/snippet-optimized-list";
import { SnippetOptimizedTable } from "@/components/site/snippet-optimized-table";
import { Calculator, TrendingUp, Shield, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";

const PricingCalculator = dynamic(() => import("@/components/site/pricing-calculator"), {
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e3000f] border-t-transparent" />
        <p className="text-sm text-muted-foreground">Fiyat hesaplama yükleniyor...</p>
      </div>
    </div>
  ),
});
import { softwareAppSchema, breadcrumbSchema } from "@/lib/schemas";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("nakliyat-fiyat-hesaplama");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Nakliyat Fiyat Hesaplama",
    description: seo?.description || "Online nakliyat fiyat hesaplama aracı. Ev tipi, mesafe ve kat bilgilerine göre tahmini nakliyat fiyatınızı öğrenin.",
    alternates: { canonical: "/nakliyat-fiyat-hesaplama" },
    openGraph: {
      title: seo?.title || "Nakliyat Fiyat Hesaplama",
      description: seo?.description || "Online nakliyat fiyat hesaplama aracı. Ev tipi, mesafe ve kat bilgilerine göre tahmini nakliyat fiyatınızı öğrenin.",
      url: "/nakliyat-fiyat-hesaplama",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function FiyatHesaplamaPage() {
  const pageData = await getPageData("nakliyat-fiyat-hesaplama");
  return (
    <>
      <JsonLd data={[
        softwareAppSchema(),
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Nakliyat Fiyat Hesaplama" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Nakliyat Fiyat Hesaplama"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Online fiyat hesaplama aracı ile tahmini nakliyat maliyetinizi öğrenin"}</p>

          <Breadcrumb items={[{ label: "Nakliyat Fiyat Hesaplama" }]} />
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <PricingCalculator />
        </div>
      </section>

      {/* SEO Makale İçeriği */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {/* Giriş */}
          <article className="prose prose-lg max-w-none" itemScope itemType="https://schema.org/Article">
            <header className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#122032] md:text-4xl" itemProp="headline">
                {typeof pageData?.sections?.article?.title === 'string' ? pageData.sections.article.title : "Nakliyat Fiyatları 2026 - Kapsamlı Rehber"}
              </h2>
              <p className="mt-4 text-lg text-gray-600" itemProp="description">
                {typeof pageData?.sections?.article?.description === 'string' 
                  ? pageData.sections.article.description 
                  : "Evden eve nakliyat fiyatlarını etkileyen faktörler, güncel fiyat aralıkları ve tasarruf ipuçları"}
              </p>
            </header>

            <div itemProp="articleBody">
              {/* Öne Çıkan Bilgi Kutusu */}
              <div className="not-prose mb-12 rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Info className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-bold text-[#122032]">{typeof pageData?.sections?.infoBox?.title === 'string' ? pageData.sections.infoBox.title : "Hızlı Bilgi"}</h3>
                    <p className="leading-relaxed text-gray-700">
                      {typeof pageData?.sections?.infoBox?.content === 'string' ? pageData.sections.infoBox.content : "İstanbul'da ortalama evden eve nakliyat fiyatları 2+1 daire için 5.000-12.000 TL, 3+1 daire için 8.000-18.000 TL arasında değişmektedir."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ana İçerik */}
              <section id="fiyat-etkileyen-faktorler" className="mb-12">
                <h3 className="mb-4 text-2xl font-bold text-[#122032]">{typeof pageData?.sections?.factors?.title === 'string' ? pageData.sections.factors.title : "Nakliyat Fiyatını Etkileyen 8 Temel Faktör"}</h3>
                <p className="mb-6 text-base leading-relaxed text-gray-700">
                  {typeof pageData?.sections?.factors?.description === 'string' ? pageData.sections.factors.description : "Nakliyat maliyeti tek bir faktöre bağlı değildir. Profesyonel nakliyat firmalarının fiyatlandırmasında birçok değişken rol oynar."}
                </p>
              </section>
            </div>
          </article>

          {Array.isArray(pageData?.sections?.factors?.items) && pageData.sections.factors.items.length > 0 && (
            <SnippetOptimizedList
              title={typeof pageData?.sections?.factors?.title === 'string' ? pageData.sections.factors.title : "Nakliyat Fiyatını Etkileyen Faktörler"}
              type="ordered"
              items={pageData.sections.factors.items.filter((item: any) => item && typeof item.title === 'string' && typeof item.description === 'string').map((item: any) => ({
                title: item.title as string,
                description: item.description as string
              }))}
              ctaText="Ücretsiz Fiyat Teklifi Alın"
              ctaLink="/iletisim"
            />
          )}

          {pageData?.sections?.priceTable && Array.isArray(pageData.sections.priceTable.rows) && (
            <SnippetOptimizedTable
              title={typeof pageData.sections.priceTable.title === 'string' ? pageData.sections.priceTable.title : "2026 İstanbul Nakliyat Fiyat Tablosu"}
              caption={typeof pageData.sections.priceTable.caption === 'string' ? pageData.sections.priceTable.caption : "Ortalama fiyatlar, standart hizmet paketi için geçerlidir."}
              headers={Array.isArray(pageData.sections.priceTable.headers) ? pageData.sections.priceTable.headers : ["Ev Tipi", "Eşya Hacmi", "Asansörsüz", "Asansörlü", "Ek Hizmetlerle"]}
              rows={pageData.sections.priceTable.rows}
              ctaText="Kesin Fiyat Teklifi İçin Arayın"
              ctaLink="tel:4447436"
            />
          )}

          {/* Tasarruf İpuçları */}
          <div className="my-12 rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#122032]">{typeof pageData?.sections?.savingTips?.title === 'string' ? pageData.sections.savingTips.title : "Nakliyat Maliyetinden Tasarruf Etmenin 6 Yolu"}</h3>
            </div>
            <ul className="space-y-3">
              {Array.isArray(pageData?.sections?.savingTips?.items) && pageData.sections.savingTips.items.map((tip: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-gray-700"><strong>{typeof tip.title === 'string' ? tip.title : ''}:</strong> {typeof tip.description === 'string' ? tip.description : ''}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Uyarı Kutusu */}
          <div className="my-12 rounded-2xl border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-white p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="mb-2 font-bold text-amber-900">{typeof pageData?.sections?.warning?.title === 'string' ? pageData.sections.warning.title : "Dikkat Edilmesi Gerekenler"}</h4>
                <p className="text-sm leading-relaxed text-amber-800">
                  {typeof pageData?.sections?.warning?.content === 'string' ? pageData.sections.warning.content : "Çok düşük fiyat veren firmalardan uzak durun. Kaliteli hizmet için makul fiyat şarttır. Sigortalı taşımacılık mutlaka tercih edilmelidir."}
                </p>
              </div>
            </div>
          </div>

          {/* SSS */}
          <div className="my-12">
            <h3 className="mb-8 text-center text-3xl font-bold text-[#122032]">{typeof pageData?.sections?.faq?.title === 'string' ? pageData.sections.faq.title : "Sıkça Sorulan Sorular"}</h3>
            <div className="space-y-4">
              {Array.isArray(pageData?.sections?.faq?.items) && pageData.sections.faq.items.map((item: any, i: number) => (
                <details key={i} className="group rounded-xl border-2 bg-white p-6 transition hover:border-[#e3000f]/30" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <summary className="cursor-pointer font-semibold text-[#122032]" itemProp="name">
                    {item.question}
                  </summary>
                  <div className="mt-4 text-gray-600" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p itemProp="text">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#122032] to-[#1a2d47] p-8 text-center text-white md:p-12">
            <Calculator className="mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-3 text-2xl font-bold md:text-3xl">{typeof pageData?.sections?.cta?.title === 'string' ? pageData.sections.cta.title : "Kesin Fiyat Teklifi İçin Bizi Arayın"}</h3>
            <p className="mb-6 text-gray-300">{typeof pageData?.sections?.cta?.description === 'string' ? pageData.sections.cta.description : "Profesyonel ekibimiz size özel fiyat teklifi hazırlayacaktır"}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={pageData?.sections?.cta?.button1Link || "tel:4447436"} className="inline-flex items-center gap-2 rounded-lg bg-[#e3000f] px-8 py-3 font-semibold transition hover:bg-[#c5000d]">
                {pageData?.sections?.cta?.button1Text || "444 7 436"}
              </a>
              <a href={pageData?.sections?.cta?.button2Link || "/iletisim"} className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10">
                {pageData?.sections?.cta?.button2Text || "Online Teklif Al"}
              </a>
            </div>
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
