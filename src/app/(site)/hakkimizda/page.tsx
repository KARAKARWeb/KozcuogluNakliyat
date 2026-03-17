import Link from "next/link";
import { readData } from "@/lib/db";
import type { Settings } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/schemas";
import { Shield, Award, Truck, Clock, Users, Target } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("hakkimizda");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Hakkımızda",
    description: seo?.description || "Kozcuoğlu Nakliyat hakkında. 20 yılı aşkın tecrübe, profesyonel ekip, sigortalı taşımacılık.",
    alternates: { canonical: "/hakkimizda" },
    openGraph: {
      title: seo?.title || "Hakkımızda",
      description: seo?.description || "Kozcuoğlu Nakliyat hakkında. 20 yılı aşkın tecrübe, profesyonel ekip, sigortalı taşımacılık.",
      url: "/hakkimizda",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function HakkimizdaPage() {
  const [settings, pageData] = await Promise.all([
    readData<Settings>("settings.json"),
    getPageData("hakkimizda"),
  ]);

  return (
    <>
      <JsonLd data={[
        aboutPageSchema(),
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Hakkımızda" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Hakkımızda"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "20 yılı aşkın tecrübemizle İstanbul'un güvenilir nakliyat firması"}</p>

          <Breadcrumb items={[{ label: "Hakkımızda" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-[#122032]">Kozcuoğlu Nakliyat</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                2004 yılından bu yana İstanbul ve tüm Türkiye genelinde profesyonel nakliyat hizmeti sunmaktayız. 
                Müşteri memnuniyetini ön planda tutarak, sigortalı ve güvenli taşıma hizmeti veriyoruz.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                50 araçlık filomuz, eğitimli personelimiz ve modern ekipmanlarımız ile her türlü nakliyat ihtiyacınıza 
                profesyonel çözümler sunuyoruz. Evden eve nakliyat, ofis taşıma, eşya depolama ve daha fazlası için bize güvenebilirsiniz.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, title: "20+ Yıl", desc: "Sektörel deneyim" },
                { icon: Truck, title: "50+ Araç", desc: "Modern filo" },
                { icon: Users, title: "100+ Çalışan", desc: "Profesyonel ekip" },
                { icon: Target, title: "1000+", desc: "Başarılı taşıma" },
                { icon: Shield, title: "%100", desc: "Sigorta kapsamında" },
                { icon: Clock, title: "7/24", desc: "Kesintisiz destek" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border p-5 text-center">
                  <item.icon className="mx-auto h-8 w-8 text-[#e3000f]" />
                  <p className="mt-2 text-xl font-bold text-[#122032]">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#122032]">Belge ve Sertifikalarımız</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "K1 Yetki Belgesi", desc: "Ulaştırma Bakanlığı onaylı karayolu taşımacılık yetki belgesi" },
              { title: "TSE Hizmet Yeterlilik", desc: "Türk Standartları Enstitüsü hizmet yeterlilik belgesi" },
              { title: "Nakliyat Sigortası", desc: "Tüm taşıma süreçleri sigorta güvencesi altında" },
              { title: "İSG Sertifikası", desc: "İş sağlığı ve güvenliği standartlarına uygunluk belgesi" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border p-5 text-center">
                <Shield className="mx-auto h-8 w-8 text-[#e3000f]" />
                <h3 className="mt-3 font-bold text-[#122032]">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#122032]">Misyonumuz &amp; Vizyonumuz</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8">
              <h3 className="text-lg font-bold text-[#e3000f]">Misyonumuz</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Müşterilerimizin eşyalarını en güvenli şekilde, zamanında ve hasarsız olarak taşımak. 
                Her taşınma sürecini stressiz ve keyifli bir deneyime dönüştürmek.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8">
              <h3 className="text-lg font-bold text-[#e3000f]">Vizyonumuz</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Türkiye'nin en güvenilir ve tercih edilen nakliyat firması olmak. 
                Teknoloji ve inovasyonla sektöre yön veren, müşteri odaklı bir marka olmaya devam etmek.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#122032] py-12 text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 text-center md:flex-row md:justify-between md:px-6 md:text-left lg:px-8">
          <div>
            <h2 className="text-xl font-bold">Bize Ulaşın</h2>
            <p className="mt-1 text-sm text-gray-300">{settings.nap.address.full}</p>
          </div>
          <div className="flex gap-3">
            <a href="tel:4447436" className="rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium transition hover:bg-[#c5000d]">444 7 436</a>
            <Link href="/iletisim" className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10">İletişim</Link>
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
