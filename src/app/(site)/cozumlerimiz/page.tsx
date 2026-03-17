import Link from "next/link";
import { readData } from "@/lib/db";
import type { Solution } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { itemListSchema, breadcrumbSchema } from "@/lib/schemas";
import { ChevronRight, ArrowRight } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("cozumlerimiz");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Çözümlerimiz",
    description: seo?.description || "Kozcuoğlu Nakliyat özel çözümleri. Asansörlü nakliyat, ambalajlama, montaj demontaj, sigortalı taşıma.",
    alternates: { canonical: "/cozumlerimiz" },
    openGraph: {
      title: seo?.title || "Çözümlerimiz",
      description: seo?.description || "Kozcuoğlu Nakliyat özel çözümleri. Asansörlü nakliyat, ambalajlama, montaj demontaj, sigortalı taşıma.",
      url: "/cozumlerimiz",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function CozumlerimizPage() {
  const pageData = await getPageData("cozumlerimiz");
  const solutions = await readData<Solution[]>("solutions.json");
  const active = solutions.filter((s) => s.isActive).sort((a, b) => a.order - b.order);

  return (
    <>
      <JsonLd data={[
        itemListSchema("Çözümlerimiz", active.map((s) => ({ name: s.title, url: `/${s.slug}` }))),
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Çözümlerimiz" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Çözümlerimiz"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Özel ihtiyaçlarınız için profesyonel nakliyat çözümleri"}</p>

          <Breadcrumb items={[{ label: "Çözümlerimiz" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {active.map((s) => (
              <Link key={s.id} href={`/${s.slug}`} className="group rounded-xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <h2 className="text-lg font-semibold text-[#122032] group-hover:text-[#e3000f]">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description.slice(0, 120)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#e3000f]">
                  Detay <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
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
