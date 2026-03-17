import { Metadata } from "next";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noindex?: boolean;
}

export function generateMetaTags({
  title,
  description,
  keywords,
  canonical,
  ogImage = "/images/og-image.svg",
  ogType = "website",
  twitterCard = "summary_large_image",
  noindex = false,
}: MetaTagsProps): Metadata {
  const baseUrl = "https://kozcuoglunakliyat.com.tr";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  return {
    title,
    description,
    keywords: keywords || "nakliyat, evden eve nakliyat, ankara nakliyat, taşımacılık",
    alternates: {
      canonical: fullCanonical,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
    openGraph: {
      title,
      description,
      url: fullCanonical,
      siteName: "Kozcuoğlu Nakliyat",
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type: ogType as any,
    },
    twitter: {
      card: twitterCard as any,
      title,
      description,
      images: [fullOgImage],
      creator: "@kozcuoglunakliyat",
      site: "@kozcuoglunakliyat",
    },
    verification: {
      google: "google-site-verification-code",
      yandex: "yandex-verification-code",
    },
  };
}

export function generateBlogMetaTags({
  title,
  description,
  slug,
  image,
  publishedAt,
  modifiedAt,
  author,
  category,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  category: string;
  tags?: string[];
}): Metadata {
  const baseUrl = "https://kozcuoglunakliyat.com.tr";
  const canonical = `${baseUrl}/${slug}.html`;
  const ogImage = image || `${baseUrl}/images/og-image.svg`;

  return {
    title,
    description,
    keywords: tags?.join(", ") || category,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Kozcuoğlu Nakliyat Blog",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt || publishedAt,
      authors: [author],
      tags: tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@kozcuoglunakliyat",
    },
    authors: [{ name: author }],
  };
}

export function generateServiceMetaTags({
  title,
  description,
  slug,
  category,
  priceRange,
}: {
  title: string;
  description: string;
  slug: string;
  category: string;
  priceRange?: string;
}): Metadata {
  const baseUrl = "https://kozcuoglunakliyat.com.tr";
  const canonical = `${baseUrl}/${slug}`;

  return {
    title,
    description,
    keywords: `${title}, ${category}, nakliyat hizmeti, ankara`,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Kozcuoğlu Nakliyat",
      images: [
        {
          url: `${baseUrl}/images/og-image.svg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/og-image.svg`],
    },
  };
}

export function generateRegionMetaTags({
  title,
  description,
  slug,
  district,
  city,
}: {
  title: string;
  description: string;
  slug: string;
  district: string;
  city: string;
}): Metadata {
  const baseUrl = "https://kozcuoglunakliyat.com.tr";
  const canonical = `${baseUrl}/${slug}.html`;

  return {
    title,
    description,
    keywords: `${district} nakliyat, ${city} nakliyat, ${district} evden eve nakliyat`,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Kozcuoğlu Nakliyat",
      images: [
        {
          url: `${baseUrl}/images/og-image.svg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/og-image.svg`],
    },
  };
}

// Alt text generator helper
export function generateAltText(filename: string, context?: string): string {
  const cleanName = filename
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[-_]/g, " ") // Replace dashes and underscores with spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize words

  if (context) {
    return `${context} - ${cleanName}`;
  }

  return cleanName;
}

// Canonical URL helper
export function getCanonicalUrl(path: string): string {
  const baseUrl = "https://kozcuoglunakliyat.com.tr";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

// Meta description generator
export function generateMetaDescription(content: string, maxLength = 160): string {
  const cleanContent = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  return cleanContent.substring(0, maxLength - 3) + "...";
}
