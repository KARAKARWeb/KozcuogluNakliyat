import Link from "next/link";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { Building2, FileText, Users, Truck, BookOpen, Image, Video, Map, UserPlus, ChevronRight } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

const PAGES = [
  { label: "Hakkımızda", href: "/hakkimizda", icon: Building2, desc: "Firmamız, tarihçemiz ve değerlerimiz hakkında bilgi edinin." },
  { label: "Sözleşmelerimiz", href: "/sozlesmeler", icon: FileText, desc: "Nakliyat sözleşmeleri ve yasal güvence detayları." },
  { label: "Ekibimiz", href: "/ekibimiz", icon: Users, desc: "Profesyonel ve deneyimli ekip kadromuzla tanışın." },
  { label: "Araçlarımız", href: "/araclarimiz", icon: Truck, desc: "Modern araç filomuz ve ekipmanlarımız." },
  { label: "Blog", href: "/blog", icon: BookOpen, desc: "Nakliyat ipuçları, haberler ve sektörel yazılar." },
  { label: "Galeri", href: "/galeri", icon: Image, desc: "Taşıma süreçlerimizden fotoğraflar." },
  { label: "Video Galeri", href: "/video-galeri", icon: Video, desc: "Hizmetlerimize ait video içerikler." },
  { label: "Site Haritası", href: "/site-haritasi", icon: Map, desc: "Tüm sayfa ve içeriklerin listesi." },
  { label: "İnsan Kaynakları", href: "/insan-kaynaklari", icon: UserPlus, desc: "Kariyer fırsatları ve başvuru bilgileri." },
];

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("kurumsal");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Kurumsal",
    description: seo?.description || "Kozcuoğlu Nakliyat kurumsal bilgiler. Hakkımızda, ekibimiz, araçlarımız, blog, galeri ve daha fazlası.",
    alternates: { canonical: "/kurumsal" },
    openGraph: {
      title: seo?.title || "Kurumsal",
      description: seo?.description || "Kozcuoğlu Nakliyat kurumsal bilgiler. Hakkımızda, ekibimiz, araçlarımız, blog, galeri ve daha fazlası.",
      url: "/kurumsal",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function KurumsalPage() {
  const pageData = await getPageData("kurumsal");
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Kurumsal" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Kurumsal"}</h1>
          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Kozcuoğlu Nakliyat hakkında tüm kurumsal bilgiler"}</p>
          <Breadcrumb items={[{ label: "Kurumsal" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex items-start gap-4 rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fef2f2] text-[#e3000f] transition-colors group-hover:bg-[#e3000f] group-hover:text-white">
                  <p.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-[#122032] group-hover:text-[#e3000f]">{p.label}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#e3000f] opacity-0 transition group-hover:opacity-100">
                    Görüntüle <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
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
