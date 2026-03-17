import Link from "next/link";
import Breadcrumb from "@/components/site/breadcrumb";
import MovingChecklist from "@/components/site/moving-checklist";
import JsonLd from "@/components/site/json-ld";
import { howToSchema, breadcrumbSchema } from "@/lib/schemas";
import { ArrowRight } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("tasinma-kontrol-listesi");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Taşınma Kontrol Listesi",
    description: seo?.description || "Profesyonel taşınma kontrol listesi ile taşınma sürecinizi kolaylaştırın. Adım adım rehber ve ipuçları.",
    alternates: { canonical: "/tasinma-kontrol-listesi" },
    openGraph: {
      title: seo?.title || "Taşınma Kontrol Listesi",
      description: seo?.description || "Profesyonel taşınma kontrol listesi ile taşınma sürecinizi kolaylaştırın. Adım adım rehber ve ipuçları.",
      url: "/tasinma-kontrol-listesi",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function TasimaKontrolListesiPage() {
  const pageData = await getPageData("tasinma-kontrol-listesi");
  return (
    <>
      <JsonLd data={[
        howToSchema({
          name: "Taşınma Kontrol Listesi",
          description: "Taşınma sürecinizi kolaylaştıracak adım adım kontrol listesi.",
          steps: [
            { name: "Taşınma Öncesi Planlama", text: "Taşınma tarihini belirleyin, nakliyat firması seçin, bütçe planlaması yapın." },
            { name: "Eşya Envanter Çıkarma", text: "Tüm eşyalarınızın listesini çıkarın, gereksiz eşyaları ayıklayın." },
            { name: "Paketleme Malzemeleri Temin Etme", text: "Koli, balonlu naylon, streç film, bant ve etiket temin edin." },
            { name: "Eşyaları Paketleme", text: "Kırılgan eşyaları özenle paketleyin, kolileri etiketleyin." },
            { name: "Taşınma Günü", text: "Nakliyat ekibini karşılayın, yükleme sürecini takip edin." },
            { name: "Yeni Eve Yerleşme", text: "Eşyaları kontrol edin, odaları düzenleyin, adres değişikliği bildirin." },
          ],
        }),
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Taşıma Kontrol Listesi" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Taşıma Kontrol Listesi"}</h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            {pageData?.sections?.hero?.content || "Taşınma sürecinizi kolaylaştıracak adım adım kontrol listesi"}
          </p>
          <Breadcrumb items={[{ label: "Taşıma Kontrol Listesi" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <MovingChecklist />
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
