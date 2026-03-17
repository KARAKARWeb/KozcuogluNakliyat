import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { readData } from "@/lib/db";
import type { Service, Solution, Region, Contract, Review } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { serviceSchema, faqSchema, breadcrumbSchema, districtMovingSchema, intercityMovingSchema } from "@/lib/schemas";
import { Phone, MessageCircle, ArrowRight, Star, ChevronRight } from "lucide-react";
import ContentSidebar from "@/components/site/content-sidebar";
import TableOfContents, { MobileTableOfContents } from "@/components/site/table-of-contents";
import ReviewSection from "@/components/site/review-section";
import { InteractiveRatingWidget } from "@/components/site/interactive-rating-widget";
import { ShareButtonsFull } from "@/components/site/share-buttons-full";
import { RelatedPostsWidget } from "@/components/site/related-posts-widget";
import { PillarContentCluster } from "@/components/site/pillar-content-cluster";
import { CONTENT_CLUSTERS, getSemanticLinks } from "@/lib/content-clusters";
import type { Metadata } from "next";

type PageData =
  | { type: "service"; data: Service }
  | { type: "solution"; data: Solution }
  | { type: "region"; data: Region }
  | { type: "contract"; data: Contract };

async function findPage(slug: string): Promise<PageData | null> {
  const [services, solutions, regions, contracts] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Solution[]>("solutions.json"),
    readData<Region[]>("regions.json"),
    readData<Contract[]>("contracts.json"),
  ]);

  const service = services.find((s) => s.slug === slug && s.isActive);
  if (service) return { type: "service", data: service };

  const solution = solutions.find((s) => s.slug === slug && s.isActive);
  if (solution) return { type: "solution", data: solution };

  const region = regions.find((r) => r.slug === slug && r.isActive);
  if (region) return { type: "region", data: region };

  const contract = contracts.find((c) => c.slug === slug && c.isActive);
  if (contract) return { type: "contract", data: contract };

  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) return { title: "Sayfa Bulunamadı" };

  const d = page.data;
  const canonicalSlug = page.type === "region" ? `/${slug}.html` : `/${slug}`;
  const desc = d.seo?.description || ("description" in d ? (d as Service).description : "");
  return {
    title: d.seo?.title || d.title,
    description: desc,
    alternates: { canonical: canonicalSlug },
    openGraph: {
      title: d.seo?.title || d.title,
      description: desc,
      url: canonicalSlug,
      type: "website",
      ...("image" in d && (d as Service).image ? { images: [{ url: (d as Service).image, width: 1200, height: 630, alt: d.title }] } : {}),
    },
  };
}

export const dynamicParams = true; // Blog slug'ları için fallback - [...slug] route yakalayacak

export async function generateStaticParams() {
  const [services, solutions, regions, contracts] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Solution[]>("solutions.json"),
    readData<Region[]>("regions.json"),
    readData<Contract[]>("contracts.json"),
  ]);

  return [
    ...services.filter((s) => s.isActive).map((s) => ({ slug: s.slug })),
    ...solutions.filter((s) => s.isActive).map((s) => ({ slug: s.slug })),
    ...regions.filter((r) => r.isActive).map((r) => ({ slug: r.slug })),
    ...contracts.filter((c) => c.isActive).map((c) => ({ slug: c.slug })),
  ];
}

export default async function DynamicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) notFound();

  const d = page.data;

  const [allReviews, services] = await Promise.all([
    readData<Review[]>("reviews.json"),
    readData<Service[]>("services.json"),
  ]);
  const pageReviews = allReviews.filter((r) => r.status === "approved" && r.pageSlug === slug);
  const avgRating = pageReviews.length > 0 ? (pageReviews.reduce((sum, r) => sum + r.rating, 0) / pageReviews.length).toFixed(1) : null;
  const ratingData = avgRating ? { ratingValue: avgRating, reviewCount: String(pageReviews.length) } : undefined;
  const reviewSchemaData = pageReviews.slice(0, 5).map((r) => ({ author: r.name, ratingValue: String(r.rating), reviewBody: r.comment, datePublished: r.createdAt?.split("T")[0] }));

  const breadcrumbParent = page.type === "service"
    ? { label: "Hizmetlerimiz", href: "/hizmetlerimiz" }
    : page.type === "solution"
    ? { label: "Çözümlerimiz", href: "/cozumlerimiz" }
    : page.type === "region"
    ? { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" }
    : { label: "Sözleşmeler", href: "/sozlesmeler" };

  const faq = "faq" in d ? (d as Service).faq : [];

  const parentLabel = breadcrumbParent.label;
  const parentHref = breadcrumbParent.href;

  let mainSchema: Record<string, unknown>;
  if (page.type === "region" && (d as Region).type === "intercity") {
    const region = d as Region;
    const regionAlternates = [
      `${region.district} ${region.city} Nakliyat`,
      `${region.district}'dan ${region.city}'e Taşıma`,
      `${region.district} ${region.city} Evden Eve Nakliyat`,
    ];
    mainSchema = intercityMovingSchema({
      name: region.title,
      description: region.seo?.description || "",
      slug: `${slug}.html`,
      fromCity: region.district,
      toCity: region.city,
      image: region.image,
      aggregateRating: ratingData,
      offers: { lowPrice: "8000", highPrice: "35000" },
      reviews: reviewSchemaData,
      alternateName: regionAlternates,
    });
  } else if (page.type === "region") {
    const region = d as Region;
    const districtAlternates = [
      `${region.district} Nakliyat`,
      `${region.district} Evden Eve Taşıma`,
      `${region.district} Nakliye Firması`,
    ];
    mainSchema = districtMovingSchema({
      name: region.title,
      description: region.seo?.description || "",
      slug: `${slug}.html`,
      district: region.district,
      city: region.city,
      image: region.image,
      geo: region.geo,
      aggregateRating: ratingData,
      offers: { lowPrice: "5000", highPrice: "25000" },
      reviews: reviewSchemaData,
      alternateName: districtAlternates,
    });
  } else {
    const alternateNames: Record<string, string[]> = {
      "evden-eve-nakliyat": ["Ev Taşıma", "Konut Taşımacılığı", "Ev Eşyası Taşıma"],
      "ofis-tasima": ["Ofis Nakliyat", "İşyeri Taşıma", "Kurumsal Taşımacılık"],
      "esya-depolama": ["Eşya Muhafaza", "Depo Kiralama", "Güvenli Depolama"],
      "sehirler-arasi-nakliyat": ["Şehirlerarası Taşıma", "Uzun Mesafe Nakliyat", "İller Arası Taşımacılık"],
      "parca-esya-tasima": ["Tek Parça Taşıma", "Az Eşya Nakliyat", "Küçük Taşıma"],
      "asansorlu-nakliyat": ["Dış Cephe Asansörü", "Vinç ile Taşıma", "Yüksek Kat Taşıma"],
    };
    
    mainSchema = serviceSchema({
      name: d.title,
      description: "description" in d ? (d as Service).description : d.seo?.description || "",
      slug,
      image: "image" in d ? (d as Service).image : undefined,
      category: page.type === "solution" ? "Nakliyat Çözümleri" : "Nakliyat Hizmetleri",
      aggregateRating: ratingData,
      offers: page.type !== "contract" ? { lowPrice: "3000", highPrice: "25000" } : undefined,
      reviews: reviewSchemaData,
      alternateName: alternateNames[slug] || undefined,
    });
  }

  // İlgili hizmetler ve semantic relationships
  const relatedServices: { name: string; url: string }[] = [];
  const subServices: { name: string; url: string }[] = [];
  
  if (page.type === "service") {
    const serviceSlug = slug;
    const relatedMap: Record<string, string[]> = {
      "evden-eve-nakliyat": ["ofis-tasima", "parca-esya-tasima", "asansorlu-nakliyat"],
      "ofis-tasima": ["evden-eve-nakliyat", "esya-depolama"],
      "esya-depolama": ["evden-eve-nakliyat", "ofis-tasima"],
      "sehirler-arasi-nakliyat": ["evden-eve-nakliyat", "esya-depolama"],
      "parca-esya-tasima": ["evden-eve-nakliyat", "asansorlu-nakliyat"],
      "asansorlu-nakliyat": ["evden-eve-nakliyat", "parca-esya-tasima"],
    };
    
    const related = relatedMap[serviceSlug] || [];
    related.forEach(r => {
      const srv = services.find(s => s.slug === r);
      if (srv) relatedServices.push({ name: srv.title, url: `/${srv.slug}` });
    });
  }

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://kozcuoglunakliyat.com.tr/${slug}#webpage`,
        name: d.title,
        description: "description" in d ? (d as Service).description : d.seo?.description || "",
        url: `https://kozcuoglunakliyat.com.tr/${slug}`,
        isPartOf: { "@id": "https://kozcuoglunakliyat.com.tr/#website" },
        about: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        publisher: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        inLanguage: "tr",
        mainEntity: page.type === "region" 
          ? { "@id": `https://kozcuoglunakliyat.com.tr/${slug}.html#service` }
          : { "@id": `https://kozcuoglunakliyat.com.tr/${slug}#service` },
      },
      {
        ...mainSchema,
        ...(relatedServices.length > 0 ? {
          isRelatedTo: relatedServices.map(rs => ({
            "@type": "Service",
            "@id": `https://kozcuoglunakliyat.com.tr${rs.url}#service`,
            name: rs.name,
            url: `https://kozcuoglunakliyat.com.tr${rs.url}`,
          })),
        } : {}),
        isPartOf: { "@id": `https://kozcuoglunakliyat.com.tr${parentHref}#itemlist` },
      },
      breadcrumbSchema([
        { name: "Kozcuoğlu Nakliyat", url: "/" },
        { name: parentLabel, url: parentHref },
        { name: d.title },
      ]),
    ],
  };
  
  const faqData = faq && faq.length > 0 ? faqSchema(faq) : null;
  if (faqData) (schemas["@graph"] as any[]).push(faqData);

  return (
    <>
      <JsonLd data={schemas} />
      {/* Hero */}
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{d.title}</h1>
          {"description" in d && <p className="mt-3 max-w-2xl text-gray-300">{(d as Service).description}</p>}
          <Breadcrumb items={[breadcrumbParent, { label: d.title }]} />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#c5000d]">
              Teklif Al <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:4447436" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10">
              <Phone className="h-4 w-4" /> 444 7 436
            </a>
          </div>
        </div>
      </section>

      {/* Icerik */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          {/* Ana Icerik */}
          <div>
            {"image" in d && d.image && (
              <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
                <Image src={(d as Service | Region).image} alt={d.title} fill sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" priority />
              </div>
            )}
            <MobileTableOfContents />
            {d.content && (
              <div
                className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[#122032] prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: d.content }}
              />
            )}

            {/* Rating Widget */}
            {page.type !== "contract" && (
              <div className="mt-12">
                <InteractiveRatingWidget
                  pageSlug={slug}
                  currentRating={avgRating ? Number(avgRating) : 0}
                  totalRatings={pageReviews.length}
                />
              </div>
            )}

            {/* Yorumlar */}
            {page.type !== "contract" && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-[#122032]">Müşteri Yorumları</h2>
                {avgRating && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#122032]">{avgRating}/5</span>
                    <span className="text-sm text-muted-foreground">({pageReviews.length} değerlendirme)</span>
                  </div>
                )}
                <div className="mt-4">
                  <ReviewSection reviews={pageReviews.slice(0, 6)} serviceSlug={slug} />
                </div>
              </div>
            )}

            {/* Pillar Content Cluster - Ana hizmetler için */}
            {page.type === "service" && CONTENT_CLUSTERS[slug as keyof typeof CONTENT_CLUSTERS] && (
              <PillarContentCluster
                pillarTitle={CONTENT_CLUSTERS[slug as keyof typeof CONTENT_CLUSTERS].pillarTitle}
                clusterArticles={CONTENT_CLUSTERS[slug as keyof typeof CONTENT_CLUSTERS].articles}
                peopleAlsoAsk={CONTENT_CLUSTERS[slug as keyof typeof CONTENT_CLUSTERS].peopleAlsoAsk}
              />
            )}

            {/* Semantic Internal Links */}
            {getSemanticLinks(slug).length > 0 && (
              <div className="mt-12 rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8">
                <h2 className="mb-6 text-2xl font-bold text-[#122032]">İlgili Hizmetlerimiz</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {getSemanticLinks(slug).map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.url}
                      className="group flex items-start gap-4 rounded-xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#122032] group-hover:text-emerald-600">
                          {link.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{link.relevance}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* SSS */}
            {faq && faq.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-[#122032]">Sıkça Sorulan Sorular</h2>
                <div className="mt-6 space-y-4">
                  {faq.map((item, i) => (
                    <details key={i} className="group rounded-xl border bg-white">
                      <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#122032]">
                        {item.question}
                        <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
                      </summary>
                      <div 
                        className="border-t px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground prose prose-sm max-w-none prose-strong:text-[#122032] prose-strong:font-semibold prose-em:text-[#122032] prose-em:not-italic"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <ContentSidebar tocSlot={<TableOfContents />} />
        </div>
      </section>

    </>
  );
}
