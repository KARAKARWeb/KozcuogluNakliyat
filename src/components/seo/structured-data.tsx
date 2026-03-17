import Script from "next/script";

interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  url: string;
  image?: string;
  priceRange?: string;
  openingHours?: string[];
}

export function LocalBusinessSchema(props: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": props.url,
    name: props.name,
    description: props.description,
    url: props.url,
    telephone: props.telephone,
    email: props.email,
    image: props.image,
    priceRange: props.priceRange || "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: props.address.streetAddress,
      addressLocality: props.address.addressLocality,
      addressRegion: props.address.addressRegion,
      postalCode: props.address.postalCode,
      addressCountry: props.address.addressCountry,
    },
    openingHoursSpecification: props.openingHours?.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours,
      opens: "08:00",
      closes: "18:00",
    })),
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  url: string;
  image?: string;
  priceRange?: string;
}

export function ServiceSchema(props: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: props.name,
    description: props.description,
    provider: {
      "@type": "LocalBusiness",
      name: props.provider,
    },
    areaServed: {
      "@type": "City",
      name: props.areaServed,
    },
    url: props.url,
    image: props.image,
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "TRY",
        price: props.priceRange || "0",
      },
    },
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  publisher: string;
  url: string;
}

export function ArticleSchema(props: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.headline,
    description: props.description,
    image: props.image,
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    author: {
      "@type": "Person",
      name: props.author,
    },
    publisher: {
      "@type": "Organization",
      name: props.publisher,
      logo: {
        "@type": "ImageObject",
        url: `${props.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": props.url,
    },
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ReviewSchemaProps {
  itemReviewed: string;
  author: string;
  reviewRating: number;
  reviewBody: string;
  datePublished: string;
}

export function ReviewSchema(props: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Service",
      name: props.itemReviewed,
    },
    author: {
      "@type": "Person",
      name: props.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: props.reviewRating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: props.reviewBody,
    datePublished: props.datePublished,
  };

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface AggregateRatingSchemaProps {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export function AggregateRatingSchema(props: AggregateRatingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: props.itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: props.ratingValue,
      reviewCount: props.reviewCount,
      bestRating: props.bestRating || 5,
      worstRating: props.worstRating || 1,
    },
  };

  return (
    <Script
      id="aggregate-rating-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: {
        "@type": "WebPage",
        "@id": item.url,
      },
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export function OrganizationSchema(props: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: props.name,
    url: props.url,
    logo: props.logo,
    description: props.description,
    telephone: props.telephone,
    email: props.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: props.address.streetAddress,
      addressLocality: props.address.addressLocality,
      addressRegion: props.address.addressRegion,
      postalCode: props.address.postalCode,
      addressCountry: props.address.addressCountry,
    },
    sameAs: props.sameAs,
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
