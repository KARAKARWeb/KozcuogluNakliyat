# Kozcuoğlu Nakliyat — SEO & PSI & Schema & Structured Data QA Protokolü

> **Amaç:** Google'ın tüm sıralama kriterlerini, teknik SEO gereksinimlerini, yapısal veri standartlarını ve performans metriklerini eksiksiz kontrol etmek.
> **Referans:** Google Search Central, Schema.org, Web.dev, PageSpeed Insights, Lighthouse
> **Son Güncelleme:** 2026-02-13

---

## BÖLÜM 1 — TEKNİK SEO (ON-PAGE)

### 1.1 Rendering & Crawlability

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 1.1.1 | Tüm sayfalar SSR/SSG ile render ediliyor mu? | `"use client"` olan sayfalar server component olmalı, interaktif kısımlar ayrı client component | [ ] |
| 1.1.2 | JavaScript devre dışıyken ana içerik görünüyor mu? | H1, paragraflar, linkler JS olmadan HTML'de mevcut | [ ] |
| 1.1.3 | Googlebot sayfaları tam render edebiliyor mu? | `curl -A "Googlebot"` ile test — tam HTML içerik | [ ] |
| 1.1.4 | `_next/data` route'ları botlardan gizli mi? | SW'de skip ediliyor, robots.txt'de `/_next/` disallow | [ ] |
| 1.1.5 | Sayfa kaynağında (View Source) tüm meta tag'ler var mı? | title, description, canonical, og:*, robots — HTML'de mevcut | [ ] |
| 1.1.6 | Client-side routing sonrası meta tag'ler güncelleniyor mu? | Next.js App Router otomatik güncellemeli | [ ] |
| 1.1.7 | Infinite scroll / lazy content botlara görünür mü? | Tüm kritik içerik ilk HTML'de | [ ] |
| 1.1.8 | `fetch()` ile yüklenen içerik SSR'da mevcut mu? | Server component'lerde `readData()` ile — HTML'de var | [ ] |

### 1.2 URL Yapısı & Yönlendirme

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 1.2.1 | URL'ler kısa, anlamlı ve slug formatında mı? | `/evden-eve-nakliyat`, `/ofis-tasima` — Türkçe karakter yok | [ ] |
| 1.2.2 | Trailing slash tutarlılığı sağlanmış mı? | Trailing slash YOK → `/sayfa-adi` formatı | [ ] |
| 1.2.3 | Blog URL formatı doğru mu? | `/yazi-slug.html` formatında | [ ] |
| 1.2.4 | Hizmet bölgesi URL formatı doğru mu? | `/bolge-adi-evden-eve-nakliyat` formatında | [ ] |
| 1.2.5 | Büyük/küçük harf tutarlılığı var mı? | Tüm URL'ler küçük harf | [ ] |
| 1.2.6 | Parametre/query string'ler canonical'ı bozmuyor mu? | `?ref=xxx` gibi parametreler canonical'ı etkilememeli | [ ] |
| 1.2.7 | 301 redirect'ler döngü oluşturmuyor mu? | A→B→C zinciri yok, tek adımda yönlendirme | [ ] |
| 1.2.8 | www vs non-www tutarlılığı var mı? | Tek versiyon, diğeri 301 redirect | [ ] |
| 1.2.9 | HTTP → HTTPS yönlendirmesi var mı? | HSTS header + 301 redirect | [ ] |
| 1.2.10 | Eski site URL'leri 301 redirect ile yönlendirilmiş mi? | `next.config.ts` redirects veya `redirects.json` | [ ] |

### 1.3 HTTP Status Code'ları

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 1.3.1 | Mevcut sayfalar 200 dönüyor mu? | Tüm statik + dynamic sayfalar HTTP 200 | [ ] |
| 1.3.2 | Olmayan sayfalar gerçek 404 dönüyor mu? | `dynamicParams = false` — HTTP 404 status | [ ] |
| 1.3.3 | Soft 404 var mı? | 200 dönen ama "sayfa bulunamadı" içerikli sayfa YOK | [ ] |
| 1.3.4 | 404 sayfası kullanıcı dostu mu? | `not-found.tsx` — yönlendirme önerileri, arama, CTA | [ ] |
| 1.3.5 | 500 hata sayfası var mı? | `error.tsx` + `global-error.tsx` — "Tekrar Dene" butonu | [ ] |
| 1.3.6 | Redirect'ler 301 (kalıcı) mı? | 302 değil, 301 kullanılmalı | [ ] |
| 1.3.7 | API route'lar doğru status code dönüyor mu? | 200, 201, 400, 404, 500 — uygun kodlar | [ ] |

### 1.4 Canonical URL

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 1.4.1 | Her sayfada `<link rel="canonical">` var mı? | Tüm 30+ sayfada mevcut | [ ] |
| 1.4.2 | Canonical URL sayfanın kendi URL'si mi? | `/hizmetlerimiz` sayfasında canonical = `/hizmetlerimiz` | [ ] |
| 1.4.3 | Canonical URL mutlak (absolute) mı? | `https://kozcuoglunakliyat.com.tr/sayfa` — relative değil | [ ] |
| 1.4.4 | Canonical URL trailing slash tutarlı mı? | Canonical'da trailing slash yok | [ ] |
| 1.4.5 | Dynamic route'larda canonical doğru mu? | `[slug]` → `/{slug}`, `[...slug]` → `/{slug.join("/")}` | [ ] |
| 1.4.6 | Pagination sayfalarında canonical doğru mu? | Blog sayfa 2 → canonical = `/blog?page=2` veya self-referencing | [ ] |
| 1.4.7 | Offline sayfasında canonical root'a düşüyor mu? | Sorun değil — noindex olduğu için | [ ] |
| 1.4.8 | Duplicate content riski var mı? | Aynı içerik farklı URL'lerde yok | [ ] |

### 1.5 Title Tag

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 1.5.1 | Her sayfada benzersiz `<title>` var mı? | Tüm sayfalarda farklı title | [ ] |
| 1.5.2 | Title 50-60 karakter arasında mı? | Çok uzun → Google keser, çok kısa → fırsat kaybı | [ ] |
| 1.5.3 | Title template doğru çalışıyor mu? | `%s | Kozcuoğlu Nakliyat` — çift yazılma yok | [ ] |
| 1.5.4 | Title'da birincil anahtar kelime var mı? | "Evden Eve Nakliyat" gibi hedef kelime başta | [ ] |
| 1.5.5 | Ana sayfa title'ı marka + anahtar kelime mi? | "Kozcuoğlu Nakliyat \| İstanbul Evden Eve Nakliyat" | [ ] |
| 1.5.6 | Title'da gereksiz tekrar var mı? | "Nakliyat Nakliyat" gibi tekrar yok | [ ] |

### 1.6 Meta Description

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 1.6.1 | Her sayfada benzersiz meta description var mı? | Tüm sayfalarda farklı description | [ ] |
| 1.6.2 | Description 150-160 karakter arasında mı? | Çok uzun → Google keser | [ ] |
| 1.6.3 | Description'da CTA var mı? | "☎ 444 7 436", "Ücretsiz keşif", "Hemen teklif alın" | [ ] |
| 1.6.4 | Description'da anahtar kelime var mı? | Hedef kelime doğal şekilde geçmeli | [ ] |
| 1.6.5 | Description boş olan sayfa var mı? | Hiçbir sayfada boş olmamalı | [ ] |

### 1.7 Heading Hiyerarşisi

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 1.7.1 | Her sayfada tek H1 var mı? | Birden fazla H1 yok | [ ] |
| 1.7.2 | H1 anahtar kelime içeriyor mu? | Sayfa konusuyla ilgili birincil kelime | [ ] |
| 1.7.3 | H2-H3-H4 sırası mantıklı mı? | H1 > H2 > H3 — atlama yok (H1 > H4 gibi) | [ ] |
| 1.7.4 | Heading'ler sadece stil için kullanılmamış mı? | H tag'ler semantik, stil için class kullanılmalı | [ ] |
| 1.7.5 | Heading'ler boş değil mi? | İçeriksiz `<h2></h2>` yok | [ ] |

### 1.8 Semantic HTML

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 1.8.1 | `<main>` etiketi kullanılıyor mu? | `id="main-content"` ile ana içerik sarılı | [ ] |
| 1.8.2 | `<nav>` etiketi menüde kullanılıyor mu? | Header ve footer navigasyonlarında | [ ] |
| 1.8.3 | `<article>` blog yazılarında kullanılıyor mu? | Blog detay sayfasında | [ ] |
| 1.8.4 | `<section>` mantıklı bölümlerde mi? | Her bölüm anlamlı section'da | [ ] |
| 1.8.5 | `<footer>` doğru kullanılıyor mu? | Site footer'ı `<footer>` tag'inde | [ ] |
| 1.8.6 | `<aside>` sidebar'da kullanılıyor mu? | Hizmet sayfalarında sidebar | [ ] |
| 1.8.7 | `<time>` tarih gösterimlerinde kullanılıyor mu? | Blog tarihlerinde `datetime` attribute | [ ] |
| 1.8.8 | `<address>` iletişim bilgilerinde kullanılıyor mu? | Footer veya iletişim sayfasında | [ ] |

---

## BÖLÜM 2 — META TAG'LER & HTML HEAD

### 2.1 Zorunlu Meta Tag'ler

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 2.1.1 | `<meta charset="utf-8">` var mı? | Türkçe karakter desteği | [ ] |
| 2.1.2 | `<meta name="viewport">` var mı? | `width=device-width, initial-scale=1` | [ ] |
| 2.1.3 | `<meta name="robots">` doğru mu? | `index, follow` (varsayılan), offline'da `noindex, nofollow` | [ ] |
| 2.1.4 | `<meta name="theme-color">` var mı? | `#122032` | [ ] |
| 2.1.5 | `<meta name="author">` var mı? | "Kozcuoğlu Nakliyat" (opsiyonel ama önerilir) | [ ] |
| 2.1.6 | `<meta name="generator">` kaldırılmış mı? | Framework bilgisi gizli olmalı | [ ] |

### 2.2 Open Graph (Facebook / LinkedIn / WhatsApp)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 2.2.1 | `og:title` her sayfada var mı? | Sayfa başlığı | [ ] |
| 2.2.2 | `og:description` her sayfada var mı? | Sayfa açıklaması | [ ] |
| 2.2.3 | `og:image` her sayfada var mı? | 1200x630 px görsel | [ ] |
| 2.2.4 | `og:url` canonical URL ile aynı mı? | Mutlak URL | [ ] |
| 2.2.5 | `og:type` doğru mu? | `website` (ana sayfa), `article` (blog) | [ ] |
| 2.2.6 | `og:site_name` var mı? | "Kozcuoğlu Nakliyat" | [ ] |
| 2.2.7 | `og:locale` var mı? | `tr_TR` | [ ] |
| 2.2.8 | OG image boyutu doğru mu? | Min 1200x630 px, max 8MB | [ ] |
| 2.2.9 | WhatsApp paylaşımında önizleme doğru mu? | Başlık + açıklama + görsel | [ ] |

### 2.3 Twitter Cards

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 2.3.1 | `twitter:card` var mı? | `summary_large_image` | [ ] |
| 2.3.2 | `twitter:title` var mı? | Sayfa başlığı | [ ] |
| 2.3.3 | `twitter:description` var mı? | Sayfa açıklaması | [ ] |
| 2.3.4 | `twitter:image` var mı? | 1200x630 px görsel | [ ] |

---

## BÖLÜM 3 — SITEMAP & ROBOTS

### 3.1 sitemap.xml

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 3.1.1 | `/sitemap.xml` erişilebilir mi? | HTTP 200, valid XML | [ ] |
| 3.1.2 | Tüm public sayfalar sitemap'te mi? | 30+ statik sayfa + dynamic sayfalar | [ ] |
| 3.1.3 | Admin/API sayfaları sitemap'te değil mi? | `/admin/*`, `/api/*` dahil değil | [ ] |
| 3.1.4 | Offline sayfası sitemap'te değil mi? | `/offline` dahil değil | [ ] |
| 3.1.5 | `lastmod` tarihleri doğru mu? | Gerçek güncelleme tarihi | [ ] |
| 3.1.6 | `changefreq` değerleri mantıklı mı? | Ana sayfa: daily, blog: weekly, hizmet: monthly | [ ] |
| 3.1.7 | `priority` değerleri mantıklı mı? | Ana sayfa: 1.0, hizmetler: 0.8, legal: 0.3 | [ ] |
| 3.1.8 | Blog yazıları sitemap'te mi? | Yayınlanmış tüm yazılar | [ ] |
| 3.1.9 | Hizmet bölgeleri sitemap'te mi? | Aktif tüm bölge sayfaları | [ ] |
| 3.1.10 | Sitemap URL'leri canonical URL ile aynı mı? | Tutarsızlık yok | [ ] |
| 3.1.11 | Sitemap 50.000 URL limitini aşmıyor mu? | Tek sitemap yeterli | [ ] |
| 3.1.12 | Görsel sitemap var mı? | `<image:image>` tag'leri (opsiyonel ama önerilir) | [ ] |

### 3.2 robots.txt

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 3.2.1 | `/robots.txt` erişilebilir mi? | HTTP 200, valid format | [ ] |
| 3.2.2 | `Allow: /` var mı? | Genel izin | [ ] |
| 3.2.3 | Admin disallow var mı? | `Disallow: /admin/` | [ ] |
| 3.2.4 | API disallow var mı? | `Disallow: /api/` | [ ] |
| 3.2.5 | `_next` disallow var mı? | `Disallow: /_next/` | [ ] |
| 3.2.6 | Offline disallow var mı? | `Disallow: /offline` | [ ] |
| 3.2.7 | SW disallow var mı? | `Disallow: /sw.js` | [ ] |
| 3.2.8 | Sitemap URL doğru mu? | `Sitemap: https://kozcuoglunakliyat.com.tr/sitemap.xml` | [ ] |
| 3.2.9 | AI crawler'lara izin var mı? | GPTBot, Google-Extended, ChatGPT-User, anthropic-ai, PerplexityBot | [ ] |
| 3.2.10 | Önemli sayfalar yanlışlıkla disallow edilmemiş mi? | Hizmet, blog, bölge sayfaları erişilebilir | [ ] |

---

## BÖLÜM 4 — STRUCTURED DATA (JSON-LD)

### 4.1 Genel Schema Kuralları

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.1.1 | Tüm schema'lar JSON-LD formatında mı? | `<script type="application/ld+json">` — Microdata değil | [ ] |
| 4.1.2 | Schema'lar `<head>` veya `<body>` içinde mi? | Next.js'te body içinde (JsonLd component) | [ ] |
| 4.1.3 | JSON geçerli mi? (syntax hatası yok) | JSON validator ile kontrol | [ ] |
| 4.1.4 | `@context` doğru mu? | `"https://schema.org"` | [ ] |
| 4.1.5 | Google Rich Results Test geçiyor mu? | https://search.google.com/test/rich-results | [ ] |
| 4.1.6 | Schema Markup Validator geçiyor mu? | https://validator.schema.org | [ ] |
| 4.1.7 | Birden fazla schema varsa array kullanılıyor mu? | `[schema1, schema2]` veya ayrı `<script>` tag'leri | [ ] |
| 4.1.8 | Schema verileri sayfa içeriğiyle tutarlı mı? | Schema'daki bilgi sayfada da görünmeli (Google kuralı) | [ ] |
| 4.1.9 | `@id` property tüm entity'lerde kullanılıyor mu? | Persistent identifier ile entity referencing | [ ] |
| 4.1.10 | `@id` referansları tutarlı mı? | Aynı entity farklı sayfalarda aynı `@id` kullanmalı | [ ] |
| 4.1.11 | Schema nesting (iç içe) doğru mu? | Entity relationships açıkça tanımlanmış | [ ] |
| 4.1.12 | `sameAs` property kullanılıyor mu? | Wikipedia, Wikidata, LinkedIn, sosyal medya profilleri | [ ] |
| 4.1.13 | `sameAs` linkleri geçerli mi? | Tüm external profile URL'leri erişilebilir | [ ] |
| 4.1.14 | Entity salience (önem) açık mı? | Ana entity'ler mainEntity veya about ile işaretlenmiş | [ ] |

### 4.2 Organization Schema

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.2.1 | `@type: Organization` ana sayfada var mı? | Root layout veya ana sayfa | [ ] |
| 4.2.2 | `name` doğru mu? | "Kozcuoğlu Nakliyat" | [ ] |
| 4.2.3 | `url` doğru mu? | `https://kozcuoglunakliyat.com.tr` | [ ] |
| 4.2.4 | `logo` URL'si geçerli mi? | Erişilebilir görsel URL | [ ] |
| 4.2.5 | `contactPoint` doğru mu? | telephone, contactType, areaServed | [ ] |
| 4.2.6 | `sameAs` sosyal medya linkleri doğru mu? | Facebook, Instagram, YouTube, Google Maps, LinkedIn | [ ] |
| 4.2.7 | `@id` benzersiz mi? | `#organization` identifier | [ ] |

### 4.3 LocalBusiness / MovingCompany Schema

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.3.1 | `@type: MovingCompany` ana sayfa + iletişimde var mı? | En az 2 sayfada | [ ] |
| 4.3.2 | NAP bilgileri schema ile sayfa içeriği aynı mı? | Karakter karakter tutarlı | [ ] |
| 4.3.3 | `address` tam ve doğru mu? | streetAddress, addressLocality, addressRegion, postalCode, addressCountry | [ ] |
| 4.3.4 | `geo` koordinatları doğru mu? | latitude, longitude — Google Maps ile eşleşmeli | [ ] |
| 4.3.5 | `openingHoursSpecification` doğru mu? | Gerçek çalışma saatleri | [ ] |
| 4.3.6 | `telephone` E.164 formatında mı? | `+90-444-7-436` | [ ] |
| 4.3.7 | `priceRange` var mı? | `₺₺` | [ ] |
| 4.3.8 | `areaServed` doğru mu? | İstanbul + Turkey | [ ] |
| 4.3.9 | `hasOfferCatalog` hizmetleri listeliyor mu? | Tüm ana hizmetler | [ ] |

### 4.4 Service Schema (Hizmet Sayfaları)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.4.1 | Her hizmet sayfasında `@type: Service` var mı? | `[slug]` route'ta dinamik oluşturulmalı | [ ] |
| 4.4.2 | `name` hizmet adıyla eşleşiyor mu? | "Evden Eve Nakliyat" | [ ] |
| 4.4.3 | `description` benzersiz mi? | Her hizmet için farklı | [ ] |
| 4.4.4 | `url` canonical URL ile aynı mı? | Mutlak URL | [ ] |
| 4.4.5 | `provider` MovingCompany referansı doğru mu? | NAP tutarlı | [ ] |
| 4.4.6 | `areaServed` doğru mu? | İstanbul / Turkey | [ ] |
| 4.4.7 | `aggregateRating` varsa gerçek veriye mi dayanıyor? | Sahte puan yok — Google ceza verir | [ ] |
| 4.4.8 | `hasOfferCatalog` fiyat bilgisi doğru mu? | Gerçek fiyat aralıkları | [ ] |

### 4.5 BreadcrumbList Schema

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.5.1 | Her sayfada BreadcrumbList schema var mı? | Tüm sayfalarda | [ ] |
| 4.5.2 | İlk eleman "Kozcuoğlu Nakliyat" mı? | "Ana Sayfa" değil | [ ] |
| 4.5.3 | `position` sıralaması doğru mu? | 1, 2, 3... ardışık | [ ] |
| 4.5.4 | URL'ler mutlak mı? | `https://kozcuoglunakliyat.com.tr/...` | [ ] |
| 4.5.5 | Son eleman (aktif sayfa) URL'siz mi? | Google önerisi: son eleman URL'siz olabilir | [ ] |
| 4.5.6 | UI breadcrumb ile schema breadcrumb tutarlı mı? | Aynı hiyerarşi | [ ] |

### 4.6 FAQPage Schema

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.6.1 | SSS sayfasında FAQPage schema var mı? | `/sikca-sorulan-sorular` | [ ] |
| 4.6.2 | Hizmet sayfalarında FAQ varsa schema da var mı? | `faq.length > 0` ise faqSchema oluşturulmalı | [ ] |
| 4.6.3 | Soru-cevap içeriği sayfada görünüyor mu? | Schema'daki SSS sayfada da gösterilmeli (Google kuralı) | [ ] |
| 4.6.4 | `Question.name` ve `Answer.text` boş değil mi? | İçerik dolu | [ ] |
| 4.6.5 | Reklam/tanıtım içerikli cevap yok mu? | Google FAQ'da reklam cezası verir | [ ] |

### 4.7 Article Schema (Blog)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.7.1 | Blog yazılarında Article schema var mı? | `[...slug]` route'ta | [ ] |
| 4.7.2 | `headline` doğru mu? | Yazı başlığı, max 110 karakter | [ ] |
| 4.7.3 | `datePublished` ISO 8601 formatında mı? | `2026-01-15T10:00:00+03:00` | [ ] |
| 4.7.4 | `dateModified` varsa doğru mu? | Gerçek güncelleme tarihi | [ ] |
| 4.7.5 | `author` doğru mu? | Organization veya Person | [ ] |
| 4.7.6 | `publisher` logo URL'si geçerli mi? | Erişilebilir görsel | [ ] |
| 4.7.7 | `image` var mı? | Blog kapak görseli | [ ] |
| 4.7.8 | `mainEntityOfPage` canonical URL ile aynı mı? | Tutarlı | [ ] |

### 4.8 WebSite Schema

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.8.1 | Ana sayfada WebSite schema var mı? | Sitelinks Search Box için | [ ] |
| 4.8.2 | `name` doğru mu? | "Kozcuoğlu Nakliyat" | [ ] |
| 4.8.3 | `url` doğru mu? | `https://kozcuoglunakliyat.com.tr` | [ ] |
| 4.8.4 | `potentialAction` SearchAction doğru mu? | Blog arama URL'si | [ ] |

### 4.9 Review / AggregateRating Schema

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.9.1 | AggregateRating gerçek verilere mi dayanıyor? | `reviews.json`'dan dinamik hesaplama | [ ] |
| 4.9.2 | `ratingValue` 1-5 arasında mı? | Geçerli değer | [ ] |
| 4.9.3 | `reviewCount` gerçek sayı mı? | Sahte sayı yok | [ ] |
| 4.9.4 | `bestRating` ve `worstRating` var mı? | 5 ve 1 | [ ] |
| 4.9.5 | Review'lar sayfada görünüyor mu? | Schema'daki yorumlar sayfada da gösterilmeli | [ ] |
| 4.9.6 | Self-serving review yok mu? | Firma kendi kendine yorum yazmamış | [ ] |

### 4.10 Diğer Schema Tipleri

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.10.1 | HowTo schema blog/çözüm sayfalarında var mı? | Adım adım içeriklerde | [ ] |
| 4.10.2 | ItemList schema liste sayfalarında var mı? | Hizmetlerimiz, çözümlerimiz, hizmet bölgeleri | [ ] |
| 4.10.3 | SelfStorage schema eşya depolama sayfasında var mı? | `/esya-depolama` | [ ] |
| 4.10.4 | AboutPage schema hakkımızda sayfasında var mı? | `/hakkimizda` | [ ] |
| 4.10.5 | ContactPage schema iletişim sayfasında var mı? | `/iletisim` | [ ] |
| 4.10.6 | SoftwareApplication schema fiyat hesaplamada var mı? | `/nakliyat-fiyat-hesaplama` | [ ] |
| 4.10.7 | SiteNavigationElement schema header'da var mı? | Ana menü yapısı | [ ] |

### 4.11 Entity-Based SEO & Knowledge Graph

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 4.11.1 | Organization entity `@id` tanımlı mı? | `"@id": "https://kozcuoglunakliyat.com.tr/#organization"` | [ ] |
| 4.11.2 | Tüm sayfalarda aynı organization `@id` referansı var mı? | Tutarlı entity linking | [ ] |
| 4.11.3 | `alternateName` property kullanılıyor mu? | Marka varyasyonları: "Kozcuoğlu Evden Eve Nakliyat" | [ ] |
| 4.11.4 | `knowsAbout` property kullanılıyor mu? | Uzmanlık alanları açıkça belirtilmiş | [ ] |
| 4.11.5 | Entity relationships açık mı? | Service → provider → Organization bağlantısı | [ ] |
| 4.11.6 | Wikidata kaydı var mı? | Wikidata ID `sameAs` listesinde | [ ] |
| 4.11.7 | Google Knowledge Graph'te entity tanınıyor mu? | Brand search'te Knowledge Panel çıkıyor | [ ] |
| 4.11.8 | Entity disambiguation açık mı? | Benzer isimli firmalardan ayırt edilebilir | [ ] |
| 4.11.9 | Semantic relationships tanımlı mı? | isPartOf, hasPart, mentions, about properties | [ ] |
| 4.11.10 | Entity consistency cross-platform mı? | Site, GBP, sosyal medya, dizinlerde aynı entity | [ ] |

---

## BÖLÜM 5 — NAP TUTARLILIĞI (Name, Address, Phone)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 5.1 | Header'daki firma adı doğru mu? | "Kozcuoğlu Nakliyat" | [ ] |
| 5.2 | Footer'daki NAP bilgileri doğru mu? | Ad + Adres + Telefon + E-posta | [ ] |
| 5.3 | İletişim sayfasındaki NAP doğru mu? | Tüm bilgiler eksiksiz | [ ] |
| 5.4 | Schema'daki NAP ile sayfa NAP'ı aynı mı? | Karakter karakter tutarlı | [ ] |
| 5.5 | Telefon formatı tutarlı mı? | `444 7 436` veya `0216 494 53 37` — her yerde aynı | [ ] |
| 5.6 | Adres formatı tutarlı mı? | "Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul" | [ ] |
| 5.7 | E-posta adresi tutarlı mı? | `info@kozcuoglunakliyat.com.tr` | [ ] |
| 5.8 | Google Business Profile ile tutarlı mı? | GBP'deki NAP = site NAP | [ ] |
| 5.9 | Sosyal medya profillerinde NAP tutarlı mı? | Facebook, Instagram, LinkedIn | [ ] |
| 5.10 | `tel:` linkleri doğru formatta mı? | `tel:4447436` veya `tel:+904447436` | [ ] |

---

## BÖLÜM 6 — PAGESPEED INSIGHTS (PSI) & CORE WEB VITALS

### 6.1 Core Web Vitals

| # | Metrik | Hedef | İyi | Kötü | Durum |
|---|---|---|---|---|---|
| 6.1.1 | **LCP** (Largest Contentful Paint) | < 1.2s | < 2.5s | > 4.0s | [ ] |
| 6.1.2 | **INP** (Interaction to Next Paint) | < 100ms | < 200ms | > 500ms | [ ] |
| 6.1.3 | **CLS** (Cumulative Layout Shift) | < 0.05 | < 0.1 | > 0.25 | [ ] |
| 6.1.4 | **FCP** (First Contentful Paint) | < 1.0s | < 1.8s | > 3.0s | [ ] |
| 6.1.5 | **TTFB** (Time to First Byte) | < 200ms | < 800ms | > 1800ms | [ ] |
| 6.1.6 | **TBT** (Total Blocking Time) | < 150ms | < 200ms | > 600ms | [ ] |
| 6.1.7 | **Speed Index** | < 1.5s | < 3.4s | > 5.8s | [ ] |

### 6.2 Lighthouse Skorları

| # | Kategori | Hedef | Durum |
|---|---|---|---|
| 6.2.1 | Performance | 100 | [ ] |
| 6.2.2 | Accessibility | 100 | [ ] |
| 6.2.3 | Best Practices | 100 | [ ] |
| 6.2.4 | SEO | 100 | [ ] |
| 6.2.5 | PWA | Installable | [ ] |

### 6.3 Görsel Optimizasyonu

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 6.3.1 | Tüm görseller `next/image` ile mi? | `<Image>` bileşeni kullanılmalı | [ ] |
| 6.3.2 | WebP/AVIF formatı kullanılıyor mu? | `next.config.ts` → `formats: ["image/avif", "image/webp"]` | [ ] |
| 6.3.3 | Hero görselde `priority={true}` var mı? | LCP görseli preload edilmeli | [ ] |
| 6.3.4 | Lazy loading aktif mi? | Viewport dışındaki görseller lazy | [ ] |
| 6.3.5 | `width` ve `height` belirtilmiş mi? | CLS önleme | [ ] |
| 6.3.6 | Responsive `sizes` attribute var mı? | Farklı ekran boyutları için | [ ] |
| 6.3.7 | Görsel boyutları optimize mi? | Hero < 200KB, kart < 80KB, thumbnail < 30KB | [ ] |
| 6.3.8 | Alt text tüm görsellerde var mı? | Açıklayıcı, anahtar kelimeli | [ ] |
| 6.3.9 | Dekoratif görsellerde `alt=""` mı? | Boş alt (screen reader atlar) | [ ] |
| 6.3.10 | OG image boyutu doğru mu? | 1200x630 px | [ ] |

### 6.4 Font Optimizasyonu

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 6.4.1 | `next/font` kullanılıyor mu? | Self-hosted, Google CDN değil | [ ] |
| 6.4.2 | `font-display: swap` var mı? | FOIT önleme | [ ] |
| 6.4.3 | Sadece gerekli weight'ler yükleniyor mu? | 400, 600, 700 | [ ] |
| 6.4.4 | Sadece gerekli subset'ler mi? | `latin`, `latin-ext` | [ ] |
| 6.4.5 | Font preload otomatik mi? | `next/font` sağlar | [ ] |

### 6.5 JavaScript Optimizasyonu

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 6.5.1 | Code splitting aktif mi? | Next.js otomatik sayfa bazlı | [ ] |
| 6.5.2 | 3. parti scriptler lazy load mu? | GA4: afterInteractive, Clarity/Tawk: lazyOnload | [ ] |
| 6.5.3 | Kullanılmayan JS var mı? | Tree shaking aktif, dead code yok | [ ] |
| 6.5.4 | Bundle boyutu makul mü? | First Load JS < 100KB (sayfa bazı) | [ ] |
| 6.5.5 | Dynamic import kullanılıyor mu? | Büyük bileşenler lazy load | [ ] |
| 6.5.6 | Analytics ID'ler boşsa script yüklenmiyor mu? | Gereksiz network request yok | [ ] |

### 6.6 CSS Optimizasyonu

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 6.6.1 | TailwindCSS purge aktif mi? | Kullanılmayan class'lar kaldırılıyor | [ ] |
| 6.6.2 | Critical CSS inline mi? | Above-the-fold CSS hemen yükleniyor | [ ] |
| 6.6.3 | Render-blocking CSS var mı? | Minimum — Next.js otomatik optimize eder | [ ] |
| 6.6.4 | Animasyonlar GPU hızlandırmalı mı? | `transform` ve `opacity` kullanılmalı | [ ] |

### 6.7 Cache & Sıkıştırma

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 6.7.1 | Statik dosyalarda cache header var mı? | `Cache-Control: public, max-age=31536000, immutable` | [ ] |
| 6.7.2 | SW ve manifest cache'lenmemiş mi? | `Cache-Control: no-cache, no-store, must-revalidate` | [ ] |
| 6.7.3 | Gzip/Brotli sıkıştırma aktif mi? | Sunucu tarafı sıkıştırma | [ ] |
| 6.7.4 | ETag header'lar doğru mu? | Değişmeyen dosyalar için | [ ] |

### 6.8 Resource Hints

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 6.8.1 | `dns-prefetch` 3. parti domainler için var mı? | googletagmanager.com, clarity.ms | [ ] |
| 6.8.2 | Hero görsel `preload` edilmiş mi? | LCP görseli | [ ] |
| 6.8.3 | Font preload otomatik mi? | `next/font` sağlar | [ ] |

---

## BÖLÜM 7 — SECURITY HEADERS & HTTPS

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 7.1 | HTTPS aktif mi? | SSL sertifikası geçerli | [ ] |
| 7.2 | HSTS header var mı? | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` | [ ] |
| 7.3 | `X-Content-Type-Options` var mı? | `nosniff` | [ ] |
| 7.4 | `X-Frame-Options` var mı? | `SAMEORIGIN` | [ ] |
| 7.5 | `X-XSS-Protection` var mı? | `1; mode=block` | [ ] |
| 7.6 | `Referrer-Policy` var mı? | `strict-origin-when-cross-origin` | [ ] |
| 7.7 | `Permissions-Policy` var mı? | `camera=(), microphone=(), geolocation=()` | [ ] |
| 7.8 | `Content-Security-Policy` var mı? | Report-Only modda (test), sonra enforce | [ ] |
| 7.9 | Mixed content yok mu? | HTTP kaynak HTTPS sayfada yüklenmemeli | [ ] |

---

## BÖLÜM 8 — PWA & SERVICE WORKER SEO ETKİSİ

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 8.1 | SW HTML cache'lemiyor mu? | Network-Only + offline fallback | [ ] |
| 8.2 | Offline fallback noindex mi? | `robots: { index: false, follow: false }` | [ ] |
| 8.3 | SW cross-origin istekleri skip ediyor mu? | `url.origin !== self.location.origin` kontrolü | [ ] |
| 8.4 | SW `_next/data` route'larını skip ediyor mu? | JSON data route'ları cache'lenmemeli | [ ] |
| 8.5 | SW admin/API route'larını skip ediyor mu? | `/admin/*`, `/api/*` skip | [ ] |
| 8.6 | Manifest.json erişilebilir mi? | HTTP 200, valid JSON | [ ] |
| 8.7 | Manifest'te `id` alanı var mı? | `"id": "/"` | [ ] |
| 8.8 | SW versiyonlama var mı? | Eski cache'ler activate event'te temizleniyor | [ ] |
| 8.9 | Googlebot SW'den etkilenmiyor mu? | Bot JS çalıştırmaz — SW etkisiz | [ ] |

---

## BÖLÜM 9 — İÇERİK SEO & E-E-A-T

### 9.1 İçerik Kalitesi

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 9.1.1 | Hizmet sayfalarında yeterli içerik var mı? | Min 500 kelime, ideal 1000+ | [ ] |
| 9.1.2 | Blog yazıları yeterli uzunlukta mı? | Min 1500 kelime | [ ] |
| 9.1.3 | Bölge sayfalarında bölgeye özel içerik var mı? | Copy-paste değil, benzersiz | [ ] |
| 9.1.4 | Thin content (ince içerik) olan sayfa var mı? | 200 kelimeden az sayfa yok | [ ] |
| 9.1.5 | Duplicate content var mı? | Aynı içerik farklı sayfalarda yok | [ ] |
| 9.1.6 | Keyword stuffing var mı? | Doğal anahtar kelime dağılımı | [ ] |
| 9.1.7 | İçerikte yazım hatası var mı? | Türkçe karakter ve imla doğru | [ ] |

### 9.2 E-E-A-T Sinyalleri

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 9.2.1 | **Experience:** Gerçek müşteri yorumları var mı? | Onaylı, gerçek isimli yorumlar | [ ] |
| 9.2.2 | **Experience:** Proje görselleri/galeri var mı? | Gerçek taşıma fotoğrafları | [ ] |
| 9.2.3 | **Expertise:** Blog yazıları bilgi verici mi? | Nakliyat rehberleri, ipuçları | [ ] |
| 9.2.4 | **Authority:** Sertifika/lisans bilgisi var mı? | K1 belgesi, sigorta poliçesi | [ ] |
| 9.2.5 | **Trust:** Gerçek adres gösteriliyor mu? | Google Maps embed veya link | [ ] |
| 9.2.6 | **Trust:** SSL sertifikası geçerli mi? | HTTPS aktif | [ ] |
| 9.2.7 | **Trust:** Gizlilik politikası var mı? | `/gizlilik-politikasi` | [ ] |
| 9.2.8 | **Trust:** KVKK aydınlatma metni var mı? | `/kvkk-aydinlatma-metni` | [ ] |
| 9.2.9 | **Trust:** Kullanım koşulları var mı? | `/kullanim-kosullari` | [ ] |

### 9.3 Internal Linking

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 9.3.1 | Her sayfadan ilgili sayfalara 3-5 link var mı? | Doğal internal linking | [ ] |
| 9.3.2 | Breadcrumb ile hiyerarşi sağlanmış mı? | UI + Schema | [ ] |
| 9.3.3 | Footer'da hizmet/çözüm/bölge linkleri var mı? | Site geneli link dağılımı | [ ] |
| 9.3.4 | Mega menüde tüm ana sayfalar var mı? | Hizmetler, çözümler, bölgeler | [ ] |
| 9.3.5 | Orphan page (bağlantısız sayfa) var mı? | Her sayfa en az 1 yerden linklenmiş | [ ] |
| 9.3.6 | Kırık link (broken link) var mı? | 404 dönen internal link yok | [ ] |
| 9.3.7 | Anchor text'ler açıklayıcı mı? | "Tıklayın" değil, "Evden eve nakliyat hizmetimiz" | [ ] |

---

## BÖLÜM 10 — LOCAL SEO

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 10.1 | Google Business Profile güncel mi? | NAP, çalışma saatleri, fotoğraflar | [ ] |
| 10.2 | GBP kategorisi doğru mu? | "Moving Company" / "Nakliyat Firması" | [ ] |
| 10.3 | GBP'de website URL doğru mu? | `https://kozcuoglunakliyat.com.tr` | [ ] |
| 10.4 | Bölge sayfalarında `areaServed` schema var mı? | Place + GeoCoordinates | [ ] |
| 10.5 | Her bölge sayfasında benzersiz içerik var mı? | Template değil, bölgeye özel | [ ] |
| 10.6 | Bölge sayfalarında bölgeye özel SSS var mı? | FAQPage schema ile | [ ] |
| 10.7 | Google Maps embed veya link var mı? | İletişim sayfasında | [ ] |
| 10.8 | Bing Places kaydı var mı? | NAP tutarlı | [ ] |
| 10.9 | Yandex Webmaster kaydı var mı? | Sitemap gönderilmiş | [ ] |

---

## BÖLÜM 11 — GEO & AI OVERVIEWS OPTIMIZATION

### 11.0 AI Overviews & Citation-Worthy Content

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 11.0.1 | İçerik AI citation-worthy mu? | Orijinal data, unique insights, comprehensive guides | [ ] |
| 11.0.2 | Quotable statistics var mı? | Net, kaynaklı istatistikler AI'ın cite edebileceği formatta | [ ] |
| 11.0.3 | Executive summary var mı? | Her uzun içerikte özet bölüm (AI extraction için) | [ ] |
| 11.0.4 | Definitive resource niteliği var mı? | Konuda en kapsamlı kaynak olma hedefi | [ ] |
| 11.0.5 | Original research/data var mı? | Başka yerde olmayan veri, anket, istatistik | [ ] |
| 11.0.6 | Proprietary framework var mı? | Kendi geliştirdiğiniz metodoloji, süreç | [ ] |
| 11.0.7 | Content depth yeterli mi? | Rakiplerden daha kapsamlı, daha detaylı | [ ] |
| 11.0.8 | Multi-format content var mı? | Metin + görsel + video + infografik | [ ] |
| 11.0.9 | Entity clarity AI için optimize mi? | Brand, products, concepts açıkça tanımlanmış | [ ] |
| 11.0.10 | Contextual descriptions var mı? | Entity'ler ilk bahsedildiğinde context verilmiş | [ ] |

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
### 11.1 GEO (Generative Engine Optimization)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 11.1.1 | `/llms.txt` oluşturulmuş mu? | Site özeti: firma, hizmetler, iletişim | [ ] |
| 11.1.2 | `/llms-full.txt` oluşturulmuş mu? | Detaylı: tüm hizmet/çözüm/bölge + SSS + fiyatlar | [ ] |
| 11.1.3 | robots.txt'de AI crawler izinleri var mı? | GPTBot, Google-Extended, ChatGPT-User, anthropic-ai, ClaudeBot, PerplexityBot | [ ] |
| 11.1.4 | İçerik yapısı AI-friendly mi? | Net başlıklar, kısa paragraflar, listeler, tablolar | [ ] |
| 11.1.5 | Her sayfada SSS bölümü var mı? | AI'ın soru-cevap çıkarması için | [ ] |
| 11.1.6 | Firma bilgileri her sayfada açık mı? | Ad, adres, telefon — footer'da | [ ] |
| 11.1.7 | Glossary page var mı? | Key entities ve relationships tanımlı | [ ] |
| 11.1.8 | About page comprehensive mı? | Brand entity, relationships, industry context | [ ] |

---

## BÖLÜM 11A — TOPICAL AUTHORITY & CONTENT CLUSTERS

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 11A.1 | Pillar pages tanımlı mı? | Ana konular için comprehensive overview sayfaları | [ ] |
| 11A.2 | Content clusters oluşturulmuş mu? | Her pillar için 8-12 supporting article | [ ] |
| 11A.3 | Cluster internal linking doğru mu? | Cluster → Pillar ve Cluster ↔ Cluster linkler | [ ] |
| 11A.4 | Topical coverage complete mi? | "People Also Ask" soruları cevaplanmış | [ ] |
| 11A.5 | Content depth rakiplerden iyi mi? | Daha kapsamlı, daha detaylı içerik | [ ] |
| 11A.6 | Topic cluster map görsel var mı? | İçerik hiyerarşisi görselleştirilmiş | [ ] |
| 11A.7 | Orphan content yok mu? | Her içerik bir cluster'a ait | [ ] |
| 11A.8 | Semantic keyword coverage var mı? | İlgili kavramlar, eş anlamlılar kapsanmış | [ ] |
| 11A.9 | Content freshness stratejisi var mı? | Cluster içerikleri düzenli güncelleniyor | [ ] |
| 11A.10 | Authority signals güçlü mü? | Backlinks, citations, mentions konuda otorite gösteriyor | [ ] |

---

## BÖLÜM 11B — PASSAGE RANKING & FEATURED SNIPPETS

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 11B.1 | Her section bağımsız anlamlı mı? | Passage ranking için optimize edilmiş | [ ] |
| 11B.2 | H2 başlıklar soru formatında mı? | "Evden eve nakliyat ne kadar sürer?" gibi | [ ] |
| 11B.3 | İlk cümle doğrudan cevap mı? | Featured snippet hedefli direkt yanıt | [ ] |
| 11B.4 | Paragraf snippet-friendly mi? | 40-60 kelime, net, özlü cevap | [ ] |
| 11B.5 | Liste snippet hedefleniyor mu? | 5-8 maddelik `<ol>` veya `<ul>` listeler | [ ] |
| 11B.6 | Tablo snippet hedefleniyor mu? | Fiyat karşılaştırma, özellik tabloları | [ ] |
| 11B.7 | HowTo schema adım içeriklerde var mı? | Step-by-step rehberler schema ile desteklenmiş | [ ] |
| 11B.8 | Section ID'ler anchor-friendly mi? | TOC'dan direkt passage'a link | [ ] |
| 11B.9 | Semantic HTML sections kullanılıyor mu? | `<section>` ile her passage ayrılmış | [ ] |
| 11B.10 | Zero-click optimization dengeli mi? | Snippet verir ama tıklama da teşvik eder | [ ] |

---

## BÖLÜM 12 — ERİŞİLEBİLİRLİK (WCAG 2.1 AA)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 12.1 | Renk kontrastı WCAG AA mi? | Normal metin 4.5:1, büyük metin 3:1 | [ ] |
| 12.2 | Keyboard navigasyon çalışıyor mu? | Tab ile tüm interaktif elemanlar erişilebilir | [ ] |
| 12.3 | Focus visible stiller var mı? | Tab ile gezinirken focus ring görünür | [ ] |
| 12.4 | Skip to content link var mı? | `<a href="#main-content">İçeriğe Geç</a>` | [ ] |
| 12.5 | ARIA label'lar doğru mu? | Butonlar, linkler, ikonlar | [ ] |
| 12.6 | `aria-hidden="true"` dekoratif ikonlarda mı? | Lucide ikonlarında | [ ] |
| 12.7 | Form label'ları var mı? | Her input'ta `<Label>` | [ ] |
| 12.8 | Alt text tüm görsellerde var mı? | Dekoratif: `alt=""`, anlamlı: açıklayıcı | [ ] |
| 12.9 | `lang="tr"` HTML'de var mı? | Root layout'ta | [ ] |
| 12.10 | Screen reader ile test edilmiş mi? | VoiceOver (Mac) veya NVDA (Windows) | [ ] |
| 12.11 | Noscript fallback var mı? | JS devre dışıyken telefon + WhatsApp alternatifi | [ ] |

---

## BÖLÜM 13 — MOBILE SEO & RESPONSIVE

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 13.1 | Mobile-first responsive tasarım mı? | TailwindCSS breakpoint'ler | [ ] |
| 13.2 | Viewport meta tag doğru mu? | `width=device-width, initial-scale=1` | [ ] |
| 13.3 | Touch target'lar yeterli boyutta mı? | Min 48x48 px | [ ] |
| 13.4 | Font boyutu okunabilir mi? | Min 16px body text | [ ] |
| 13.5 | Horizontal scroll yok mu? | Taşma (overflow) yok | [ ] |
| 13.6 | Sticky CTA bar mobilde çalışıyor mu? | Telefon + WhatsApp butonları | [ ] |
| 13.7 | Mega menü mobilde accordion mu? | Touch-friendly | [ ] |
| 13.8 | iPhone SE (375px) test edilmiş mi? | En küçük ekran | [ ] |
| 13.9 | iPad (768px) test edilmiş mi? | Tablet görünüm | [ ] |
| 13.10 | Desktop (1536px+) test edilmiş mi? | Geniş ekran | [ ] |

---

## BÖLÜM 14 — GOOGLE SEARCH CONSOLE HAZIRLIK

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 14.1 | Site doğrulanmış mı? | DNS veya HTML tag ile | [ ] |
| 14.2 | Sitemap gönderilmiş mi? | `/sitemap.xml` submit | [ ] |
| 14.3 | Coverage (Kapsam) hataları var mı? | 0 hata hedefi | [ ] |
| 14.4 | Mobile Usability hataları var mı? | 0 hata hedefi | [ ] |
| 14.5 | Core Web Vitals raporu temiz mi? | Tüm URL'ler "İyi" | [ ] |
| 14.6 | Rich Results raporu temiz mi? | Schema hataları yok | [ ] |
| 14.7 | Manual Actions (Manuel İşlemler) var mı? | 0 ceza | [ ] |
| 14.8 | Security Issues var mı? | 0 güvenlik sorunu | [ ] |
| 14.9 | URL Inspection ile kritik sayfalar test edilmiş mi? | Ana sayfa, hizmetler, blog | [ ] |
| 14.10 | Removals (Kaldırma) listesi temiz mi? | Yanlışlıkla kaldırılmış URL yok | [ ] |

---

## BÖLÜM 15 — SAYFA BAZLI KONTROL MATRİSİ

Her sayfa için aşağıdaki kontroller yapılmalı:

### Kontrol Listesi (Her Sayfa İçin)

```
[ ] Title tag benzersiz ve 50-60 karakter
[ ] Meta description benzersiz ve 150-160 karakter
[ ] Canonical URL doğru (sayfa kendi URL'si)
[ ] H1 tek ve anahtar kelimeli
[ ] H2-H6 hiyerarşisi doğru
[ ] OG tags (title, description, image, url, type)
[ ] Twitter card tags
[ ] JSON-LD schema(lar) mevcut ve geçerli
[ ] Breadcrumb (UI + Schema) doğru
[ ] Internal linkler mevcut (3-5)
[ ] Alt text tüm görsellerde
[ ] robots: index, follow (veya noindex gerekiyorsa)
[ ] SSR ile render — meta tag'ler HTML source'da
[ ] Sayfa 200 HTTP status dönüyor
[ ] Mobile responsive
[ ] CWV metrikleri hedefte
```

### Sayfa Listesi

| Sayfa | URL | Schema Tipleri |
|---|---|---|
| Ana Sayfa | `/` | Organization, MovingCompany, WebSite, BreadcrumbList |
| Hizmetlerimiz | `/hizmetlerimiz` | ItemList, BreadcrumbList |
| Çözümlerimiz | `/cozumlerimiz` | ItemList, BreadcrumbList |
| Hizmet Detay | `/[slug]` | Service, BreadcrumbList, FAQPage (varsa) |
| Çözüm Detay | `/[slug]` | Service, BreadcrumbList |
| Bölge Detay | `/[slug]` | Service + areaServed, BreadcrumbList |
| Eşya Depolama | `/esya-depolama` | SelfStorage, BreadcrumbList |
| Fiyatlarımız | `/fiyatlarimiz` | WebPage + ItemList, BreadcrumbList |
| Fiyat Hesaplama | `/nakliyat-fiyat-hesaplama` | WebPage + SoftwareApplication, BreadcrumbList |
| Hizmet Bölgeleri | `/hizmet-bolgeleri` | ItemList, BreadcrumbList |
| Blog Liste | `/blog` | BreadcrumbList |
| Blog Detay | `/[...slug]` | Article, BreadcrumbList |
| SSS | `/sikca-sorulan-sorular` | FAQPage, BreadcrumbList |
| Hakkımızda | `/hakkimizda` | AboutPage, BreadcrumbList |
| İletişim | `/iletisim` | ContactPage, BreadcrumbList |
| Galeri | `/galeri` | BreadcrumbList |
| Video Galeri | `/video-galeri` | BreadcrumbList |
| Ekibimiz | `/ekibimiz` | BreadcrumbList |
| Referanslar | `/bireysel-referanslar`, `/kurumsal-referanslar` | BreadcrumbList |
| Araç Filomuz | `/arac-filomuz` | BreadcrumbList |
| Kampanyalar | `/kampanyalar` | BreadcrumbList |
| Taşıma Takip | `/tasima-takip` | BreadcrumbList |
| Kontrol Listesi | `/tasima-kontrol-listesi` | HowTo (opsiyonel), BreadcrumbList |
| Gizlilik Politikası | `/gizlilik-politikasi` | BreadcrumbList |
| KVKK | `/kvkk-aydinlatma-metni` | BreadcrumbList |
| Kullanım Koşulları | `/kullanim-kosullari` | BreadcrumbList |
| Çerez Politikası | `/cerez-politikasi` | BreadcrumbList |
| Sözleşmeler | `/sozlesmeler` | BreadcrumbList |
| Site Haritası | `/site-haritasi` | BreadcrumbList |
| İnsan Kaynakları | `/insan-kaynaklari` | BreadcrumbList |
| Offline | `/offline` | YOK (noindex) |

---

## BÖLÜM 16 — TEST ARAÇLARI & KOMUTLAR

### Online Araçlar

| Araç | URL | Amaç |
|---|---|---|
| Google Rich Results Test | https://search.google.com/test/rich-results | Schema doğrulama |
| Schema Markup Validator | https://validator.schema.org | Schema syntax kontrolü |
| Google PageSpeed Insights | https://pagespeed.web.dev | CWV + performans |
| Google Mobile-Friendly Test | https://search.google.com/test/mobile-friendly | Mobil uyumluluk |
| Google Search Console | https://search.google.com/search-console | İndeksleme, kapsam, CWV |
| Lighthouse (Chrome DevTools) | F12 → Lighthouse | Tüm skorlar |
| WAVE Accessibility | https://wave.webaim.org | Erişilebilirlik |
| Ahrefs/Screaming Frog | — | Site audit, kırık link, redirect |
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug | OG tag kontrolü |
| Twitter Card Validator | https://cards-dev.twitter.com/validator | Twitter card kontrolü |

### Terminal Komutları

```bash
# 404 testi
curl -s -o /dev/null -w "%{http_code}" "https://kozcuoglunakliyat.com.tr/bu-sayfa-yok"

# Canonical kontrolü
curl -s "https://kozcuoglunakliyat.com.tr/hizmetlerimiz" | grep 'rel="canonical"'

# Title kontrolü
curl -s "https://kozcuoglunakliyat.com.tr" | sed -n 's/.*<title>\(.*\)<\/title>.*/\1/p'

# Robots meta kontrolü
curl -s "https://kozcuoglunakliyat.com.tr/offline" | grep 'name="robots"'

# JSON-LD sayısı
curl -s "https://kozcuoglunakliyat.com.tr" | grep -c 'application/ld+json'

# robots.txt kontrolü
curl -s "https://kozcuoglunakliyat.com.tr/robots.txt"

# sitemap.xml kontrolü
curl -s -o /dev/null -w "%{http_code}" "https://kozcuoglunakliyat.com.tr/sitemap.xml"

# Security headers kontrolü
curl -sI "https://kozcuoglunakliyat.com.tr" | grep -iE "strict-transport|x-content|x-frame|x-xss|referrer|permissions|content-security"

# Googlebot simülasyonu
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "https://kozcuoglunakliyat.com.tr"

# Toplu sayfa testi
for u in "/" "/hizmetlerimiz" "/iletisim" "/blog" "/hakkimizda"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://kozcuoglunakliyat.com.tr$u")
  can=$(curl -s "https://kozcuoglunakliyat.com.tr$u" | grep -o 'rel="canonical" href="[^"]*"' | head -1)
  echo "$code | $u | $can"
done
```

---

## BÖLÜM 17 — KRİTİK KONTROL ÖZETİ (HIZLI TARAMA)

> Deploy öncesi mutlaka kontrol edilmesi gereken en kritik 20 madde:

| # | Kontrol | Öncelik |
|---|---|---|
| 1 | Tüm sayfalar SSR — meta tag'ler HTML source'da | 🔴 KRİTİK |
| 2 | 404 gerçek 404 HTTP status dönüyor | 🔴 KRİTİK |
| 3 | Her sayfada doğru canonical URL | 🔴 KRİTİK |
| 4 | Her sayfada benzersiz title + description | 🔴 KRİTİK |
| 5 | Title template çift yazılma yok | 🔴 KRİTİK |
| 6 | robots.txt doğru (önemli sayfalar disallow değil) | 🔴 KRİTİK |
| 7 | sitemap.xml tüm public sayfaları içeriyor | 🔴 KRİTİK |
| 8 | JSON-LD schema'lar geçerli (Rich Results Test) | 🔴 KRİTİK |
| 9 | NAP tutarlılığı (schema = footer = iletişim = GBP) | 🔴 KRİTİK |
| 10 | HTTPS aktif + HSTS header | 🔴 KRİTİK |
| 11 | SW HTML cache'lemiyor (Network-Only) | 🟡 YÜKSEK |
| 12 | Offline sayfası noindex | 🟡 YÜKSEK |
| 13 | OG tags tüm sayfalarda | 🟡 YÜKSEK |
| 14 | LCP < 2.5s (mobil) | 🟡 YÜKSEK |
| 15 | CLS < 0.1 | 🟡 YÜKSEK |
| 16 | Alt text tüm görsellerde | 🟡 YÜKSEK |
| 17 | Kırık link yok | 🟡 YÜKSEK |
| 18 | Mobile responsive (375px-1536px) | 🟡 YÜKSEK |
| 19 | 301 redirect'ler çalışıyor (eski URL'ler) | 🟢 ORTA |
| 20 | llms.txt oluşturulmuş | 🟢 ORTA |

---

## BÖLÜM 18 — GOOGLE ALGORİTMA UYUMLULUK

### Google Helpful Content System

| # | Kontrol | Durum |
|---|---|---|
| 18.1 | İçerik insanlar için mi yazılmış (AI spam değil)? | [ ] |
| 18.2 | İçerik konuyla ilgili uzmanlık gösteriyor mu? | [ ] |
| 18.3 | İçerik okuyucuya değer katıyor mu? | [ ] |
| 18.4 | İçerik tatmin edici bir deneyim sunuyor mu? | [ ] |

### Google Page Experience

| # | Kontrol | Durum |
|---|---|---|
| 18.5 | Core Web Vitals "İyi" mi? | [ ] |
| 18.6 | HTTPS aktif mi? | [ ] |
| 18.7 | Intrusive interstitial (rahatsız edici popup) yok mu? | [ ] |
| 18.8 | Mobile-friendly mi? | [ ] |

### Google Spam Policies

| # | Kontrol | Durum |
|---|---|---|
| 18.9 | Cloaking yok mu? (Googlebot'a farklı içerik) | [ ] |
| 18.10 | Doorway page yok mu? (SEO için oluşturulmuş boş sayfalar) | [ ] |
| 18.11 | Hidden text yok mu? (CSS ile gizlenmiş metin) | [ ] |
| 18.12 | Link scheme yok mu? (Yapay link oluşturma) | [ ] |
| 18.13 | Scraped content yok mu? (Kopyalanmış içerik) | [ ] |
| 18.14 | Sneaky redirect yok mu? (Gizli yönlendirme) | [ ] |
| 18.15 | Scaled content abuse yok mu? (Toplu AI/otomatik içerik üretimi) | [ ] |
| 18.16 | Expired domain abuse yok mu? (Eski domain'i manipülasyon amaçlı kullanma) | [ ] |
| 18.17 | Site reputation abuse yok mu? (3. parti içerik ile sıralama manipülasyonu) | [ ] |
| 18.18 | Thin affiliation yok mu? (Değer katmayan affiliate içerik) | [ ] |
| 18.19 | User-generated spam koruması var mı? (Yorum/form spam önleme) | [ ] |
| 18.20 | Keyword stuffing yok mu? (Anahtar kelime doldurma) | [ ] |
| 18.21 | Misleading functionality yok mu? (Yanıltıcı işlevsellik) | [ ] |
| 18.22 | Hacked content koruması var mı? (Güvenlik taraması) | [ ] |
| 18.23 | Policy circumvention yok mu? (Politika atlatma girişimi) | [ ] |
| 18.24 | Scam/fraud sinyali yok mu? (Dolandırıcılık belirtisi) | [ ] |

---

## BÖLÜM 19 — GOOGLE ARALIK 2025 CORE UPDATE KRİTERLERİ

> **Kaynak:** Google Aralık 2025 Core Update — CWV eşikleri yükseltildi, E-E-A-T tüm sektörlere genişletildi, kullanıcı davranış sinyalleri ağırlığı artırıldı.

### 19.1 Yükseltilmiş CWV Eşikleri (Aralık 2025)

| # | Metrik | Eski Eşik | Yeni Eşik (Etkili) | Durum |
|---|---|---|---|---|
| 19.1.1 | **LCP** | < 2.5s | < 2.0s (mükemmel) | [ ] |
| 19.1.2 | **INP** | < 200ms | < 150ms (mükemmel) | [ ] |
| 19.1.3 | **CLS** | < 0.1 | < 0.1 (daha sıkı uygulama) | [ ] |
| 19.1.4 | Mobil LCP 3G bağlantıda | — | < 2.0s hedef | [ ] |
| 19.1.5 | Mobil INP > 300ms olan sayfa var mı? | — | Yok olmalı (-%31 trafik riski) | [ ] |

### 19.2 Kullanıcı Davranış Sinyalleri (User Engagement)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 19.2.1 | Pogo-sticking riski var mı? (Kullanıcı hemen geri dönüyor) | İçerik arama niyetini karşılamalı | [ ] |
| 19.2.2 | Dwell time (kalma süresi) yeterli mi? | Uzun form içerik + TOC + interaktif öğeler | [ ] |
| 19.2.3 | Scroll depth yeterli mi? | İçerik ilgi çekici, kullanıcı sayfayı okuyor | [ ] |
| 19.2.4 | Internal link tıklama oranı var mı? | İlgili sayfalara doğal yönlendirme | [ ] |
| 19.2.5 | Return visit (tekrar ziyaret) sinyali var mı? | Marka bilinirliği, doğrudan trafik | [ ] |
| 19.2.6 | Above-the-fold içerik yeterli mi? | İlk ekranda değerli içerik, reklam baskısı yok | [ ] |
| 19.2.7 | İçerik arama niyetini (search intent) karşılıyor mu? | Informational, transactional, navigational — doğru eşleşme | [ ] |
| 19.2.8 | Intrusive ads/popup yok mu? | İçeriği kapatan reklam veya popup yok | [ ] |

### 19.3 Freshness Sinyalleri (İçerik Güncelliği)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 19.3.1 | Blog yazılarında gerçek yayın tarihi var mı? | `datePublished` ISO 8601 | [ ] |
| 19.3.2 | Güncellenen içerikte `dateModified` var mı? | Gerçek güncelleme tarihi | [ ] |
| 19.3.3 | Tarih manipülasyonu yok mu? | İçerik değişmeden tarih güncelleme YOK | [ ] |
| 19.3.4 | "2026 Güncel" gibi sahte başlık yok mu? | İçerik gerçekten güncellenmişse eklenmeli | [ ] |
| 19.3.5 | Evergreen içerik gereksiz güncellenmemiş mi? | Değişmeyen bilgi güncelleme gerektirmez | [ ] |
| 19.3.6 | Güncelleme geçmişi şeffaf mı? | "Son güncelleme: XX.XX.XXXX" gösterimi | [ ] |

### 19.4 Genişletilmiş E-E-A-T (Tüm Sektörler)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 19.4.1 | Yazar bilgisi (author attribution) var mı? | Gerçek isim, "Admin" veya jenerik byline değil | [ ] |
| 19.4.2 | Yazar biyografisi ve kimlik bilgileri var mı? | Uzmanlık, deneyim, sertifikalar | [ ] |
| 19.4.3 | İçerikte birinci elden deneyim gösteriliyor mu? | "Testimizde", "Deneyimimize göre" gibi ifadeler | [ ] |
| 19.4.4 | Orijinal fotoğraf/video var mı? | Stok fotoğraf değil, gerçek taşıma görselleri | [ ] |
| 19.4.5 | Spesifik detaylar var mı? | Genel ifadeler yerine somut bilgi, rakam, süreç | [ ] |
| 19.4.6 | Kaynak gösterimi var mı? | İstatistik ve iddialar kaynakla desteklenmeli | [ ] |
| 19.4.7 | Hakkımızda sayfası detaylı mı? | Firma geçmişi, ekip, sertifikalar, ödüller | [ ] |
| 19.4.8 | Ekip sayfası gerçek kişileri gösteriyor mu? | Gerçek isim, fotoğraf, pozisyon | [ ] |
| 19.4.9 | İçerik oluşturma şeffaflığı var mı? | AI kullanımı, editoryal standartlar | [ ] |
| 19.4.10 | Düzeltme politikası var mı? | Hatalı bilgi düzeltme süreci | [ ] |

---

## BÖLÜM 20 — CRAWL BUDGET & İNDEKSLEME

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 20.1 | Crawl budget boşa harcanmıyor mu? | Gereksiz URL'ler (filtre, sıralama, session) engellenmeli | [ ] |
| 20.2 | Faceted navigation parametreleri engelli mi? | `?sort=`, `?filter=` gibi URL'ler robots.txt veya noindex | [ ] |
| 20.3 | Pagination URL'leri doğru yönetiliyor mu? | `rel="next"` / `rel="prev"` veya self-referencing canonical | [ ] |
| 20.4 | Orphan page (bağlantısız sayfa) yok mu? | Her sayfa en az 1 internal linkten erişilebilir | [ ] |
| 20.5 | Crawl depth 3'ten fazla değil mi? | Ana sayfa → Kategori → Detay (max 3 tık) | [ ] |
| 20.6 | XML sitemap'te sadece indexlenecek URL'ler mi? | noindex sayfalar sitemap'te olmamalı | [ ] |
| 20.7 | Sitemap'teki URL'ler canonical URL ile aynı mı? | Tutarsızlık yok | [ ] |
| 20.8 | `<meta name="robots" content="noindex">` gereken sayfalarda var mı? | Arama sonuçları, filtre sayfaları, admin | [ ] |
| 20.9 | `X-Robots-Tag` header kullanılıyor mu? (gerektiğinde) | PDF, görsel gibi non-HTML kaynaklar için | [ ] |
| 20.10 | Google Search Console'da "Crawled - currently not indexed" var mı? | İncelenmeli, ince içerik veya duplicate olabilir | [ ] |
| 20.11 | Google Search Console'da "Discovered - currently not indexed" var mı? | Crawl budget sorunu olabilir | [ ] |
| 20.12 | URL parametreleri GSC'de tanımlanmış mı? | Gereksiz parametreler "No URLs" olarak işaretlenmeli | [ ] |

---

## BÖLÜM 21 — HREFLANG & ULUSLARARASI SEO

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 21.1 | `hreflang="tr"` tag'i var mı? | Türkçe içerik için `<link rel="alternate" hreflang="tr">` | [ ] |
| 21.2 | `x-default` hreflang var mı? | Dil eşleşmeyenler için varsayılan sayfa | [ ] |
| 21.3 | hreflang URL'leri mutlak mı? | `https://kozcuoglunakliyat.com.tr/...` | [ ] |
| 21.4 | hreflang karşılıklı (reciprocal) mı? | A→B ve B→A referansı olmalı | [ ] |
| 21.5 | `<html lang="tr">` doğru mu? | Root layout'ta | [ ] |
| 21.6 | Content-Language header var mı? | `Content-Language: tr` (opsiyonel ama önerilir) | [ ] |

---

## BÖLÜM 22 — VİDEO SEO

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 22.1 | Video sayfalarında VideoObject schema var mı? | `@type: VideoObject` JSON-LD | [ ] |
| 22.2 | `name` (başlık) açıklayıcı mı? | Video konusunu anlatan başlık | [ ] |
| 22.3 | `description` var mı? | Video içeriğini açıklayan metin | [ ] |
| 22.4 | `thumbnailUrl` var mı? | Video önizleme görseli | [ ] |
| 22.5 | `uploadDate` ISO 8601 formatında mı? | Yükleme tarihi | [ ] |
| 22.6 | `duration` ISO 8601 formatında mı? | `PT5M30S` gibi | [ ] |
| 22.7 | `contentUrl` veya `embedUrl` var mı? | Video dosya URL'si veya embed URL | [ ] |
| 22.8 | Video embed'leri lazy load mu? | Facade pattern — YouTube iframe lazy | [ ] |
| 22.9 | Video sayfasında metin içerik de var mı? | Sadece video değil, açıklayıcı metin de olmalı | [ ] |
| 22.10 | `maxVideoPreview` meta tag kullanılıyor mu? | `<meta name="robots" content="max-video-preview:-1">` (sınırsız) | [ ] |

---

## BÖLÜM 23 — GÖRSEL SEO (GENİŞLETİLMİŞ)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 23.1 | Görsel dosya adları SEO uyumlu mu? | `istanbul-evden-eve-nakliyat.webp` — anlamlı isim | [ ] |
| 23.2 | Görseller orijinal mi? | Stok fotoğraf değil, gerçek taşıma görselleri (E-E-A-T) | [ ] |
| 23.3 | `max-image-preview` meta tag var mı? | `<meta name="robots" content="max-image-preview:large">` | [ ] |
| 23.4 | Görsel sitemap var mı? | `<image:image>` tag'leri sitemap'te | [ ] |
| 23.5 | EXIF verileri temizlenmiş mi? | Kişisel bilgi içeren EXIF kaldırılmalı | [ ] |
| 23.6 | Görseller birden fazla aspect ratio'da mı? | 1:1, 4:3, 16:9 — Rich Results için | [ ] |
| 23.7 | `<picture>` elementi responsive görseller için kullanılıyor mu? | WebP + fallback JPEG | [ ] |
| 23.8 | Görsel CDN veya optimizasyon pipeline var mı? | `sharp` ile WebP dönüşüm, sıkıştırma | [ ] |
| 23.9 | Dekoratif görsellerde `role="presentation"` var mı? | Screen reader atlaması için | [ ] |

---

## BÖLÜM 24 — LİNK KALİTESİ & OUTBOUND LİNKLER

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 24.1 | Dış linklerde `rel="nofollow"` gerekli mi? | Sponsorlu: `rel="sponsored"`, UGC: `rel="ugc"` | [ ] |
| 24.2 | Dış linklerde `target="_blank"` varsa `rel="noopener noreferrer"` var mı? | Güvenlik + performans | [ ] |
| 24.3 | Kırık dış link (broken external link) var mı? | 404 dönen dış linkler düzeltilmeli | [ ] |
| 24.4 | Affiliate linkler doğru işaretlenmiş mi? | `rel="sponsored nofollow"` | [ ] |
| 24.5 | Internal linkler doğal anchor text kullanıyor mu? | "Tıklayın" değil, açıklayıcı metin | [ ] |
| 24.6 | Aşırı link değişimi (excessive link exchange) yok mu? | Google spam politikası ihlali | [ ] |
| 24.7 | Footer'da aşırı link yok mu? | Makul sayıda, ilgili linkler | [ ] |
| 24.8 | Redirect zinciri (chain) yok mu? | A→B→C değil, A→C direkt | [ ] |
| 24.9 | Link juice dağılımı dengeli mi? | Önemli sayfalar daha fazla internal link almalı | [ ] |
| 24.10 | Nofollow edilmemesi gereken internal link var mı? | Internal linkler genelde dofollow olmalı | [ ] |

---

## BÖLÜM 25 — GOOGLE RANKING SİSTEMLERİ UYUMLULUK

> **Kaynak:** Google Search Central — Ranking Systems Guide (Aralık 2025 güncel)

| # | Sistem | Kontrol | Durum |
|---|---|---|---|
| 25.1 | **BERT** | İçerik doğal dilde mi? Anahtar kelime odaklı değil, anlam odaklı mı? | [ ] |
| 25.2 | **RankBrain** | İlgili kavramlar ve eş anlamlılar içerikte geçiyor mu? | [ ] |
| 25.3 | **Neural Matching** | Sayfa konusu ve kullanıcı sorgusu arasında kavramsal eşleşme var mı? | [ ] |
| 25.4 | **Passage Ranking** | Uzun içeriklerde her bölüm kendi başına anlamlı mı? | [ ] |
| 25.5 | **Freshness Systems** | Güncel bilgi gerektiren sorgular için içerik taze mi? | [ ] |
| 25.6 | **Link Analysis / PageRank** | Kaliteli sitelerden doğal backlink var mı? | [ ] |
| 25.7 | **Original Content Systems** | İçerik orijinal mi, başka sitelerden kopyalanmamış mı? | [ ] |
| 25.8 | **Reviews System** | Yorum/değerlendirme içerikleri gerçek deneyime mi dayanıyor? | [ ] |
| 25.9 | **Site Diversity System** | Aynı domain'den çok fazla sonuç çıkmasını engelleyen yapı var mı? | [ ] |
| 25.10 | **Spam Detection (SpamBrain)** | Spam sinyali oluşturacak davranış yok mu? | [ ] |
| 25.11 | **Reliable Information Systems** | İçerik güvenilir, doğrulanabilir bilgi sunuyor mu? | [ ] |
| 25.12 | **Deduplication Systems** | Aynı içerik farklı URL'lerde tekrarlanmıyor mu? | [ ] |
| 25.13 | **MUM** | Çoklu format (metin + görsel + video) içerik sunuluyor mu? | [ ] |
| 25.14 | **Exact Match Domain** | Domain adı manipülatif anahtar kelime içermiyor mu? | [ ] |

---

## BÖLÜM 26 — GOOGLE BUSINESS PROFILE (GBP) DETAYLI

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 26.1 | GBP profili tam doldurulmuş mu? | Tüm alanlar eksiksiz | [ ] |
| 26.2 | GBP kategorisi doğru mu? | Birincil: "Moving Company" + ilgili ikincil kategoriler | [ ] |
| 26.3 | GBP açıklaması (750 karakter) optimize mi? | Hizmetler, deneyim, bölge, benzersiz değer önerisi | [ ] |
| 26.4 | GBP fotoğrafları orijinal mi? | Stok fotoğraf değil, gerçek iş görselleri (min 10-20) | [ ] |
| 26.5 | GBP fotoğrafları aylık güncelleniyor mu? | Düzenli yeni fotoğraf ekleme | [ ] |
| 26.6 | GBP Google Posts haftalık mı? | Teklif, etkinlik, güncelleme postları | [ ] |
| 26.7 | GBP yorumlarına yanıt veriliyor mu? | Tüm yorumlara profesyonel yanıt | [ ] |
| 26.8 | GBP yorum kalitesi yeterli mi? | Sadece sayı değil, detaylı yorumlar | [ ] |
| 26.9 | GBP çalışma saatleri doğru mu? | Özel günler dahil | [ ] |
| 26.10 | GBP hizmet alanları tanımlı mı? | İstanbul ilçeleri | [ ] |
| 26.11 | GBP Q&A bölümü yönetiliyor mu? | Sık sorulan sorulara proaktif yanıt | [ ] |
| 26.12 | GBP attributes (özellikler) doldurulmuş mu? | Engelli erişimi, ödeme yöntemleri vb. | [ ] |

---

## BÖLÜM 27 — İÇERİK KALİTESİ & SEARCH INTENT

### 27.1 Search Intent Eşleşmesi

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 27.1.1 | Her sayfa bir arama niyetini karşılıyor mu? | Informational, transactional, navigational, commercial | [ ] |
| 27.1.2 | Hedef anahtar kelime incognito'da aranmış mı? | İlk 5 sonuç analiz edilmeli | [ ] |
| 27.1.3 | Rakip içerik formatı incelenmiş mi? | Liste mi, rehber mi, karşılaştırma mı? | [ ] |
| 27.1.4 | İçerik formatı arama niyetiyle uyumlu mu? | "Nakliyat fiyatları" → fiyat tablosu + hesaplama aracı | [ ] |
| 27.1.5 | İçerik soruyu tam cevaplıyor mu? | Kullanıcı başka aramaya gerek duymamalı | [ ] |

### 27.2 İçerik Derinliği & Kapsamlılık

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 27.2.1 | Topical authority (konu otoritesi) var mı? | Nakliyat konusunda kapsamlı içerik kümesi | [ ] |
| 27.2.2 | Content cluster yapısı var mı? | Pillar page + cluster sayfaları + internal link | [ ] |
| 27.2.3 | İlgili alt konular kapsanmış mı? | "People Also Ask" soruları cevaplanmış | [ ] |
| 27.2.4 | Rakiplerden daha kapsamlı mı? | Daha fazla detay, daha fazla değer | [ ] |
| 27.2.5 | Orijinal veri/araştırma var mı? | Fiyat istatistikleri, müşteri anketleri | [ ] |
| 27.2.6 | Multimedya içerik var mı? | Metin + görsel + video + infografik | [ ] |

### 27.3 Okunabilirlik & UX Yazarlık

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 27.3.1 | Paragraflar kısa mı? | Max 3-4 cümle per paragraf | [ ] |
| 27.3.2 | Alt başlıklar açıklayıcı mı? | Soru formatı veya konuyu özetleyen başlık | [ ] |
| 27.3.3 | Listeler ve tablolar kullanılıyor mu? | Taranabilir (scannable) içerik | [ ] |
| 27.3.4 | CTA (Call to Action) var mı? | Her sayfada net eylem çağrısı | [ ] |
| 27.3.5 | İmla ve dilbilgisi hatasız mı? | Türkçe karakter ve noktalama doğru | [ ] |
| 27.3.6 | Jargon açıklanmış mı? | Teknik terimler basit dille açıklanmalı | [ ] |

---

## BÖLÜM 28 — SAYFA DENEYİMİ (PAGE EXPERIENCE) DETAYLI

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 28.1 | İçerik above-the-fold'da mı? | İlk ekranda değerli içerik, reklam baskısı yok | [ ] |
| 28.2 | Interstitial/popup yok mu? | Tam sayfa kaplayan popup yok (Google ceza verir) | [ ] |
| 28.3 | Cookie banner minimal mi? | Küçük, içeriği kapatmayan banner | [ ] |
| 28.4 | Sticky header içeriği kapatmıyor mu? | Header yüksekliği makul | [ ] |
| 28.5 | Scroll hijacking yok mu? | Doğal scroll davranışı | [ ] |
| 28.6 | Auto-play video/ses yok mu? | Kullanıcı izni olmadan otomatik oynatma yok | [ ] |
| 28.7 | Print stylesheet var mı? | `@media print` ile yazdırma optimizasyonu | [ ] |
| 28.8 | Dark mode desteği var mı? | `prefers-color-scheme` media query (opsiyonel) | [ ] |
| 28.9 | Reduced motion desteği var mı? | `prefers-reduced-motion` — animasyon azaltma | [ ] |
| 28.10 | Back button düzgün çalışıyor mu? | Tarayıcı geri tuşu beklenen davranışta | [ ] |

---

## BÖLÜM 29 — TEKNIK ALTYAPI & SUNUCU

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 29.1 | DNS çözümleme süresi hızlı mı? | < 100ms | [ ] |
| 29.2 | SSL sertifikası geçerli ve güncel mi? | Süresi dolmamış, güvenilir CA | [ ] |
| 29.3 | SSL sertifikası TLS 1.2+ mi? | TLS 1.0/1.1 kullanılmamalı | [ ] |
| 29.4 | HTTP/2 veya HTTP/3 aktif mi? | Multiplexing, header compression | [ ] |
| 29.5 | Brotli sıkıştırma aktif mi? | Gzip'ten %15-20 daha iyi sıkıştırma | [ ] |
| 29.6 | Server response time < 200ms mi? | TTFB hedefi | [ ] |
| 29.7 | Uptime %99.9+ mu? | Sunucu kesintisi SEO'yu olumsuz etkiler | [ ] |
| 29.8 | CDN kullanılıyor mu? (cPanel uyumlu) | Statik dosyalar için (opsiyonel) | [ ] |
| 29.9 | .htaccess optimizasyonu yapılmış mı? | cPanel'de Gzip, cache, redirect kuralları | [ ] |
| 29.10 | Error log temiz mi? | 500 hataları, PHP hataları yok | [ ] |

---

## BÖLÜM 30 — YAPISAL VERİ DOĞRULAMA DETAYLI

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 30.1 | Schema'daki bilgi sayfada da görünüyor mu? | Google kuralı: schema = sayfa içeriği | [ ] |
| 30.2 | Schema'da sahte/yanıltıcı bilgi yok mu? | Sahte puan, sahte yorum, sahte fiyat YOK | [ ] |
| 30.3 | Schema nesting (iç içe) doğru mu? | `provider` içinde `MovingCompany` referansı | [ ] |
| 30.4 | Schema `@id` referansları tutarlı mı? | Aynı entity farklı sayfalarda aynı `@id` | [ ] |
| 30.5 | Schema deprecated property kullanılmamış mı? | Güncel Schema.org sürümüne uygun | [ ] |
| 30.6 | Schema'da zorunlu alanlar dolu mu? | Google'ın "required" olarak işaretlediği alanlar | [ ] |
| 30.7 | Schema'da önerilen alanlar dolu mu? | Google'ın "recommended" olarak işaretlediği alanlar | [ ] |
| 30.8 | Birden fazla schema tipi çakışmıyor mu? | Aynı sayfada uyumsuz schema tipleri yok | [ ] |
| 30.9 | Schema URL'leri canonical URL ile aynı mı? | `url` alanı canonical ile tutarlı | [ ] |
| 30.10 | Schema test araçlarında 0 hata 0 uyarı mı? | Rich Results Test + Schema Validator | [ ] |

---

## BÖLÜM 31 — AI İÇERİK & OTOMASYON POLİTİKASI

> **Kaynak:** Google Aralık 2025 — AI içerik yasaklanmadı ama kalite kriterleri sıkılaştırıldı.

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 31.1 | AI ile üretilen içerik insan editörden geçmiş mi? | Kalite kontrolü yapılmış | [ ] |
| 31.2 | Jenerik AI kalıpları (patterns) temizlenmiş mi? | "Bu kapsamlı rehberde..." gibi tekrarlayan ifadeler yok | [ ] |
| 31.3 | İçerikte birinci elden deneyim eklemiş mi? | AI çıktısına gerçek deneyim, örnek, fotoğraf eklenmiş | [ ] |
| 31.4 | Toplu içerik üretimi (scaled content) yok mu? | Kısa sürede yüzlerce sayfa üretilmemiş | [ ] |
| 31.5 | Her sayfa benzersiz değer katıyor mu? | Template kopyala-yapıştır değil | [ ] |
| 31.6 | Kaynak gösterimi var mı? | "Uzmanlara göre" yerine gerçek kaynak | [ ] |

---

## BÖLÜM 32 — ULUSLARARASI & ÇOK DİLLİ (i18n)

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 32.1 | Türkçe karakter encoding doğru mu? | UTF-8, ö/ü/ş/ç/ğ/ı doğru görünüyor | [ ] |
| 32.2 | URL'lerde Türkçe karakter yok mu? | Slug formatı: ö→o değil, anlamlı slug | [ ] |
| 32.3 | Tarih formatı Türkiye standardında mı? | GG.AA.YYYY veya ISO 8601 | [ ] |
| 32.4 | Para birimi doğru mu? | TRY / ₺ | [ ] |
| 32.5 | Telefon numarası uluslararası formatta mı? | Schema'da `+90-444-7-436` | [ ] |
| 32.6 | Adres formatı Türkiye standardında mı? | Mahalle, Cadde, No, İlçe/İl, Posta Kodu | [ ] |

---

## BÖLÜM 33 — DÖNÜŞÜM OPTİMİZASYONU (CRO) & SEO ETKİSİ

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 33.1 | Her sayfada net CTA var mı? | "Ücretsiz Keşif İsteyin", "Hemen Arayın" | [ ] |
| 33.2 | Telefon numarası tıklanabilir mi? | `<a href="tel:4447436">` | [ ] |
| 33.3 | WhatsApp linki çalışıyor mu? | `https://wa.me/905321384979` | [ ] |
| 33.4 | İletişim formu çalışıyor mu? | Form submit → başarılı yanıt | [ ] |
| 33.5 | Fiyat hesaplama aracı çalışıyor mu? | Interaktif, sonuç veriyor | [ ] |
| 33.6 | Mobil sticky CTA bar var mı? | Telefon + WhatsApp butonları | [ ] |
| 33.7 | Trust badge'ler görünür mü? | Sigorta, sertifika, yıldız puanı | [ ] |
| 33.8 | Sosyal kanıt (social proof) var mı? | Müşteri yorumları, referanslar | [ ] |

---

## BÖLÜM 34 — LOG ANALİZİ & İZLEME

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 34.1 | Google Analytics 4 kurulu mu? | Trafik, davranış, dönüşüm takibi | [ ] |
| 34.2 | Google Search Console bağlı mı? | İndeksleme, kapsam, CWV raporu | [ ] |
| 34.3 | Google Tag Manager kurulu mu? | Event tracking, conversion tracking | [ ] |
| 34.4 | Microsoft Clarity kurulu mu? | Heatmap, session recording | [ ] |
| 34.5 | 404 hataları izleniyor mu? | GSC + Analytics ile | [ ] |
| 34.6 | CWV field data izleniyor mu? | CrUX raporu veya PSI field data | [ ] |
| 34.7 | Crawl istatistikleri izleniyor mu? | GSC → Ayarlar → Tarama İstatistikleri | [ ] |
| 34.8 | Anahtar kelime sıralamaları izleniyor mu? | GSC Performance raporu | [ ] |
| 34.9 | Backlink profili izleniyor mu? | Ahrefs, Semrush veya GSC Links raporu | [ ] |
| 34.10 | Rakip analizi yapılıyor mu? | Düzenli rakip sıralama ve içerik analizi | [ ] |

---

---

## BÖLÜM 35 — 2026 İLERİ DÜZEY: ENTITY SALIENCE & SEMANTIC SEO

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 35.1 | Entity salience optimization yapılmış mı? | Ana entity'ler içerikte prominence kazanmış | [ ] |
| 35.2 | Co-occurrence patterns doğru mu? | İlgili entity'ler birlikte geçiyor | [ ] |
| 35.3 | Entity density optimal mi? | Aşırı tekrar yok, doğal dağılım | [ ] |
| 35.4 | Semantic relationship mapping var mı? | Entity'ler arası ilişkiler tanımlanmış | [ ] |
| 35.5 | Knowledge graph internal linking var mı? | Entity-based internal link stratejisi | [ ] |
| 35.6 | Contextual entity descriptions var mı? | Her entity ilk kullanımda context ile tanıtılmış | [ ] |
| 35.7 | Entity disambiguation açık mı? | Çok anlamlı terimler context ile netleştirilmiş | [ ] |
| 35.8 | Semantic HTML + Schema uyumu var mı? | HTML semantics schema ile align | [ ] |
| 35.9 | NLP-friendly content structure var mı? | Google NLP API ile test edilmiş | [ ] |
| 35.10 | Entity-first keyword research yapılmış mı? | Keyword değil entity bazlı strateji | [ ] |

---

## BÖLÜM 36 — 2026 İLERİ DÜZEY: DYNAMIC SCHEMA & AUTOMATION

| # | Kontrol | Beklenen | Durum |
|---|---|---|---|
| 36.1 | Schema generation automated mı? | CMS'ten otomatik schema üretimi | [ ] |
| 36.2 | Schema validation pipeline var mı? | Build-time schema doğrulama | [ ] |
| 36.3 | Schema versioning yapılıyor mu? | Schema değişiklikleri takip ediliyor | [ ] |
| 36.4 | Dynamic FAQ schema var mı? | Sayfa bazlı otomatik FAQPage generation | [ ] |
| 36.5 | Schema templates consistent mı? | Tüm sayfa tipleri için standart şablonlar | [ ] |
| 36.6 | Schema testing automated mı? | Her deploy'da otomatik Rich Results Test | [ ] |
| 36.7 | Schema error monitoring var mı? | GSC schema hatalarını otomatik izleme | [ ] |
| 36.8 | Schema performance tracking var mı? | Rich results CTR izleme | [ ] |
| 36.9 | Competitor schema gap analysis yapılıyor mu? | Rakip schema analizi düzenli | [ ] |
| 36.10 | Schema documentation complete mi? | Tüm schema tipleri dokümante edilmiş | [ ] |

---

> **Bu doküman, Google'ın tüm sıralama sistemlerini (BERT, RankBrain, Neural Matching, Passage Ranking, Freshness, PageRank, Original Content, Reviews, Spam Detection, Reliable Information, Deduplication, MUM), 2026 Entity-Based SEO tekniklerini, AI Overviews optimization stratejilerini, Knowledge Graph optimization'ı, Topical Authority cluster yapısını, Passage Ranking optimization'ı, Featured Snippet targeting'i, Aralık 2025 Core Update kriterlerini, güncel spam politikalarını (Scaled Content Abuse, Site Reputation Abuse, Expired Domain Abuse dahil), teknik SEO gereksinimlerini, yapısal veri standartlarını, performans metriklerini, erişilebilirlik kurallarını, kullanıcı davranış sinyallerini ve güvenlik gereksinimlerini kapsar. Her deploy öncesi BÖLÜM 17'deki kritik kontrol özeti mutlaka yapılmalıdır.**
