import Link from "next/link";
import { readData } from "@/lib/db";
import type { Policy } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { Shield, ChevronRight } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("politikalarimiz");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Politikalarımız",
    description: seo?.description || "Kozcuoğlu Nakliyat politikaları. Gizlilik, çerez, KVKK ve kullanım koşulları.",
    alternates: { canonical: "/politikalarimiz" },
    openGraph: {
      title: seo?.title || "Politikalarımız",
      description: seo?.description || "Kozcuoğlu Nakliyat politikaları. Gizlilik, çerez, KVKK ve kullanım koşulları.",
      url: "/politikalarimiz",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function PolitikalarimizPage() {
  const pageData = await getPageData("politikalarimiz");
  const policies = await readData<Policy[]>("policies.json");

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Politikalarımız" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Politikalarımız"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Gizlilik, çerez, KVKK ve kullanım koşulları politikalarımız"}</p>

          <Breadcrumb items={[{ label: "Politikalarımız" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {policies.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Henüz politika eklenmemiş</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {policies.map((p) => (
                <Link key={p.id} href={`/${p.slug}`} className="group flex items-start gap-4 rounded-xl border bg-white p-6 transition hover:shadow-lg">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#e3000f]">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#122032] group-hover:text-[#e3000f]">{p.title}</h2>
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
