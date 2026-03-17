import Link from "next/link";
import Image from "next/image";
import { readData } from "@/lib/db";
import type { Campaign } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema, campaignListSchema } from "@/lib/schemas";
import { Calendar, ArrowRight } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("kampanyalar");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Kampanyalar",
    description: seo?.description || "Kozcuoğlu Nakliyat güncel kampanyalar ve indirimler.",
    alternates: { canonical: "/kampanyalar" },
    openGraph: {
      title: seo?.title || "Kampanyalar",
      description: seo?.description || "Kozcuoğlu Nakliyat güncel kampanyalar ve indirimler.",
      url: "/kampanyalar",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function KampanyalarPage() {
  const pageData = await getPageData("kampanyalar");
  const campaigns = await readData<Campaign[]>("campaigns.json");
  const now = new Date();
  const active = campaigns.filter((c) => c.isActive && new Date(c.validThrough) > now).sort((a, b) => a.order - b.order);
  const expired = campaigns.filter((c) => new Date(c.validThrough) <= now).sort((a, b) => new Date(b.validThrough).getTime() - new Date(a.validThrough).getTime());

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Kampanyalar" }]),
        ...(active.length > 0 ? [campaignListSchema(active.map((c) => ({
          name: c.title,
          description: c.description,
          validFrom: c.validFrom,
          validThrough: c.validThrough,
          discount: c.discountType === "percentage" ? `%${c.discountValue}` : c.discountType === "fixed" ? `${c.discountValue} TL` : undefined,
        })))] : []),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Kampanyalar"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Güncel kampanya ve indirimlerimizden yararlanın"}</p>

          <Breadcrumb items={[{ label: "Kampanyalar" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {active.length > 0 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-[#122032]">Aktif Kampanyalar</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {active.map((c) => (
                  <div key={c.id} className="overflow-hidden rounded-xl border border-[#e3000f] bg-white shadow-sm">
                    {c.image && <div className="relative aspect-video overflow-hidden bg-[#f5f5f5]"><Image src={c.image} alt={c.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" loading="lazy" /></div>}
                    <div className="p-5">
                      <h3 className="font-semibold text-[#122032]">{c.title}</h3>
                      <p className="mt-1 text-2xl font-bold text-[#e3000f]">
                        {c.discountType === "percentage" ? `%${c.discountValue} indirim` : c.discountType === "fixed" ? `${c.discountValue} TL indirim` : "Ücretsiz hizmet"}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(c.validFrom).toLocaleDateString("tr-TR")} - {new Date(c.validThrough).toLocaleDateString("tr-TR")}
                      </div>
                      <Link href="/teklif-al" className="mt-4 block rounded-lg bg-[#e3000f] py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#c5000d]">
                        Teklif Al <ArrowRight className="ml-1 inline h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {expired.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-muted-foreground">Süresi Dolmuş Kampanyalar</h2>
              <div className="grid gap-6 opacity-60 sm:grid-cols-2 lg:grid-cols-3">
                {expired.map((c) => (
                  <div key={c.id} className="rounded-xl border bg-white p-5 shadow-sm">
                    <h3 className="font-semibold text-[#122032]">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Süresi doldu: {new Date(c.validThrough).toLocaleDateString("tr-TR")}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active.length === 0 && expired.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">Henüz kampanya yok</p>
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
