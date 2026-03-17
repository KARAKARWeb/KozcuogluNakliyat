# Kozcuoğlu Nakliyat — CONTEXT (Proje Özet Referansı)

> Bu dosya tüm projenin hızlı referans kaynağıdır. Her oturumda ilk bu dosya okunmalıdır.

## Firma

- **Ad:** Kozcuoğlu Nakliyat
- **Website:** https://kozcuoglunakliyat.com.tr
- **Sektör:** Nakliyat / Taşımacılık
- **Merkez:** Pendik, İstanbul
- **NAP:** Tüm platformlarda tutarlı Name, Address, Phone
- **Schema:** MovingCompany

## Geliştirici

- **Marka:** KARAKAR Web Tasarım ve Yazılım Ajansı
- **Telefon:** +90 545 181 4040
- **E-Posta:** info@karakar.web.tr
- **Website:** https://karakar.web.tr
- **WhatsApp:** https://wa.me/905451814040?text=Merhaba
- **Canlı Destek:** https://tawk.to/karakar

## Hizmetlerimiz (admin'den yönetim)

- Evden Eve Nakliyat, Ofis Taşıma, Ev Taşıma
- Parça Eşya Taşıma, Eşya Depolama, Şehirler Arası Nakliyat

## Çözümlerimiz (admin'den yönetim)

- Asansörlü Nakliyat, Ambalajlama & Paketleme
- Mobilya Montaj/Demontaj, Sigortalı Taşıma

## Teknoloji

- **Framework:** Next.js 14+ (App Router)
- **Styling:** TailwindCSS + shadcn/ui + Lucide Icons
- **Animasyon:** Framer Motion
- **Admin Panel:** Custom (Next.js içinde, JSON dosya tabanlı DB)
- **Rich Text Editor:** TipTap veya EditorJS
- **PWA:** next-pwa
- **Auth:** NextAuth.js + bcrypt
- **Form:** React Hook Form + Zod
- **Analytics:** GA4, GTM, Microsoft Clarity
- **Deployment:** Vercel (önerilen) veya cPanel (Node.js App)

## Renkler

| Kullanım | HEX |
|---|---|
| Zemin | `#ffffff` |
| Kartlar | `#f5f5f5` |
| Butonlar/CTA | `#e3000f` |
| Metin/Koyu | `#122032` |
| Buton Hover | `#c5000d` |

## URL Kuralları

- **Sayfalar:** Trailing slash YOK → `/hakkimizda`
- **Hizmet alt sayfaları:** Root'ta → `/evden-eve-nakliyat` (ön ek yok)
- **Çözüm alt sayfaları:** Root'ta → `/asansorlu-nakliyat` (ön ek yok)
- **Hizmet Bölgeleri:** `.html` uzantılı → `/bostanci-evden-eve-nakliyat.html`
- **Blog Yazıları:** `.html` uzantılı → `/evden-eve-nakliyat-nedir.html`
- **Slug benzersizlik:** Tüm içerik tipleri arasında benzersiz
- **Türkçe karakter yok**, küçük harf, tire ile ayırma

## Sayfa Yapısı

### Statik Sayfalar
| Sayfa | URL |
|---|---|
| Ana Sayfa | `/` |
| Hizmetlerimiz | `/hizmetlerimiz` |
| Eşya Depolama | `/esya-depolama` (bağımsız ana bölüm) |
| Çözümlerimiz | `/cozumlerimiz` |
| Fiyatlarımız | `/fiyatlarimiz` |
| Fiyat Hesaplama | `/nakliyat-fiyat-hesaplama` |
| Hizmet Bölgeleri | `/hizmet-bolgeleri` |
| Hakkımızda | `/hakkimizda` |
| İletişim | `/iletisim` |
| Blog | `/blog` |
| SSS | `/sikca-sorulan-sorular` |
| Referanslar | `/referanslar` |
| Araç Filomuz | `/arac-filomuz` |
| Kampanyalar | `/kampanyalar` |
| Taşıma Takip | `/tasima-takip` (noindex) |
| Galeri | `/galeri` |
| Sözleşmeler | `/sozlesmeler` |
| Referanslarımız | `/referanslarimiz` |
| Taşıma Kontrol Listesi | `/tasima-kontrol-listesi.html` |

### Dinamik Sayfalar
| Sayfa | URL |
|---|---|
| Hizmet Alt Sayfası | `/[slug]` (ön ek yok, root'ta) |
| Çözüm Alt Sayfası | `/[slug]` (ön ek yok, root'ta) |
| İlçe Hizmet Bölgesi | `/[ilce-slug]-evden-eve-nakliyat.html` |
| Şehirler Arası Bölge | `/istanbul-[sehir-slug]-evden-eve-nakliyat.html` |
| Blog Yazısı | `/[slug].html` |
| Sözleşme Alt Sayfası | `/[slug]` (root'ta, ön ek yok) |

### Hukuki Sayfalar
| Sayfa | URL |
|---|---|
| Gizlilik Politikası | `/gizlilik-politikasi` |
| Çerez Politikası | `/cerez-politikasi` |
| KVKK Aydınlatma Metni | `/kvkk-aydinlatma-metni` |
| Kullanım Koşulları | `/kullanim-kosullari` |

### Admin Panel
| Sayfa | URL |
|---|---|
| Dashboard | `/admin/dashboard` |
| Hizmetler | `/admin/services` |
| Çözümler | `/admin/solutions` |
| Hizmet Bölgeleri | `/admin/regions` |
| Blog | `/admin/blog` |
| Yorumlar | `/admin/reviews` |
| Fiyat Modülleri | `/admin/pricing` |
| Sayfalar | `/admin/pages` |
| Mesajlar | `/admin/messages` |
| Ayarlar | `/admin/settings` |
| Keşif Talepleri | `/admin/surveys` |
| Taşıma Takip | `/admin/tracking` |
| Projeler | `/admin/projects` |
| Araç Filosu | `/admin/fleet` |
| Kampanyalar | `/admin/campaigns` |
| Galeri | `/admin/gallery` |
| Sözleşmeler | `/admin/contracts` |
| Referanslarımız | `/admin/clients` |
| Yıldızlama | `/admin/ratings` |
| İç Linkleme | `/admin/internal-links` |
| 301 & 404 Yönetimi | `/admin/redirects` |

## Temel Özellikler

1. **%100 SEO Uyumlu** — SSG, Semantic HTML, JSON-LD, Sitemap, Robots, NAP
2. **PSI %100** — Mobil & Masaüstü hedef
3. **PWA** — Mobil uygulama deneyimi, offline destek
4. **Fiyat Hesaplama** — Admin'den modül ekle/sil, sayfalara ata
5. **Fiyatlarımız** — Popüler fiyat kartları + tümünü gör linkleri
6. **Custom Admin Panel** — Hizmetler, çözümler, bölgeler, blog, yorumlar, fiyat modülleri, ayarlar
7. **Yorum Sistemi** — Yıldızlı, Rich Snippets destekli, admin onaylı
8. **TOC** — Tüm sayfalarda otomatik Table of Contents
9. **Local SEO** — Hizmet bölgeleri ile ilçe/semt hedefleme
10. **NAP Tutarlılığı** — Tüm platformlarda aynı Name, Address, Phone
11. **SEO İçerik Alanı** — Ana sayfa footer üstü, 1500+ kelime, h2-h3, TOC
12. **cPanel Uyumlu** — Domain bağımsız çalışma

## Schema Tipleri

Organization, MovingCompany, Service, BreadcrumbList, FAQPage, Article, WebSite, Review, AggregateRating, HowTo, ItemList, Offer/AggregateOffer, OfferCatalog, PriceSpecification, SiteNavigationElement, Place, ContactPoint, OpeningHoursSpecification, GeoCoordinates, SelfStorage, SoftwareApplication, Vehicle, CreativeWork, VideoObject, CollectionPage, AboutPage, ContactPage, SpeakableSpecification, ImageGallery

## Global Bileşenler

- Header (Mega Menü: Hizmetlerimiz + Çözümlerimiz dropdown)
- Mega Footer (4 katmanlı: CTA bar, 5 kolon ana, bölge tam liste, hukuki+geliştirici)
- WhatsApp Butonu (sabit sağ alt)
- Sticky CTA Bar (mobilde altta: Ara + WhatsApp + Keşif)
- Back to Top Butonu
- Cookie Banner (KVKK)
- Trust Badges (Sigorta, Lisans, 7/24, Deneyim)

## Breadcrumbs

- İlk eleman: **"Kozcuoğlu Nakliyat"** (Ana Sayfa linki) — "Ana Sayfa" değil
- JSON-LD BreadcrumbList şeması ile desteklenir
- Örnek: Kozcuoğlu Nakliyat > Hizmetlerimiz > Evden Eve Nakliyat

## Firma Bilgileri (NAP)

| Bilgi | Değer |
|---|---|
| Firma | Kozcuoğlu Nakliyat |
| Müşteri Hizmetleri | 444 7 436 |
| Telefon | 0216 494 53 37 |
| GSM + WhatsApp | 0532 138 49 79 |
| E-Posta | info@kozcuoglunakliyat.com.tr |
| Adres | Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul |
| Website | https://kozcuoglunakliyat.com.tr |

## GEO (Generative Engine Optimization)

- `/llms.txt` — AI/LLM crawlerlar için site özeti (build sırasında otomatik)
- `/llms-full.txt` — Detaylı site bilgisi (build sırasında otomatik)
- robots.txt'de AI crawlerlar için izin (GPTBot, Google-Extended, PerplexityBot vb.)

## Görsel SEO

- Görseller lokalde tutulur (`/public/uploads/`), CDN yok
- sharp ile WebP dönüşüm, responsive srcset, SEO dosya adı
- Alt text admin panelde zorunlu

## SMTP & Formlar

- Nodemailer ile SMTP e-posta gönderimi
- React Hook Form + Zod validasyon
- Honeypot bot koruması, rate limiting
- Admin'e e-posta + messages.json'a kayıt

## Çerez & KVKK

- Cookie consent banner (Kabul/Ayarlar/Reddet)
- Kategoriler: Zorunlu, Analitik, Pazarlama
- Hukuki sayfalar: Gizlilik, Çerez, KVKK, Kullanım Koşulları

## Admin SEO Ayarları

- Sayfa bazında SEO title, description, OG image, robots, canonical
- Schema tipi seçimi (çoklu), özel JSON-LD ekleme alanı

## Footer Geliştirici

- KARAKAR Web logo (koyu/açık), hover popup
- Link: "web tasarım" anchor text → https://karakar.web.tr

## Ana Sayfa Bölümleri (Sırasıyla)

1. Hero + Trust Badges
2. Kampanya Banner (aktif kampanya varsa)
3. Intro (h2 + paragraf, admin'den düzenlenebilir)
4. Hizmetlerimiz (services.json'dan otomatik grid)
5. Neden Biz (6 avantaj)
6. Fiyat Hesaplama (tab)
7. Süreç (8 adım)
8. Çözümlerimiz (solutions.json'dan otomatik grid)
9. Galeri (gallery.json, admin'den sayı/layout seçimi)
10. Hizmet Bölgeleri (kartlar)
11. İstatistikler (sayaç animasyonu)
12. Referanslarımız (müşteri logoları slider)
13. Yorumlar (slider, yıldızlı, AggregateRating)
14. SSS (accordion)
15. Blog Önizleme (son 3 yazı)
16. CTA Bölümü (WhatsApp + Telefon + Keşif)
17. SEO İçerik Alanı (1500+ kelime, footer üstü)

## Admin Özel Kod Alanları

- **Head Kodu:** `<head>` kapanmadan önce (meta, script, style, doğrulama tagları)
- **Body Başı Kodu:** `<body>` açıldıktan sonra (GTM noscript, chat widget)
- **Footer Kodu:** `</body>` kapanmadan önce (analytics, tracking pixel)

## Tasarım Sistemi

- **Container:** `max-w-[1440px]` (1440px) — detaylı footer, sidebar, galeri için ideal
- **Spacing:** 4px base grid, Tailwind varsayılan scale
- **Tipografi:** Responsive ölçek (mobil/tablet/masaüstü), Inter + JetBrains Mono
- **Vertical Rhythm:** Heading-paragraf arası tutarlı boşluklar
- **Design Tokens:** CSS custom properties (radius, border, shadow, transition)
- **Component Standartları:** Liste, tablo, buton, prose (rich text) için merkezi kurallar
- **Plugin:** @tailwindcss/typography (prose standartları)
- **Sidebar:** Sticky, w-80 (320px), 9 sayfa tipinde (hizmet, çözüm, bölge, blog, depolama, fiyat, SSS, hakkımızda, sözleşme)
- **Footer:** Mega Footer, 4 katmanlı (CTA bar + 5 kolon + bölge tam liste + hukuki+geliştirici)

## Sayfa Sayısı Özeti

| Kategori | Sayı | Detay |
|---|---|---|
| **Public Statik Sayfalar** | 23 | Ana sayfa, hizmetlerimiz, eşya depolama, çözümlerimiz, fiyatlarımız, fiyat hesaplama, hizmet bölgeleri, hakkımızda, iletişim, blog, SSS, referanslar, araç filomuz, kampanyalar, taşıma takip, galeri, sözleşmeler, referanslarımız, taşıma kontrol listesi, gizlilik politikası, çerez politikası, KVKK, kullanım koşulları |
| **Public Dinamik Sayfalar** | 5 tip | Hizmet alt (`/[slug]`), çözüm alt (`/[slug]`), bölge alt (`/*.html`), blog yazısı (`/*.html`), sözleşme alt (`/[slug]`) |
| **Admin Panel Sayfaları** | 22 | Login, dashboard, services, solutions, regions, blog, reviews, pricing, pages, messages, settings, surveys, tracking, projects, fleet, campaigns, gallery, contracts, clients, ratings, internal-links, redirects |
| **Sistem Sayfaları** | 7 | 404, sitemap.xml, robots.txt, manifest.json, llms.txt, llms-full.txt, offline |

## Veritabanı (JSON Dosyaları)

settings.json, services.json, solutions.json, blog-posts.json, regions.json, reviews.json, pricing-modules.json, pages.json, messages.json, users.json, survey-requests.json, tracking.json, projects.json, fleet.json, campaigns.json, gallery.json, contracts.json, clients.json, ratings.json, internal-links.json, redirects.json, 404-logs.json, notifications.json, activity-logs.json

## Docs Dosyaları

| Dosya | İçerik |
|---|---|
| `CONTEXT.md` | Bu dosya — Proje özet referansı |
| `PROJECT.md` | Proje genel bilgileri |
| `TECH-STACK.md` | Teknoloji yığını, klasör yapısı |
| `SEO.md` | SEO stratejisi, NAP, Rich Snippets, event tracking |
| `DESIGN.md` | Tasarım, renkler, UI kuralları, bileşen stilleri |
| `PAGES.md` | Sayfa yapısı, URL'ler, yorum sistemi, bölümler |
| `PRICING-MODULE.md` | Fiyat hesaplama modülü, fiyatlarımız entegrasyonu |
| `ADMIN-PANEL.md` | Admin panel yapısı (22 bölüm, gruplandırılmış sidebar) |
| `PWA.md` | PWA yapılandırması |
| `PERFORMANCE.md` | PSI %100 stratejisi |
| `STRUCTURED-DATA.md` | JSON-LD şemaları (24+ şema tipi) |
| `STEP-PLAN.md` | Proje geliştirme planı (10 faz, adım adım) |

## Sistem Dosyaları

`/sitemap.xml`, `/robots.txt`, `/manifest.json`, `/llms.txt`, `/llms-full.txt`
