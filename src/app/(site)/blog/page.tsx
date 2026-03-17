import Link from "next/link";
import Image from "next/image";
import { readData } from "@/lib/db";
import type { BlogPost } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/schemas";
import { Calendar } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("blog");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Blog",
    description: seo?.description || "Kozcuoğlu Nakliyat blog. Nakliyat, taşıma ve depolama hakkında faydalı içerikler.",
    alternates: { canonical: "/blog" },
    openGraph: {
      title: seo?.title || "Blog",
      description: seo?.description || "Kozcuoğlu Nakliyat blog. Nakliyat, taşıma ve depolama hakkında faydalı içerikler.",
      url: "/blog",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function BlogPage() {
  const [posts, pageData] = await Promise.all([
    readData<BlogPost[]>("blog-posts.json"),
    getPageData("blog"),
  ]);
  const published = posts.filter((p) => p.isPublished).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://kozcuoglunakliyat.com.tr/blog#webpage",
        name: pageData?.sections?.hero?.title || "Blog",
        description: pageData?.sections?.hero?.content || "Nakliyat hakkında faydalı içerikler ve rehberler",
        url: "https://kozcuoglunakliyat.com.tr/blog",
        isPartOf: { "@id": "https://kozcuoglunakliyat.com.tr/#website" },
        about: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        publisher: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        inLanguage: "tr",
        mainEntity: { "@id": "https://kozcuoglunakliyat.com.tr/blog#itemlist" },
      },
      {
        "@type": "ItemList",
        "@id": "https://kozcuoglunakliyat.com.tr/blog#itemlist",
        name: "Kozcuoğlu Nakliyat Blog Yazıları",
        description: "Nakliyat, taşıma ve depolama hakkında faydalı içerikler",
        numberOfItems: published.length,
        itemListElement: published.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Article",
            "@id": `https://kozcuoglunakliyat.com.tr/blog/${p.slug}#article`,
            headline: p.title,
            description: p.excerpt,
            url: `https://kozcuoglunakliyat.com.tr/blog/${p.slug}`,
            image: p.image,
            datePublished: p.publishedAt || p.createdAt,
            author: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
            publisher: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
          },
        })),
      },
      breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Blog" }]),
    ],
  };

  return (
    <>
      <JsonLd data={schemas} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Blog"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Nakliyat hakkında faydalı içerikler ve rehberler"}</p>

          <Breadcrumb items={[{ label: "Blog" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {published.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Henüz blog yazısı yok</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {published.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-lg">
                  {b.image && (
                    <div className="relative aspect-video overflow-hidden bg-[#f5f5f5]">
                      <Image src={b.image} alt={b.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(b.publishedAt || b.createdAt).toLocaleDateString("tr-TR")}
                      {b.category && <span className="rounded bg-[#f5f5f5] px-2 py-0.5">{b.category}</span>}
                    </div>
                    <h2 className="mt-2 font-semibold text-[#122032] group-hover:text-[#e3000f]">{b.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{b.excerpt?.slice(0, 120)}</p>
                  </div>
                </Link>
              ))}
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
