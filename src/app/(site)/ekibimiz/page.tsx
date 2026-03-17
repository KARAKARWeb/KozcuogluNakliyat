import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { Users, Award, Shield, Heart } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

const TEAM_FEATURES = [
  { icon: Users, title: "100+ Profesyonel", desc: "Eğitimli ve deneyimli personel kadrosu" },
  { icon: Award, title: "Sertifikalı Ekip", desc: "Mesleki yeterlilik belgesine sahip çalışanlar" },
  { icon: Shield, title: "Güvenlik Eğitimi", desc: "İş güvenliği ve eşya koruma eğitimi almış ekip" },
  { icon: Heart, title: "Müşteri Odaklı", desc: "Memnuniyetiniz bizim önceliğimiz" },
];

const DEPARTMENTS = [
  { title: "Taşıma Ekibi", desc: "Eşyalarınızı özenle paketleyen, yükleyen ve yerleştiren uzman ekibimiz.", count: "60+" },
  { title: "Lojistik Planlama", desc: "Taşıma sürecinizi en verimli şekilde planlayan koordinasyon ekibimiz.", count: "10+" },
  { title: "Müşteri Hizmetleri", desc: "7/24 ulaşabileceğiniz, her sorunuza çözüm üreten destek ekibimiz.", count: "15+" },
  { title: "Teknik Ekip", desc: "Mobilya montaj/demontaj, asansör kurulumu ve özel ekipman operatörleri.", count: "20+" },
];

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("ekibimiz");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Ekibimiz",
    description: seo?.description || "Kozcuoğlu Nakliyat profesyonel ekibi. Deneyimli, eğitimli ve güvenilir personelimizle hizmetinizdeyiz.",
    alternates: { canonical: "/ekibimiz" },
    openGraph: {
      title: seo?.title || "Ekibimiz",
      description: seo?.description || "Kozcuoğlu Nakliyat profesyonel ekibi. Deneyimli, eğitimli ve güvenilir personelimizle hizmetinizdeyiz.",
      url: "/ekibimiz",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function EkibimizPage() {
  const pageData = await getPageData("ekibimiz");
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Hakkımızda", url: "/hakkimizda" }, { name: "Ekibimiz" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Ekibimiz"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Profesyonel, deneyimli ve güvenilir ekibimizle tanışın"}</p>

          <Breadcrumb items={[{ label: "Kurumsal", href: "/hakkimizda" }, { label: "Ekibimiz" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border p-6 text-center">
                <f.icon className="mx-auto h-10 w-10 text-[#e3000f]" />
                <h3 className="mt-3 text-lg font-bold text-[#122032]">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-[#122032]">Departmanlarımız</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Her alanda uzmanlaşmış ekiplerimizle kusursuz hizmet sunuyoruz</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {DEPARTMENTS.map((d) => (
              <div key={d.title} className="rounded-xl border bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#122032]">{d.title}</h3>
                  <span className="rounded-full bg-[#e3000f]/10 px-3 py-1 text-sm font-semibold text-[#e3000f]">{d.count} Kişi</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
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
