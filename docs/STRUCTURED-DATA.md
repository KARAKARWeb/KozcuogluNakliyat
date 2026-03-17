# Kozcuoğlu Nakliyat — Structured Data (JSON-LD) Şemaları

## Genel Bilgi

- **Format:** JSON-LD (Google'ın önerdiği format)
- **Yerleşim:** Her sayfanın `<head>` bölümünde `<script type="application/ld+json">`
- **Doğrulama:** https://search.google.com/test/rich-results
- **Referans:** https://schema.org

## 1. Organization (Tüm Sayfalarda)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://kozcuoglunakliyat.com.tr/#organization",
  "name": "Kozcuoğlu Nakliyat",
  "alternateName": ["Kozcuoğlu Evden Eve Nakliyat", "Kozcuoğlu Nakliyat Firması"],
  "url": "https://kozcuoglunakliyat.com.tr",
  "logo": "https://kozcuoglunakliyat.com.tr/images/logo.png",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+90-444-7-436",
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": "Turkish",
      "contactOption": "TollFree"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+90-216-494-53-37",
      "contactType": "sales",
      "areaServed": "TR",
      "availableLanguage": "Turkish"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+90-532-138-49-79",
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": "Turkish",
      "contactOption": "HearingImpairedSupported"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/kozcuoglunakliyat",
    "https://www.instagram.com/kozcuoglunakliyat",
    "https://www.youtube.com/kozcuoglunakliyat",
    "https://g.page/kozcuoglunakliyat",
    "https://tr.linkedin.com/company/kozcuoglunakliyat",
    "https://www.google.com/maps/place/Kozcuoğlu+Nakliyat"
  ]
}
```

## 2. LocalBusiness / MovingCompany (Ana Sayfa + İletişim)

> **NAP Tutarlılığı:** Bu şemadaki name, address, telephone bilgileri sitedeki tüm NAP gösterimleriyle birebir aynı olmalıdır.

```json
{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": "https://kozcuoglunakliyat.com.tr/#movingcompany",
  "name": "Kozcuoğlu Nakliyat",
  "alternateName": ["Kozcuoğlu Evden Eve Nakliyat", "Kozcuoğlu Nakliyat Firması"],
  "image": "https://kozcuoglunakliyat.com.tr/images/logo.png",
  "url": "https://kozcuoglunakliyat.com.tr",
  "telephone": "+90-444-7-436",
  "email": "info@kozcuoglunakliyat.com.tr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
    "addressLocality": "Pendik",
    "addressRegion": "İstanbul",
    "postalCode": "34890",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.8775",
    "longitude": "29.2333"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "priceRange": "₺₺",
  "areaServed": [
    { "@type": "City", "name": "İstanbul" },
    { "@type": "Country", "name": "Turkey" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Nakliyat Hizmetleri",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Evden Eve Nakliyat" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ofis Taşıma" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ev Taşıma" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Parça Eşya Taşıma" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Eşya Depolama" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Şehirler Arası Nakliyat" } }
    ]
  }
}
```

## 3. Service (Hizmet Alt Sayfaları — `/[slug]`)

> **Kural:** Her hizmet alt sayfasında bu şablon kullanılır. `services.json`'daki verilerle dinamik doldurulur. `provider` her zaman aynı MovingCompany nesnesidir.

### Şablon — Hizmet Service Schema (Tüm Hizmetler İçin)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{hizmet_adi}",
  "description": "{hizmet_description}",
  "url": "https://kozcuoglunakliyat.com.tr/{slug}",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/services/{slug}.webp",
  "serviceType": "{hizmet_adi}",
  "category": "Nakliyat Hizmetleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34890",
      "addressCountry": "TR"
    }
  },
  "areaServed": [
    { "@type": "City", "name": "İstanbul" },
    { "@type": "Country", "name": "Turkey" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "{hizmet_adi} Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "priceCurrency": "TRY",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "{min_fiyat}",
          "maxPrice": "{max_fiyat}",
          "priceCurrency": "TRY"
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01"
      }
    ]
  },
  "termsOfService": "https://kozcuoglunakliyat.com.tr/kullanim-kosullari",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{ortalama_puan}",
    "reviewCount": "{yorum_sayisi}",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### Örnek: Evden Eve Nakliyat (`/evden-eve-nakliyat`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Evden Eve Nakliyat",
  "description": "İstanbul evden eve nakliyat hizmeti. Profesyonel ekip, sigortalı taşımacılık, ambalajlama ve montaj dahil. 7/24 hizmet.",
  "url": "https://kozcuoglunakliyat.com.tr/evden-eve-nakliyat",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/services/evden-eve-nakliyat.webp",
  "serviceType": "Evden Eve Nakliyat",
  "category": "Nakliyat Hizmetleri",
  "additionalType": "https://schema.org/MovingCompany",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34890",
      "addressCountry": "TR"
    }
  },
  "areaServed": [
    { "@type": "City", "name": "İstanbul" },
    { "@type": "Country", "name": "Turkey" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Evden Eve Nakliyat Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "1+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "3500",
          "maxPrice": "7000",
          "priceCurrency": "TRY"
        }
      },
      {
        "@type": "Offer",
        "name": "2+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "5000",
          "maxPrice": "12000",
          "priceCurrency": "TRY"
        }
      },
      {
        "@type": "Offer",
        "name": "3+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "7000",
          "maxPrice": "18000",
          "priceCurrency": "TRY"
        }
      }
    ]
  },
  "termsOfService": "https://kozcuoglunakliyat.com.tr/kullanim-kosullari",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### Örnek: Ofis Taşıma (`/ofis-tasima`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Ofis Taşıma",
  "description": "Kurumsal ofis taşıma hizmeti. İş kaybı yaşamadan, hafta sonu taşıma seçeneği. Profesyonel ekip, sigortalı taşımacılık.",
  "url": "https://kozcuoglunakliyat.com.tr/ofis-tasima",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/services/ofis-tasima.webp",
  "serviceType": "Ofis Taşıma",
  "category": "Nakliyat Hizmetleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436"
  },
  "areaServed": [
    { "@type": "City", "name": "İstanbul" },
    { "@type": "Country", "name": "Turkey" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Ofis Taşıma Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "50m² Ofis Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "5000", "maxPrice": "10000", "priceCurrency": "TRY" }
      },
      {
        "@type": "Offer",
        "name": "100m² Ofis Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "8000", "maxPrice": "18000", "priceCurrency": "TRY" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "85",
    "bestRating": "5"
  }
}
```

### Örnek: Şehirler Arası Nakliyat (`/sehirler-arasi-nakliyat`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Şehirler Arası Nakliyat",
  "description": "İstanbul'dan Türkiye'nin tüm illerine şehirler arası evden eve nakliyat. Sigortalı, güvenli, ekonomik.",
  "url": "https://kozcuoglunakliyat.com.tr/sehirler-arasi-nakliyat",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/services/sehirler-arasi-nakliyat.webp",
  "serviceType": "Şehirler Arası Nakliyat",
  "category": "Nakliyat Hizmetleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Turkey"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Şehirler Arası Nakliyat Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "İstanbul - Ankara Nakliyat",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "8000", "maxPrice": "25000", "priceCurrency": "TRY" }
      },
      {
        "@type": "Offer",
        "name": "İstanbul - İzmir Nakliyat",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "9000", "maxPrice": "28000", "priceCurrency": "TRY" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "120",
    "bestRating": "5"
  }
}
```

## 4. BreadcrumbList (Tüm Sayfalarda)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Kozcuoğlu Nakliyat",
      "item": "https://kozcuoglunakliyat.com.tr/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Hizmetlerimiz",
      "item": "https://kozcuoglunakliyat.com.tr/hizmetlerimiz"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Evden Eve Nakliyat",
      "item": "https://kozcuoglunakliyat.com.tr/evden-eve-nakliyat"
    }
  ]
}
```

> **Kural:** Breadcrumb'ın ilk elemanı her zaman `"Kozcuoğlu Nakliyat"` olmalıdır, `"Ana Sayfa"` değil.

## 5. FAQPage (SSS Sayfası + Hizmet Sayfaları)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Evden eve nakliyat fiyatları ne kadar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evden eve nakliyat fiyatları ev büyüklüğü, mesafe, kat ve ek hizmetlere göre değişmektedir. Detaylı fiyat bilgisi için fiyat hesaplama aracımızı kullanabilirsiniz."
      }
    },
    {
      "@type": "Question",
      "name": "Nakliyat sigortası var mı?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evet, tüm taşıma hizmetlerimiz sigorta güvencesi altındadır. Eşyalarınız taşıma süresince tam koruma altındadır."
      }
    }
  ]
}
```

## 6. Article (Blog Yazıları)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "İstanbul Evden Eve Nakliyat Rehberi",
  "description": "İstanbul'da evden eve nakliyat hakkında bilmeniz gereken her şey.",
  "image": "https://kozcuoglunakliyat.com.tr/images/blog/istanbul-nakliyat.webp",
  "author": {
    "@type": "Organization",
    "name": "Kozcuoğlu Nakliyat"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Kozcuoğlu Nakliyat",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kozcuoglunakliyat.com.tr/images/logo.png"
    }
  },
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://kozcuoglunakliyat.com.tr/istanbul-evden-eve-nakliyat.html"
  }
}
```

## 7. WebSite (Ana Sayfa — Sitelinks Search Box)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kozcuoğlu Nakliyat",
  "url": "https://kozcuoglunakliyat.com.tr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://kozcuoglunakliyat.com.tr/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

## 8. Review / AggregateRating (Ana Sayfa + Hizmet Sayfaları)

```json
{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "Kozcuoğlu Nakliyat",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Müşteri Adı"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Çok profesyonel ve güvenilir bir nakliyat firması.",
      "datePublished": "2026-01-10"
    }
  ]
}
```

## 9. Hizmet Bölgesi — İstanbul İlçeleri (Local SEO)

> **Mantık:** İstanbul ilçe/semt bazlı sayfalar. Merkez adres Pendik, `areaServed` ile hedef ilçe belirtilir. Google bunu "Pendik merkezli, X ilçesine hizmet veren firma" olarak anlar.

### Şablon — İlçe Hizmet Bölgesi
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{ilce} Evden Eve Nakliyat",
  "description": "{ilce} ve çevresinde profesyonel evden eve nakliyat hizmeti. Sigortalı taşımacılık, ambalajlama dahil.",
  "url": "https://kozcuoglunakliyat.com.tr/{ilce-slug}-evden-eve-nakliyat.html",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/regions/{ilce-slug}.webp",
  "serviceType": "Evden Eve Nakliyat",
  "category": "Yerel Nakliyat Hizmetleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34890",
      "addressCountry": "TR"
    }
  },
  "areaServed": {
    "@type": "Place",
    "name": "{ilce}, İstanbul",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "{ilce}",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "{lat}",
      "longitude": "{lng}"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "{ilce} Nakliyat Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "{ilce} 1+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "{min}", "maxPrice": "{max}", "priceCurrency": "TRY" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{puan}",
    "reviewCount": "{sayi}",
    "bestRating": "5"
  }
}
```

### Örnek: Kadıköy Evden Eve Nakliyat
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Kadıköy Evden Eve Nakliyat",
  "description": "Kadıköy ve çevresinde profesyonel evden eve nakliyat hizmeti. Sigortalı taşımacılık, ambalajlama, montaj dahil. 7/24 hizmet.",
  "url": "https://kozcuoglunakliyat.com.tr/kadikoy-evden-eve-nakliyat.html",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/regions/kadikoy.webp",
  "serviceType": "Evden Eve Nakliyat",
  "category": "Yerel Nakliyat Hizmetleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34890",
      "addressCountry": "TR"
    }
  },
  "areaServed": {
    "@type": "Place",
    "name": "Kadıköy, İstanbul",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kadıköy",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.9927",
      "longitude": "29.0277"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kadıköy Nakliyat Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Kadıköy 1+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "3500", "maxPrice": "7000", "priceCurrency": "TRY" }
      },
      {
        "@type": "Offer",
        "name": "Kadıköy 2+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "5000", "maxPrice": "12000", "priceCurrency": "TRY" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "45",
    "bestRating": "5"
  }
}
```

> **Not:** `regions.json`'daki her ilçe için `latitude`, `longitude` bilgisi tutulur. Schema dinamik olarak bu verilerle doldurulur.

## 9B. Hizmet Bölgesi — Şehirler Arası (İstanbul → Ankara vb.)

> **Mantık:** Şehirler arası nakliyat sayfaları da Hizmet Bölgeleri altında yer alır. Farkı: `areaServed` iki şehir arasını kapsar, `serviceType` "Şehirler Arası Nakliyat" olur.

### URL Yapısı
| Sayfa | URL |
|---|---|
| İstanbul Ankara Evden Eve Nakliyat | `/istanbul-ankara-evden-eve-nakliyat.html` |
| İstanbul İzmir Evden Eve Nakliyat | `/istanbul-izmir-evden-eve-nakliyat.html` |
| İstanbul Bursa Evden Eve Nakliyat | `/istanbul-bursa-evden-eve-nakliyat.html` |
| İstanbul Antalya Evden Eve Nakliyat | `/istanbul-antalya-evden-eve-nakliyat.html` |

### Şablon — Şehirler Arası Bölge Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "İstanbul {hedef_sehir} Evden Eve Nakliyat",
  "description": "İstanbul'dan {hedef_sehir}'a profesyonel evden eve nakliyat. Sigortalı, güvenli, ekonomik şehirler arası taşımacılık.",
  "url": "https://kozcuoglunakliyat.com.tr/istanbul-{hedef_slug}-evden-eve-nakliyat.html",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/regions/istanbul-{hedef_slug}.webp",
  "serviceType": "Şehirler Arası Nakliyat",
  "category": "Şehirler Arası Nakliyat Hizmetleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34890",
      "addressCountry": "TR"
    }
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "İstanbul",
      "containedInPlace": { "@type": "Country", "name": "Turkey" }
    },
    {
      "@type": "City",
      "name": "{hedef_sehir}",
      "containedInPlace": { "@type": "Country", "name": "Turkey" }
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "İstanbul {hedef_sehir} Nakliyat Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "İstanbul - {hedef_sehir} 1+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "{min}", "maxPrice": "{max}", "priceCurrency": "TRY" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{puan}",
    "reviewCount": "{sayi}",
    "bestRating": "5"
  }
}
```

### Örnek: İstanbul Ankara Evden Eve Nakliyat
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "İstanbul Ankara Evden Eve Nakliyat",
  "description": "İstanbul'dan Ankara'ya profesyonel evden eve nakliyat hizmeti. Sigortalı taşımacılık, ambalajlama, montaj dahil. Kapıdan kapıya hizmet.",
  "url": "https://kozcuoglunakliyat.com.tr/istanbul-ankara-evden-eve-nakliyat.html",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/regions/istanbul-ankara.webp",
  "serviceType": "Şehirler Arası Nakliyat",
  "category": "Şehirler Arası Nakliyat Hizmetleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34890",
      "addressCountry": "TR"
    }
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "İstanbul",
      "containedInPlace": { "@type": "Country", "name": "Turkey" }
    },
    {
      "@type": "City",
      "name": "Ankara",
      "containedInPlace": { "@type": "Country", "name": "Turkey" }
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "İstanbul Ankara Nakliyat Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "İstanbul - Ankara 1+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "8000", "maxPrice": "15000", "priceCurrency": "TRY" }
      },
      {
        "@type": "Offer",
        "name": "İstanbul - Ankara 2+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "12000", "maxPrice": "22000", "priceCurrency": "TRY" }
      },
      {
        "@type": "Offer",
        "name": "İstanbul - Ankara 3+1 Ev Taşıma",
        "priceCurrency": "TRY",
        "priceSpecification": { "@type": "PriceSpecification", "minPrice": "16000", "maxPrice": "30000", "priceCurrency": "TRY" }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "65",
    "bestRating": "5"
  }
}
```

### Şehirler Arası Breadcrumb
```
Kozcuoğlu Nakliyat > Hizmet Bölgeleri > İstanbul Ankara Evden Eve Nakliyat
```

> **Fark:** İlçe sayfalarında `areaServed` tek `Place`, şehirler arası sayfalarında iki `City` nesnesi kullanılır. Bu Google'a "bu firma iki şehir arasında hizmet veriyor" sinyali gönderir.

## 10. HowTo (Blog + Çözüm Sayfaları)

"Nasıl yapılır" tarzı içeriklerde adım adım talimat:

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Evden Eve Nakliyat Nasıl Yapılır?",
  "description": "Evden eve nakliyat sürecinde adım adım yapmanız gerekenler.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Teklif Alın",
      "text": "Nakliyat firmasından ücretsiz keşif ve fiyat teklifi alın.",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Planlama Yapın",
      "text": "Taşıma tarihini ve eşya listesini belirleyin.",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Paketleme",
      "text": "Eşyalarınızı profesyonel ekip ile paketleyin.",
      "position": 3
    },
    {
      "@type": "HowToStep",
      "name": "Taşıma ve Teslim",
      "text": "Eşyalarınız sigortalı olarak yeni adresinize taşınır.",
      "position": 4
    }
  ]
}
```

## 11. ItemList (Hizmetlerimiz + Çözümlerimiz + Hizmet Bölgeleri Listesi)

Liste sayfalarında carousel/liste snippet:

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Nakliyat Hizmetlerimiz",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Evden Eve Nakliyat",
      "url": "https://kozcuoglunakliyat.com.tr/evden-eve-nakliyat"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ofis Taşıma",
      "url": "https://kozcuoglunakliyat.com.tr/ofis-tasima"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Ev Taşıma",
      "url": "https://kozcuoglunakliyat.com.tr/ev-tasima"
    }
  ]
}
```

## 12. Fiyatlarımız Sayfası (`/fiyatlarimiz`) — Offer / AggregateOffer

> **Mantık:** Fiyatlarımız sayfasında tüm hizmetlerin fiyat aralıkları listelenir. Her hizmet için ayrı `Service + AggregateOffer` schema'sı oluşturulur.

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Nakliyat Fiyatları 2026",
  "description": "Kozcuoğlu Nakliyat güncel nakliyat fiyatları. Evden eve nakliyat, ofis taşıma, şehirler arası nakliyat fiyat listesi.",
  "url": "https://kozcuoglunakliyat.com.tr/fiyatlarimiz",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Nakliyat Fiyatları",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Evden Eve Nakliyat",
          "url": "https://kozcuoglunakliyat.com.tr/evden-eve-nakliyat",
          "provider": { "@type": "MovingCompany", "name": "Kozcuoğlu Nakliyat" },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "3500",
            "highPrice": "25000",
            "priceCurrency": "TRY",
            "offerCount": "4"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Ofis Taşıma",
          "url": "https://kozcuoglunakliyat.com.tr/ofis-tasima",
          "provider": { "@type": "MovingCompany", "name": "Kozcuoğlu Nakliyat" },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "5000",
            "highPrice": "30000",
            "priceCurrency": "TRY",
            "offerCount": "3"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Parça Eşya Taşıma",
          "url": "https://kozcuoglunakliyat.com.tr/parca-esya-tasima",
          "provider": { "@type": "MovingCompany", "name": "Kozcuoğlu Nakliyat" },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "500",
            "highPrice": "5000",
            "priceCurrency": "TRY",
            "offerCount": "6"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Şehirler Arası Nakliyat",
          "url": "https://kozcuoglunakliyat.com.tr/sehirler-arasi-nakliyat",
          "provider": { "@type": "MovingCompany", "name": "Kozcuoğlu Nakliyat" },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "8000",
            "highPrice": "40000",
            "priceCurrency": "TRY",
            "offerCount": "5"
          }
        }
      }
    ]
  }
}
```

## 12B. Fiyat Hesaplama Sayfası (`/nakliyat-fiyat-hesaplama`)

> **Mantık:** Fiyat hesaplama aracı interaktif bir araçtır. `WebApplication` + `SoftwareApplication` schema'sı ile Google'a "bu sayfada bir hesaplama aracı var" sinyali verilir.

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Nakliyat Fiyat Hesaplama",
  "description": "Online nakliyat fiyat hesaplama aracı. Ev taşıma, ofis taşıma, parça eşya ve şehirler arası nakliyat fiyatlarını anında hesaplayın.",
  "url": "https://kozcuoglunakliyat.com.tr/nakliyat-fiyat-hesaplama",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Nakliyat Fiyat Hesaplama Aracı",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY",
      "description": "Ücretsiz nakliyat fiyat hesaplama"
    },
    "creator": {
      "@type": "MovingCompany",
      "name": "Kozcuoğlu Nakliyat",
      "url": "https://kozcuoglunakliyat.com.tr"
    }
  }
}
```

> **Not:** `SoftwareApplication` schema'sı Google'ın "hesaplama aracı" olarak tanımasını sağlar. `price: 0` ücretsiz olduğunu belirtir.

## 13. SiteNavigationElement (Header Menü)

```json
{
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Ana Menü",
  "hasPart": [
    { "@type": "WebPage", "name": "Hizmetlerimiz", "url": "https://kozcuoglunakliyat.com.tr/hizmetlerimiz" },
    { "@type": "WebPage", "name": "Çözümlerimiz", "url": "https://kozcuoglunakliyat.com.tr/cozumlerimiz" },
    { "@type": "WebPage", "name": "Fiyatlarımız", "url": "https://kozcuoglunakliyat.com.tr/fiyatlarimiz" },
    { "@type": "WebPage", "name": "Hizmet Bölgeleri", "url": "https://kozcuoglunakliyat.com.tr/hizmet-bolgeleri" },
    { "@type": "WebPage", "name": "Blog", "url": "https://kozcuoglunakliyat.com.tr/blog" },
    { "@type": "WebPage", "name": "İletişim", "url": "https://kozcuoglunakliyat.com.tr/iletisim" }
  ]
}
```

## 14. Eşya Depolama (`/esya-depolama`) — SelfStorage

> **Mantık:** Eşya Depolama fiziksel bir tesis olduğu için `SelfStorage` (schema.org alt tipi) kullanılır. Bu, Google'a "bu bir depolama tesisi" sinyali verir. `LocalBusiness` alt tipidir.

```json
{
  "@context": "https://schema.org",
  "@type": "SelfStorage",
  "name": "Kozcuoğlu Eşya Depolama",
  "description": "İstanbul Pendik'te güvenli eşya depolama tesisi. 7/24 kamera, nem kontrolü, sigorta güvencesi. Küçük, orta ve büyük depolama birimleri.",
  "url": "https://kozcuoglunakliyat.com.tr/esya-depolama",
  "image": [
    "https://kozcuoglunakliyat.com.tr/uploads/storage/depo-dis-gorunum.webp",
    "https://kozcuoglunakliyat.com.tr/uploads/storage/depo-ic-gorunum.webp",
    "https://kozcuoglunakliyat.com.tr/uploads/storage/depo-guvenlik.webp"
  ],
  "telephone": "+90-444-7-436",
  "email": "info@kozcuoglunakliyat.com.tr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
    "addressLocality": "Pendik",
    "addressRegion": "İstanbul",
    "postalCode": "34890",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.8775",
    "longitude": "29.2333"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "₺₺",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "7/24 Kamera Güvenliği", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Nem ve Sıcaklık Kontrolü", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Yangın Algılama Sistemi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Sigorta Güvencesi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Ücretsiz Nakliye", "value": true }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Eşya Depolama Fiyatları",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Küçük Depolama Birimi (5m²)",
        "description": "1+1 ev eşyası için uygun",
        "priceCurrency": "TRY",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "2500",
          "priceCurrency": "TRY",
          "unitCode": "MON",
          "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitCode": "MON" }
        },
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Orta Depolama Birimi (10m²)",
        "description": "2+1 ev eşyası için uygun",
        "priceCurrency": "TRY",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "4000",
          "priceCurrency": "TRY",
          "unitCode": "MON",
          "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitCode": "MON" }
        },
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Büyük Depolama Birimi (20m²)",
        "description": "3+1 ve üzeri ev eşyası için uygun",
        "priceCurrency": "TRY",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "6500",
          "priceCurrency": "TRY",
          "unitCode": "MON",
          "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitCode": "MON" }
        },
        "availability": "https://schema.org/InStock"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "80",
    "bestRating": "5"
  }
}
```

> **Önemli:** `UnitPriceSpecification` ile aylık fiyat belirtilir (`unitCode: "MON"`). `amenityFeature` ile tesis özellikleri listelenir. Google bu bilgileri zengin snippet olarak gösterebilir.

## 14B. Çözümlerimiz — Çözüm Alt Sayfaları (`/[slug]`)

> **Mantık:** Çözümler de `Service` schema'sı kullanır. Farkı: `category` "Nakliyat Çözümleri" olur, `serviceType` çözüm adıdır.

### Şablon — Çözüm Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{cozum_adi}",
  "description": "{cozum_description}",
  "url": "https://kozcuoglunakliyat.com.tr/{slug}",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/solutions/{slug}.webp",
  "serviceType": "{cozum_adi}",
  "category": "Nakliyat Çözümleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436"
  },
  "areaServed": [
    { "@type": "City", "name": "İstanbul" },
    { "@type": "Country", "name": "Turkey" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{puan}",
    "reviewCount": "{sayi}",
    "bestRating": "5"
  }
}
```

### Örnek: Asansörlü Nakliyat (`/asansorlu-nakliyat`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Asansörlü Nakliyat",
  "description": "Dış cephe asansörü ile yüksek katlara güvenli eşya taşıma. Dar sokak ve merdiven sorunu olan binalar için ideal çözüm.",
  "url": "https://kozcuoglunakliyat.com.tr/asansorlu-nakliyat",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/solutions/asansorlu-nakliyat.webp",
  "serviceType": "Asansörlü Nakliyat",
  "category": "Nakliyat Çözümleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436"
  },
  "areaServed": [
    { "@type": "City", "name": "İstanbul" }
  ],
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "1500",
    "highPrice": "8000",
    "priceCurrency": "TRY",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "60",
    "bestRating": "5"
  }
}
```

### Örnek: Sigortalı Taşıma (`/sigortali-tasima`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Sigortalı Taşıma",
  "description": "Tam sigorta güvencesi ile eşya taşıma. Taşıma süresince tüm eşyalarınız sigorta kapsamında. Hasar durumunda tam tazminat.",
  "url": "https://kozcuoglunakliyat.com.tr/sigortali-tasima",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/solutions/sigortali-tasima.webp",
  "serviceType": "Sigortalı Taşıma",
  "category": "Nakliyat Çözümleri",
  "provider": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436"
  },
  "areaServed": [
    { "@type": "City", "name": "İstanbul" },
    { "@type": "Country", "name": "Turkey" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "95",
    "bestRating": "5"
  }
}
```

## 14C. Hakkımızda (`/hakkimizda`) — AboutPage

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Hakkımızda — Kozcuoğlu Nakliyat",
  "description": "Kozcuoğlu Nakliyat hakkında. 15+ yıllık deneyim, profesyonel ekip, sigortalı taşımacılık.",
  "url": "https://kozcuoglunakliyat.com.tr/hakkimizda",
  "mainEntity": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "foundingDate": "2010",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": "50",
      "maxValue": "100"
    },
    "slogan": "Güvenli Taşımacılığın Adresi",
    "knowsAbout": ["Evden Eve Nakliyat", "Ofis Taşıma", "Eşya Depolama", "Şehirler Arası Nakliyat"],
    "award": ["Müşteri Memnuniyeti Ödülü", "En İyi Nakliyat Firması"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34890",
      "addressCountry": "TR"
    }
  }
}
```

## 14D. İletişim (`/iletisim`) — ContactPage

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "İletişim — Kozcuoğlu Nakliyat",
  "description": "Kozcuoğlu Nakliyat iletişim bilgileri. Adres, telefon, e-posta, harita.",
  "url": "https://kozcuoglunakliyat.com.tr/iletisim",
  "mainEntity": {
    "@type": "MovingCompany",
    "name": "Kozcuoğlu Nakliyat",
    "url": "https://kozcuoglunakliyat.com.tr",
    "telephone": "+90-444-7-436",
    "email": "info@kozcuoglunakliyat.com.tr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34890",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.8775",
      "longitude": "29.2333"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "contactPoint": [
      { "@type": "ContactPoint", "telephone": "+90-444-7-436", "contactType": "customer service" },
      { "@type": "ContactPoint", "telephone": "+90-216-494-53-37", "contactType": "sales" },
      { "@type": "ContactPoint", "telephone": "+90-532-138-49-79", "contactType": "customer service" }
    ]
  }
}
```

## 14E. SSS (`/sikca-sorulan-sorular`) — FAQPage

> Ana SSS sayfası için tüm sorular tek bir FAQPage schema'sında toplanır.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Sıkça Sorulan Sorular — Kozcuoğlu Nakliyat",
  "description": "Nakliyat hakkında sıkça sorulan sorular ve cevapları.",
  "url": "https://kozcuoglunakliyat.com.tr/sikca-sorulan-sorular",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Evden eve nakliyat fiyatları ne kadar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evden eve nakliyat fiyatları ev büyüklüğü, mesafe, kat ve ek hizmetlere göre değişir. 1+1 ev için ortalama 3.500-7.000 TL, 2+1 ev için 5.000-12.000 TL, 3+1 ev için 7.000-18.000 TL aralığındadır. Detaylı fiyat için online hesaplama aracımızı kullanabilirsiniz."
      }
    },
    {
      "@type": "Question",
      "name": "Nakliyat sigortası var mı?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evet, tüm taşıma hizmetlerimiz sigorta güvencesi altındadır. Eşyalarınız taşıma süresince tam koruma altındadır. Hasar durumunda sigorta kapsamında tazminat ödenir."
      }
    },
    {
      "@type": "Question",
      "name": "Eşya depolama aylık ne kadar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eşya depolama fiyatları birim büyüklüğüne göre değişir. Küçük birim (5m²) aylık 2.500 TL, orta birim (10m²) aylık 4.000 TL, büyük birim (20m²) aylık 6.500 TL'dir. 7/24 kamera güvenliği ve sigorta dahildir."
      }
    },
    {
      "@type": "Question",
      "name": "Şehirler arası nakliyat yapıyor musunuz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evet, İstanbul'dan Türkiye'nin tüm illerine şehirler arası evden eve nakliyat hizmeti veriyoruz. Ankara, İzmir, Bursa, Antalya başta olmak üzere 81 ile kapıdan kapıya taşımacılık yapıyoruz."
      }
    },
    {
      "@type": "Question",
      "name": "Asansörlü nakliyat nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Asansörlü nakliyat, dış cephe asansörü kullanılarak yüksek katlara eşya taşıma hizmetidir. Dar sokak, dar merdiven veya asansörsüz binalarda ideal çözümdür. 10. kata kadar güvenli taşıma yapılır."
      }
    },
    {
      "@type": "Question",
      "name": "Nakliyat ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nakliyat süresi ev büyüklüğü ve mesafeye göre değişir. Şehir içi 1+1 ev taşıma ortalama 4-6 saat, 3+1 ev taşıma 8-12 saat sürer. Şehirler arası taşımalarda mesafeye göre 1-3 gün arasında tamamlanır."
      }
    }
  ]
}
```

## Sayfa Bazlı Şema Dağılımı (Tam Liste)

| Sayfa | URL | Şemalar |
|---|---|---|
| **Ana Sayfa** | `/` | Organization, MovingCompany, WebSite (SearchAction), WebPage, AggregateRating, BreadcrumbList, SiteNavigationElement |
| **Hizmetlerimiz** | `/hizmetlerimiz` | CollectionPage, ItemList, BreadcrumbList |
| **Hizmet Alt Sayfası** | `/[slug]` | WebPage, Service (provider+areaServed+hasOfferCatalog), BreadcrumbList, FAQPage, AggregateRating, Review |
| **Eşya Depolama** | `/esya-depolama` | SelfStorage (amenityFeature+hasOfferCatalog+UnitPriceSpecification), BreadcrumbList, FAQPage, AggregateRating, Review |
| **Çözümlerimiz** | `/cozumlerimiz` | CollectionPage, ItemList, BreadcrumbList |
| **Çözüm Alt Sayfası** | `/[slug]` | WebPage, Service (category:"Nakliyat Çözümleri"), BreadcrumbList, FAQPage, AggregateRating, Review |
| **Fiyatlarımız** | `/fiyatlarimiz` | WebPage, ItemList (Service+AggregateOffer), BreadcrumbList |
| **Fiyat Hesaplama** | `/nakliyat-fiyat-hesaplama` | WebPage, SoftwareApplication (ücretsiz araç), BreadcrumbList, FAQPage |
| **Hizmet Bölgeleri Listesi** | `/hizmet-bolgeleri` | CollectionPage, ItemList, BreadcrumbList |
| **İlçe Bölge Sayfası** | `/*.html` | WebPage, Service (areaServed:Place+GeoCoordinates), BreadcrumbList, FAQPage, AggregateRating, Review |
| **Şehirler Arası Bölge** | `/*.html` | WebPage, Service (areaServed:[City,City]), BreadcrumbList, FAQPage, AggregateRating, Review |
| **Hakkımızda** | `/hakkimizda` | AboutPage, MovingCompany (foundingDate+numberOfEmployees+award), BreadcrumbList |
| **İletişim** | `/iletisim` | ContactPage, MovingCompany (NAP+GeoCoordinates+OpeningHours+contactPoint), BreadcrumbList |
| **Blog Listesi** | `/blog` | CollectionPage, ItemList, BreadcrumbList |
| **Blog Yazısı** | `/*.html` | Article (author+publisher+datePublished+mainEntityOfPage), BreadcrumbList, AggregateRating, Review |
| **Blog (HowTo)** | `/*.html` | Article, HowTo (step), BreadcrumbList |
| **SSS** | `/sikca-sorulan-sorular` | FAQPage (tüm sorular), BreadcrumbList |
| **Gizlilik Politikası** | `/gizlilik-politikasi` | WebPage, BreadcrumbList |
| **Çerez Politikası** | `/cerez-politikasi` | WebPage, BreadcrumbList |
| **KVKK** | `/kvkk-aydinlatma-metni` | WebPage, BreadcrumbList |
| **Kullanım Koşulları** | `/kullanim-kosullari` | WebPage, BreadcrumbList |
| **Referanslar** | `/referanslar` | CollectionPage, ItemList (ListItem→CreativeWork), BreadcrumbList |
| **Araç Filomuz** | `/arac-filomuz` | WebPage, ItemList (ListItem→Vehicle), BreadcrumbList |
| **Kampanyalar** | `/kampanyalar` | WebPage, ItemList (ListItem→Offer validFrom/validThrough), BreadcrumbList |
| **Taşıma Takip** | `/tasima-takip` | WebPage (noindex), BreadcrumbList |
| **Galeri** | `/galeri` | CollectionPage, ImageGallery, VideoObject, BreadcrumbList |
| **Sözleşmeler** | `/sozlesmeler` | CollectionPage, ItemList, BreadcrumbList |
| **Sözleşme Alt** | `/[slug]` (root'ta) | WebPage, BreadcrumbList |
| **Referanslarımız** | `/referanslarimiz` | CollectionPage, ItemList (ListItem→Organization), BreadcrumbList |
| **Taşıma Kontrol Listesi** | `/tasima-kontrol-listesi.html` | Article, HowTo (step), ItemList (checklist), BreadcrumbList |

## 16. Taşıma Kontrol Listesi (`/tasima-kontrol-listesi.html`) — Article + HowTo + ItemList

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Taşıma Kontrol Listesi — Taşınma Öncesi Yapılacaklar",
  "description": "Evden eve nakliyat öncesi, sırası ve sonrasında yapılması gerekenlerin eksiksiz kontrol listesi.",
  "url": "https://kozcuoglunakliyat.com.tr/tasima-kontrol-listesi.html",
  "image": "https://kozcuoglunakliyat.com.tr/uploads/blog/tasima-kontrol-listesi.webp",
  "author": {
    "@type": "Organization",
    "name": "Kozcuoğlu Nakliyat"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Kozcuoğlu Nakliyat",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kozcuoglunakliyat.com.tr/images/logo.png"
    }
  },
  "datePublished": "2026-01-01",
  "dateModified": "2026-02-13",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://kozcuoglunakliyat.com.tr/tasima-kontrol-listesi.html"
  }
}
```

### HowTo Schema (Aynı Sayfada)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Taşınma Öncesi Yapılacaklar Listesi",
  "description": "Taşınma sürecinde adım adım yapmanız gerekenlerin kontrol listesi.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Nakliyat Firması Seçin",
      "text": "Güvenilir ve sigortalı bir nakliyat firmasından teklif alın. En az 2-3 firmadan fiyat karşılaştırması yapın.",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Eşya Envanteri Çıkarın",
      "text": "Taşınacak eşyaların listesini oda oda çıkarın. Taşımayacaklarınızı ayırın.",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Paketleme Yapın",
      "text": "Kırılacak eşyaları özel ambalajla paketleyin. Kutuları oda adıyla etiketleyin.",
      "position": 3
    },
    {
      "@type": "HowToStep",
      "name": "Taşıma Günü Kontrolü",
      "text": "Elektrik, su, doğalgaz aboneliklerini kontrol edin. Yeni adres bilgilerini güncelleyin.",
      "position": 4
    },
    {
      "@type": "HowToStep",
      "name": "Teslim ve Yerleştirme",
      "text": "Eşyaları yeni evde kontrol edin. Hasar varsa tutanak tutun. Montaj gereken eşyaları yerleştirin.",
      "position": 5
    }
  ]
}
```

> **Not:** Bu sayfada Article + HowTo + BreadcrumbList olmak üzere 3 ayrı JSON-LD bloğu bulunur. `blog-posts.json`'dan dinamik olarak doldurulur.

## 17. Referanslar (`/referanslar`) — CreativeWork + ImageGallery

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Referanslar & Tamamlanan Projeler — Kozcuoğlu Nakliyat",
  "description": "Kozcuoğlu Nakliyat tarafından tamamlanan nakliyat projeleri. Gerçek müşteri deneyimleri ve proje görselleri.",
  "url": "https://kozcuoglunakliyat.com.tr/referanslar",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Tamamlanan Projeler",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "CreativeWork",
          "name": "Kadıköy → Beşiktaş 3+1 Ev Taşıma",
          "description": "3+1 ev eşyası, asansörlü taşıma, ambalajlama dahil.",
          "image": "https://kozcuoglunakliyat.com.tr/uploads/projects/kadikoy-besiktas.webp",
          "dateCreated": "2026-01-20",
          "author": {
            "@type": "MovingCompany",
            "@id": "https://kozcuoglunakliyat.com.tr/#organization"
          }
        }
      }
    ]
  }
}
```

## 18. Araç Filomuz (`/arac-filomuz`) — Vehicle

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Araç Filomuz — Kozcuoğlu Nakliyat",
  "description": "Kozcuoğlu Nakliyat araç filosu. 50+ modern araç: panelvan, kamyonet, kamyon, TIR, asansörlü araç.",
  "url": "https://kozcuoglunakliyat.com.tr/arac-filomuz",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Araç Filomuz",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Vehicle",
          "name": "Kapalı Kasa Kamyon",
          "description": "2+1, 3+1 ev taşıma için uygun. Kapalı kasa, hava süspansiyon, GPS takip.",
          "image": "https://kozcuoglunakliyat.com.tr/uploads/fleet/kapali-kasa-kamyon.webp",
          "cargoVolume": {
            "@type": "QuantitativeValue",
            "value": "35",
            "unitCode": "MTQ"
          }
        }
      }
    ]
  }
}
```

## 19. Kampanyalar (`/kampanyalar`) — Offer + validFrom/validThrough

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Nakliyat Kampanyaları & İndirimler — Kozcuoğlu Nakliyat",
  "description": "Kozcuoğlu Nakliyat güncel kampanyalar. Erken rezervasyon indirimi, hafta içi fırsatları, sezonsal kampanyalar.",
  "url": "https://kozcuoglunakliyat.com.tr/kampanyalar",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Aktif Kampanyalar",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Offer",
          "name": "Erken Rezervasyon İndirimi",
          "description": "30 gün önceden rezervasyon yapana %10 indirim",
          "discount": "10%",
          "validFrom": "2026-01-01",
          "validThrough": "2026-12-31",
          "seller": {
            "@type": "MovingCompany",
            "@id": "https://kozcuoglunakliyat.com.tr/#organization"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Offer",
          "name": "Hafta İçi Nakliyat İndirimi",
          "description": "Hafta içi taşımalarda %15 indirim",
          "discount": "15%",
          "validFrom": "2026-01-01",
          "validThrough": "2026-12-31",
          "seller": {
            "@type": "MovingCompany",
            "@id": "https://kozcuoglunakliyat.com.tr/#organization"
          }
        }
      }
    ]
  }
}
```

> **Not:** Kampanyalar admin panelden yönetilir. `validFrom` ve `validThrough` ile Google'a kampanya süresini bildirir. Arama sonuçlarında "İndirim" etiketi çıkabilir.

## NAP Tutarlılığı Kontrol Listesi

| Kontrol | Açıklama |
|---|---|
| Schema NAP | MovingCompany şemasındaki name, address, telephone |
| Header NAP | Header'daki firma adı ve telefon |
| Footer NAP | Footer'daki firma adı, adres, telefon |
| İletişim NAP | İletişim sayfasındaki tüm bilgiler |
| Google Business | Google Business Profile'daki NAP |
| Sosyal Medya | Tüm sosyal medya profillerindeki NAP |
| Dış Dizinler | Yandex, Bing Places, Foursquare vb. |

> **Kural:** Tüm platformlarda NAP bilgisi karakter karakter aynı olmalıdır.

## 20. WebPage (Tüm Sayfalar)

Her sayfada `WebPage` veya uygun alt tipi kullanılır:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Evden Eve Nakliyat",
  "description": "İstanbul evden eve nakliyat hizmeti...",
  "url": "https://kozcuoglunakliyat.com.tr/evden-eve-nakliyat",
  "mainEntity": {
    "@type": "Service",
    "name": "Evden Eve Nakliyat"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [...]
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".intro-text", ".faq-answer"]
  },
  "lastReviewed": "2026-02-13",
  "inLanguage": "tr"
}
```

> **Alt Tipler:** `CollectionPage` (liste sayfaları), `AboutPage` (hakkımızda), `ContactPage` (iletişim), `FAQPage` (SSS), `WebPage` (diğerleri)

## 20B. SearchAction — Gelişmiş (Ana Sayfa — Site İçi Arama)

Google arama sonuçlarında "site içi ara" kutusu çıkması için (7 numaralı WebSite schema'sının gelişmiş versiyonu):

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kozcuoğlu Nakliyat",
  "url": "https://kozcuoglunakliyat.com.tr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://kozcuoglunakliyat.com.tr/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

> Blog arama özelliği varsa bu schema aktif edilir.

## 21. SpeakableSpecification (Tüm Sayfalar — Sesli Arama)

Sesli asistanların (Google Assistant, Siri, Alexa) içeriği okuması için:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      "h1",
      ".intro-text",
      ".faq-answer:first-of-type",
      ".price-range"
    ]
  }
}
```

> Her sayfanın h1, intro paragrafı, ilk SSS cevabı ve fiyat aralığı `speakable` olarak işaretlenir. Cümleler kısa, net, konuşma diline uygun yazılmalıdır.

## 22. Nested JSON-LD (Hizmet Sayfaları — Zengin SERP)

Tek sayfada iç içe geçmiş schema ile Google SERP'te 4-5 satır yer kaplama:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Evden Eve Nakliyat",
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".intro-text"] },
  "mainEntity": {
    "@type": "Service",
    "name": "Evden Eve Nakliyat",
    "provider": { "@type": "MovingCompany", "@id": "https://kozcuoglunakliyat.com.tr/#organization" },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "3500",
      "highPrice": "25000",
      "priceCurrency": "TRY"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ev Taşıma Paketleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "1+1 Ev Taşıma" },
          "priceSpecification": { "@type": "PriceSpecification", "minPrice": "3500", "maxPrice": "6000", "priceCurrency": "TRY" }
        }
      ]
    }
  },
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": ["..."] }
}
```

> SERP'te aynı anda yıldızlar + fiyat aralığı + breadcrumb + SSS görünür. CTR 3-5x artar.

## Doğrulama Araçları

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **Schema Markup Validator:** https://validator.schema.org
3. **Google Search Console:** Geliştirmeler → Zengin sonuçlar
4. **Ahrefs Site Audit:** Schema doğrulama
5. **Screaming Frog:** Structured data analizi

## Build-Time Schema Doğrulama Pipeline

Her deploy'da otomatik çalışan schema kontrolleri:

```
npm run build
  → validate-schemas.ts (JSON-LD syntax + tip + zorunlu alan + NAP tutarlılık)
  → seo-audit.ts (title 50-60 kar, desc 150-160 kar, h1, alt text)
  → broken-links.ts (kırık link kontrolü)
  → sitemap-validate.ts (sitemap tutarlılık)
  → ✅ Build başarılı / ❌ Build başarısız
```
