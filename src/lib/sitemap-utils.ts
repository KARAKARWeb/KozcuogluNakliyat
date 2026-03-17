import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const BASE_URL = "https://kozcuoglunakliyat.com.tr";

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export interface ImageSitemapEntry {
  url: string;
  images: {
    loc: string;
    title?: string;
    caption?: string;
  }[];
}

// Generate image sitemap entries
export function generateImageSitemap(): ImageSitemapEntry[] {
  const entries: ImageSitemapEntry[] = [];

  try {
    // Blog images
    const blogPath = path.join(DATA_DIR, "blog.json");
    if (fs.existsSync(blogPath)) {
      const blogs = JSON.parse(fs.readFileSync(blogPath, "utf-8"));
      blogs.forEach((blog: any) => {
        if (blog.image) {
          entries.push({
            url: `${BASE_URL}/${blog.slug}.html`,
            images: [
              {
                loc: blog.image.startsWith("http") ? blog.image : `${BASE_URL}${blog.image}`,
                title: blog.title,
                caption: blog.excerpt,
              },
            ],
          });
        }
      });
    }

    // Service images
    const servicesPath = path.join(DATA_DIR, "services.json");
    if (fs.existsSync(servicesPath)) {
      const services = JSON.parse(fs.readFileSync(servicesPath, "utf-8"));
      services.forEach((service: any) => {
        if (service.image) {
          entries.push({
            url: `${BASE_URL}/${service.slug}`,
            images: [
              {
                loc: service.image.startsWith("http") ? service.image : `${BASE_URL}${service.image}`,
                title: service.title,
              },
            ],
          });
        }
      });
    }
  } catch (error) {
    console.error("Error generating image sitemap:", error);
  }

  return entries;
}

// Generate news sitemap entries (last 2 days)
export function generateNewsSitemap(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  try {
    const blogPath = path.join(DATA_DIR, "blog.json");
    if (fs.existsSync(blogPath)) {
      const blogs = JSON.parse(fs.readFileSync(blogPath, "utf-8"));
      blogs.forEach((blog: any) => {
        const publishDate = new Date(blog.publishedAt || blog.createdAt);
        if (publishDate >= twoDaysAgo && blog.isPublished) {
          entries.push({
            url: `${BASE_URL}/${blog.slug}.html`,
            lastModified: publishDate,
            changeFrequency: "daily",
            priority: 0.9,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error generating news sitemap:", error);
  }

  return entries;
}

// Generate dynamic sitemap entries
export function generateDynamicSitemap(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  try {
    // Blog posts
    const blogPath = path.join(DATA_DIR, "blog.json");
    if (fs.existsSync(blogPath)) {
      const blogs = JSON.parse(fs.readFileSync(blogPath, "utf-8"));
      blogs.forEach((blog: any) => {
        if (blog.isPublished) {
          entries.push({
            url: `${BASE_URL}/${blog.slug}.html`,
            lastModified: new Date(blog.updatedAt || blog.publishedAt || blog.createdAt),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
    }

    // Services
    const servicesPath = path.join(DATA_DIR, "services.json");
    if (fs.existsSync(servicesPath)) {
      const services = JSON.parse(fs.readFileSync(servicesPath, "utf-8"));
      services.forEach((service: any) => {
        if (service.isActive) {
          entries.push({
            url: `${BASE_URL}/${service.slug}`,
            lastModified: new Date(service.updatedAt || service.createdAt),
            changeFrequency: "monthly",
            priority: 0.8,
          });
        }
      });
    }

    // Solutions
    const solutionsPath = path.join(DATA_DIR, "solutions.json");
    if (fs.existsSync(solutionsPath)) {
      const solutions = JSON.parse(fs.readFileSync(solutionsPath, "utf-8"));
      solutions.forEach((solution: any) => {
        if (solution.isActive) {
          entries.push({
            url: `${BASE_URL}/${solution.slug}`,
            lastModified: new Date(solution.updatedAt || solution.createdAt),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      });
    }

    // Regions
    const regionsPath = path.join(DATA_DIR, "regions.json");
    if (fs.existsSync(regionsPath)) {
      const regions = JSON.parse(fs.readFileSync(regionsPath, "utf-8"));
      regions.forEach((region: any) => {
        if (region.isActive) {
          entries.push({
            url: `${BASE_URL}/${region.slug}.html`,
            lastModified: new Date(region.updatedAt || region.createdAt),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return entries;
}

// Generate sitemap index
export function generateSitemapIndex(): string[] {
  return [
    `${BASE_URL}/sitemap.xml`,
    `${BASE_URL}/sitemap-images.xml`,
    `${BASE_URL}/sitemap-news.xml`,
  ];
}

// Format sitemap XML
export function formatSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ""}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ""}
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Format image sitemap XML
export function formatImageSitemapXML(entries: ImageSitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    ${entry.images
      .map(
        (img) => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      ${img.title ? `<image:title>${img.title}</image:title>` : ""}
      ${img.caption ? `<image:caption>${img.caption}</image:caption>` : ""}
    </image:image>`
      )
      .join("")}
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

// Format sitemap index XML
export function formatSitemapIndexXML(sitemaps: string[]): string {
  const sitemapEntries = sitemaps
    .map(
      (sitemap) => `
  <sitemap>
    <loc>${sitemap}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}
