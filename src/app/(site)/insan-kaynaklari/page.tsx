import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { Briefcase, Heart, TrendingUp, Users } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

const VALUES = [
  { icon: Heart, title: "Çalışan Memnuniyeti", desc: "Çalışanlarımızın mutluluğu ve motivasyonu bizim için önceliklidir." },
  { icon: TrendingUp, title: "Kariyer Gelişimi", desc: "Sürekli eğitim ve gelişim fırsatları sunuyoruz." },
  { icon: Users, title: "Takım Ruhu", desc: "Birlikte çalışarak büyük başarılara imza atıyoruz." },
  { icon: Briefcase, title: "İş Güvencesi", desc: "SGK, yemek, servis ve sosyal haklar sağlıyoruz." },
];

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("insan-kaynaklari");
  const seo = pd?.seo;
  return {
    title: seo?.title || "İnsan Kaynakları",
    description: seo?.description || "Kozcuoğlu Nakliyat kariyer fırsatları. Profesyonel ekibimize katılın.",
    alternates: { canonical: "/insan-kaynaklari" },
    openGraph: {
      title: seo?.title || "İnsan Kaynakları",
      description: seo?.description || "Kozcuoğlu Nakliyat kariyer fırsatları. Profesyonel ekibimize katılın.",
      url: "/insan-kaynaklari",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function InsanKaynaklariPage() {
  const pageData = await getPageData("insan-kaynaklari");
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Hakkımızda", url: "/hakkimizda" }, { name: "İnsan Kaynakları" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "İnsan Kaynakları"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Kozcuoğlu Nakliyat ailesine katılın"}</p>

          <Breadcrumb items={[{ label: "Kurumsal", href: "/hakkimizda" }, { label: "İnsan Kaynakları" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-[#122032]">Neden Kozcuoğlu?</h2>
            <p className="mt-3 text-muted-foreground">20 yılı aşkın tecrübemizle sektörün lider firmalarından biriyiz. Büyüyen ekibimize katılarak kariyerinize yeni bir yön verin.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl border p-6 text-center">
                <v.icon className="mx-auto h-10 w-10 text-[#e3000f]" />
                <h3 className="mt-3 text-lg font-bold text-[#122032]">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-[#122032]">Başvuru</h2>
            <p className="mt-3 text-muted-foreground">
              Açık pozisyonlarımız için veya genel başvuru yapmak için özgeçmişinizi{" "}
              <a href="mailto:info@kozcuoglunakliyat.com.tr" className="font-medium text-[#e3000f] hover:underline">
                info@kozcuoglunakliyat.com.tr
              </a>{" "}
              adresine gönderebilirsiniz.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Konu kısmına başvurmak istediğiniz pozisyonu belirtmeyi unutmayın.</p>
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
