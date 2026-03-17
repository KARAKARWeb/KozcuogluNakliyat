const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kozcuoglunakliyat.com.tr";

const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Kozcuoğlu Nakliyat",
  alternateName: ["Kozcuoğlu Evden Eve Nakliyat", "Kozcuoğlu Nakliyat Firması"],
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+90-444-7-436",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: "Turkish",
      contactOption: "TollFree",
    },
    {
      "@type": "ContactPoint",
      telephone: "+90-216-494-53-37",
      contactType: "sales",
      areaServed: "TR",
      availableLanguage: "Turkish",
    },
    {
      "@type": "ContactPoint",
      telephone: "+90-532-138-49-79",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: "Turkish",
      contactOption: "HearingImpairedSupported",
    },
  ],
  sameAs: [
    "https://www.facebook.com/kozcuoglunakliyat",
    "https://www.instagram.com/kozcuoglunakliyat",
    "https://www.youtube.com/kozcuoglunakliyat",
    "https://twitter.com/kozcuoglunakliyat",
    "https://www.tiktok.com/@kozcuoglunakliyat",
    "https://tr.pinterest.com/kozcuoglunakliyat",
    "https://g.page/kozcuoglunakliyat",
    "https://tr.linkedin.com/company/kozcuoglunakliyat",
    "https://www.google.com/maps/place/Kozcuoğlu+Nakliyat",
    "https://www.sikayetvar.com/kozcuoglu-nakliyat",
    "https://www.sahibinden.com/firma/kozcuoglu-nakliyat",
    "https://www.wikidata.org/wiki/Q123456789",
  ],
  knowsAbout: [
    "Evden Eve Nakliyat",
    "Ofis Taşıma",
    "Eşya Depolama",
    "Şehirler Arası Nakliyat",
    "Parça Eşya Taşıma",
    "Asansörlü Nakliyat",
    "Sigortalı Taşımacılık",
    "Ambalajlama ve Paketleme",
    "Mobilya Montaj Demontaj",
  ],
};

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Kaynarca Mah. Bahattin Veled Cad. No:37",
  addressLocality: "Pendik",
  addressRegion: "İstanbul",
  postalCode: "34890",
  addressCountry: "TR",
};

const GEO = {
  "@type": "GeoCoordinates",
  latitude: "40.8775",
  longitude: "29.2333",
};

const PROVIDER = {
  "@type": "MovingCompany",
  name: "Kozcuoğlu Nakliyat",
  url: SITE_URL,
  telephone: "+90-444-7-436",
  address: ADDRESS,
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    ...ORGANIZATION,
  };
}

export function movingCompanySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${SITE_URL}/#movingcompany`,
    name: "Kozcuoğlu Nakliyat",
    alternateName: ["Kozcuoğlu Evden Eve Nakliyat", "Kozcuoğlu Nakliyat Firması"],
    image: [
      `${SITE_URL}/images/logo.png`,
      `${SITE_URL}/images/kozcuoglu-nakliyat-arac.jpg`,
      `${SITE_URL}/images/kozcuoglu-nakliyat-ekip.jpg`,
    ],
    url: SITE_URL,
    telephone: "+90-444-7-436",
    email: "info@kozcuoglunakliyat.com.tr",
    address: ADDRESS,
    geo: GEO,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "₺₺₺",
    areaServed: [
      { "@type": "City", name: "İstanbul" },
      { "@type": "Country", name: "Turkey" },
    ],
    knowsAbout: [
      "Evden Eve Nakliyat",
      "Ofis Taşıma",
      "Eşya Depolama",
      "Şehirler Arası Nakliyat",
      "Parça Eşya Taşıma",
      "Asansörlü Nakliyat",
      "Sigortalı Taşımacılık",
    ],
    sameAs: ORGANIZATION.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nakliyat Hizmetleri",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Evden Eve Nakliyat" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ofis Taşıma" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ev Taşıma" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Parça Eşya Taşıma" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Eşya Depolama" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Şehirler Arası Nakliyat" } },
      ],
    },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kozcuoğlu Nakliyat",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}` } : {}),
    })),
  };
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  if (!questions || questions.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  category?: string;
  aggregateRating?: { ratingValue: string; reviewCount: string };
  offers?: { lowPrice: string; highPrice: string; priceCurrency?: string };
  reviews?: { author: string; ratingValue: string; reviewBody: string; datePublished?: string }[];
  alternateName?: string[];
}) {
  const serviceId = opts.slug.startsWith("/") ? opts.slug : `/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${serviceId}#service`,
    additionalType: "https://schema.org/MovingCompany",
    name: opts.name,
    ...(opts.alternateName && opts.alternateName.length > 0 ? { alternateName: opts.alternateName } : {}),
    description: opts.description,
    url: `${SITE_URL}${serviceId}`,
    ...(opts.image ? { image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}` } : {}),
    serviceType: opts.name,
    category: opts.category || "Nakliyat Hizmetleri",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "İstanbul" },
      { "@type": "Country", name: "Turkey" },
    ],
    termsOfService: `${SITE_URL}/kullanim-kosullari`,
    ...(opts.offers
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: opts.name },
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  priceCurrency: opts.offers.priceCurrency || "TRY",
                  minPrice: opts.offers.lowPrice,
                  maxPrice: opts.offers.highPrice,
                },
              },
            ],
          },
        }
      : {}),
    ...(opts.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: opts.aggregateRating.ratingValue,
            reviewCount: opts.aggregateRating.reviewCount,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
    ...(opts.reviews && opts.reviews.length > 0
      ? {
          review: opts.reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            reviewRating: { "@type": "Rating", ratingValue: r.ratingValue, bestRating: "5", worstRating: "1" },
            reviewBody: r.reviewBody,
            datePublished: r.datePublished || new Date().toISOString().split("T")[0],
          })),
        }
      : {}),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  const articleUrl = opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: opts.headline,
    description: opts.description,
    ...(opts.image ? { image: opts.image } : {}),
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: opts.author || "Kozcuoğlu Nakliyat",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Kozcuoğlu Nakliyat",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function selfStorageSchema(opts?: {
  aggregateRating?: { ratingValue: string; reviewCount: string };
  reviews?: { author: string; ratingValue: string; reviewBody: string; datePublished?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SelfStorage",
    name: "Kozcuoğlu Eşya Depolama",
    description: "İstanbul Pendik'te güvenli eşya depolama tesisi. 7/24 kamera, nem kontrolü, sigorta güvencesi.",
    url: `${SITE_URL}/esya-depolama`,
    image: [
      `${SITE_URL}/images/depolama-tesis-1.jpg`,
      `${SITE_URL}/images/depolama-tesis-2.jpg`,
      `${SITE_URL}/images/depolama-tesis-3.jpg`,
    ],
    telephone: "+90-444-7-436",
    email: "info@kozcuoglunakliyat.com.tr",
    address: ADDRESS,
    geo: GEO,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "₺₺",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "7/24 Kamera Güvenliği", value: true },
      { "@type": "LocationFeatureSpecification", name: "Nem Kontrolü", value: true },
      { "@type": "LocationFeatureSpecification", name: "Yangın Algılama Sistemi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sigorta Güvencesi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ücretsiz Nakliye", value: true },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Depolama Birimleri",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Küçük Birim (5m²)" },
          priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "TRY", price: "3500", unitCode: "MON", unitText: "aylık" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Orta Birim (10m²)" },
          priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "TRY", price: "6000", unitCode: "MON", unitText: "aylık" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Büyük Birim (20m²)" },
          priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "TRY", price: "10000", unitCode: "MON", unitText: "aylık" },
        },
      ],
    },
    ...(opts?.aggregateRating
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: opts.aggregateRating.ratingValue, reviewCount: opts.aggregateRating.reviewCount, bestRating: "5", worstRating: "1" },
        }
      : {}),
    ...(opts?.reviews && opts.reviews.length > 0
      ? {
          review: opts.reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            reviewRating: { "@type": "Rating", ratingValue: r.ratingValue, bestRating: "5", worstRating: "1" },
            reviewBody: r.reviewBody,
            datePublished: r.datePublished || new Date().toISOString().split("T")[0],
          })),
        }
      : {}),
  };
}

export function softwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Nakliyat Fiyat Hesaplama",
    description: "Online nakliyat fiyat hesaplama aracı.",
    url: `${SITE_URL}/nakliyat-fiyat-hesaplama`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Nakliyat Fiyat Hesaplama Aracı",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "TRY",
        description: "Ücretsiz nakliyat fiyat hesaplama",
      },
      creator: {
        "@type": "MovingCompany",
        name: "Kozcuoğlu Nakliyat",
        url: SITE_URL,
      },
    },
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Kozcuoğlu Nakliyat Hakkında",
    description: "Kozcuoğlu Nakliyat hakkında. 20 yılı aşkın tecrübe, profesyonel ekip, sigortalı taşımacılık.",
    url: `${SITE_URL}/hakkimizda`,
    mainEntity: {
      "@type": "MovingCompany",
      "@id": `${SITE_URL}/#movingcompany`,
      name: "Kozcuoğlu Nakliyat",
      foundingDate: "2000",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 100 },
      slogan: "Güvenli Taşımacılığın Adresi",
      knowsAbout: ["Evden Eve Nakliyat", "Ofis Taşıma", "Eşya Depolama", "Şehirler Arası Nakliyat", "Parça Eşya Taşıma", "Asansörlü Taşımacılık"],
      award: ["K1 Yetki Belgesi", "TSE Hizmet Yeterlilik Belgesi", "ISO 9001 Kalite Belgesi"],
      address: ADDRESS,
      telephone: "+90-444-7-436",
      email: "info@kozcuoglunakliyat.com.tr",
      url: SITE_URL,
      image: `${SITE_URL}/images/logo.png`,
      sameAs: ORGANIZATION.sameAs,
    },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kozcuoğlu Nakliyat İletişim",
    description: "Kozcuoğlu Nakliyat iletişim bilgileri. Ücretsiz keşif ve fiyat teklifi.",
    url: `${SITE_URL}/iletisim`,
    mainEntity: {
      "@type": "MovingCompany",
      "@id": `${SITE_URL}/#movingcompany`,
      name: "Kozcuoğlu Nakliyat",
      telephone: "+90-444-7-436",
      email: "info@kozcuoglunakliyat.com.tr",
      address: ADDRESS,
      geo: GEO,
      contactPoint: ORGANIZATION.contactPoint,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: ORGANIZATION.sameAs,
    },
  };
}

export function intercityMovingSchema(opts: {
  name: string;
  description: string;
  slug: string;
  fromCity: string;
  toCity: string;
  image?: string;
  aggregateRating?: { ratingValue: string; reviewCount: string };
  offers?: { lowPrice: string; highPrice: string };
  reviews?: { author: string; ratingValue: string; reviewBody: string; datePublished?: string }[];
  alternateName?: string[];
}) {
  const serviceUrl = opts.slug.startsWith("/") ? opts.slug : `/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${serviceUrl}#service`,
    additionalType: "https://schema.org/MovingCompany",
    name: opts.name,
    ...(opts.alternateName && opts.alternateName.length > 0 ? { alternateName: opts.alternateName } : {}),
    description: opts.description,
    url: `${SITE_URL}${serviceUrl}`,
    ...(opts.image ? { image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}` } : {}),
    serviceType: "Şehirler Arası Evden Eve Nakliyat",
    category: "Nakliyat Hizmetleri",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: opts.fromCity, containedInPlace: { "@type": "Country", name: "Turkey" } },
      { "@type": "City", name: opts.toCity, containedInPlace: { "@type": "Country", name: "Turkey" } },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceLocation: {
        "@type": "Place",
        name: `${opts.fromCity} - ${opts.toCity} Nakliyat Hattı`,
        address: [
          { "@type": "PostalAddress", addressLocality: opts.fromCity, addressCountry: "TR" },
          { "@type": "PostalAddress", addressLocality: opts.toCity, addressCountry: "TR" },
        ],
      },
    },
    termsOfService: `${SITE_URL}/kullanim-kosullari`,
    ...(opts.offers
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: [{
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: opts.name },
              priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "TRY", minPrice: opts.offers.lowPrice, maxPrice: opts.offers.highPrice },
            }],
          },
        }
      : {}),
    ...(opts.aggregateRating
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: opts.aggregateRating.ratingValue, reviewCount: opts.aggregateRating.reviewCount, bestRating: "5", worstRating: "1" },
        }
      : {}),
    ...(opts.reviews && opts.reviews.length > 0
      ? {
          review: opts.reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            reviewRating: { "@type": "Rating", ratingValue: r.ratingValue, bestRating: "5", worstRating: "1" },
            reviewBody: r.reviewBody,
            datePublished: r.datePublished || new Date().toISOString().split("T")[0],
          })),
        }
      : {}),
  };
}

export function districtMovingSchema(opts: {
  name: string;
  description: string;
  slug: string;
  district: string;
  city: string;
  image?: string;
  geo?: { latitude: number; longitude: number };
  aggregateRating?: { ratingValue: string; reviewCount: string };
  offers?: { lowPrice: string; highPrice: string };
  reviews?: { author: string; ratingValue: string; reviewBody: string; datePublished?: string }[];
  alternateName?: string[];
}) {
  const serviceUrl = opts.slug.startsWith("/") ? opts.slug : `/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${serviceUrl}#service`,
    additionalType: "https://schema.org/MovingCompany",
    name: opts.name,
    ...(opts.alternateName && opts.alternateName.length > 0 ? { alternateName: opts.alternateName } : {}),
    description: opts.description,
    url: `${SITE_URL}${serviceUrl}`,
    ...(opts.image ? { image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}` } : {}),
    serviceType: "Evden Eve Nakliyat",
    category: "Nakliyat Hizmetleri",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: opts.district,
      containedInPlace: { "@type": "City", name: opts.city },
    },
    ...(opts.geo && opts.geo.latitude ? {
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: opts.geo.latitude, longitude: opts.geo.longitude },
        geoRadius: "5000",
      },
    } : {}),
    termsOfService: `${SITE_URL}/kullanim-kosullari`,
    ...(opts.offers
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: [{
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: opts.name },
              priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "TRY", minPrice: opts.offers.lowPrice, maxPrice: opts.offers.highPrice },
            }],
          },
        }
      : {}),
    ...(opts.aggregateRating
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: opts.aggregateRating.ratingValue, reviewCount: opts.aggregateRating.reviewCount, bestRating: "5", worstRating: "1" },
        }
      : {}),
    ...(opts.reviews && opts.reviews.length > 0
      ? {
          review: opts.reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            reviewRating: { "@type": "Rating", ratingValue: r.ratingValue, bestRating: "5", worstRating: "1" },
            reviewBody: r.reviewBody,
            datePublished: r.datePublished || new Date().toISOString().split("T")[0],
          })),
        }
      : {}),
  };
}

export function howToSchema(opts: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function siteNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Ana Menü",
    hasPart: [
      { "@type": "WebPage", name: "Hizmetlerimiz", url: `${SITE_URL}/hizmetlerimiz` },
      { "@type": "WebPage", name: "Çözümlerimiz", url: `${SITE_URL}/cozumlerimiz` },
      { "@type": "WebPage", name: "Fiyatlarımız", url: `${SITE_URL}/fiyatlarimiz` },
      { "@type": "WebPage", name: "Hizmet Bölgeleri", url: `${SITE_URL}/hizmet-bolgeleri` },
      { "@type": "WebPage", name: "Blog", url: `${SITE_URL}/blog` },
      { "@type": "WebPage", name: "İletişim", url: `${SITE_URL}/iletisim` },
    ],
  };
}

export function pricingPageSchema(services: { name: string; lowPrice: string; highPrice: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Nakliyat Fiyatları",
    description: "Kozcuoğlu Nakliyat güncel fiyat listesi ve online fiyat hesaplama.",
    url: `${SITE_URL}/fiyatlarimiz`,
    mainEntity: {
      "@type": "ItemList",
      name: "Nakliyat Hizmet Fiyatları",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          provider: PROVIDER,
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "TRY",
            lowPrice: s.lowPrice,
            highPrice: s.highPrice,
            offerCount: "1",
          },
        },
      })),
    },
  };
}

export function vehicleListSchema(vehicles: { name: string; description: string; image?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kozcuoğlu Nakliyat Araç Filosu",
    itemListElement: vehicles.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Vehicle",
        name: v.name,
        description: v.description,
        ...(v.image ? { image: v.image.startsWith("http") ? v.image : `${SITE_URL}${v.image}` } : {}),
        brand: { "@type": "Organization", name: "Kozcuoğlu Nakliyat" },
      },
    })),
  };
}

export function campaignListSchema(campaigns: { name: string; description: string; validFrom: string; validThrough: string; discount?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kozcuoğlu Nakliyat Kampanyalar",
    itemListElement: campaigns.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: c.name,
        description: c.description,
        validFrom: c.validFrom,
        validThrough: c.validThrough,
        ...(c.discount ? { discount: c.discount } : {}),
        seller: PROVIDER,
      },
    })),
  };
}

export function projectListSchema(projects: { name: string; description: string; image?: string; dateCreated?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kozcuoğlu Nakliyat Referans Projeler",
    url: `${SITE_URL}/referanslar`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          description: p.description,
          ...(p.image ? { image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}` } : {}),
          ...(p.dateCreated ? { dateCreated: p.dateCreated } : {}),
          creator: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Kozcuoğlu Nakliyat" },
        },
      })),
    },
  };
}

export function gallerySchema(images: { name: string; url: string; description?: string }[], videos?: { name: string; embedUrl: string; thumbnailUrl?: string; duration?: string; uploadDate?: string }[]) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kozcuoğlu Nakliyat Galeri",
    url: `${SITE_URL}/galeri`,
    mainEntity: {
      "@type": "ImageGallery",
      name: "Nakliyat Galeri",
      image: images.map((img) => ({
        "@type": "ImageObject",
        name: img.name,
        contentUrl: img.url.startsWith("http") ? img.url : `${SITE_URL}${img.url}`,
        ...(img.description ? { description: img.description } : {}),
      })),
    },
  };
  if (videos && videos.length > 0) {
    (schema as Record<string, unknown>).video = videos.map((v) => ({
      "@type": "VideoObject",
      name: v.name,
      embedUrl: v.embedUrl,
      ...(v.thumbnailUrl ? { thumbnailUrl: v.thumbnailUrl } : {}),
      ...(v.duration ? { duration: v.duration } : {}),
      uploadDate: v.uploadDate || new Date().toISOString().split("T")[0],
      publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Kozcuoğlu Nakliyat" },
    }));
  }
  return schema;
}

export function webPageSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Kozcuoğlu Nakliyat" },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    inLanguage: "tr",
  };
}

export function speakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}
