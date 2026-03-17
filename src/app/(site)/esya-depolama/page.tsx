import Link from "next/link";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { selfStorageSchema, faqSchema, breadcrumbSchema } from "@/lib/schemas";
import { Shield, Camera, Thermometer, Flame, Lock, ArrowRight, Phone, ChevronRight } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

const UNITS = [
  { title: "Küçük Birim", size: "5 m³", desc: "1+1 ev eşyası, öğrenci eşyası", price: "1.500 TL/ay" },
  { title: "Orta Birim", size: "10 m³", desc: "2+1 ev eşyası, ofis eşyası", price: "2.500 TL/ay" },
  { title: "Büyük Birim", size: "20 m³", desc: "3+1 ve üstü ev eşyası", price: "4.000 TL/ay" },
  { title: "Özel Birim", size: "30+ m³", desc: "Villa, işyeri, özel projeler", price: "Teklif alın" },
];

const FEATURES = [
  { icon: Camera, title: "7/24 Kamera", desc: "Tüm alanlar kamera ile izlenir" },
  { icon: Thermometer, title: "Nem Kontrolü", desc: "İdeal nem ve sıcaklık ortamı" },
  { icon: Shield, title: "Sigorta", desc: "Tüm eşyalar sigorta kapsamında" },
  { icon: Flame, title: "Yangın Sistemi", desc: "Otomatik yangın algılama ve söndürme" },
  { icon: Lock, title: "Özel Kilit", desc: "Her birim özel kilitli ve güvenli" },
];

const PROCESS = [
  { step: 1, title: "Keşif", desc: "Eşyalarınız yerinde incelenir" },
  { step: 2, title: "Paketleme", desc: "Profesyonel ambalajlama" },
  { step: 3, title: "Taşıma", desc: "Güvenli nakliye" },
  { step: 4, title: "Depolama", desc: "Klimalı depoda saklama" },
  { step: 5, title: "Teslim", desc: "İstediğinizde teslim" },
];

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("esya-depolama");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Eşya Depolama",
    description: seo?.description || "İstanbul eşya depolama hizmeti. Güvenli, klimalı, sigortalı depolama tesisleri. Aylık ve uzun süreli depolama.",
    alternates: { canonical: "/esya-depolama" },
    openGraph: {
      title: seo?.title || "Eşya Depolama",
      description: seo?.description || "İstanbul eşya depolama hizmeti. Güvenli, klimalı, sigortalı depolama tesisleri. Aylık ve uzun süreli depolama.",
      url: "/esya-depolama",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function EsyaDepolamaPage() {
  const pageData = await getPageData("esya-depolama");
  return (
    <>
      <JsonLd data={[
        selfStorageSchema(),
        faqSchema([
          { question: "Minimum depolama süresi nedir?", answer: "Minimum 1 ay depolama yapılabilir." },
          { question: "Eşyalarıma ne zaman ulaşabilirim?", answer: "Önceden randevu alarak mesai saatleri içinde eşyalarınıza ulaşabilirsiniz." },
          { question: "Depolama ücreti nasıl hesaplanır?", answer: "Birim büyüklüğü ve depolama süresine göre hesaplanır." },
        ]) as Record<string, unknown>,
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Eşya Depolama" }]),
      ]} />
      {/* Hero */}
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Eşya Depolama Hizmeti"}</h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            {pageData?.sections?.hero?.content || "Güvenli, klimalı ve sigortalı depolama tesislerimizde eşyalarınız emin ellerde. Aylık ve uzun süreli depolama seçenekleri."}
          </p>
          <Breadcrumb items={[{ label: "Eşya Depolama" }]} />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium transition hover:bg-[#c5000d]">
              Teklif Al <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:4447436" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10">
              <Phone className="h-4 w-4" /> 444 7 436
            </a>
          </div>
        </div>
      </section>

      {/* Depolama Birimleri */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">Depolama Birimleri</h2>
            <p className="mt-2 text-muted-foreground">İhtiyacınıza uygun birim seçin</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {UNITS.map((u) => (
              <div key={u.title} className="rounded-xl border bg-white p-6 text-center shadow-sm transition hover:shadow-lg">
                <h3 className="text-lg font-semibold text-[#122032]">{u.title}</h3>
                <p className="mt-1 text-2xl font-bold text-[#e3000f]">{u.size}</p>
                <p className="mt-2 text-sm text-muted-foreground">{u.desc}</p>
                <p className="mt-3 font-semibold text-[#122032]">{u.price}</p>
                <Link href="/iletisim" className="mt-4 block rounded-lg border border-[#e3000f] py-2 text-sm font-medium text-[#e3000f] transition hover:bg-[#e3000f] hover:text-white">
                  Teklif Al
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guvenlik & Ozellikler */}
      <section className="bg-[#f5f5f5] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">Güvenlik & Özellikler</h2>
            <p className="mt-2 text-muted-foreground">Eşyalarınız için en üst düzey güvenlik</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4 rounded-xl bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#e3000f]">
                  <f.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#122032]">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surec */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">Depolama Süreci</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {PROCESS.map((p) => (
              <div key={p.step} className="rounded-xl border bg-white p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#e3000f] text-sm font-bold text-white">{p.step}</div>
                <h3 className="font-semibold text-[#122032]">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="bg-[#f5f5f5] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#122032]">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            {[
              { q: "Minimum depolama süresi nedir?", a: "Minimum 1 ay depolama yapılabilir." },
              { q: "Eşyalarıma ne zaman ulaşabilirim?", a: "Önceden randevu alarak mesai saatleri içinde eşyalarınıza ulaşabilirsiniz." },
              { q: "Depolama ücreti nasıl hesaplanır?", a: "Birim büyüklüğü ve depolama süresine göre hesaplanır." },
            ].map((item, i) => (
              <details key={i} className="group rounded-xl border bg-white shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#122032]">
                  {item.q}
                  <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
                </summary>
                <div className="border-t px-5 pb-5 pt-3 text-sm text-muted-foreground">{item.a}</div>
              </details>
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
