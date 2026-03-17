import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema, gallerySchema } from "@/lib/schemas";
import { Play } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

const VIDEOS = [
  { title: "Evden Eve Nakliyat Süreci", desc: "Profesyonel paketleme, yükleme ve yerleştirme sürecimiz.", thumbnail: "/uploads/gallery/video-1.webp" },
  { title: "Asansörlü Taşıma", desc: "Dış cephe asansörü ile güvenli eşya taşıma.", thumbnail: "/uploads/gallery/video-2.webp" },
  { title: "Ofis Taşıma Hizmeti", desc: "Kurumsal ofis taşıma sürecimiz.", thumbnail: "/uploads/gallery/video-3.webp" },
  { title: "Eşya Depolama Tesisi", desc: "Güvenli ve sigortalı depolama tesisimiz.", thumbnail: "/uploads/gallery/video-4.webp" },
];

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("video-galeri");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Video Galeri",
    description: seo?.description || "Kozcuoğlu Nakliyat video galeri. Taşıma süreçlerimizi ve hizmetlerimizi videolarla keşfedin.",
    alternates: { canonical: "/video-galeri" },
    openGraph: {
      title: seo?.title || "Video Galeri",
      description: seo?.description || "Kozcuoğlu Nakliyat video galeri. Taşıma süreçlerimizi ve hizmetlerimizi videolarla keşfedin.",
      url: "/video-galeri",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function VideoGaleriPage() {
  const pageData = await getPageData("video-galeri");
  return (
    <>
      <JsonLd data={[
        gallerySchema([], VIDEOS.map((v) => ({ name: v.title, embedUrl: "", thumbnailUrl: v.thumbnail }))),
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Galeri", url: "/galeri" }, { name: "Video Galeri" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Video Galeri"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Hizmetlerimizi ve taşıma süreçlerimizi videolarla keşfedin"}</p>

          <Breadcrumb items={[{ label: "Galeri", href: "/galeri" }, { label: "Video Galeri" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {VIDEOS.map((v) => (
              <div key={v.title} className="group relative overflow-hidden rounded-xl border bg-[#f8f9fa]">
                <div className="relative aspect-video bg-[#122032]/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e3000f] text-white shadow-lg transition-transform group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#122032]">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">Videolarımız yakında eklenecektir.</p>
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
