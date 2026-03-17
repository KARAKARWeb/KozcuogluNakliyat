import Link from "next/link";
import { readData } from "@/lib/db";
import type { Service, Solution, Region, BlogPost, Contract } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("site-haritasi");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Site Haritası",
    description: seo?.description || "Kozcuoğlu Nakliyat site haritası. Tüm sayfalar, hizmetler, çözümler ve bölgeler.",
    alternates: { canonical: "/site-haritasi" },
    openGraph: {
      title: seo?.title || "Site Haritası",
      description: seo?.description || "Kozcuoğlu Nakliyat site haritası. Tüm sayfalar, hizmetler, çözümler ve bölgeler.",
      url: "/site-haritasi",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function SiteHaritasiPage() {
  const pageData = await getPageData("site-haritasi");
  const [services, solutions, regions, blogPosts, contracts] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Solution[]>("solutions.json"),
    readData<Region[]>("regions.json"),
    readData<BlogPost[]>("blog-posts.json"),
    readData<Contract[]>("contracts.json"),
  ]);

  const activeServices = services.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
  const activeSolutions = solutions.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
  const activeRegions = regions.filter((r) => r.isActive);
  const publishedBlog = blogPosts.filter((b) => b.isPublished).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const activeContracts = contracts.filter((c) => c.isActive);

  const bireysel = activeServices.filter((s) => s.category === "bireysel");
  const kurumsal = activeServices.filter((s) => s.category === "kurumsal");
  const diger = activeServices.filter((s) => s.category === "diger");

  const linkCls = "text-sm text-muted-foreground transition hover:text-[#e3000f]";

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Site Haritası" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Site Haritası"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Tüm sayfalarımıza buradan ulaşabilirsiniz"}</p>

          <Breadcrumb items={[{ label: "Site Haritası" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Ana Sayfalar */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-[#122032]">Ana Sayfalar</h2>
              <ul className="space-y-2">
                {[
                  { label: "Ana Sayfa", href: "/" },
                  { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
                  { label: "Çözümlerimiz", href: "/cozumlerimiz" },
                  { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
                  { label: "Eşya Depolama", href: "/esya-depolama" },
                  { label: "Fiyatlarımız", href: "/fiyatlarimiz" },
                  { label: "Fiyat Hesapla", href: "/nakliyat-fiyat-hesaplama" },
                  { label: "Evden Eve Nakliyat Fiyatları", href: "/evden-eve-nakliyat-fiyatlari" },
                  { label: "Teklif Al", href: "/teklif-al" },
                  { label: "İletişim", href: "/iletisim" },
                ].map((item) => (
                  <li key={item.href}><Link href={item.href} className={linkCls}>{item.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Kurumsal */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-[#122032]">Kurumsal</h2>
              <ul className="space-y-2">
                {[
                  { label: "Kurumsal", href: "/kurumsal" },
                  { label: "Hakkımızda", href: "/hakkimizda" },
                  { label: "Ekibimiz", href: "/ekibimiz" },
                  { label: "Araçlarımız", href: "/araclarimiz" },
                  { label: "Sözleşmelerimiz", href: "/sozlesmeler" },
                  { label: "Blog", href: "/blog" },
                  { label: "Galeri", href: "/galeri" },
                  { label: "Video Galeri", href: "/video-galeri" },
                  { label: "İnsan Kaynakları", href: "/insan-kaynaklari" },
                  { label: "Referanslarımız", href: "/referanslarimiz" },
                  { label: "Bireysel Referanslar", href: "/bireysel-referanslar" },
                  { label: "Kurumsal Referanslar", href: "/kurumsal-referanslar" },
                  { label: "SSS", href: "/sikca-sorulan-sorular" },
                  { label: "Kampanyalar", href: "/kampanyalar" },
                  { label: "Taşınma Kontrol Listesi", href: "/tasinma-kontrol-listesi" },
                ].map((item) => (
                  <li key={item.href}><Link href={item.href} className={linkCls}>{item.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Hukuki */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-[#122032]">Hukuki</h2>
              <ul className="space-y-2">
                {[
                  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
                  { label: "Çerez Politikası", href: "/cerez-politikasi" },
                  { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
                  { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
                ].map((item) => (
                  <li key={item.href}><Link href={item.href} className={linkCls}>{item.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Çözümlerimiz */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-[#122032]">Çözümlerimiz</h2>
              <ul className="space-y-2">
                {activeSolutions.map((s) => (
                  <li key={s.id}><Link href={`/${s.slug}`} className={linkCls}>{s.title}</Link></li>
                ))}
              </ul>
            </div>

            {/* Bireysel Hizmetler */}
            {bireysel.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-[#122032]">Bireysel Hizmetler</h2>
                <ul className="space-y-2">
                  {bireysel.map((s) => (
                    <li key={s.id}><Link href={`/${s.slug}`} className={linkCls}>{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Kurumsal Hizmetler */}
            {kurumsal.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-[#122032]">Kurumsal Hizmetler</h2>
                <ul className="space-y-2">
                  {kurumsal.map((s) => (
                    <li key={s.id}><Link href={`/${s.slug}`} className={linkCls}>{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Diğer Hizmetler */}
            {diger.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-[#122032]">Diğer Hizmetler</h2>
                <ul className="space-y-2">
                  {diger.map((s) => (
                    <li key={s.id}><Link href={`/${s.slug}`} className={linkCls}>{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sözleşmeler */}
            {activeContracts.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-[#122032]">Sözleşmeler</h2>
                <ul className="space-y-2">
                  {activeContracts.map((c) => (
                    <li key={c.id}><Link href={`/${c.slug}`} className={linkCls}>{c.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Blog Yazıları */}
            {publishedBlog.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-[#122032]">Blog Yazıları</h2>
                <ul className="space-y-2">
                  {publishedBlog.map((b) => (
                    <li key={b.id}><Link href={`/blog/${b.slug}`} className={linkCls}>{b.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Hizmet Bölgeleri */}
          {activeRegions.length > 0 && (
            <div className="mt-12 border-t pt-10">
              <h2 className="mb-4 text-lg font-bold text-[#122032]">Hizmet Bölgeleri ({activeRegions.length})</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {activeRegions.map((r) => (
                  <Link key={r.id} href={`/${r.slug}.html`} className="truncate text-sm text-muted-foreground transition hover:text-[#e3000f]">{r.title}</Link>
                ))}
              </div>
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
