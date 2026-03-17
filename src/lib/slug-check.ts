import { readData } from "./db";
import type { Service, Solution, Region, BlogPost, Contract, Page } from "@/types";

const STATIC_SLUGS = [
  "",
  "hizmetlerimiz",
  "esya-depolama",
  "cozumlerimiz",
  "fiyatlarimiz",
  "nakliyat-fiyat-hesaplama",
  "hizmet-bolgeleri",
  "hakkimizda",
  "kurumsal",
  "iletisim",
  "blog",
  "sikca-sorulan-sorular",
  "referanslar",
  "araclarimiz",
  "kampanyalar",
  "tasima-takip",
  "galeri",
  "sozlesmeler",
  "referanslarimiz",
  "gizlilik-politikasi",
  "cerez-politikasi",
  "kvkk-aydinlatma-metni",
  "kullanim-kosullari",
  "teklif-al",
  "tasima-kontrol-listesi",
  "ekibimiz",
  "site-haritasi",
  "insan-kaynaklari",
  "video-galeri",
  "bireysel-referanslar",
  "kurumsal-referanslar",
  "evden-eve-nakliyat-fiyatlari",
  "admin",
  "api",
  "404",
  "offline",
];

export async function isSlugUnique(
  slug: string,
  excludeType?: string,
  excludeId?: string
): Promise<boolean> {
  if (STATIC_SLUGS.includes(slug)) return false;

  const services = await readData<Service[]>("services.json");
  const solutions = await readData<Solution[]>("solutions.json");
  const regions = await readData<Region[]>("regions.json");
  const blogPosts = await readData<BlogPost[]>("blog-posts.json");
  const contracts = await readData<Contract[]>("contracts.json");
  const pages = await readData<Page[]>("pages.json");

  const allSlugs: { type: string; id: string; slug: string }[] = [
    ...services.map((s) => ({ type: "service", id: s.id, slug: s.slug })),
    ...solutions.map((s) => ({ type: "solution", id: s.id, slug: s.slug })),
    ...regions.map((r) => ({ type: "region", id: r.id, slug: r.slug })),
    ...blogPosts.map((b) => ({ type: "blog", id: b.id, slug: b.slug })),
    ...contracts.map((c) => ({ type: "contract", id: c.id, slug: c.slug })),
    ...pages.filter((p) => p.slug && p.slug !== "/").map((p) => ({ type: "page", id: p.id, slug: p.slug })),
  ];

  return !allSlugs.some(
    (item) =>
      item.slug === slug &&
      !(item.type === excludeType && item.id === excludeId)
  );
}
