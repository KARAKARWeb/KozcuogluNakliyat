import { readData } from "@/lib/db";
import Image from "next/image";
import type { Vehicle } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema, vehicleListSchema } from "@/lib/schemas";
import { Truck } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("araclarimiz");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Araçlarımız",
    description: seo?.description || "Kozcuoğlu Nakliyat araç filosu. 50+ araç ile her türlü nakliyat ihtiyacınıza çözüm.",
    alternates: { canonical: "/araclarimiz" },
    openGraph: {
      title: seo?.title || "Araçlarımız",
      description: seo?.description || "Kozcuoğlu Nakliyat araç filosu. 50+ araç ile her türlü nakliyat ihtiyacınıza çözüm.",
      url: "/araclarimiz",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function AraclarimizPage() {
  const pageData = await getPageData("araclarimiz");
  const fleet = await readData<Vehicle[]>("fleet.json");
  const active = fleet.filter((v) => v.isActive).sort((a, b) => a.order - b.order);

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Araçlarımız" }]),
        vehicleListSchema(active.map((v) => ({ name: v.name, description: `${v.type} - ${v.capacity} m³`, image: v.image }))),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Araçlarımız"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Modern ve bakımlı araç filomuz ile güvenli taşıma"}</p>

          <Breadcrumb items={[{ label: "Araçlarımız" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((v) => (
              <div key={v.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                {v.image ? (
                  <div className="relative aspect-video overflow-hidden bg-[#f5f5f5]">
                    <Image src={v.image} alt={v.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-[#f5f5f5]">
                    <Truck className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="font-semibold text-[#122032]">{v.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{v.type}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded bg-[#f5f5f5] px-2 py-1 text-xs font-medium">{v.capacity} m³</span>
                    {v.features?.map((f, i) => (
                      <span key={i} className="rounded bg-[#f5f5f5] px-2 py-1 text-xs">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
