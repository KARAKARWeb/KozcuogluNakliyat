import Breadcrumb from "@/components/site/breadcrumb";
import TrackingForm from "@/components/site/tracking-form";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("tasima-takip");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Taşıma Takip",
    description: seo?.description || "Taşımanızın durumunu takip kodu ile sorgulayın. Kozcuoğlu Nakliyat online taşıma takip sistemi.",
    alternates: { canonical: "/tasima-takip" },
    openGraph: {
      title: seo?.title || "Taşıma Takip",
      description: seo?.description || "Taşımanızın durumunu takip kodu ile sorgulayın. Kozcuoğlu Nakliyat online taşıma takip sistemi.",
      url: "/tasima-takip",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function TasimaTakipPage() {
  const pageData = await getPageData("tasima-takip");
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Taşıma Takip" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Taşıma Takip"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Taşımanızın durumunu takip kodu ile sorgulayabilirsiniz"}</p>

          <Breadcrumb items={[{ label: "Taşıma Takip" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-lg px-4">
          <TrackingForm />
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
