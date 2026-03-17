# Kozcuoğlu Nakliyat — PWA Yapılandırması

## Genel Bilgi

- **Amaç:** Web sitesini mobil uygulama gibi kullanılabilir hale getirmek
- **Teknoloji:** next-pwa
- **Offline Destek:** Temel sayfalar çevrimdışı çalışır
- **Kurulabilir:** Ana ekrana eklenebilir (Add to Home Screen)

## manifest.json

```json
{
  "name": "Kozcuoğlu Nakliyat",
  "short_name": "Kozcuoğlu",
  "description": "Evden Eve Nakliyat, Ofis Taşıma, Ev Taşıma Hizmetleri",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#122032",
  "orientation": "portrait",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## Service Worker Stratejisi

### Cache Stratejileri

| Kaynak Tipi | Strateji | Açıklama |
|---|---|---|
| HTML Sayfaları | NetworkFirst | Önce ağ, başarısızsa cache |
| CSS/JS | StaleWhileRevalidate | Cache'den göster, arka planda güncelle |
| Görseller | CacheFirst | Cache'den göster, yoksa ağdan al |
| Fontlar | CacheFirst | Cache'den göster, uzun süre sakla |
| API Çağrıları | NetworkFirst | Önce ağ, başarısızsa cache |

### Offline Sayfalar

Çevrimdışı erişilebilir sayfalar:
- Ana Sayfa `/`
- Hizmetlerimiz `/hizmetlerimiz`
- Eşya Depolama `/esya-depolama`
- Çözümlerimiz `/cozumlerimiz`
- Fiyatlarımız `/fiyatlarimiz`
- Hizmet Bölgeleri `/hizmet-bolgeleri`
- Hakkımızda `/hakkimizda`
- İletişim `/iletisim`
- Offline Fallback sayfası (internet yoksa gösterilecek özel sayfa)

### Offline Fallback Sayfası Tasarımı (`/offline`)
- **Dosya:** `src/app/offline/page.tsx` (build sırasında precache edilir)
- **Tasarım:**
  - Firma logosu (SVG, cache'den)
  - Başlık: "İnternet Bağlantısı Yok"
  - Açıklama: "Şu anda çevrimdışısınız. Lütfen internet bağlantınızı kontrol edin."
  - İkonlar: WiFi-off ikonu (Lucide)
  - Butonlar: "Tekrar Dene" (`window.location.reload()`) + "Bizi Arayın" (`tel:4447436`)
  - Arka plan: Açık gri (#f8f9fa), merkezi hizalı, minimal tasarım
  - NAP bilgileri: Telefon + WhatsApp (çevrimdışı da aranabilir)
- **Cache:** `next-pwa` ile `offlineFallback` olarak tanımlanır

> **Not:** Hizmet alt sayfaları (`/[slug]`) ve çözüm alt sayfaları (`/[slug]`) root'ta yer alır. Runtime cache stratejisi ile çevrimdışı erişilebilir olur.

## next-pwa Konfigürasyonu

```js
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/kozcuoglunakliyat\.com\.tr\/.*$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 gün
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 gün
        },
      },
    },
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 gün
        },
      },
    },
    {
      urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'font-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 yıl
        },
      },
    },
  ],
})
```

## PWA Özellikleri

### Ana Ekrana Ekleme (Install Prompt)
- Kullanıcı siteyi 2. ziyaretinde install prompt gösterilir
- Custom install banner tasarımı
- iOS için meta tag desteği

### Splash Screen
- Uygulama açılırken gösterilecek logo + arka plan
- background_color: #ffffff
- Logo: Kozcuoğlu Nakliyat logosu

### Push Notification (İleride)
- Kampanya bildirimleri
- Taşıma hatırlatmaları
- Yeni blog yazısı bildirimi

## iOS Desteği (Meta Tags)

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Kozcuoğlu" />
<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
```
