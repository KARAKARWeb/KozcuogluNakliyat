# Kozcuoğlu Nakliyat — Teknoloji Yığını

## Framework & Core

| Teknoloji | Versiyon | Kullanım |
|---|---|---|
| **Next.js** | 14+ | App Router, SSG, ISR |
| **React** | 18+ | UI bileşenleri |
| **TypeScript** | 5+ | Tip güvenliği |
| **Node.js** | 18+ | Runtime |

## Styling & UI

| Teknoloji | Kullanım |
|---|---|
| **TailwindCSS** | Utility-first CSS framework |
| **shadcn/ui** | UI bileşen kütüphanesi |
| **Lucide Icons** | İkon seti |
| **Framer Motion** | Animasyonlar |

## SEO & Meta

| Teknoloji | Kullanım |
|---|---|
| **Next.js Metadata API** | Title, description, OG tags |
| **JSON-LD** | Structured data şemaları |
| **next-sitemap** | Sitemap.xml otomatik oluşturma |

## PWA

| Teknoloji | Kullanım |
|---|---|
| **next-pwa** | Service Worker, offline, install |
| **manifest.json** | PWA yapılandırması |

## Form & E-Posta

| Teknoloji | Kullanım |
|---|---|
| **React Hook Form** | Form yönetimi |
| **Zod** | Şema tabanlı validasyon |
| **Nodemailer** | SMTP e-posta gönderimi |
| **Sonner / react-hot-toast** | Toast bildirimleri (başarı/hata) |

## Admin Panel

| Teknoloji | Kullanım |
|---|---|
| **Next.js API Routes** | Backend API |
| **SQLite / JSON** | Veritabanı (hafif, cPanel uyumlu) |
| **NextAuth.js** | Admin kimlik doğrulama |
| **bcrypt** | Şifre hashleme |
| **TipTap / EditorJS** | Rich Text Editor (blog, hizmet, çözüm, bölge) |

## Performans

| Teknoloji | Kullanım |
|---|---|
| **next/image** | Görsel optimizasyonu |
| **next/font** | Font optimizasyonu |
| **Dynamic Import** | Kod bölme |

## Analytics & CRO

| Teknoloji | Kullanım |
|---|---|
| **Google Analytics 4** | Kullanıcı davranışı (lazy load) |
| **Google Tag Manager** | Event tracking |
| **Microsoft Clarity** | Heatmap, session recording (lazy load) |

## Deployment

| Ortam | Yöntem | Açıklama |
|---|---|---|
| **Vercel** | Direkt deploy | Önerilen. SSR, API routes, ISR tam destek |
| **cPanel (Node.js)** | Node.js App + `next start` | cPanel'de Node.js Selector ile çalıştırma. API routes, NextAuth, form gönderimi çalışır |
| **cPanel (Static)** | `next export` + `.htaccess` | ⚠️ Sadece statik sayfalar. API routes, NextAuth, yorum, form, takip **çalışmaz** |

### cPanel Node.js Deployment Detayı
```
1. cPanel → Setup Node.js App → Node.js 18+ seç
2. Application root: /home/user/kozcuoglu
3. Application URL: kozcuoglunakliyat.com.tr
4. Application startup file: node_modules/.bin/next (veya server.js)
5. npm install → npm run build → npm start
6. .htaccess: Proxy ile Node.js portuna yönlendirme
```

### cPanel Uyumluluk Kuralları
- **Domain bağımsız:** Tüm URL'ler relative path (`/evden-eve-nakliyat`, `/uploads/...`)
- **Hardcoded domain yok:** `settings.json`'dan `site.url` okunur
- **Dosya yolları:** `process.cwd()` + `/data/` ile JSON okuma/yazma
- **Upload klasörü:** `/public/uploads/` (cPanel'de yazma izni gerekli)
- **Environment variables:** `.env.local` dosyası (cPanel'de Node.js App ayarlarından)

## Geliştirici

| Bilgi | Değer |
|---|---|
| **Ajans** | KARAKAR Web Tasarım ve Yazılım Ajansı |
| **Website** | https://karakar.web.tr |
| **Footer Logo (Koyu)** | https://karakar.web.tr/KARAKAR-Web-Logo-2.webp |
| **Footer Logo (Açık)** | https://karakar.web.tr/KARAKAR-Web-Logo-1.webp |

## Paket Yöneticisi

- **pnpm** veya **npm**

## Klasör Yapısı (Planlanan)

```
kozcuoglu/
├── docs/                  # Proje dokümantasyonu (.md dosyaları)
├── public/                # Statik dosyalar (görseller, favicon, manifest)
├── src/
│   ├── app/               # Next.js App Router sayfaları
│   │   ├── (admin)/       # Admin panel route group
│   │   ├── (site)/        # Public site route group
│   │   ├── api/           # API routes
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global stiller
│   ├── components/        # Paylaşılan bileşenler
│   │   ├── ui/            # shadcn/ui bileşenleri
│   │   ├── layout/        # Header (Mega Menü), Mega Footer, Sticky CTA Bar, Sidebar
│   │   ├── global/        # WhatsApp, Telefon, BackToTop, CookieBanner, TrustBadges
│   │   ├── pricing/       # Fiyat hesaplama modülleri
│   │   ├── reviews/       # Yorum sistemi (yıldız, form, liste, AggregateRating)
│   │   ├── toc/           # Table of Contents bileşeni (sidebar + mobil)
│   │   ├── sidebar/       # Sticky Sidebar (TOC, İlgili Sayfalar, CTA, Fiyat Aralığı)
│   │   ├── gallery/       # Resim + Video galerisi (lightbox, grid/masonry/carousel)
│   │   ├── seo/           # JSON-LD, Meta, NAP, Breadcrumbs, InternalLinks bileşenleri
│   │   ├── forms/         # İletişim formu, fiyat hesaplama formu, keşif talep formu
│   │   └── sections/      # Sayfa bölümleri (Hero, Services, Solutions, Gallery, Stats, Clients vb.)
│   ├── lib/               # Yardımcı fonksiyonlar (slug generator, utils)
│   ├── data/              # Statik veri (JSON dosyaları)
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript tipleri
├── next.config.js         # Next.js yapılandırması
├── tailwind.config.ts     # TailwindCSS yapılandırması
├── tsconfig.json          # TypeScript yapılandırması
└── package.json           # Bağımlılıklar
```
