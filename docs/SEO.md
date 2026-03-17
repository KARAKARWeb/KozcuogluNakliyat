# Kozcuoğlu Nakliyat — SEO Stratejisi & Kriterler

## 1. Teknik SEO (On-Page)

| Kriter | Uygulama | Öncelik |
|---|---|---|
| SSR/SSG | Tüm sayfalar sunucu tarafında render (Static Generation) | Zorunlu |
| Semantic HTML | h1-h6, article, section, nav, main, footer, aside | Zorunlu |
| Title Tag | Her sayfada benzersiz, anahtar kelimeli, 50-60 karakter | Zorunlu |
| Meta Description | Her sayfada benzersiz, CTA içeren, 150-160 karakter | Zorunlu |
| Canonical URL | Her sayfada canonical tag, duplicate content önleme | Zorunlu |
| Trailing Slash | Trailing slash YOK → `/sayfa-adi` formatında | Zorunlu |
| Blog URL | Blog yazıları `/yazi-adi.html` formatında | Zorunlu |
| Hizmet Bölgesi URL | Bölge sayfaları `/bolge-adi-evden-eve-nakliyat.html` formatında | Zorunlu |
| TOC | Tüm içerik sayfalarında otomatik Table of Contents | Zorunlu |
| Breadcrumb | Hem UI hem JSON-LD olarak | Zorunlu |
| Sitemap.xml | Otomatik oluşturma, tüm sayfalar + görseller dahil | Zorunlu |
| Robots.txt | Doğru crawl yönlendirmesi | Zorunlu |
| 404 Sayfası | Özel tasarım, yönlendirme önerileri | Zorunlu |
| 301 Redirect | Eski URL'lerden yeni URL'lere yönlendirme | Gerektiğinde |
| URL Yapısı | Kısa, anlamlı, Türkçe karakter yok (ö→o, ş→s değil, slug formatı) | Zorunlu |
| Internal Linking | Her sayfadan ilgili sayfalara 3-5 link | Zorunlu |
| Heading Hiyerarşisi | Her sayfada tek h1, mantıklı h2-h3-h4 sırası | Zorunlu |

## 2. Meta Tags & HTML Head

| Tag | Değer |
|---|---|
| `<title>` | Benzersiz, 50-60 karakter, anahtar kelime içermeli |
| `<meta name="description">` | 150-160 karakter, CTA içermeli |
| `<meta name="robots">` | index, follow (varsayılan) |
| `<link rel="canonical">` | Sayfanın kendi URL'si |
| `<meta name="viewport">` | width=device-width, initial-scale=1 |
| `<meta charset>` | UTF-8 |
| `<meta name="theme-color">` | #122032 |

## 3. Open Graph & Twitter Cards

Her sayfada uygulanacak:

```
og:title → Sayfa başlığı
og:description → Sayfa açıklaması
og:image → 1200x630 px görsel
og:url → Sayfa canonical URL'si
og:type → website (ana sayfa), article (blog)
og:site_name → Kozcuoğlu Nakliyat
og:locale → tr_TR
twitter:card → summary_large_image
twitter:title → Sayfa başlığı
twitter:description → Sayfa açıklaması
twitter:image → 1200x630 px görsel
```

## 4. Sitemap & Robots

### sitemap.xml
- Tüm sayfalar dahil
- Blog yazıları dahil
- Görsel sitemap dahil
- lastmod tarihi dahil
- changefreq ve priority değerleri

### robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://kozcuoglunakliyat.com.tr/sitemap.xml
```

## 5. İçerik SEO

- Anahtar kelime optimizasyonu: Başlık, ilk paragraf, alt başlıklar
- Uzun form içerik: Blog yazıları 1500+ kelime
- Görsel ALT tag: Her görselde açıklayıcı alt text
- Dahili bağlantı: Her yazıda 3-5 internal link
- Güncel içerik: Blog düzenli güncelleme

## 6. E-E-A-T Sinyalleri

| Sinyal | Uygulama |
|---|---|
| Experience | Gerçek müşteri yorumları, proje görselleri |
| Expertise | Blog yazıları, nakliyat rehberleri |
| Authority | Sertifikalar, lisanslar, sigorta bilgisi |
| Trust | Gerçek adres, telefon, Google Maps, SSL |

## 7. Dış SEO Sinyalleri

- Google Business Profile → Doğru ve güncel bilgiler
- Google Search Console → Sitemap gönderimi, indexleme takibi
- Google Analytics 4 → Kullanıcı davranışı takibi (lazy load)
- Microsoft Clarity → Heatmap, session recording (lazy load)
- NAP Tutarlılığı → İsim, Adres, Telefon her yerde aynı
- Bing Places → NAP kaydı
- Yandex Webmaster → Sitemap gönderimi

## 8. NAP Tutarlılığı (Name, Address, Phone)

### NAP Bilgileri
| Bilgi | Değer |
|---|---|
| **Name** | Kozcuoğlu Nakliyat |
| **Address** | Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul |
| **Phone (Müşteri Hizmetleri)** | 444 7 436 |
| **Phone (Sabit)** | 0216 494 53 37 |
| **GSM + WhatsApp** | 0532 138 49 79 |
| **Email** | info@kozcuoglunakliyat.com.tr |

### NAP Gösterim Yerleri
- Header (firma adı + telefon)
- Footer (firma adı + adres + telefon + e-posta)
- İletişim sayfası (tüm bilgiler)
- Schema (MovingCompany, Organization)
- Google Business Profile
- Sosyal medya profilleri
- Dış dizinler (Yandex, Bing Places, Foursquare)

> **Kural:** Tüm platformlarda NAP bilgisi karakter karakter aynı olmalıdır. Tek bir farklılık bile Google'ın güvenini düşürür.

## 9. Image SEO

| Kural | Uygulama |
|---|---|
| Dosya Adı | SEO uyumlu: `istanbul-evden-eve-nakliyat.webp` |
| Format | WebP (fallback: JPEG) |
| Alt Text | Açıklayıcı, anahtar kelimeli: "İstanbul evden eve nakliyat hizmeti" |
| Boyut | Max 100KB (sıkıştırılmış) |
| Lazy Load | Viewport dışındaki görseller lazy load |
| Responsive | `srcset` ile farklı boyutlar |
| Sitemap | Görsel sitemap'e dahil |
| OG Image | Her sayfa için 1200x630 px |

## 10. Anahtar Kelime Hedefleri

| Sayfa | Birincil Anahtar Kelime | İkincil |
|---|---|---|
| Ana Sayfa | kozcuoğlu nakliyat | istanbul nakliyat, nakliyat firması |
| Hizmetlerimiz | nakliyat hizmetleri | taşımacılık hizmetleri |
| Evden Eve Nakliyat | evden eve nakliyat | ev taşıma firması |
| Ofis Taşıma | ofis taşıma | kurumsal nakliyat |
| Ev Taşıma | ev taşıma | ev eşyası taşıma |
| Parça Eşya Taşıma | parça eşya taşıma | tek parça eşya nakliyat |
| Eşya Depolama | eşya depolama | nakliyat depo |
| Şehirler Arası | şehirler arası nakliyat | şehirler arası ev taşıma |
| Çözümlerimiz | nakliyat çözümleri | taşıma çözümleri |
| Asansörlü Nakliyat | asansörlü nakliyat | asansörlü ev taşıma |
| Ambalajlama | ambalajlama paketleme | nakliyat paketleme |
| Fiyatlarımız | nakliyat fiyatları | evden eve nakliyat fiyat |
| Fiyat Hesaplama | nakliyat fiyat hesaplama | taşıma ücreti hesapla |
| Hizmet Bölgeleri | nakliyat hizmet bölgeleri | istanbul nakliyat bölgeleri |
| Blog | istanbul evden eve nakliyat, nakliyat fiyatları vb. | — |

## 11. Link Stratejisi

### Internal Link Haritası
| Kaynak Sayfa | Hedef Sayfalar |
|---|---|
| Ana Sayfa | Tüm hizmetler, çözümler, fiyatlarımız, hizmet bölgeleri |
| Hizmet Sayfası | İlgili çözümler, fiyatlarımız, ilgili bölgeler, blog |
| Çözüm Sayfası | İlgili hizmetler, fiyatlarımız, iletişim |
| Hizmet Bölgesi | Ana hizmet sayfası, diğer bölgeler, fiyat hesaplama |
| Blog Yazısı | İlgili hizmet sayfaları, çözümler, fiyat hesaplama |
| Fiyatlarımız | Hizmet sayfaları (tümünü gör linkleri) |

### Link Kuralları
- Her sayfadan ilgili sayfalara 3-5 internal link
- Breadcrumb ile sayfa hiyerarşisi
- Footer'da hizmet + çözüm + bölge linkleri
- Blog yazılarından hizmet sayfalarına doğal link
- TOC anchor linkleri ile sayfa içi navigasyon
- Mega menüde hizmetler + çözümler dropdown

## 12. Local SEO (Hizmet Bölgeleri)

### Strateji
- Merkez adres: **Pendik, İstanbul**
- Her ilçe/semt için ayrı sayfa → `/bolge-adi-evden-eve-nakliyat.html`
- Her bölge sayfasında bölgeye özel içerik, SSS, fiyat hesaplama, yorumlar
- Schema: `Service` + `areaServed` + `Place` ile bölge hedefleme
- Google Business Profile ile Pendik merkez doğrulanır
- Bölge sayfalarından ana hizmet sayfalarına internal link

### Bölge Sayfası SEO Kuralları
| Kriter | Uygulama |
|---|---|
| H1 | "Bostancı Evden Eve Nakliyat" (bölge adı + hizmet) |
| Title | "Bostancı Evden Eve Nakliyat \| Kozcuoğlu Nakliyat" |
| Description | Bölgeye özel, CTA içeren, 150-160 karakter |
| Schema | Service + areaServed + Place + AggregateRating |
| İçerik | Bölgeye özel 1000+ kelime |
| TOC | Otomatik içindekiler tablosu |
| Yorumlar | Bölgeye özel müşteri yorumları (yıldızlı, Rich Snippets) |
| Internal Link | Ana hizmet sayfasına + diğer bölgelere link |

### Anahtar Kelime Hedefleri (Hizmet Bölgeleri)
| Bölge | Birincil Anahtar Kelime |
|---|---|
| Bostancı | bostancı evden eve nakliyat |
| Kartal | kartal evden eve nakliyat |
| Pendik | pendik evden eve nakliyat |
| Kadıköy | kadıköy evden eve nakliyat |
| Maltepe | maltepe evden eve nakliyat |
| Ataşehir | ataşehir evden eve nakliyat |

## 13. Yorum Sistemi — Rich Snippets

- Tüm hizmet, çözüm, bölge ve blog sayfalarında yorum sistemi
- 1-5 yıldız puanlama
- Schema: `Review` + `AggregateRating`
- Google arama sonuçlarında yıldız görünümü: ⭐ 4.9 (120 değerlendirme)
- Admin panelden onay sistemi (spam koruması)
- Her sayfa kendi yorumlarını gösterir + genel ortalama

## 14. SEO İçerik Alanı (Ana Sayfa — Footer Üstü)

- Footer'ın hemen üstünde geniş alan
- 1500-2000 kelime, doğal anahtar kelime dağılımı
- h2-h3 yapılı, TOC'lu
- Alt başlıklar: Evden Eve Nakliyat Hizmetimiz, Ofis Taşıma Çözümlerimiz, Hizmet Verdiğimiz Bölgeler, Nakliyat Sürecimiz, Neden Kozcuoğlu Nakliyat?
- Internal linkler: hizmet sayfalarına, bölge sayfalarına
- Beyaz zemin, 2 kolon (masaüstü), temiz tipografi

> **Not:** Hero altına 200 kelime paragraf koymak yerine, footer üstüne kapsamlı SEO içerik alanı koyuyoruz. Etkileşimli bileşenler (fiyat hesaplama, SSS accordion) ile Google'ın sevdiği sinyalleri güçlendiriyoruz.

## 15. TOC (Table of Contents) — SEO Etkisi

- Google TOC anchor linklerini "Jump to" olarak gösterebilir
- Kullanıcı deneyimi artar → Düşük bounce rate → SEO sinyali
- Sayfa içi navigasyon → Daha uzun oturum süresi
- Heading yapısını güçlendirir
- Tüm hizmet, çözüm, bölge, blog ve SSS sayfalarında uygulanır

## 16. Breadcrumbs SEO

- İlk eleman: **"Kozcuoğlu Nakliyat"** (Ana Sayfa linki) — "Ana Sayfa" değil
- JSON-LD `BreadcrumbList` şeması ile desteklenir
- Google arama sonuçlarında breadcrumb yolu görünür
- Hizmet sayfaları: Kozcuoğlu Nakliyat > Hizmetlerimiz > [Hizmet Adı]
- Çözüm sayfaları: Kozcuoğlu Nakliyat > Çözümlerimiz > [Çözüm Adı]
- Bölge sayfaları: Kozcuoğlu Nakliyat > Hizmet Bölgeleri > [Bölge Adı]
- Blog yazıları: Kozcuoğlu Nakliyat > Blog > [Yazı Başlığı]

## 17. GEO (Generative Engine Optimization)

AI/LLM crawlerlar (ChatGPT, Gemini, Perplexity, Copilot vb.) için optimizasyon:

### llms.txt & llms-full.txt
- `/llms.txt` — Site özeti: firma bilgisi, hizmetler, çözümler, iletişim (kısa)
- `/llms-full.txt` — Detaylı: tüm hizmet/çözüm/bölge başlık+özet, SSS, fiyat aralıkları
- Build sırasında JSON verilerinden otomatik oluşturulur
- Her deploy'da güncellenir

### GEO Kuralları
| Kural | Uygulama |
|---|---|
| llms.txt | Build sırasında otomatik oluştur |
| robots.txt | AI crawlerlar için izin ver (GPTBot, Google-Extended, Bingbot) |
| Meta description | AI-friendly, bilgi yoğun, soru-cevap formatında |
| Structured data | JSON-LD tüm sayfalarda (AI crawlerlar da okur) |
| İçerik yapısı | Net başlıklar, kısa paragraflar, listeler, tablolar |
| SSS | Her sayfada SSS bölümü (AI'ın soru-cevap çıkarması için) |
| Kaynak belirtme | Firma adı, adres, telefon her sayfada açıkça belirtilmeli |

### robots.txt GEO Eklentisi
```
# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /
```

## 18. Görsel SEO (Detaylı)

### Görseller Lokalde Tutulur
- Tüm görseller `/public/uploads/` altında sunucuda barındırılır
- CDN kullanılmaz (cPanel uyumluluğu, bağımsız çalışma)
- `next/image` ile build sırasında otomatik optimizasyon

### Görsel Optimizasyon Pipeline
1. Admin panelde görsel yüklenir
2. `sharp` ile WebP'ye dönüştürülür
3. Responsive srcset: 640, 768, 1024, 1280px boyutlar
4. Kalite %80, max 100KB hedef
5. SEO uyumlu dosya adı: `istanbul-evden-eve-nakliyat-640w.webp`
6. Alt text: Admin panelde zorunlu, anahtar kelime içermeli

### Görsel Sitemap
- `next-sitemap` ile görsel sitemap otomatik oluşturulur
- Her sayfanın ana görseli sitemap'e dahil edilir

## 19. 301 Redirect Haritası

Eski siteden yeni siteye yönlendirme:

| Eski URL | Yeni URL |
|---|---|
| (eski site URL'leri) | (yeni site URL'leri) |

> Eski site URL'leri analiz edildikten sonra bu tablo doldurulacak. `next.config.js` içinde `redirects()` ile uygulanacak.

## 20. Erişilebilirlik (Accessibility — a11y)

| Kriter | Uygulama |
|---|---|
| `<html lang="tr">` | Root layout'ta dil belirtme |
| Skip to Content | Sayfa başında gizli "İçeriğe Geç" linki |
| Focus Visible | Tüm interaktif elemanlarda `:focus-visible` stili |
| ARIA Labels | Butonlar, ikonlar, formlar için `aria-label` |
| Alt Text | Tüm görsellerde zorunlu |
| Color Contrast | WCAG AA minimum (4.5:1 metin, 3:1 büyük metin) |
| Keyboard Nav | Tab ile tüm menü, form, butonlara erişim |
| Semantic HTML | `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>` |
| Form Labels | Her input'ta `<label>` veya `aria-label` |
| Error Messages | Form hatalarında `role="alert"` |

## 21. Hreflang & Dil

```html
<html lang="tr">
<link rel="alternate" hreflang="tr" href="https://kozcuoglunakliyat.com.tr/[sayfa-url]" />
<link rel="alternate" hreflang="x-default" href="https://kozcuoglunakliyat.com.tr/[sayfa-url]" />
```

> Tek dil (Türkçe) olsa bile `hreflang` ve `lang` attribute'ları Google'a dil sinyali verir.

## 22. Resource Hints (Performans + SEO)

```html
<!-- 3. parti domainler için preconnect -->
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://embed.tawk.to" />
<link rel="dns-prefetch" href="https://www.clarity.ms" />
```

> Root layout'ta `<head>` içinde. Cookie consent'e bağlı olarak koşullu yüklenebilir.

## 23. Blog — Open Graph Tarih Bilgisi

Blog yazılarında OG tag'lerine tarih bilgisi eklenmeli:

```html
<meta property="article:published_time" content="2026-01-15T10:00:00Z" />
<meta property="article:modified_time" content="2026-02-10T14:30:00Z" />
<meta property="article:author" content="Kozcuoğlu Nakliyat" />
<meta property="article:section" content="Nakliyat Rehberi" />
```

## 24. Dış Link Güvenliği

Tüm dış linklerde:
```html
<a href="https://..." target="_blank" rel="noopener noreferrer">
```

- `rel="noopener"` → Güvenlik (window.opener erişimi engellenir)
- `rel="noreferrer"` → Referrer bilgisi gönderilmez
- Sosyal medya, Google Maps, dış kaynaklar için geçerli
- Footer geliştirici linki: `rel="noopener"` (noreferrer yok, referrer gönderilsin)

## 25. Başlangıç Yorum Verisi

Google'ın `AggregateRating` schema'sını göstermesi için minimum yorum gerekli:

| Kriter | Değer |
|---|---|
| Minimum yorum | 5 adet (güvenilirlik için) |
| Minimum puan | 4.5+ ortalama |
| Gerçek yorumlar | Mevcut müşterilerden toplanmalı |
| Başlangıç stratejisi | Site yayına alınmadan önce 10-15 gerçek yorum hazırlanmalı |

> **Uyarı:** Sahte yorum oluşturmak Google politikalarına aykırıdır. Mevcut müşterilerden gerçek yorumlar toplanmalıdır.

## 26. X-Robots-Tag HTTP Header

API route'ları ve admin sayfaları için:

```js
// next.config.js headers()
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    },
    {
      source: '/admin/:path*',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    },
  ]
}
```

## 27. Event Tracking (Analytics)

| Event | Tetikleyici |
|---|---|
| `price_calculation` | Fiyat hesaplama tamamlandığında |
| `whatsapp_click` | WhatsApp butonuna tıklandığında |
| `phone_click` | Telefon numarasına tıklandığında |
| `form_submit` | İletişim formu gönderildiğinde |
| `review_submit` | Yorum gönderildiğinde |
| `cta_click` | CTA butonlarına tıklandığında |
| `scroll_depth` | %25, %50, %75, %100 scroll derinliği |
| `cookie_consent` | Çerez tercihi kaydedildiğinde |
| `page_view` | Sayfa görüntülendiğinde (SPA navigasyon dahil) |

---

# İLERİ DÜZEY SEO TEKNİKLERİ (Rakiplerden Ayrışma)

> Aşağıdaki teknikler sektörde nadir kullanılır. Bunları uygulamak Google'da ciddi avantaj sağlar.

## 28. Entity SEO — Google Knowledge Graph Entegrasyonu

Google artık "anahtar kelime" değil, **"varlık" (entity)** bazlı çalışıyor. Kozcuoğlu Nakliyat'ı bir entity olarak tanıtmamız lazım.

### Uygulama
```json
{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": "https://kozcuoglunakliyat.com.tr/#organization",
  "name": "Kozcuoğlu Nakliyat",
  "alternateName": ["Kozcuoğlu Evden Eve Nakliyat", "Kozcuoğlu Nakliyat Firması"],
  "url": "https://kozcuoglunakliyat.com.tr",
  "sameAs": [
    "https://www.facebook.com/kozcuoglunakliyat",
    "https://www.instagram.com/kozcuoglunakliyat",
    "https://www.youtube.com/kozcuoglunakliyat",
    "https://g.page/kozcuoglunakliyat",
    "https://tr.linkedin.com/company/kozcuoglunakliyat",
    "https://www.sikayetvar.com/kozcuoglu-nakliyat",
    "https://www.google.com/maps/place/Kozcuoğlu+Nakliyat"
  ]
}
```

### Neden Önemli?
- `@id` ile tüm sayfalardaki schema'lar birbirine bağlanır (entity linking)
- `sameAs` ile Google farklı platformlardaki profillerinizi tek entity olarak birleştirir
- `alternateName` ile farklı arama varyasyonlarını yakalar
- Google Knowledge Panel çıkma şansı artar

### Tüm Sayfalarda Entity Referansı
```json
"provider": {
  "@type": "MovingCompany",
  "@id": "https://kozcuoglunakliyat.com.tr/#organization"
}
```
> Her Service, Article, Review schema'sında `provider`/`author` olarak `@id` referansı kullanılır. Bu Google'a "hepsi aynı firma" der.

## 29. Topical Authority — Konu Otoritesi

Google bir sitenin belirli bir konuda **otorite** olup olmadığını değerlendirir. Nakliyat konusunda otorite olmak için:

### Topic Cluster Yapısı

```
Pillar Page (Ana Sayfa)
├── Cluster: Evden Eve Nakliyat
│   ├── /evden-eve-nakliyat (hizmet)
│   ├── /evden-eve-nakliyat-nedir.html (blog)
│   ├── /evden-eve-nakliyat-fiyatlari.html (blog)
│   ├── /ev-tasirken-dikkat-edilmesi-gerekenler.html (blog)
│   ├── /kadikoy-evden-eve-nakliyat.html (bölge)
│   └── /istanbul-ankara-evden-eve-nakliyat.html (şehirler arası)
│
├── Cluster: Ofis Taşıma
│   ├── /ofis-tasima (hizmet)
│   ├── /ofis-tasima-rehberi.html (blog)
│   └── /kurumsal-nakliyat-fiyatlari.html (blog)
│
├── Cluster: Eşya Depolama
│   ├── /esya-depolama (ana sayfa)
│   ├── /esya-depolama-fiyatlari.html (blog)
│   └── /guvenli-esya-depolama-ipuclari.html (blog)
│
└── Cluster: Şehirler Arası
    ├── /sehirler-arasi-nakliyat (hizmet)
    ├── /istanbul-ankara-evden-eve-nakliyat.html (bölge)
    └── /sehirler-arasi-nakliyat-rehberi.html (blog)
```

### Internal Link Kuralları (Topic Cluster)
- Her cluster içindeki sayfalar birbirine link verir
- Pillar page (ana sayfa) tüm cluster'lara link verir
- Blog yazıları ilgili hizmet sayfasına link verir
- Hizmet sayfaları ilgili blog yazılarına link verir
- **Minimum:** Her sayfadan aynı cluster'daki 3 sayfaya link

## 30. Passage Ranking Optimizasyonu

Google 2021'den beri sayfanın tamamını değil, **belirli paragrafları** (passage) ayrı ayrı sıralayabiliyor.

### Uygulama
- Her `<h2>` altında bağımsız, kendi başına anlamlı paragraflar yaz
- Soru-cevap formatında alt başlıklar kullan: `<h2>Evden eve nakliyat ne kadar sürer?</h2>`
- Her paragrafın ilk cümlesi doğrudan soruyu cevaplasın (featured snippet hedefi)
- `<section>` ile her bölümü semantik olarak ayır
- TOC anchor linkleri ile her passage'a doğrudan erişim

### Örnek Yapı
```html
<section id="nakliyat-suresi">
  <h2>Evden Eve Nakliyat Ne Kadar Sürer?</h2>
  <p>Evden eve nakliyat süresi ev büyüklüğüne göre değişir. 
     1+1 ev taşıma ortalama 4-6 saat, 3+1 ev taşıma 8-12 saat sürer.</p>
  <!-- Detay paragrafları -->
</section>
```

> Google bu `<section>`'ı bağımsız bir sonuç olarak gösterebilir.

## 31. Featured Snippet Hedefleme

Google arama sonuçlarında "0. pozisyon" olan kutucuk. Nakliyat sektöründe çok az firma bunu hedefliyor.

### Hedef Snippet Tipleri

| Tip | Hedef Sorgu | Format |
|---|---|---|
| **Paragraf** | "evden eve nakliyat nedir" | 40-60 kelimelik net cevap |
| **Liste** | "nakliyat yaparken dikkat edilmesi gerekenler" | `<ol>` veya `<ul>` ile 5-8 madde |
| **Tablo** | "nakliyat fiyatları 2026" | `<table>` ile fiyat karşılaştırma |
| **Adım** | "ev taşıma nasıl yapılır" | HowTo schema + numaralı adımlar |

### Snippet Optimizasyon Kuralları
- Hedef soruyu `<h2>` olarak yaz
- Hemen altında 40-60 kelimelik doğrudan cevap ver
- Cevabın ilk cümlesi "X, Y'dir" formatında olsun
- Liste snippet için `<ol>` kullan, 5-8 madde
- Tablo snippet için `<table>` kullan, başlık satırı zorunlu

## 32. IndexNow — Anında İndeksleme

Google ve Bing'e sayfa değişikliklerini **anında** bildiren protokol. Sitemap'in güncellenmesini beklemeye gerek kalmaz.

### Uygulama (Next.js API Route)
```ts
// src/app/api/indexnow/route.ts
export async function POST(request: Request) {
  const { url } = await request.json()
  
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: 'kozcuoglunakliyat.com.tr',
      key: process.env.INDEXNOW_API_KEY,
      keyLocation: 'https://kozcuoglunakliyat.com.tr/indexnow-key.txt',
      urlList: [url]
    })
  })
  
  return Response.json({ success: response.ok })
}
```

### Tetikleme Noktaları
- Admin panelden içerik güncellendiğinde otomatik çağrılır
- Yeni blog yazısı yayınlandığında
- Hizmet/çözüm bilgisi güncellendiğinde
- Yeni bölge sayfası eklendiğinde

> **Bing** IndexNow'u resmi olarak destekler. **Google** da deneysel olarak kullanıyor. Yandex de destekler.

## 33. Edge SEO Headers — HTTP Başlık Optimizasyonu

`next.config.js` ile SEO'ya katkı sağlayan HTTP başlıkları:

```js
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      ],
    },
    {
      source: '/uploads/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ]
}
```

### Neden Önemli?
- **HSTS:** Google HTTPS sinyalini güçlendirir
- **Cache-Control:** Tekrar ziyaretlerde anında yükleme → CWV iyileşir
- **Security headers:** Google "güvenli site" sinyali verir
- **Referrer-Policy:** Analitik verilerini korur

## 34. Video SEO — VideoObject Schema

Eğer YouTube videoları embed edilecekse (nakliyat süreci, müşteri yorumları, tesis tanıtımı):

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Evden Eve Nakliyat Nasıl Yapılır? | Kozcuoğlu Nakliyat",
  "description": "Profesyonel evden eve nakliyat sürecimizi adım adım izleyin.",
  "thumbnailUrl": "https://kozcuoglunakliyat.com.tr/uploads/videos/nakliyat-sureci-thumb.webp",
  "uploadDate": "2026-01-15",
  "duration": "PT3M45S",
  "contentUrl": "https://www.youtube.com/watch?v=XXXXX",
  "embedUrl": "https://www.youtube.com/embed/XXXXX",
  "publisher": {
    "@type": "Organization",
    "@id": "https://kozcuoglunakliyat.com.tr/#organization"
  }
}
```

### Video Stratejisi
| Video | Sayfa | Amaç |
|---|---|---|
| Nakliyat Süreci | Ana Sayfa + Hizmet sayfaları | Güven, E-E-A-T |
| Müşteri Yorumları | Ana Sayfa | Sosyal kanıt |
| Depo Tanıtımı | Eşya Depolama | Tesis güvenliği |
| Ambalajlama Süreci | Ambalajlama Çözümü | HowTo + Video |
| Asansörlü Taşıma | Asansörlü Nakliyat | Hizmet gösterimi |

> Google Video carousel'de görünme şansı. YouTube SEO + Site SEO birlikte çalışır.

## 35. Google Business Profile Entegrasyonu

### Site İçi Sinyaller
- Footer'da Google Maps embed (lazy loaded)
- "Google'da Değerlendir" butonu → Google Business yorum sayfasına link
- NAP bilgisi Google Business ile birebir aynı
- Çalışma saatleri Google Business ile eşleşmeli

### Google Business → Site Bağlantıları
- Google Business'ta website linki: `https://kozcuoglunakliyat.com.tr`
- Hizmet listesi: Her hizmet için ayrı link
- Fotoğraflar: Site ile aynı görseller
- SSS: Site ile aynı sorular
- Mesaj: WhatsApp'a yönlendirme

### Posts (Google Business Gönderileri)
- Haftalık gönderi: Blog yazısı özeti + site linki
- Kampanya: Fiyat indirimi, mevsimsel kampanya
- Etkinlik: Yeni bölge açılışı, yeni hizmet

## 36. Programmatic SEO — Otomatik Sayfa Üretimi

Admin panelden eklenen her veri otomatik olarak SEO-ready sayfa üretir:

### Otomatik Üretilen Sayfalar
| Veri Kaynağı | Üretilen Sayfa | Schema |
|---|---|---|
| `services.json` → yeni hizmet | `/[slug]` + sitemap + JSON-LD | Service |
| `solutions.json` → yeni çözüm | `/[slug]` + sitemap + JSON-LD | Service |
| `regions.json` → yeni ilçe | `/[slug].html` + sitemap + JSON-LD | Service + Place |
| `regions.json` → yeni şehir | `/istanbul-[slug].html` + sitemap + JSON-LD | Service + [City,City] |
| `blog.json` → yeni yazı | `/[slug].html` + sitemap + JSON-LD | Article |
| `reviews.json` → yeni yorum | İlgili sayfada Review schema güncellenir | Review |

### Otomatik SEO Kontrolleri (Build Time)
- ✅ Slug benzersizlik kontrolü
- ✅ Title 50-60 karakter kontrolü
- ✅ Description 150-160 karakter kontrolü
- ✅ Alt text boş mu kontrolü
- ✅ Internal link sayısı kontrolü (min 3)
- ✅ JSON-LD geçerlilik kontrolü
- ✅ Canonical URL doğruluk kontrolü

## 37. Crawl Budget Optimizasyonu

Google'ın siteyi tarama bütçesini verimli kullanma:

### Robots.txt Detaylı
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /uploads/thumbnails/

Sitemap: https://kozcuoglunakliyat.com.tr/sitemap.xml
Sitemap: https://kozcuoglunakliyat.com.tr/sitemap-images.xml

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /
```

### Crawl Sinyalleri
- `<link rel="canonical">` → Duplicate content yok
- `<meta name="robots" content="noindex">` → Admin, API sayfaları
- `X-Robots-Tag: noindex` → HTTP header ile
- `lastmod` sitemap'te → Sadece gerçekten değişen sayfalar
- `changefreq` → Ana sayfa: daily, hizmetler: weekly, blog: monthly

## 38. Semantic HTML5 Microdata (Yedek)

JSON-LD birincil, ama HTML microdata yedek olarak bazı kritik yerlerde:

```html
<!-- Header'da firma adı -->
<div itemscope itemtype="https://schema.org/MovingCompany">
  <span itemprop="name">Kozcuoğlu Nakliyat</span>
  <a itemprop="telephone" href="tel:+904447436">444 7 436</a>
</div>

<!-- Footer'da adres -->
<address itemscope itemtype="https://schema.org/PostalAddress">
  <span itemprop="streetAddress">Kaynarca Mah. Bahattin Veled Cad. No:37</span>
  <span itemprop="addressLocality">Pendik</span> / 
  <span itemprop="addressRegion">İstanbul</span>
</address>
```

> JSON-LD + Microdata birlikte kullanmak Google'a çift sinyal verir. Özellikle NAP bilgisi için etkili.

## 39. E-E-A-T Sinyalleri (Experience, Expertise, Authority, Trust)

Google'ın kalite değerlendirme kriterleri:

| Sinyal | Uygulama |
|---|---|
| **Experience** | Gerçek müşteri yorumları, proje fotoğrafları, video içerikler |
| **Expertise** | Detaylı hizmet açıklamaları, SSS, blog rehberleri, HowTo içerikler |
| **Authority** | Google Business doğrulaması, sameAs linkleri, dış dizin kayıtları, basın haberleri |
| **Trust** | SSL, NAP tutarlılığı, gizlilik politikası, KVKK, sigorta bilgisi, lisans numarası |

### Site İçi E-E-A-T Bileşenleri
- **Hakkımızda sayfası:** Firma tarihi, ekip, sertifikalar, ödüller
- **Trust badges:** Sigortalı, Lisanslı, 7/24, 15+ Yıl
- **Yorum sistemi:** Gerçek müşteri yorumları + yıldız
- **Blog:** Uzman içerikler, rehberler, nasıl yapılır
- **İletişim:** Gerçek adres, telefon, harita, çalışma saatleri
- **Footer:** Firma bilgileri, sosyal medya, hukuki sayfalar

## 40. Dinamik Sitemap Stratejisi

### Çoklu Sitemap
```
/sitemap.xml (index)
├── /sitemap-pages.xml (statik sayfalar)
├── /sitemap-services.xml (hizmet sayfaları)
├── /sitemap-solutions.xml (çözüm sayfaları)
├── /sitemap-regions.xml (ilçe + şehirler arası bölgeler)
├── /sitemap-blog.xml (blog yazıları)
└── /sitemap-images.xml (görsel sitemap)
```

### next-sitemap Konfigürasyonu
```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://kozcuoglunakliyat.com.tr',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  transform: async (config, path) => {
    // Ana sayfa en yüksek öncelik
    if (path === '/') return { loc: path, changefreq: 'daily', priority: 1.0 }
    // Hizmet sayfaları
    if (!path.includes('.html') && !path.includes('/')) return { loc: path, changefreq: 'weekly', priority: 0.9 }
    // Bölge sayfaları
    if (path.endsWith('.html')) return { loc: path, changefreq: 'monthly', priority: 0.8 }
    return { loc: path, changefreq: 'weekly', priority: 0.7 }
  },
  additionalSitemaps: [
    'https://kozcuoglunakliyat.com.tr/sitemap-images.xml',
  ],
}
```

## 41. Competitive Edge — Rakip Analizi Otomasyonu

### Build Time Kontrol Listesi (CI/CD)
Her deploy'da otomatik çalışan SEO kontrolleri:

```
✅ Tüm sayfaların title'ı var mı? (50-60 karakter)
✅ Tüm sayfaların description'ı var mı? (150-160 karakter)
✅ Tüm sayfaların canonical URL'si var mı?
✅ Tüm sayfaların JSON-LD'si geçerli mi?
✅ Tüm görsellerin alt text'i var mı?
✅ Tüm sayfaların h1'i var mı? (tek h1)
✅ Broken link var mı?
✅ Sitemap güncel mi?
✅ robots.txt doğru mu?
✅ 404 sayfası çalışıyor mu?
✅ Slug çakışması var mı?
✅ OG image boyutu doğru mu? (1200x630)
```

> Bu kontroller `scripts/seo-audit.ts` dosyasında build time'da çalışır. Hata varsa build başarısız olur.

## 42. Çok Dilli Hazırlık (Gelecek)

Şu an tek dil (Türkçe) ama altyapı hazır olmalı:

```html
<html lang="tr">
<link rel="alternate" hreflang="tr" href="https://kozcuoglunakliyat.com.tr/" />
<link rel="alternate" hreflang="x-default" href="https://kozcuoglunakliyat.com.tr/" />
```

> İleride İngilizce eklenmek istenirse `next-intl` veya `next-i18next` ile kolay geçiş. URL yapısı: `/en/moving-services`

## 43. Web Vitals Monitoring — Gerçek Kullanıcı Verisi (RUM)

```tsx
// src/lib/web-vitals.ts
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // GA4'e gönder
  window.gtag?.('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  })
}

export function reportWebVitals() {
  onCLS(sendToAnalytics)
  onFID(sendToAnalytics)
  onLCP(sendToAnalytics)
  onFCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
  onINP(sendToAnalytics)
}
```

> Gerçek kullanıcı CWV verilerini GA4'te izle. Google Search Console'daki CWV raporuyla karşılaştır. Sorunlu sayfaları tespit et.

## 44. Prerender — Kritik Sayfalar İçin

En önemli sayfalar için `<link rel="prerender">`:

```html
<!-- Ana sayfada, kullanıcının tıklama ihtimali yüksek sayfalar -->
<link rel="prefetch" href="/evden-eve-nakliyat" />
<link rel="prefetch" href="/fiyatlarimiz" />
<link rel="prefetch" href="/nakliyat-fiyat-hesaplama" />
```

> Next.js `<Link>` bileşeni zaten viewport'taki linkleri prefetch eder. Ama kritik sayfalar için ekstra `prefetch` eklenebilir.

## 45. Content Freshness — İçerik Tazeliği

Google güncel içeriği sever. Strateji:

| Aksiyon | Sıklık | Uygulama |
|---|---|---|
| Blog yazısı | Haftada 1-2 | Yeni yazı yayınla |
| Fiyat güncelleme | Ayda 1 | Fiyat tabloları güncelle, `dateModified` güncelle |
| SSS güncelleme | 3 ayda 1 | Yeni sorular ekle |
| Bölge sayfası | Ayda 1-2 | Yeni ilçe/şehir ekle |
| Yorum | Sürekli | Müşteri yorumları ekle |
| Sitemap lastmod | Otomatik | İçerik değiştiğinde otomatik güncelle |

### dateModified Stratejisi
```tsx
// Her sayfanın metadata'sında
export async function generateMetadata() {
  return {
    other: {
      'article:modified_time': service.updatedAt, // Son güncelleme tarihi
    }
  }
}
```

> Google `dateModified`'ı sitemap'teki `lastmod` ile karşılaştırır. Tutarlı olmalı.

---

# NAKLİYAT SEKTÖRÜNE ÖZEL SEO & CRO

> Aşağıdaki teknikler nakliyat sektörüne özgüdür. Genel SEO'nun ötesinde, sektörel dönüşüm ve arama davranışına göre optimize edilmiştir.

## 46. Nakliyat Sektörü Anahtar Kelime Haritası

### Birincil Anahtar Kelimeler (Yüksek Hacim + Yüksek Dönüşüm)

| Anahtar Kelime | Hedef Sayfa | Arama Niyeti |
|---|---|---|
| evden eve nakliyat | `/evden-eve-nakliyat` | Hizmet arama |
| nakliyat fiyatları | `/fiyatlarimiz` | Fiyat karşılaştırma |
| nakliyat fiyat hesaplama | `/nakliyat-fiyat-hesaplama` | Araç kullanma |
| istanbul nakliyat | `/` (ana sayfa) | Genel arama |
| şehirler arası nakliyat | `/sehirler-arasi-nakliyat` | Hizmet arama |
| eşya depolama | `/esya-depolama` | Hizmet arama |
| ofis taşıma | `/ofis-tasima` | Hizmet arama |
| asansörlü nakliyat | `/asansorlu-nakliyat` | Çözüm arama |

### İkincil Anahtar Kelimeler (Uzun Kuyruk — Long Tail)

| Anahtar Kelime | Hedef Sayfa | Tip |
|---|---|---|
| kadıköy evden eve nakliyat | `/kadikoy-evden-eve-nakliyat.html` | Local |
| istanbul ankara evden eve nakliyat | `/istanbul-ankara-evden-eve-nakliyat.html` | Şehirler arası |
| 3+1 ev taşıma fiyatı | `/fiyatlarimiz` + blog | Fiyat |
| nakliyat sigortası | Hizmet sayfaları (sigorta bölümü) | Bilgi |
| ev taşırken dikkat edilmesi gerekenler | Blog yazısı | Bilgi |
| acil nakliyat | Hizmet sayfaları (acil bölümü) | Acil |
| ucuz nakliyat | `/kampanyalar` | Fiyat |
| güvenilir nakliyat firması | `/referanslar` + `/hakkimizda` | Güven |

### Mevsimsel Anahtar Kelimeler

| Dönem | Anahtar Kelimeler | Aksiyon |
|---|---|---|
| Mayıs-Eylül | "yaz nakliyat", "yaz taşınma" | Yaz kampanya sayfası, blog |
| Eylül-Ekim | "okul nakliyat", "üniversite taşınma" | Öğrenci taşıma blog yazısı |
| Ocak-Mart | "kış nakliyat", "kışın taşınma" | Kış kampanya, kış taşıma rehberi |
| Yıl sonu | "nakliyat fiyatları 2027" | Yeni yıl fiyat güncelleme blog |

## 47. Google Local Pack Optimizasyonu

Google'da "nakliyat" aramasında harita üstünde çıkan 3 firma (Local Pack) çok kritik:

### Local Pack Sıralama Faktörleri

| Faktör | Uygulama | Öncelik |
|---|---|---|
| **Google Business Profile** | Tam doldurulmuş profil, doğrulanmış | Zorunlu |
| **NAP Tutarlılığı** | Site, GBP, dış dizinler hep aynı | Zorunlu |
| **Yorum Sayısı & Puanı** | Min 50+ yorum, 4.5+ puan | Zorunlu |
| **Yorum Yanıtları** | Her yoruma 24 saat içinde yanıt | Zorunlu |
| **Fotoğraflar** | Haftalık 2-3 gerçek fotoğraf yükle | Önemli |
| **GBP Gönderileri** | Haftalık post (blog özeti, kampanya) | Önemli |
| **Kategoriler** | Birincil: "Nakliyat Firması", İkincil: "Depolama Tesisi" | Zorunlu |
| **Hizmet Alanı** | İstanbul tüm ilçeler + şehirler arası | Zorunlu |
| **Çalışma Saatleri** | 7/24 veya gerçek saatler | Zorunlu |
| **Website Linki** | `https://kozcuoglunakliyat.com.tr` | Zorunlu |
| **Mesajlaşma** | GBP mesajlaşma aktif → WhatsApp'a yönlendir | Önemli |

### Dış Dizin Kayıtları (Citation Building)

| Platform | Öncelik | NAP Tutarlılığı |
|---|---|---|
| Google Business Profile | Zorunlu | ✓ |
| Yandex Business | Zorunlu | ✓ |
| Bing Places | Zorunlu | ✓ |
| Foursquare | Önemli | ✓ |
| Şikayetvar | Önemli | ✓ |
| Enuygun | Önemli | ✓ |
| Sahibinden | Önemli | ✓ |
| Facebook Business | Önemli | ✓ |
| Instagram Business | Önemli | ✓ |
| LinkedIn Company | Önemli | ✓ |
| Sektörel Dizinler | Önemli | ✓ |

> **Kural:** Tüm platformlarda NAP bilgisi karakter karakter aynı olmalı. Tek bir harf farkı bile Google'ın entity birleştirmesini bozar.

## 48. Yorum Toplama Stratejisi (Review Acquisition)

### Otomatik Yorum İsteme Akışı

```
Taşıma Tamamlandı
    ↓ (24 saat sonra)
WhatsApp: "Merhaba {ad}, taşımanız tamamlandı! Deneyiminizi değerlendirir misiniz?"
    ↓ (Link: /yorum-yaz?hizmet=evden-eve-nakliyat)
Site Yorum Formu
    ↓ (Onay sonrası)
"Google'da da değerlendirir misiniz?" → Google Business yorum linki
```

### Yorum Formu Alanları
| Alan | Tip | Zorunlu |
|---|---|---|
| Ad Soyad | Text | ✓ |
| Yıldız Puanı | 1-5 yıldız | ✓ |
| Hizmet Tipi | Select | ✓ |
| Nereden → Nereye | Text | ✗ |
| Yorum | Textarea | ✓ (min 20 karakter) |
| Fotoğraf | File upload | ✗ |

### Yorum Gösterim Stratejisi
- **Ana sayfa:** En iyi 6 yorum (slider)
- **Hizmet sayfaları:** O hizmete ait yorumlar
- **Bölge sayfaları:** O bölgeden müşteri yorumları
- **Tüm sayfalar:** Footer üstünde "Müşterilerimiz Ne Diyor?" bölümü

> **Uyarı:** Sahte yorum oluşturmak Google politikalarına aykırıdır. Sadece gerçek müşterilerden yorum toplanmalıdır.

## 49. CRO — Dönüşüm Oranı Optimizasyonu (Nakliyat Özel)

### Dönüşüm Noktaları (Conversion Points)

| Dönüşüm | Sayfa | CTA |
|---|---|---|
| **Keşif Talebi** | Tüm sayfalar | "Ücretsiz Keşif Talep Et" |
| **Telefon Araması** | Tüm sayfalar | "Hemen Ara: 444 7 436" |
| **WhatsApp Mesajı** | Tüm sayfalar | WhatsApp butonu |
| **Fiyat Hesaplama** | Fiyat sayfaları | "Fiyat Hesapla" |
| **İletişim Formu** | İletişim | "Mesaj Gönder" |
| **Yorum Bırakma** | Hizmet sayfaları | "Yorum Yaz" |

### Dönüşüm Artırma Taktikleri

| Taktik | Uygulama |
|---|---|
| **Aciliyet** | "Bugün ara, yarın taşın!" — Acil nakliyat vurgusu |
| **Kıtlık** | "Bu ay sadece 5 müsait tarih kaldı" (admin'den yönetim) |
| **Sosyal Kanıt** | "Bu hafta 23 taşıma tamamlandı" sayaç |
| **Güven** | Trust badges: Sigortalı, Lisanslı, 15+ Yıl |
| **Fiyat Şeffaflığı** | Fiyat aralıkları açıkça göster, "gizli maliyet yok" |
| **Kolay İletişim** | Sticky CTA bar, WhatsApp, telefon her yerde |
| **Risk Azaltma** | "Memnun kalmazsanız ücret iadesi" garantisi |
| **Karşılaştırma** | "Neden Kozcuoğlu?" tablosu |

### Mobil CRO (Kritik — Trafiğin %70+'ı mobil)

| Bileşen | Uygulama |
|---|---|
| **Sticky CTA Bar** | Alt sabit bar: "Ara" + "WhatsApp" + "Keşif" |
| **Click-to-Call** | Telefon numaraları tıklanabilir `<a href="tel:">` |
| **Tek Adım Form** | Mobilde sadece Ad + Telefon + "Ara Beni" |
| **Hızlı Yükleme** | LCP < 1.2s, INP < 100ms |
| **Büyük Butonlar** | Min 48px touch target |
| **Kaydırma Yok** | Kritik CTA'lar ekranın ilk yarısında |

## 50. Nakliyat Sektörü Schema Zenginleştirme

### Hizmet Sayfalarına Ek Schema Alanları

Her hizmet sayfasında `Service` schema'sına ek:

```json
{
  "serviceOutput": "Eşyalarınız güvenle yeni adresinize taşınır",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "40.8775",
      "longitude": "29.2333"
    },
    "geoRadius": "500 km"
  },
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "isRelatedTo": [
    { "@type": "Service", "name": "Ambalajlama", "url": "https://kozcuoglunakliyat.com.tr/ambalajlama-paketleme" },
    { "@type": "Service", "name": "Sigortalı Taşıma", "url": "https://kozcuoglunakliyat.com.tr/sigortali-tasima" }
  ]
}
```

> `serviceOutput` → Google'a hizmetin sonucunu anlatır. `serviceArea` → GeoCircle ile hizmet yarıçapı. `isRelatedTo` → İlgili hizmetler arası bağlantı (entity linking).

## 51. Nakliyat Blog İçerik Stratejisi

### Blog Kategorileri

| Kategori | Hedef Anahtar Kelimeler | Örnek Yazılar |
|---|---|---|
| **Rehberler** | "nasıl yapılır", "rehber" | Ev Taşıma Rehberi, Ofis Taşıma Rehberi |
| **Fiyat** | "fiyat", "ücret", "maliyet" | 2026 Nakliyat Fiyatları, Şehirler Arası Fiyatlar |
| **İpuçları** | "dikkat", "ipucu", "öneri" | Taşınırken Dikkat Edilmesi Gerekenler |
| **Kontrol Listesi** | "liste", "checklist" | Taşıma Kontrol Listesi, Ambalaj Listesi |
| **Karşılaştırma** | "vs", "fark", "karşılaştırma" | Asansörlü vs Normal Nakliyat |
| **Bölge** | "ilçe nakliyat" | Kadıköy'de Ev Taşıma Rehberi |
| **Sezonsal** | "yaz", "kış", "bayram" | Yaz Aylarında Taşınma İpuçları |
| **Sigorta** | "sigorta", "hasar" | Nakliyat Sigortası Nedir? |

### Blog Yazı Şablonu (Her Yazıda Olması Gerekenler)
1. H1 başlık (anahtar kelime içermeli)
2. Giriş paragrafı (soruyu doğrudan cevapla — featured snippet)
3. TOC (Table of Contents)
4. H2 alt başlıklar (soru formatında — passage ranking)
5. Görsel (alt text'li, WebP)
6. Internal linkler (min 3 — ilgili hizmet + çözüm + bölge)
7. CTA bölümü ("Ücretsiz Keşif Talep Et")
8. SSS bölümü (FAQPage schema)
9. Yorum bölümü
10. İlgili yazılar

## 52. Nakliyat Sektörü Teknik Gereksinimler

### Telefon Numarası Formatı (Tüm Sayfalar)

```html
<!-- Click-to-call (mobilde direkt arama) -->
<a href="tel:+904447436" aria-label="Kozcuoğlu Nakliyat'ı ara: 444 7 436">
  444 7 436
</a>

<!-- WhatsApp (direkt mesaj) -->
<a href="https://wa.me/905321384979?text=Merhaba%2C%20nakliyat%20hakkında%20bilgi%20almak%20istiyorum." 
   aria-label="WhatsApp ile mesaj gönder"
   target="_blank" rel="noopener">
  WhatsApp
</a>
```

> **Kural:** Tüm telefon numaraları `<a href="tel:">` ile sarılmalı. GA4'te `phone_click` event'i tetiklenmeli.

### Adres Formatı (Schema + HTML Tutarlılığı)

```
Schema:  "Kaynarca Mah. Bahattin Veled Cad. No:37"
HTML:    Kaynarca Mah. Bahattin Veled Cad. No:37
GBP:     Kaynarca Mah. Bahattin Veled Cad. No:37
Footer:  Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul
```

> Karakter karakter aynı. Kısaltma farkı bile olmamalı (Mah. vs Mahallesi).

## 53. 404 Sayfası — Nakliyat Özel

### 404 Sayfası İçeriği

- **Başlık:** "Sayfa Bulunamadı"
- **Açıklama:** "Aradığınız sayfa taşınmış olabilir 🚚"
- **Öneriler:**
  - Ana Sayfaya Git
  - Hizmetlerimizi İncele
  - Fiyat Hesapla
  - Bize Ulaşın
- **Arama:** Site içi arama kutusu
- **Popüler Sayfalar:** En çok ziyaret edilen 5 sayfa linki

> **SEO:** 404 sayfası `noindex` olmalı ama kullanıcıyı sitede tutmalı. Nakliyat temalı espri ("Eşyalarınız gibi bu sayfa da taşındı") güven verir.

## 54. Dönüşüm İzleme (Conversion Tracking)

### GA4 Dönüşüm Hedefleri

| Dönüşüm | Event | Değer |
|---|---|---|
| Keşif Talebi Gönderildi | `survey_request_submit` | Yüksek |
| Telefon Araması | `phone_click` | Yüksek |
| WhatsApp Mesajı | `whatsapp_click` | Yüksek |
| Fiyat Hesaplama Tamamlandı | `price_calculation_complete` | Orta |
| İletişim Formu Gönderildi | `contact_form_submit` | Orta |
| Yorum Gönderildi | `review_submit` | Düşük |
| PDF Teklif İndirildi | `pdf_download` | Orta |
| Kampanya Tıklandı | `campaign_click` | Düşük |

### Microsoft Clarity Heatmap Analizi
- Hangi CTA'lar en çok tıklanıyor?
- Kullanıcılar sayfanın neresinde duruyor?
- Form'un hangi alanında bırakıyorlar?
- Mobilde scroll derinliği ne kadar?

> **Kural:** Her dönüşüm noktası GA4 + GTM ile izlenmeli. Aylık rapor çıkarılmalı.

---

# SEO 10+ SEVİYESİ — RAKİPLERİN HAYAL BİLE EDEMEYECEĞİ TEKNİKLER

> Aşağıdaki teknikler mevcut 9.5 puanı 10+ seviyesine çıkarır. Türkiye'de nakliyat sektöründe bunları uygulayan site yok. Hatta çoğu büyük ajans bile bunları bilmez.

## 55. Speakable Schema — Sesli Arama Optimizasyonu

Google Assistant, Siri, Alexa gibi sesli asistanlar için içerik işaretleme. "Ok Google, İstanbul'da nakliyat firması öner" dediğinde bizim içeriğimiz okunur.

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

### Uygulama
- Her sayfanın h1, intro paragrafı ve ilk SSS cevabı `speakable` olarak işaretlenir
- Cümleler kısa, net, konuşma diline uygun yazılır
- Fiyat aralığı sesli okunabilir formatta: "Evden eve nakliyat fiyatları 3.500 TL ile 25.000 TL arasında değişmektedir"
- Blog yazılarında ilk paragraf doğrudan soruyu cevaplar (sesli asistan bu paragrafı okur)

### Hedef Sesli Arama Sorguları
| Sorgu | Cevap Kaynağı |
|---|---|
| "İstanbul'da nakliyat firması" | Ana sayfa intro |
| "Evden eve nakliyat ne kadar" | Fiyatlarımız sayfası |
| "Kadıköy nakliyat firması" | Bölge sayfası intro |
| "Nakliyat sigortası nedir" | Blog yazısı |

## 56. SameAs Graph — Tam Entity Ağı

Mevcut `sameAs` listesini genişletip Google'ın entity graph'ında **tam bağlantılı düğüm** oluşturma:

```json
"sameAs": [
  "https://www.facebook.com/kozcuoglunakliyat",
  "https://www.instagram.com/kozcuoglunakliyat",
  "https://www.youtube.com/@kozcuoglunakliyat",
  "https://g.page/kozcuoglunakliyat",
  "https://tr.linkedin.com/company/kozcuoglunakliyat",
  "https://www.sikayetvar.com/kozcuoglu-nakliyat",
  "https://www.google.com/maps/place/Kozcuoğlu+Nakliyat",
  "https://twitter.com/kozcuoglunak",
  "https://www.tiktok.com/@kozcuoglunakliyat",
  "https://tr.pinterest.com/kozcuoglunakliyat",
  "https://www.sahibinden.com/kozcuoglu-nakliyat",
  "https://www.wikidata.org/wiki/QXXXXXXX"
]
```

### Wikidata Kaydı (Kritik!)
- Wikidata'da firma kaydı oluştur → Google Knowledge Panel çıkma şansı **10x** artar
- Wikidata ID'si `sameAs`'a eklenir
- Wikipedia'da "İstanbul nakliyat firmaları" listesinde yer almak hedeflenir

### Google Knowledge Panel Stratejisi
1. Wikidata kaydı oluştur
2. Tüm sosyal medya profillerini doğrula
3. Google Business Profile'ı tam doldur
4. Basın haberleri / PR çalışması (en az 3 haber sitesinde firma adı geçmeli)
5. `sameAs` ile tüm profilleri bağla
6. 3-6 ay içinde Knowledge Panel çıkma ihtimali yüksek

## 57. JSON-LD Nesting — İç İçe Geçmiş Zengin Schema

Tek bir sayfada birden fazla schema'yı **iç içe** bağlayarak Google'a çok katmanlı bilgi verme:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Evden Eve Nakliyat",
  "mainEntity": {
    "@type": "Service",
    "name": "Evden Eve Nakliyat",
    "provider": {
      "@type": "MovingCompany",
      "@id": "https://kozcuoglunakliyat.com.tr/#organization"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "3500",
      "highPrice": "25000",
      "priceCurrency": "TRY",
      "offerCount": "6"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ev Taşıma Paketleri",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "1+1 Ev Taşıma",
          "itemListElement": [{
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "1+1 Ev Taşıma (Şehir İçi)"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "3500",
              "priceCurrency": "TRY",
              "minPrice": "3500",
              "maxPrice": "6000"
            }
          }]
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Ahmet Y." },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": "Çok profesyonel bir ekip...",
        "datePublished": "2026-01-15"
      }
    ]
  },
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [...] },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".intro-text"] }
}
```

### Neden 10+ Yapıyor?
- Google SERP'te aynı anda: **yıldızlar + fiyat aralığı + breadcrumb + SSS + site linkleri** gösterir
- Tek bir arama sonucunda 4-5 satır yer kaplar (rakipler 2 satır)
- CTR (tıklanma oranı) **3-5x** artar

## 58. Dinamik FAQ Schema — Sayfa Bazlı Otomatik SSS

Her sayfadaki SSS bölümünü otomatik olarak `FAQPage` schema'sına dönüştürme + **Google'ın "People Also Ask" bölümünde** çıkma:

### Strateji
- Her hizmet sayfasında min 5 SSS
- Her bölge sayfasında min 3 bölgeye özel SSS
- Her blog yazısında min 3 SSS
- SSS soruları **gerçek arama sorgularından** türetilir (Google Suggest, People Also Ask)

### SSS Soru Formatı (PAA Hedefli)
```
❌ Yanlış: "Hizmetlerimiz nelerdir?"
✅ Doğru: "Evden eve nakliyat ne kadar sürer?"
✅ Doğru: "Kadıköy'den Beşiktaş'a nakliyat fiyatı ne kadar?"
✅ Doğru: "Nakliyat sigortası zorunlu mu?"
✅ Doğru: "3+1 ev taşıma kaç TL?"
```

### Admin Panelde SSS Yönetimi
- Her sayfa için SSS ekle/sil/düzenle
- SSS otomatik olarak FAQPage schema'sına dönüşür
- "Google PAA'da çıkma potansiyeli" skoru (arama hacmi bazlı)

## 59. Otomatik Internal Link Skoru — Link Equity Dağılımı

Mevcut otomatik iç linkleme sistemine **link equity (PageRank) dağılım analizi** ekleme:

### Dashboard'da Link Analizi
| Metrik | Açıklama |
|---|---|
| **Orphan Pages** | Hiçbir sayfadan link almayan sayfalar (kırmızı uyarı) |
| **Link Depth** | Ana sayfadan kaç tıkla ulaşılıyor (max 3 olmalı) |
| **Internal Link Sayısı** | Her sayfanın aldığı/verdiği link sayısı |
| **Anchor Text Dağılımı** | Hangi anchor text'ler en çok kullanılıyor |
| **Link Equity Akışı** | PageRank'in sayfalar arasında nasıl dağıldığı (görsel harita) |

### Otomatik Uyarılar
```
⚠️ "/ofis-tasima" sayfası sadece 1 internal link alıyor → Min 3 olmalı
⚠️ "/blog/nakliyat-rehberi.html" orphan page → Hiçbir sayfadan link yok
⚠️ "/galeri" sayfası ana sayfadan 4 tık uzakta → Max 3 olmalı
✅ "/evden-eve-nakliyat" en çok link alan sayfa (23 link) → İyi
```

## 60. Predictive SEO — Mevsimsel Arama Tahmini

Google Trends verilerine göre **gelecek ayın arama trendlerini tahmin edip** içerik hazırlama:

### Nakliyat Sektörü Arama Takvimi
| Ay | Trend Yükselen Aramalar | Hazırlanacak İçerik |
|---|---|---|
| Ocak | "yılbaşı nakliyat", "kış taşınma" | Kış taşıma rehberi blog |
| Mart-Nisan | "bahar taşınma", "ev taşıma hazırlık" | Bahar kampanya, checklist blog |
| Mayıs-Haziran | "yaz nakliyat fiyatları", "taşınma sezonu" | Yaz fiyat güncellemesi, erken rezervasyon kampanya |
| Temmuz-Ağustos | "acil nakliyat", "son dakika taşınma" | Acil nakliyat vurgusu, hızlı teklif |
| Eylül | "üniversite taşınma", "öğrenci nakliyat" | Öğrenci taşıma kampanya, blog |
| Ekim-Kasım | "ofis taşıma", "kurumsal nakliyat" | Yıl sonu ofis taşıma kampanya |
| Aralık | "nakliyat fiyatları 2027" | Yeni yıl fiyat tahmin blog |

### Uygulama
- Her ayın 1'inde o aya özel blog yazısı yayınla
- Kampanya sayfasını mevsime göre güncelle
- SSS'lere mevsimsel sorular ekle
- Admin panelde "İçerik Takvimi" bölümü (hatırlatma + taslak)

## 61. Core Web Vitals Üstünlüğü — "Perfect Score" Stratejisi

PSI 100 yetmez. **Gerçek kullanıcı verilerinde (CrUX)** de mükemmel olmak lazım:

### CrUX Hedefleri (Gerçek Kullanıcı)
| Metrik | Hedef | Rakip Ortalama | Bizim Hedef |
|---|---|---|---|
| **LCP** | < 2.5s | 3-5s | **< 1.2s** |
| **INP** | < 200ms | 300-500ms | **< 50ms** |
| **CLS** | < 0.1 | 0.15-0.3 | **< 0.01** |

### Nasıl?
- **LCP < 1.2s:** Hero görseli `priority` + `fetchpriority="high"`, kritik CSS inline, font preload
- **INP < 50ms:** Tüm event handler'lar `requestIdleCallback` ile, React 18 `useTransition`
- **CLS < 0.01:** Tüm görsellerde `width/height`, font `size-adjust`, skeleton loader

### CrUX Badge
Google Search Console'da "İyi" yerine **"Mükemmel"** rozeti almak:
- 75. yüzdelik dilimde tüm metrikler yeşil
- Bu rozet arama sıralamalarında bonus verir

## 62. Structured Data Testing Pipeline — Otomatik Schema Doğrulama

Her deploy'da schema'ların Google'ın beklentisiyle uyumlu olduğunu otomatik test etme:

```ts
// scripts/validate-schemas.ts
import { validate } from 'schema-dts'

async function validateAllPages() {
  const pages = getAllPages() // Tüm sayfaları al
  
  for (const page of pages) {
    const html = await renderPage(page.url)
    const schemas = extractJsonLd(html)
    
    for (const schema of schemas) {
      // 1. JSON-LD syntax geçerli mi?
      JSON.parse(schema) // Hata varsa build fail
      
      // 2. Schema.org tipi doğru mu?
      validateSchemaType(schema)
      
      // 3. Zorunlu alanlar var mı?
      validateRequiredFields(schema)
      
      // 4. NAP tutarlılığı
      validateNAP(schema)
      
      // 5. URL'ler çalışıyor mu?
      validateUrls(schema)
    }
  }
}
```

### Build Pipeline
```
npm run build
  → validate-schemas.ts (tüm sayfaların schema'ları test edilir)
  → seo-audit.ts (title, description, h1, alt text kontrolleri)
  → broken-links.ts (kırık link kontrolü)
  → sitemap-validate.ts (sitemap tutarlılık kontrolü)
  → ✅ Build başarılı / ❌ Build başarısız (hata raporu)
```

## 63. Competitor Schema Gap Analysis — Rakip Schema Eksiklik Analizi

Rakiplerin kullandığı schema'ları analiz edip, bizde olup onlarda olmayan schema'ları vurgulama:

### Nakliyat Sektörü Rakip Analizi (Türkiye)
| Schema | Rakip 1 | Rakip 2 | Rakip 3 | **Biz** |
|---|---|---|---|---|
| Organization | ✅ | ✅ | ✅ | ✅ |
| MovingCompany | ❌ | ❌ | ❌ | ✅ |
| Service | ❌ | ✅ | ❌ | ✅ |
| AggregateRating | ❌ | ❌ | ❌ | ✅ |
| FAQPage | ❌ | ❌ | ❌ | ✅ |
| BreadcrumbList | ❌ | ✅ | ❌ | ✅ |
| HowTo | ❌ | ❌ | ❌ | ✅ |
| VideoObject | ❌ | ❌ | ❌ | ✅ |
| Vehicle | ❌ | ❌ | ❌ | ✅ |
| Offer/AggregateOffer | ❌ | ❌ | ❌ | ✅ |
| SpeakableSpecification | ❌ | ❌ | ❌ | ✅ |
| OfferCatalog | ❌ | ❌ | ❌ | ✅ |
| SelfStorage | ❌ | ❌ | ❌ | ✅ |
| CreativeWork | ❌ | ❌ | ❌ | ✅ |
| SoftwareApplication | ❌ | ❌ | ❌ | ✅ |
| **Toplam** | **1/15** | **3/15** | **1/15** | **15/15** |

## 64. Semantic HTML5 Landmarks — Tam Erişilebilirlik + SEO

HTML5 landmark'larını **her sayfada tutarlı** kullanarak Google'ın sayfa yapısını mükemmel anlamasını sağlama:

```html
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only">İçeriğe Geç</a>
  
  <header role="banner">
    <nav role="navigation" aria-label="Ana Menü">...</nav>
  </header>
  
  <main id="main-content" role="main">
    <article itemscope itemtype="https://schema.org/Service">
      <header>
        <h1 itemprop="name">Evden Eve Nakliyat</h1>
        <nav aria-label="İçindekiler"><!-- TOC --></nav>
      </header>
      
      <section aria-labelledby="hizmet-detay">
        <h2 id="hizmet-detay">Hizmet Detayı</h2>
        ...
      </section>
      
      <section aria-labelledby="sss">
        <h2 id="sss">Sıkça Sorulan Sorular</h2>
        ...
      </section>
      
      <aside role="complementary" aria-label="İlgili Hizmetler">
        <!-- Sidebar -->
      </aside>
    </article>
  </main>
  
  <footer role="contentinfo">...</footer>
</body>
```

### Neden 10+ Yapıyor?
- Google'ın **MUM (Multitask Unified Model)** algoritması semantic HTML'i çok iyi okur
- Erişilebilirlik puanı 100 → Google bunu sıralama sinyali olarak kullanır
- Screen reader uyumluluğu → Kamu kurumları ve büyük firmalar için zorunlu (kurumsal müşteri çekme)

## 65. Otomatik Alt Text Üretimi — AI Destekli Görsel SEO

Admin panelden yüklenen görseller için **otomatik alt text önerisi** üretme:

### Uygulama
```ts
// Admin panelde görsel yüklendiğinde
async function generateAltText(imagePath: string, pageContext: string) {
  // 1. Sayfa bağlamını al (hizmet adı, bölge adı vb.)
  // 2. Dosya adından ipucu çıkar
  // 3. Şablon bazlı alt text oluştur
  
  const templates = {
    service: `${serviceName} hizmeti - Kozcuoğlu Nakliyat`,
    region: `${regionName} evden eve nakliyat - Kozcuoğlu Nakliyat`,
    project: `${projectTitle} - Tamamlanan proje görseli`,
    fleet: `${vehicleType} - Kozcuoğlu Nakliyat araç filosu`,
    gallery: `${category} - Kozcuoğlu Nakliyat galeri`
  }
  
  return templates[pageType]
}
```

### Admin Panelde
- Görsel yüklendiğinde otomatik alt text önerisi gösterilir
- Admin onaylar veya düzenler
- Boş alt text ile kayıt **engellenir** (build-time kontrolü de var)

## 66. Hreflang Hazırlık + Çok Dilli Altyapı

Şu an tek dil ama **altyapıyı hazır tutmak** Google'a profesyonellik sinyali verir:

```html
<html lang="tr">
<link rel="alternate" hreflang="tr" href="https://kozcuoglunakliyat.com.tr/" />
<link rel="alternate" hreflang="x-default" href="https://kozcuoglunakliyat.com.tr/" />
```

### Gelecek Planı
- İngilizce sayfa eklenirse: `/en/moving-services`
- Arapça sayfa eklenirse: `/ar/nakliyat` (İstanbul'daki Arap müşteriler için)
- `next-intl` ile kolay geçiş altyapısı hazır

## 67. Google Merchant Center — Hizmet Listeleme

Google Merchant Center'a **hizmet** olarak kayıt (ürün değil, hizmet):

### Uygulama
- Merchant Center'da "Yerel Hizmetler" kategorisinde kayıt
- Her hizmet için fiyat aralığı, açıklama, görsel
- Google Ads "Yerel Hizmet Reklamları" ile entegrasyon hazırlığı
- Organik aramada "Hizmet" kartı çıkma şansı

## 68. Progressive Enhancement — JavaScript Olmadan da Çalışma

Google'ın crawler'ı JavaScript'i render edebilir ama **JS olmadan da tam içerik** sunmak:

### Uygulama
- SSG ile tüm sayfalar statik HTML olarak sunulur (zaten yapıyoruz ✅)
- `<noscript>` tag'ı ile JS devre dışıyken bile temel içerik görünür
- JSON-LD `<script>` tag'ları JS'e bağımlı değil (statik HTML'de)
- Form'lar progressive enhancement: JS varsa AJAX, yoksa normal form submit
- Görseller `<img>` tag'ı ile (JS'e bağımlı lazy load yerine native `loading="lazy"`)

### Test
```bash
# Chrome'da JS devre dışı bırakıp siteyi kontrol et
# Tüm içerik, NAP, schema görünmeli
```

## 69. Search Console API Entegrasyonu — Otomatik SEO Raporu

Google Search Console API'den veri çekip admin panelde SEO dashboard'u:

### Admin Panel SEO Dashboard
| Metrik | Kaynak | Gösterim |
|---|---|---|
| **Toplam Gösterim** | Search Console API | Haftalık grafik |
| **Toplam Tıklama** | Search Console API | Haftalık grafik |
| **Ortalama Pozisyon** | Search Console API | Sayfa bazlı tablo |
| **CTR** | Search Console API | Sayfa bazlı |
| **İndekslenen Sayfa** | Search Console API | Toplam sayı |
| **CWV Durumu** | Search Console API | Yeşil/Sarı/Kırmızı |
| **Anahtar Kelime Sıralaması** | Search Console API | Top 10 kelime |
| **Hata Sayısı** | Search Console API | 404, 5xx, crawl hataları |

### Otomatik Uyarılar (E-posta/WhatsApp)
```
⚠️ "evden eve nakliyat" kelimesi 3. sıradan 7. sıraya düştü
⚠️ /kadikoy-evden-eve-nakliyat.html sayfası indexten çıktı
✅ Geçen hafta 1.250 organik tıklama (+%15)
✅ CWV tüm sayfalar "İyi" durumda
```

## 70. Entity Salience Optimization — 2026 Kritik Teknik

### Entity Salience Nedir?

Google NLP API, bir sayfadaki entity'lerin "salience" (belirginlik) skorunu hesaplar. Yüksek salience = o entity sayfa için merkezi.

### Uygulama Stratejisi

| Teknik | Uygulama |
|---|---|
| **Entity Prominence** | Ana entity'ler H1, ilk paragraf, alt başlıklarda geçmeli |
| **Co-occurrence** | İlgili entity'ler birlikte kullanılmalı ("Kozcuoğlu Nakliyat" + "evden eve taşıma") |
| **Contextual Density** | Doğal dağılım, keyword stuffing değil |
| **First Mention Context** | Entity ilk kullanımda context ile tanıtılmalı |
| **Semantic Variations** | Eş anlamlılar, ilişkili kavramlar kullanılmalı |

### Örnek: Optimize Edilmiş Paragraf

```markdown
❌ Kötü: "Nakliyat hizmeti sunuyoruz. Nakliyat fiyatları uygun. Nakliyat firması olarak..."

✅ İyi: "Kozcuoğlu Nakliyat, İstanbul'da 15 yıldır evden eve taşıma hizmeti sunan 
profesyonel bir nakliye şirketidir. Eşya taşımacılığında uzmanlaşmış ekibimiz, 
asansörlü nakliyat ve sigortalı taşıma çözümleriyle müşterilerimize güvenli hizmet verir."
```

### Google NLP API Test

```bash
# Entity salience skorlarını test et
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d @request.json \
  https://language.googleapis.com/v1/documents:analyzeEntities
```

## 71. Content Knowledge Graph Building — Semantic Architecture

### Strateji: Site-Wide Entity Network

Her sayfa bir "node", internal linkler "edges" — semantic knowledge graph oluşturma.

### Implementation

```typescript
// Entity relationship mapping
const entityGraph = {
  "Kozcuoğlu Nakliyat": {
    type: "Organization",
    provides: ["Evden Eve Nakliyat", "Ofis Taşıma", "Eşya Depolama"],
    serves: ["Kadıköy", "Pendik", "Kartal"],
    uses: ["Asansörlü Nakliyat", "Sigortalı Taşıma"],
    locatedIn: "Pendik, İstanbul"
  },
  "Evden Eve Nakliyat": {
    type: "Service",
    providedBy: "Kozcuoğlu Nakliyat",
    includes: ["Ambalajlama", "Demontaj", "Montaj"],
    relatedTo: ["Ofis Taşıma", "Parça Eşya Taşıma"]
  }
}
```

### Schema Implementation

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://kozcuoglunakliyat.com.tr/evden-eve-nakliyat#service",
  "name": "Evden Eve Nakliyat",
  "provider": {
    "@id": "https://kozcuoglunakliyat.com.tr/#organization"
  },
  "isRelatedTo": [
    {"@type": "Service", "@id": "https://kozcuoglunakliyat.com.tr/ofis-tasima#service"},
    {"@type": "Service", "@id": "https://kozcuoglunakliyat.com.tr/parca-esya-tasima#service"}
  ],
  "hasPart": [
    {"@type": "Service", "name": "Ambalajlama", "url": "https://kozcuoglunakliyat.com.tr/ambalajlama-paketleme"},
    {"@type": "Service", "name": "Demontaj-Montaj", "url": "https://kozcuoglunakliyat.com.tr/demontaj-montaj"}
  ]
}
```

## 72. AI Citation Strategies — GEO Advanced

### Citation-Worthy Content Checklist

| Kriter | Uygulama | Örnek |
|---|---|---|
| **Original Data** | Kendi araştırmanız, anketiniz | "İstanbul'da 2026 nakliyat fiyatları analizi (500 müşteri verisi)" |
| **Unique Framework** | Kendi metodolojiniz | "5 Aşamalı Güvenli Taşıma Süreci" |
| **Comprehensive Guide** | En detaylı kaynak | "Evden Eve Nakliyat: Eksiksiz Rehber (12.000 kelime)" |
| **Expert Insights** | Sektör uzmanı görüşleri | "15 yıllık deneyimimize göre..." |
| **Case Studies** | Gerçek proje örnekleri | "1.200 m2 ofis taşıma vaka çalışması" |
| **Visual Assets** | Orijinal infografik, diagram | "Nakliyat süreci akış şeması" |

### AI-Friendly Content Structure

```markdown
# [Başlık: Net, Descriptive]

## Executive Summary (AI extraction için)
[2-3 cümle: Ana bulgular, key takeaways]

## Key Statistics (Quotable)
- **Ortalama maliyet:** 8.500 TL (2026 İstanbul)
- **Süre:** 4-8 saat (3+1 ev)
- **Müşteri memnuniyeti:** %96.5 (127 değerlendirme)

## Detailed Analysis
[Kapsamlı içerik, alt başlıklar, görseller]

## Methodology (Credibility)
[Veri nasıl toplandı, kaynak belirtme]

## Conclusion
[Actionable insights]
```

## 73. Advanced Schema Nesting — Multi-Layer Entity Connections

### Tek Sayfada Çok Katmanlı Schema

Google'a maksimum bilgi vermek için schema'ları iç içe bağlama:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://kozcuoglunakliyat.com.tr/evden-eve-nakliyat",
      "name": "Evden Eve Nakliyat",
      "mainEntity": {"@id": "#service"},
      "breadcrumb": {"@id": "#breadcrumb"},
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".intro-text", ".price-range"]
      }
    },
    {
      "@type": "Service",
      "@id": "#service",
      "name": "Evden Eve Nakliyat",
      "provider": {"@id": "https://kozcuoglunakliyat.com.tr/#organization"},
      "offers": {"@id": "#offers"},
      "aggregateRating": {"@id": "#rating"},
      "hasOfferCatalog": {"@id": "#catalog"},
      "review": [{"@id": "#review1"}, {"@id": "#review2"}]
    },
    {
      "@type": "AggregateOffer",
      "@id": "#offers",
      "lowPrice": "3500",
      "highPrice": "25000",
      "priceCurrency": "TRY",
      "offerCount": "6",
      "offers": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "1+1 Ev Taşıma",
            "description": "Şehir içi 1+1 daire taşıma hizmeti"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "3500",
            "maxPrice": "6000",
            "priceCurrency": "TRY"
          }
        }
      ]
    },
    {
      "@type": "AggregateRating",
      "@id": "#rating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "#breadcrumb",
      "itemListElement": [...]
    }
  ]
}
```

### Neden 10+ Yapan Özellikler

1. **@graph kullanımı:** Birden fazla entity tek JSON-LD'de
2. **@id referencing:** Duplicate data yok, efficient
3. **Multi-layer nesting:** Service → Offers → PriceSpec → Review
4. **Speakable integration:** Sesli arama optimization
5. **Complete entity web:** Tüm relationships tanımlı

## 74. Semantic Clustering & Internal Linking

### Entity-Based Internal Link Strategy

```typescript
// Otomatik internal link önerileri (entity-based)
function suggestInternalLinks(currentPage: Page) {
  const pageEntities = extractEntities(currentPage.content)
  const relatedPages = []
  
  for (const entity of pageEntities) {
    // Entity'nin ana sayfasını bul
    const entityPage = findEntityPage(entity)
    if (entityPage && entityPage.url !== currentPage.url) {
      relatedPages.push({
        url: entityPage.url,
        anchor: entity.name,
        relevance: calculateSemanticSimilarity(currentPage, entityPage),
        relationship: entity.relationship // "provides", "uses", "locatedIn" etc.
      })
    }
  }
  
  return relatedPages.sort((a, b) => b.relevance - a.relevance).slice(0, 5)
}
```

### Schema Properties for Internal Linking

```json
{
  "isPartOf": {"@id": "https://kozcuoglunakliyat.com.tr/hizmetlerimiz"},
  "hasPart": [
    {"@type": "Service", "url": "https://kozcuoglunakliyat.com.tr/ambalajlama-paketleme"},
    {"@type": "Service", "url": "https://kozcuoglunakliyat.com.tr/demontaj-montaj"}
  ],
  "isRelatedTo": [
    {"@type": "Service", "url": "https://kozcuoglunakliyat.com.tr/ofis-tasima"},
    {"@type": "Service", "url": "https://kozcuoglunakliyat.com.tr/sehirler-arasi-nakliyat"}
  ],
  "mentions": [
    {"@type": "Place", "url": "https://kozcuoglunakliyat.com.tr/kadikoy-evden-eve-nakliyat.html"},
    {"@type": "Place", "url": "https://kozcuoglunakliyat.com.tr/pendik-evden-eve-nakliyat.html"}
  ]
}
```

## 75. Link Building Otomasyonu — Dış Link Stratejisi

### Otomatik Dış Link Fırsatları
| Strateji | Uygulama | Zorluk |
|---|---|---|
| **Broken Link Building** | Rakiplerin kırık linklerini bul, kendi içeriğini öner | Orta |
| **HARO (Help a Reporter)** | Gazetecilerin nakliyat sorularına uzman cevap ver | Kolay |
| **Yerel Dizinler** | 20+ yerel dizine kayıt (NAP tutarlı) | Kolay |
| **Misafir Blog** | Emlak/dekorasyon bloglarına misafir yazı | Orta |
| **Infografik** | "Türkiye'de Nakliyat İstatistikleri" infografik → paylaşım | Zor |
| **Basın Bülteni** | Yeni hizmet/kampanya duyurusu → haber siteleri | Orta |

### Admin Panelde Link Takibi
- Kazanılan dış linkler listesi (URL, anchor text, DA skoru)
- Kaybedilen linkler uyarısı
- Rakip link profili karşılaştırma

---

## SEO Seviye Özeti

| Seviye | Puan | Teknikler |
|---|---|---|
| **Temel** | 5/10 | Title, description, sitemap, robots.txt |
| **Standart Next.js** | 6-7/10 | SSG, metadata API, next/image, next/font |
| **İleri Düzey** | 8-9/10 | JSON-LD, Entity SEO, Local SEO, Topic Cluster, IndexNow |
| **Mevcut Planımız** | 9.5/10 | + GEO, Programmatic SEO, CRO, Build-time Audit, Otomatik İç Linkleme |
| **10+ Seviye (2026)** | 10+/10 | + Entity Salience, Content Knowledge Graph, AI Citations, Advanced Schema Nesting, Semantic Clustering, Passage Ranking, Featured Snippets, Speakable, Wikidata, CrUX Perfect, Schema Pipeline, Predictive SEO, Search Console API |

---

## 76. 2026 SEO Competitive Advantages — Rakiplerden Ayrışan Teknikler

### Kozcuoğlu Nakliyat SEO Stack (2026)

```
┌──────────────────────────────────────────────────┐
│  LAYER 1: Entity-Based Foundation              │
│  - Organization @id: #organization             │
│  - Knowledge Graph: 50+ entity connections     │
│  - Wikidata integration                        │
├──────────────────────────────────────────────────┤
│  LAYER 2: Content Clusters                     │
│  - 3 Pillar pages                              │
│  - 25+ Cluster articles                        │
│  - Semantic internal linking                   │
├──────────────────────────────────────────────────┤
│  LAYER 3: Advanced Schema                      │
│  - 15 schema types                             │
│  - Multi-layer nesting (@graph)                │
│  - Dynamic generation + validation             │
├──────────────────────────────────────────────────┤
│  LAYER 4: AI Optimization                      │
│  - Citation-worthy content                     │
│  - Entity salience optimization                │
│  - GEO (llms.txt + llms-full.txt)              │
│  - Speakable schema                            │
├──────────────────────────────────────────────────┤
│  LAYER 5: Performance Excellence               │
│  - LCP < 1.2s, INP < 50ms, CLS < 0.01          │
│  - CrUX Perfect Score                          │
│  - Brotli + HTTP/3                             │
├──────────────────────────────────────────────────┤
│  LAYER 6: Automation & Monitoring              │
│  - Build-time SEO validation                   │
│  - Search Console API integration              │
│  - Automated schema testing                    │
│  - Competitor gap analysis                     │
└──────────────────────────────────────────────────┘
```

### Rakip Karşılaştırması (Türkiye Nakliyat Sektörü)

| Teknik | Rakip Ortalama | Kozcuoğlu |
|---|---|---|
| **Entity-Based SEO** | ❌ Yok | ✅ Full implementation |
| **Knowledge Graph** | ❌ Yok | ✅ 50+ entity connections |
| **Content Clusters** | ❌ Yok | ✅ 3 pillar + 25 cluster |
| **Advanced Schema** | 1-3 tip | ✅ 15 tip + nesting |
| **AI Optimization** | ❌ Yok | ✅ GEO + Citations |
| **Passage Ranking** | ❌ Yok | ✅ Optimized sections |
| **Featured Snippets** | Rastgele | ✅ Targeted strategy |
| **Entity Salience** | ❌ Yok | ✅ NLP-optimized |
| **CWV Perfect** | 40-60 PSI | ✅ 90+ PSI hedef |
| **Automation** | Manuel | ✅ Build-time validation |

### Competitive Moat (Rakiplerin Kopyalayamayacağı)

1. **Entity Knowledge Graph:** 6-12 ay sürer, teknik bilgi gerekir
2. **Content Cluster Architecture:** Strateji + içerik üretimi 3-6 ay
3. **Advanced Schema Nesting:** Developer expertise + sürekli bakım
4. **AI Citation Strategy:** Orijinal data/research gerekir
5. **Automation Pipeline:** Custom tooling + CI/CD entegrasyonu

> **Sonuç:** 10+ seviyesinde Türkiye'de nakliyat sektöründe rakip yok. Bu seviyeye ulaşmak 12-18 ay sürer ve sürekli optimizasyon gerektirir. Hatta çoğu sektörde bu seviyede SEO altyapısı olan site sayısı bir elin parmaklarını geçmez. **2026'da Google'da 1. sıra garantisi için bu teknikler zorunlu hale gelecek.**
