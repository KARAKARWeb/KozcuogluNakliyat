import { readData } from "@/lib/db";
import type { Region } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import RegionGrid from "@/components/site/region-grid";
import { itemListSchema, breadcrumbSchema } from "@/lib/schemas";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("hizmet-bolgeleri");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Hizmet Bölgeleri",
    description: seo?.description || "Kozcuoğlu Nakliyat hizmet bölgeleri. İstanbul ve tüm Türkiye genelinde nakliyat hizmeti.",
    alternates: { canonical: "/hizmet-bolgeleri" },
    openGraph: {
      title: seo?.title || "Hizmet Bölgeleri",
      description: seo?.description || "Kozcuoğlu Nakliyat hizmet bölgeleri. İstanbul ve tüm Türkiye genelinde nakliyat hizmeti.",
      url: "/hizmet-bolgeleri",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function HizmetBolgeleriPage() {
  const pageData = await getPageData("hizmet-bolgeleri");
  const regions = await readData<Region[]>("regions.json");
  const active = regions.filter((r) => r.isActive);

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://kozcuoglunakliyat.com.tr/hizmet-bolgeleri#webpage",
        name: pageData?.sections?.hero?.title || "Hizmet Bölgeleri",
        description: pageData?.sections?.hero?.content || "İstanbul ve tüm Türkiye genelinde profesyonel nakliyat hizmeti",
        url: "https://kozcuoglunakliyat.com.tr/hizmet-bolgeleri",
        isPartOf: { "@id": "https://kozcuoglunakliyat.com.tr/#website" },
        about: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        publisher: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        inLanguage: "tr",
        mainEntity: { "@id": "https://kozcuoglunakliyat.com.tr/hizmet-bolgeleri#itemlist" },
      },
      {
        "@type": "ItemList",
        "@id": "https://kozcuoglunakliyat.com.tr/hizmet-bolgeleri#itemlist",
        name: "Hizmet Bölgeleri",
        description: "Kozcuoğlu Nakliyat hizmet verdiği bölgeler",
        numberOfItems: active.length,
        itemListElement: active.map((r, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Service",
            "@id": `https://kozcuoglunakliyat.com.tr/${r.slug}.html#service`,
            name: r.title,
            description: r.description,
            url: `https://kozcuoglunakliyat.com.tr/${r.slug}.html`,
            provider: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
            serviceType: "Evden Eve Nakliyat",
            areaServed: {
              "@type": "AdministrativeArea",
              name: r.district,
            },
          },
        })),
      },
      breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Hizmet Bölgeleri" }]),
    ],
  };

  return (
    <>
      <JsonLd data={schemas} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Hizmet Bölgeleri"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "İstanbul ve tüm Türkiye genelinde profesyonel nakliyat hizmeti"}</p>

          <Breadcrumb items={[{ label: "Hizmet Bölgeleri" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <RegionGrid regions={active.map((r) => ({ id: r.id, slug: r.slug, title: r.title, image: r.image, description: r.description }))} />
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
