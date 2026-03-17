import { readData } from "@/lib/db";
import Image from "next/image";
import type { Project } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema, projectListSchema } from "@/lib/schemas";
import { Calendar, MapPin } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("referanslar");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Referanslar",
    description: seo?.description || "Kozcuoğlu Nakliyat referans projeler. Başarılı taşıma örneklerimiz.",
    alternates: { canonical: "/referanslar" },
    openGraph: {
      title: seo?.title || "Referanslar",
      description: seo?.description || "Kozcuoğlu Nakliyat referans projeler. Başarılı taşıma örneklerimiz.",
      url: "/referanslar",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function ReferanslarPage() {
  const pageData = await getPageData("referanslar");
  const active: Project[] = [];

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Referanslar" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Referans Projelerimiz"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Başarıyla tamamladığımız taşıma projelerimiz"}</p>

          <Breadcrumb items={[{ label: "Referanslar" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {active.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Henüz proje eklenmemiş</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg">
                  {p.images?.[0] && (
                    <div className="relative aspect-video overflow-hidden bg-[#f5f5f5]">
                      <Image src={p.images[0]} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="font-semibold text-[#122032]">{p.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{p.serviceType}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.fromLocation} &rarr; {p.toLocation}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(p.completedAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
