import Breadcrumb from "@/components/site/breadcrumb";
import QuoteForm from "@/components/site/quote-form";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("teklif-al");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Teklif Al",
    description: seo?.description || "Kozcuoğlu Nakliyat'tan online teklif alın. Hizmet tipi, adres ve detayları girerek size özel fiyat teklifi alın.",
    alternates: { canonical: "/teklif-al" },
    openGraph: {
      title: seo?.title || "Teklif Al",
      description: seo?.description || "Kozcuoğlu Nakliyat'tan online teklif alın. Hizmet tipi, adres ve detayları girerek size özel fiyat teklifi alın.",
      url: "/teklif-al",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function TeklifAlPage() {
  const pageData = await getPageData("teklif-al");
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Teklif Al" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Teklif Al"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Bilgilerinizi doldurun, size özel nakliyat teklifinizi hemen alın"}</p>

          <Breadcrumb items={[{ label: "Teklif Al" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <QuoteForm />
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
