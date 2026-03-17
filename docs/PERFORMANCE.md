# Kozcuoğlu Nakliyat — PSI %100 Performans Stratejisi

## Hedef

- **PageSpeed Insights Mobil:** %100
- **PageSpeed Insights Masaüstü:** %100
- **Lighthouse Skoru:** Performance 100, Accessibility 100, Best Practices 100, SEO 100

## Core Web Vitals Hedefleri

| Metrik | Hedef | Açıklama |
|---|---|---|
| **LCP** | < 1.2s | Largest Contentful Paint — En büyük içerik yükleme süresi |
| **FID / INP** | < 100ms | First Input Delay / Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift — Görsel kayma |
| **TTFB** | < 200ms | Time to First Byte — İlk byte süresi |
| **FCP** | < 1.0s | First Contentful Paint — İlk içerik boyama |
| **Speed Index** | < 1.5s | Sayfa yükleme hız endeksi |
| **TBT** | < 150ms | Total Blocking Time — Toplam engelleme süresi |

## Görsel Optimizasyonu

### next/image Kullanımı
- Tüm görseller `<Image>` bileşeni ile
- Otomatik WebP/AVIF dönüşümü
- Responsive `sizes` attribute
- Lazy loading (varsayılan)
- Hero görselde `priority={true}` ve `fetchPriority="high"`
- Placeholder: `blur` (LQIP — Low Quality Image Placeholder)
- Boyut belirtme zorunlu (width + height) → CLS önleme

### Görsel Formatları
| Format | Kullanım |
|---|---|
| WebP | Fotoğraflar, arka planlar |
| SVG | Logo, ikonlar |
| PNG | Şeffaf arka planlı görseller |
| ICO | Favicon |

### Görsel Boyutları
- Hero: max 1920x800, < 200KB
- Kart görselleri: max 600x400, < 80KB
- Blog kapak: max 1200x630, < 150KB
- Thumbnail: max 300x200, < 30KB

## Font Optimizasyonu

### next/font Kullanımı
```tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})
```

### Font Kuralları
- Self-hosted (Google CDN'den değil, next/font ile)
- `font-display: swap` → FOIT önleme
- Sadece kullanılan weight'ler: 400, 600, 700
- Sadece gerekli subset: latin, latin-ext
- Preload otomatik (next/font sağlar)

## JavaScript Optimizasyonu

### Kod Bölme (Code Splitting)
- Next.js otomatik sayfa bazlı code splitting
- Dynamic import ile büyük bileşenler lazy load
- Fiyat hesaplama modülü → `dynamic(() => import(...))`
- Framer Motion → Sadece kullanılan sayfada yüklenir

### 3. Parti Script Yönetimi
| Script | Yükleme Stratejisi |
|---|---|
| Google Analytics 4 | `afterInteractive` + lazy |
| Google Tag Manager | `afterInteractive` |
| Tawk.to | `lazyOnload` |
| Microsoft Clarity | `lazyOnload` |

```tsx
import Script from 'next/script'

<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="afterInteractive"
/>

<Script
  src="https://embed.tawk.to/WIDGET_ID/default"
  strategy="lazyOnload"
/>
```

### Bundle Analizi
- `@next/bundle-analyzer` ile bundle boyutu takibi
- Tree shaking aktif (ES modules)
- Kullanılmayan kod yok

## CSS Optimizasyonu

### TailwindCSS Purge
- Kullanılmayan CSS sınıfları otomatik kaldırılır
- Üretim build'de minimal CSS çıktısı
- Critical CSS inline olarak eklenir

### CSS Kuralları
- Inline style kullanma → TailwindCSS class kullan
- `@apply` minimum kullan
- Animasyonlar `transform` ve `opacity` ile (GPU hızlandırma)
- `will-change` sadece gerektiğinde

## Resource Hints

```html
<!-- 3. parti scriptler için dns-prefetch -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.clarity.ms" />

<!-- Hero görsel için preload -->
<link rel="preload" as="image" href="/images/hero.webp" />
```

> **Not:** `next/font` ile self-hosted font kullanıldığı için `fonts.googleapis.com` preconnect'e gerek yoktur. Fontlar build sırasında lokal olarak sunulur.

## Sunucu Tarafı Optimizasyon

### Static Generation (SSG)
- Tüm sayfalar build zamanında statik HTML
- ISR (Incremental Static Regeneration) blog yazıları için
- API route'lar sadece admin ve form işlemleri için

### Cache Headers
```
# Statik dosyalar (görseller, fontlar, JS, CSS)
Cache-Control: public, max-age=31536000, immutable

# HTML sayfalar
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

### Sıkıştırma
- Gzip veya Brotli sıkıştırma (sunucu tarafı)
- Next.js otomatik sıkıştırma (Vercel'de)
- cPanel'de .htaccess ile Gzip aktif

## Security Headers (Performansa Etkisi)

```js
// next.config.js headers
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
      ],
    },
  ]
}
```

## Lighthouse Kontrol Listesi

### Performance (100)
- [x] LCP < 2.5s (hedef < 1.2s)
- [x] FID < 100ms
- [x] CLS < 0.1
- [x] TBT < 200ms (hedef < 150ms)
- [x] Görseller optimize
- [x] Fontlar optimize
- [x] JS minimize ve code split
- [x] CSS minimize ve purge
- [x] 3. parti scriptler lazy load
- [x] Cache headers doğru

### Accessibility (100)
- [x] ARIA labels
- [x] Alt text tüm görsellerde
- [x] Keyboard navigation
- [x] Color contrast WCAG AA
- [x] Focus states görünür
- [x] Skip to content link
- [x] Semantic HTML

### Best Practices (100)
- [x] HTTPS
- [x] Security headers
- [x] Console error yok
- [x] Deprecated API kullanımı yok
- [x] Görsel aspect ratio doğru

### SEO (100)
- [x] Title tag
- [x] Meta description
- [x] Canonical URL
- [x] Robots.txt
- [x] Sitemap.xml
- [x] Structured data
- [x] Mobile-friendly
- [x] Crawlable links
