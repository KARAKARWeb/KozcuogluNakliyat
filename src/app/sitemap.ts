import type { MetadataRoute } from "next";
import { readData } from "@/lib/db";
import type { Service, Solution, Region, BlogPost, Contract, Policy, Settings } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kozcuoglunakliyat.com.tr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, solutions, regions, blog, contracts, policies, pricingPages, settings] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Solution[]>("solutions.json"),
    readData<Region[]>("regions.json"),
    readData<BlogPost[]>("blog-posts.json"),
    readData<Contract[]>("contracts.json"),
    readData<Policy[]>("policies.json"),
    readData<any[]>("pricing-pages.json"),
    readData<Settings>("settings.json"),
  ]);

  const BUILD_DATE = new Date("2026-02-14");

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: BUILD_DATE, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/hizmetlerimiz`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/cozumlerimiz`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/hizmet-bolgeleri`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/fiyatlarimiz`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/nakliyat-fiyat-hesaplama`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/esya-depolama`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: BUILD_DATE, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/hakkimizda`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/kurumsal`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/iletisim`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/sikca-sorulan-sorular`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/referanslar`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/araclarimiz`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/kampanyalar`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/galeri`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/sozlesmeler`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/referanslarimiz`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/tasima-kontrol-listesi`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/ekibimiz`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/site-haritasi`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/insan-kaynaklari`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/video-galeri`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/bireysel-referanslar`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/kurumsal-referanslar`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/teklif-al`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tasima-takip`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/evden-eve-nakliyat-fiyatlari`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/gizlilik-politikasi`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cerez-politikasi`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/kvkk-aydinlatma-metni`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/kullanim-kosullari`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services
    .filter((s) => s.isActive)
    .map((s) => ({
      url: `${SITE_URL}/${s.slug}`,
      lastModified: new Date(s.updatedAt || s.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      ...(s.image ? { images: [s.image.startsWith("http") ? s.image : `${SITE_URL}${s.image}`] } : {}),
    }));

  const solutionPages: MetadataRoute.Sitemap = solutions
    .filter((s) => s.isActive)
    .map((s) => ({
      url: `${SITE_URL}/${s.slug}`,
      lastModified: new Date(s.updatedAt || s.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      ...(s.image ? { images: [s.image.startsWith("http") ? s.image : `${SITE_URL}${s.image}`] } : {}),
    }));

  const regionPages: MetadataRoute.Sitemap = regions
    .filter((r) => r.isActive)
    .map((r) => ({
      url: `${SITE_URL}/${r.slug}.html`,
      lastModified: new Date(r.updatedAt || r.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      ...(r.image ? { images: [r.image.startsWith("http") ? r.image : `${SITE_URL}${r.image}`] } : {}),
    }));

  const blogPages: MetadataRoute.Sitemap = blog
    .filter((b) => b.isPublished)
    .map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(b.image ? { images: [b.image.startsWith("http") ? b.image : `${SITE_URL}${b.image}`] } : {}),
    }));

  const contractPages: MetadataRoute.Sitemap = contracts
    .filter((c) => c.isActive)
    .map((c) => ({
      url: `${SITE_URL}/${c.slug}`,
      lastModified: new Date(c.updatedAt || c.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }));

  const policyPages: MetadataRoute.Sitemap = policies.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const pricingPagesMap: MetadataRoute.Sitemap = pricingPages
    .filter((p: any) => p.isActive)
    .map((p: any) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const categoryPages: MetadataRoute.Sitemap = (settings.serviceCategories || [])
    .map((c) => ({
      url: `${SITE_URL}/hizmetlerimiz/${c.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...servicePages, ...solutionPages, ...regionPages, ...blogPages, ...contractPages, ...policyPages, ...pricingPagesMap, ...categoryPages];
}
