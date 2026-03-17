import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { readData } from "@/lib/db";
import type { Service, Solution, Region, Settings, Campaign, Review, BlogPost, Client, Page } from "@/types";
import type { Metadata } from "next";
import { Shield, Clock, Award, Truck, Phone, MessageCircle, ArrowRight, Star, ChevronRight, Package, CheckCircle, Home, Building2, Sofa, MapPin, Headphones, BadgeCheck, Calculator } from "lucide-react";
import { getServiceIcon } from "@/lib/service-icons";
import JsonLd from "@/components/site/json-ld";
import { organizationSchema, movingCompanySchema, webSiteSchema, siteNavigationSchema, breadcrumbSchema, faqSchema, speakableSchema } from "@/lib/schemas";
import Breadcrumb from "@/components/site/breadcrumb";

// Dynamic imports for below-the-fold content
const FaqSection = dynamic(() => import("@/components/site/faq-section").then(mod => ({ default: mod.FaqSection })));
const HomeClientSections = dynamic(() => import("@/components/site/home-client-sections"));
const HeroPriceCalculator = dynamic(() => import("@/components/site/hero-price-calculator"));
const QuotableStats = dynamic(() => import("@/components/site/quotable-stats").then(mod => ({ default: mod.QuotableStats })));

export async function generateMetadata(): Promise<Metadata> {
  const pages = await readData<Page[]>("pages.json");
  const hp = pages.find((p) => p.id === "homepage");
  const seo = hp?.seo;
  return {
    title: {
      absolute: seo?.title || "İstanbul Evden Eve Nakliye | Ev Taşıma Hizmetleri",
    },
    description: seo?.description || "İstanbul evden eve nakliyat, ofis taşıma, eşya depolama hizmetleri. Sigortalı taşımacılık, profesyonel ekip. 7/24 hizmet. ☎ 444 7 436",
    alternates: { canonical: "/" },
    openGraph: {
      title: seo?.title || "İstanbul Evden Eve Nakliyat - Kozcuoğlu Nakliyat",
      description: seo?.description || "İstanbul evden eve nakliyat hizmetleri.",
      url: "/",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

async function getHomeData() {
  const [services, solutions, regions, settings, campaigns, reviews, blog, clients, pages] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Solution[]>("solutions.json"),
    readData<Region[]>("regions.json"),
    readData<Settings>("settings.json"),
    readData<Campaign[]>("campaigns.json"),
    readData<Review[]>("reviews.json"),
    readData<BlogPost[]>("blog-posts.json"),
    readData<Client[]>("clients.json"),
    readData<Page[]>("pages.json"),
  ]);

  const homepage = pages.find((p) => p.id === "homepage");

  // Tüm hizmetlerden SSS'leri topla
  const allFaqs: { q: string; a: string; service: string }[] = [];
  services.filter(s => s.isActive && s.faq && s.faq.length > 0).forEach(service => {
    service.faq.forEach(faqItem => {
      allFaqs.push({
        q: faqItem.question,
        a: faqItem.answer,
        service: service.title
      });
    });
  });

  return {
    services: services.filter((s) => s.isActive && s.showOnHomepage !== false).sort((a, b) => a.order - b.order),
    solutions: solutions.filter((s) => s.isActive).sort((a, b) => a.order - b.order),
    regions: regions.filter((r) => r.isActive),
    settings,
    activeCampaign: campaigns.find((c) => c.isActive && new Date(c.validThrough) > new Date()),
    reviews: reviews.filter((r) => r.status === "approved").slice(0, 6),
    recentBlog: blog.filter((b) => b.isPublished).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3),
    clients: clients.filter((c) => c.isActive).sort((a, b) => a.order - b.order),
    homepage,
    allFaqs,
  };
}

const PROCESS_STEPS = [
  { title: "Keşif", desc: "Ücretsiz adresinize gelinir" },
  { title: "Teklif", desc: "Detaylı fiyat teklifi" },
  { title: "Onay", desc: "Teklif onaylanır" },
  { title: "Paketleme", desc: "Profesyonel ambalajlama" },
  { title: "Yükleme", desc: "Özenli yükleme" },
  { title: "Taşıma", desc: "Güvenli nakliye" },
  { title: "Boşaltma", desc: "Dikkatli boşaltma" },
  { title: "Teslim", desc: "Eksiksiz teslim" },
];

const WHY_US = [
  { icon: Shield, title: "Sigortalı Taşıma", desc: "Tüm eşyalarınız sigorta kapsamında" },
  { icon: Award, title: "20+ Yıl Deneyim", desc: "Sektörün tecrübeli firması" },
  { icon: Truck, title: "50+ Araç Filosu", desc: "Her boyutta araç mevcuttur" },
  { icon: Clock, title: "7/24 Destek", desc: "Her an yanınızdayız" },
  { icon: CheckCircle, title: "Lisanslı Firma", desc: "Resmi belgeli nakliyat" },
  { icon: Package, title: "Profesyonel Ekip", desc: "Eğitimli ve deneyimli personel" },
];

export default async function HomePage() {
  const { services, solutions, regions, settings, activeCampaign, reviews, recentBlog, clients, homepage, allFaqs } = await getHomeData();

  const heroBackground = (homepage?.sections?.hero?.backgroundImage as string) || "";
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "4.9";

  const allReviews = reviews;
  const totalReviewCount = allReviews.length;
  const orgSchema = organizationSchema();
  const movingSchema = movingCompanySchema();
  const websiteSchema = webSiteSchema();
  const breadcrumb = breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }]);
  const siteNav = siteNavigationSchema();

  const howToSchema = {
    "@type": "HowTo",
    "@id": "https://kozcuoglunakliyat.com.tr/#howto-moving-process",
    name: "Kozcuoğlu Nakliyat 8 Aşamalı Güvenli Taşıma Süreci",
    description: "Profesyonel nakliyat sürecimiz 8 aşamadan oluşur: Keşif, teklif, onay, paketleme, yükleme, taşıma, boşaltma ve teslim.",
    totalTime: "PT4H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "TRY",
      value: "5000-25000",
    },
    step: PROCESS_STEPS.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.title,
      text: step.desc,
      url: `https://kozcuoglunakliyat.com.tr/#step-${idx + 1}`,
    })),
  };

  const homeSchemas = {
    "@context": "https://schema.org",
    "@graph": [
      orgSchema,
      movingSchema,
      websiteSchema,
      {
        "@type": "WebPage",
        "@id": "https://kozcuoglunakliyat.com.tr/#webpage",
        name: "Kozcuoğlu Nakliyat - İstanbul Evden Eve Nakliyat",
        description: "İstanbul evden eve nakliyat, ofis taşıma, eşya depolama. 20+ yıl deneyim, sigortalı taşımacılık.",
        url: "https://kozcuoglunakliyat.com.tr",
        isPartOf: { "@id": "https://kozcuoglunakliyat.com.tr/#website" },
        about: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        publisher: { "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
        inLanguage: "tr",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".intro-text", "h2"],
        },
        ...(totalReviewCount > 0 ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating,
            reviewCount: String(totalReviewCount),
            bestRating: "5",
            worstRating: "1",
          },
        } : {}),
      },
      howToSchema,
      breadcrumb,
      siteNav,
    ],
  };

  return (
    <>
      <JsonLd data={homeSchemas} />
      {/* 1. Hero */}
      <section className="relative bg-[#122032] py-20 text-white md:py-24 lg:py-28">
        {heroBackground && (
          <Image
            src={heroBackground}
            alt=""
            fill
            className="object-cover opacity-20"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={70}
          />
        )}
        <div className="relative mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Sol Taraf - İçerik */}
            <div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {homepage?.sections?.hero?.title || "İstanbul Evden Eve Nakliyat"}
              </h1>
              {homepage?.sections?.hero?.content ? (
                <div className="mt-4 text-lg leading-relaxed text-gray-300 prose-invert prose max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white prose-a:text-[#e3000f]" dangerouslySetInnerHTML={{ __html: homepage.sections.hero.content as string }} />
              ) : (
                <p className="mt-4 text-lg leading-relaxed text-gray-300">Kozcuoğlu Nakliyat ile güvenli, sigortalı ve profesyonel taşıma hizmeti. 20 yılı aşkın tecrübe ile yanınızdayız.</p>
              )}
              <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-3">
                <Link href={homepage?.sections?.hero?.button1Link || "/iletisim"} aria-label="Ücretsiz ekspertiz talebi için iletişim sayfasına git" className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#e3000f] px-3 py-3 text-sm font-medium text-white transition hover:bg-[#c5000d] sm:gap-2 sm:px-6 sm:text-base">
                  <span className="truncate">{homepage?.sections?.hero?.button1Text || "Ücretsiz Ekspertiz"}</span> <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                </Link>
                <a href={homepage?.sections?.hero?.button2Link || "tel:4447436"} className="inline-flex items-center justify-center gap-1 rounded-lg border border-white/30 px-3 py-3 text-sm font-medium text-white transition hover:bg-white/10 sm:gap-2 sm:px-6 sm:text-base">
                  <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> <span className="truncate">{homepage?.sections?.hero?.button2Text || "444 7 436"}</span>
                </a>
                <a href={settings.nap.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#25D366] px-3 py-3 text-sm font-medium text-white transition hover:bg-[#20bd5a] sm:gap-2 sm:px-6 sm:text-base">
                  <MessageCircle className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> <span className="truncate">{homepage?.sections?.hero?.button3Text || "WhatsApp"}</span>
                </a>
                <Link href={homepage?.sections?.hero?.button4Link || "/nakliyat-fiyat-hesaplama"} aria-label="Nakliyat fiyat hesaplama sayfasına git" className="inline-flex items-center justify-center gap-1 rounded-lg border-2 border-white bg-white/20 px-3 py-3 text-sm font-medium text-white transition hover:bg-white/30 sm:gap-2 sm:px-6 sm:text-base">
                  <Calculator className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> <span className="truncate">{homepage?.sections?.hero?.button4Text || "Fiyat Hesapla"}</span>
                </Link>
              </div>
            </div>

            {/* Sağ Taraf - Fiyat Hesaplama */}
            <div className="lg:flex lg:items-center">
              <HeroPriceCalculator />
            </div>
          </div>
          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {(homepage?.sections?.trustBadges?.items as {label:string;icon?:string}[] || [
              { label: "Sözleşmeli Nakliyat" },
              { label: "Sigortalı Taşıma" },
              { label: "Lisanslı Firma" },
              { label: "20+ Yıl Deneyim" },
            ]).map((b, i) => {
              const BADGE_ICONS = [CheckCircle, Shield, BadgeCheck, Award];
              const Icon = BADGE_ICONS[i % BADGE_ICONS.length];
              return (
                <div key={b.label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
                  <Icon className="h-5 w-5 text-[#e3000f]" />
                  <span className="text-sm font-medium">{b.label}</span>
                </div>
              );
            })}
          </div>

          {/* Referans Logoları */}
          {clients.length > 0 && (
            <div className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Referanslarımız</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {clients.slice(0, 6).map((c) => (
                  <div key={c.id} className="group">
                    {c.logo ? (
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={120}
                        height={40}
                        className="h-8 w-auto object-contain brightness-0 invert opacity-40 transition-opacity duration-300 group-hover:opacity-100 md:h-10"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white/40 transition-opacity group-hover:text-white/100">{c.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges İçerik */}
      {homepage?.sections?.trustBadges?.content && (
        <section className="py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
            {homepage?.sections?.trustBadges?.title && (
              <h2 className="mb-6 text-2xl font-bold text-[#122032] md:text-3xl text-center">{homepage.sections.trustBadges.title}</h2>
            )}
            <div
              className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: homepage.sections.trustBadges.content as string }}
            />
          </div>
        </section>
      )}

      {/* 2. Kampanya Banner */}
      {activeCampaign && (
        <section className="bg-[#e3000f] py-4 text-white">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="rounded bg-white/40 px-2 py-0.5 text-xs font-bold">KAMPANYA</span>
              <span className="text-sm font-medium">{activeCampaign.title} — %{activeCampaign.discountValue} indirim</span>
            </div>
            <Link href="/kampanyalar" className="text-sm font-medium underline">Detay</Link>
          </div>
        </section>
      )}

      {/* 3. Intro */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {homepage?.sections?.intro?.title && (
            <h2 className="mb-6 text-2xl font-bold text-[#122032] md:text-3xl">
              {homepage.sections.intro.title}
            </h2>
          )}
          {homepage?.sections?.intro?.content ? (
            <div
              className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: homepage.sections.intro.content }}
            />
          ) : (
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Kozcuoğlu Nakliyat olarak 20 yılı aşkın tecrübemizle İstanbul ve tüm Türkiye&apos;de profesyonel nakliyat hizmeti sunuyoruz.
            </p>
          )}
        </div>
      </section>

      {/* 4. Hizmetlerimiz */}
      <section className="bg-[#f5f5f5] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">{homepage?.sections?.services?.title || "Hizmetlerimiz"}</h2>
            <p className="mt-2 text-muted-foreground">{homepage?.sections?.services?.content || "Profesyonel nakliyat ve taşıma hizmetlerimiz"}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {services.map((s, i) => {
              const isLastOdd = services.length % 2 !== 0 && i === services.length - 1;
              const ServiceIcon = getServiceIcon(s.slug);
              return (
                <Link key={s.id} href={`/${s.slug}`} className={`group rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg${isLastOdd ? " hidden sm:flex sm:flex-col" : ""}`}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fef2f2] text-[#e3000f]">
                    <ServiceIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-[#122032] group-hover:text-[#e3000f]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.shortDescription || s.description.slice(0, 120)}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#e3000f]">
                    Detaylı Bilgi <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/hizmetlerimiz" className="inline-flex items-center gap-2 rounded-lg border border-[#e3000f] px-6 py-3 text-sm font-medium text-[#e3000f] transition hover:bg-[#e3000f] hover:text-white">
              Tüm Hizmetlerimiz <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {homepage?.sections?.servicesContent?.content && (
            <div className="mt-12">
              <div
                className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: homepage.sections.servicesContent.content }}
              />
            </div>
          )}
        </div>
      </section>

      {/* 5. Rakamlarla Kozcuoğlu - Quotable Statistics */}
      <QuotableStats />

      {/* 6. Neden Biz */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">{homepage?.sections?.whyUs?.title || "Neden Kozcuoğlu Nakliyat?"}</h2>
            <p className="mt-2 text-muted-foreground">{homepage?.sections?.whyUs?.content || "Bizi tercih etmeniz için 6 önemli neden"}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <div key={item.title} className="flex flex-col gap-3 rounded-xl border p-4 transition hover:shadow-md sm:flex-row sm:gap-4 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#e3000f]">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#122032]">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {homepage?.sections?.whyUsContent?.content && (
            <div className="mt-12">
              <div
                className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: homepage.sections.whyUsContent.content }}
              />
            </div>
          )}
        </div>
      </section>

      {/* 7. Surec */}
      <section className="bg-[#f5f5f5] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">{homepage?.sections?.process?.title || "Taşıma Sürecimiz"}</h2>
            <p className="mt-2 text-muted-foreground">{homepage?.sections?.process?.content || "8 adımda profesyonel nakliyat"}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="relative rounded-xl bg-white p-4 text-center shadow-sm md:p-5">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#e3000f] text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-[#122032]">{step.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          {homepage?.sections?.processContent?.content && (
            <div className="mt-12">
              <div
                className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: homepage.sections.processContent.content }}
              />
            </div>
          )}
        </div>
      </section>

      {/* 8. Cozumlerimiz */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">{homepage?.sections?.solutions?.title || "Çözümlerimiz"}</h2>
            <p className="mt-2 text-muted-foreground">{homepage?.sections?.solutions?.content || "Özel ihtiyaçlarınız için çözümlerimiz"}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {solutions.map((s, i) => (
              <Link key={s.id} href={`/${s.slug}`} className={`group rounded-xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg${i >= 4 ? " lg:hidden" : ""}`}>
                <h3 className="font-semibold text-[#122032] group-hover:text-[#e3000f]">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description.slice(0, 100)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#e3000f]">
                  Detay <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Hizmet Bolgeleri */}
      <section className="bg-[#f5f5f5] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">{homepage?.sections?.regions?.title || "Hizmet Bölgelerimiz"}</h2>
            <p className="mt-2 text-muted-foreground">{homepage?.sections?.regions?.content || "İstanbul ve tüm Türkiye'de hizmetinizdeyiz"}</p>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {regions.slice(0, 12).map((r) => (
              <Link key={r.id} href={`/${r.slug}.html`} className="group relative overflow-hidden rounded-xl border bg-white pt-0 shadow-sm transition hover:shadow-lg">
                <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-[#122032] to-[#1a3050]">
                  {r.image && <Image src={r.image} alt={r.title} fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" className="object-cover opacity-100 transition group-hover:scale-105 group-hover:opacity-60" loading="lazy" />}
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#122032] transition group-hover:text-[#e3000f]">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.description || `${r.title} nakliyat hizmeti`}</p>
                </div>
              </Link>
            ))}
          </div>
          {regions.length > 12 && (
            <div className="mt-8 text-center">
              <Link href="/hizmet-bolgeleri" className="inline-flex items-center gap-1 rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#c5000d]">
                Tüm Bölgeler ({regions.length}) <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
          {homepage?.sections?.regionsContent?.content && (
            <div className="mt-12">
              <div
                className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: homepage.sections.regionsContent.content }}
              />
            </div>
          )}
        </div>
      </section>

      {/* 11. Istatistikler */}
      <HomeClientSections
        reviews={reviews}
        avgRating={avgRating}
        clients={clients}
        recentBlog={recentBlog}
      />

      {/* 15. SSS */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <FaqSection 
            faqs={allFaqs}
            title={homepage?.sections?.faq?.title || "Sıkça Sorulan Sorular"}
            description={homepage?.sections?.faq?.content || `Tüm hizmetlerimiz hakkında ${allFaqs.length} soru-cevap`}
          />
        </div>
      </section>

      {/* 20. SEO Text */}
      {homepage?.sections?.seoText?.content && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
            <div
              className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: homepage.sections.seoText.content }}
            />
          </div>
        </section>
      )}
    </>
  );
}
