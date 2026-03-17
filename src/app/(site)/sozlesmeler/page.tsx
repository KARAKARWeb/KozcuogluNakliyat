import Link from "next/link";
import { readData } from "@/lib/db";
import type { Contract } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { FileText, ChevronRight } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("sozlesmeler");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Sözleşmeler",
    description: seo?.description || "Kozcuoğlu Nakliyat sözleşmeleri. Nakliyat sözleşmesi örnekleri.",
    alternates: { canonical: "/sozlesmeler" },
    openGraph: {
      title: seo?.title || "Sözleşmeler",
      description: seo?.description || "Kozcuoğlu Nakliyat sözleşmeleri. Nakliyat sözleşmesi örnekleri.",
      url: "/sozlesmeler",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function SozlesmelerPage() {
  const pageData = await getPageData("sozlesmeler");
  const contracts = await readData<Contract[]>("contracts.json");
  const active = contracts.filter((c) => c.isActive).sort((a, b) => a.order - b.order);

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Sözleşmeler" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Sözleşmeler"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Nakliyat sözleşme örnekleri ve şablonları"}</p>

          <Breadcrumb items={[{ label: "Sözleşmeler" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {active.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Henüz sözleşme eklenmemiş</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((c) => (
                <Link key={c.id} href={`/${c.slug}`} className="group flex items-start gap-4 rounded-xl border bg-white p-6 transition hover:shadow-lg">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#e3000f]">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#122032] group-hover:text-[#e3000f]">{c.title}</h2>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm text-[#e3000f]">
                      Oku <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
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
