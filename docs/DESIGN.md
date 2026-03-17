# Kozcuoğlu Nakliyat — Tasarım & UI Kuralları

## Renk Paleti

| Kullanım | Renk | HEX | Tailwind Adı |
|---|---|---|---|
| Zemin / Arka plan | Beyaz | `#ffffff` | `bg-white` |
| Kartlar / Bölümler | Açık Gri | `#f5f5f5` | `bg-gray-100` |
| Butonlar / CTA | Kırmızı | `#e3000f` | `bg-primary` |
| Metin / Koyu Alan | Lacivert | `#122032` | `text-foreground` |
| Buton Hover | Koyu Kırmızı | `#c5000d` | `hover:bg-primary/90` |
| Buton Text | Beyaz | `#ffffff` | `text-white` |
| Border / Ayırıcı | Açık Gri | `#e5e5e5` | `border-gray-200` |
| Muted Text | Gri | `#6b7280` | `text-muted-foreground` |

## Tailwind CSS Renk Konfigürasyonu

```ts
// tailwind.config.ts içinde
colors: {
  primary: {
    DEFAULT: '#e3000f',
    hover: '#c5000d',
    light: '#fef2f2',
  },
  dark: {
    DEFAULT: '#122032',
    light: '#1a2d45',
  },
}
```

## Tipografi & Vertical Rhythm

### Font Ailesi
- **Primary:** Inter (Google Fonts, `next/font` ile self-hosted, swap)
- **Monospace:** JetBrains Mono (kod blokları, admin code editor)

### Tipografi Ölçeği (Responsive)

| Token | Mobil (< 768px) | Tablet (768-1024px) | Masaüstü (> 1024px) | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| `h1` | 1.875rem (30px) | 2.25rem (36px) | 2.5rem (40px) | 700 | 1.2 | -0.02em |
| `h2` | 1.5rem (24px) | 1.75rem (28px) | 2rem (32px) | 700 | 1.25 | -0.01em |
| `h3` | 1.25rem (20px) | 1.375rem (22px) | 1.5rem (24px) | 600 | 1.3 | 0 |
| `h4` | 1.125rem (18px) | 1.125rem (18px) | 1.25rem (20px) | 600 | 1.35 | 0 |
| `h5` | 1rem (16px) | 1rem (16px) | 1.125rem (18px) | 600 | 1.4 | 0 |
| `h6` | 0.875rem (14px) | 0.875rem (14px) | 1rem (16px) | 600 | 1.4 | 0 |
| `body` | 1rem (16px) | 1rem (16px) | 1rem (16px) | 400 | 1.6 | 0 |
| `body-lg` | 1.125rem (18px) | 1.125rem (18px) | 1.125rem (18px) | 400 | 1.7 | 0 |
| `small` | 0.875rem (14px) | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 | 0 |
| `xs` | 0.75rem (12px) | 0.75rem (12px) | 0.75rem (12px) | 400 | 1.5 | 0 |

### Tailwind Tipografi Konfigürasyonu

```ts
// tailwind.config.ts
fontSize: {
  'xs':     ['0.75rem',   { lineHeight: '1.5' }],
  'sm':     ['0.875rem',  { lineHeight: '1.5' }],
  'base':   ['1rem',      { lineHeight: '1.6' }],
  'lg':     ['1.125rem',  { lineHeight: '1.7' }],
  'xl':     ['1.25rem',   { lineHeight: '1.35' }],
  '2xl':    ['1.5rem',    { lineHeight: '1.3' }],
  '3xl':    ['1.875rem',  { lineHeight: '1.25' }],
  '4xl':    ['2.25rem',   { lineHeight: '1.2' }],
  '5xl':    ['2.5rem',    { lineHeight: '1.2', letterSpacing: '-0.02em' }],
},
```

### Vertical Rhythm — Heading ↔ Paragraf Boşlukları

Heading ve paragraf arasında tutarlı dikey ritim:

| Senaryo | Boşluk | Tailwind |
|---|---|---|
| h1 sonrası paragraf | 16px (1rem) | `mb-4` |
| h2 sonrası paragraf | 12px (0.75rem) | `mb-3` |
| h3 sonrası paragraf | 8px (0.5rem) | `mb-2` |
| h4-h6 sonrası paragraf | 8px (0.5rem) | `mb-2` |
| Paragraf sonrası paragraf | 16px (1rem) | `mb-4` |
| Paragraf sonrası heading | 32px (2rem) | `mt-8` |
| Section sonrası section | 48px (3rem) | `mt-12` |
| Liste sonrası paragraf | 16px (1rem) | `mb-4` |

> **Kural:** Heading'ler yukarıdan daha fazla, aşağıdan daha az boşluk alır. Bu, heading'in kendisinden sonraki içeriğe ait olduğunu görsel olarak belirtir.

## Tasarım Prensipleri

1. **Modern & Premium** — Lüks hissiyat, ince detaylar, micro-interactions
2. **Güven Verici** — Açık renkler, temiz düzen, bol whitespace, profesyonel tipografi
3. **Minimal Elegance** — Gereksiz süsleme yok, içerik odaklı, her piksel anlamlı
4. **Mobile-First** — Önce mobil, sonra masaüstü, PWA deneyimi
5. **Erişilebilir** — WCAG AA standardı, kontrast oranları, focus visible
6. **Performans Odaklı** — PSI %100 hedefi, her animasyon GPU-accelerated
7. **Tutarlı** — Design token sistemi, her bileşen aynı dili konuşur

## Bileşen Stilleri

### Butonlar
- **Primary:** bg-primary text-white, rounded-lg, px-6 py-3
- **Secondary:** bg-dark text-white, rounded-lg, px-6 py-3
- **Outline:** border-primary text-primary, rounded-lg, px-6 py-3
- **Ghost:** text-primary hover:bg-primary/10, rounded-lg
- **Hover:** scale(1.02) + renk koyulaşma
- **Transition:** all 200ms ease

### Kartlar
- bg-[#f5f5f5] rounded-xl p-6
- Hover: shadow-lg + translateY(-2px)
- Transition: all 300ms ease

### Input / Form Alanları
- border border-gray-200 rounded-lg px-4 py-3
- Focus: ring-2 ring-primary/20 border-primary
- Placeholder: text-gray-400

### Header
- Sticky top-0, bg-white/95 backdrop-blur, shadow-sm
- Logo sol, navigasyon orta, CTA buton sağ
- Mobilde hamburger menü

### Footer (Mega Footer — Detaylı & Deneyimsel)

Footer, sitenin en zengin ve bilgi yoğun bölümüdür. Kullanıcıya tüm navigasyonu sunar.

#### Footer Yapısı (Üstten Alta)

**1. Footer Üst — CTA Bar**
- bg-primary text-white py-8
- "Hemen Teklif Alın" başlığı + "Ücretsiz Keşif" + "Bizi Arayın" butonları
- Tam genişlik, ortalanmış

**2. Footer Ana — 5 Kolon (Masaüstü)**
- bg-[#122032] text-white py-16
- Container: max-w-7xl

| Kolon | İçerik |
|---|---|
| **1. Firma** | Logo, kısa tanıtım (2 cümle), sosyal medya ikonları (Facebook, Instagram, YouTube, LinkedIn), Google Business yıldız puanı |
| **2. Hizmetlerimiz** | `services.json`'dan otomatik: Evden Eve Nakliyat, Ofis Taşıma, Ev Taşıma, Parça Eşya, Şehirler Arası, Eşya Depolama |
| **3. Çözümlerimiz** | `solutions.json`'dan otomatik: Asansörlü Nakliyat, Ambalajlama, Montaj/Demontaj, Sigortalı Taşıma |
| **4. Hizmet Bölgeleri** | `regions.json`'dan otomatik: Tüm ilçe ve şehirler arası sayfalar listelenir. Çok fazlaysa ilk 15 + "Tümünü Gör" linki |
| **5. İletişim** | Adres (ikon + metin), Telefon: 444 7 436, Sabit: 0216 494 53 37, WhatsApp: 0532 138 49 79, E-posta, Çalışma saatleri |

- Mobilde: 1 kolon (accordion tarzı açılır/kapanır başlıklar)
- Tablet: 2 kolon
- Masaüstü: 5 kolon

**3. Footer Orta — Hizmet Bölgeleri Tam Liste**
- bg-[#0d1825] text-gray-400 py-8
- Başlık: "Hizmet Verdiğimiz Bölgeler" (text-sm font-semibold text-white)
- `regions.json`'dan TÜM bölge sayfaları listelenir (ilçe + şehirler arası)
- Layout: 4-6 kolon grid (masaüstü), 2 kolon (tablet), 1 kolon (mobil)
- Her link: text-xs text-gray-400 hover:text-white transition
- Admin panelden "footer'da göster/gizle" toggle'ı ile kontrol

**4. Footer Alt — Hukuki & Geliştirici**
- bg-[#0a1420] text-gray-500 py-4
- Sol: `© 2026 Kozcuoğlu Nakliyat. Tüm hakları saklıdır.`
- Orta: Gizlilik Politikası | Çerez Politikası | KVKK | Kullanım Koşulları | Sözleşmeler
- Sağ: KARAKAR Web logo + popup

### Footer Geliştirici Bileşeni (Sağ Alt)
- **Logo:** `<img src="https://karakar.web.tr/KARAKAR-Web-Logo-2.webp" alt="KARAKAR Web" />` (koyu footer)
- **Link:** `<a href="https://karakar.web.tr" title="web tasarım" rel="noopener">web tasarım</a>`
- **Hover Popup (Tooltip):**
  - Framer Motion: scale(0.95→1) + opacity(0→1) animasyonu
  - bg-white text-dark rounded-xl shadow-2xl p-4, max-w-xs
  - Başlık: **"KARAKAR Web Tasarım ve Yazılım Ajansı"** (font-semibold text-sm)
  - Alt metin: *"Bu Proje "Kozcuoğlu Nakliyat" için özel ve özenle tasarlanmıştır."* (text-xs text-muted)
  - Üçgen ok (arrow) popup'ın altında
  - Popup yukarı doğru açılır (bottom-full)
- **Konum:** Footer bottom bar, `flex justify-between items-center`
  - Sol: `© 2026 Kozcuoğlu Nakliyat. Tüm hakları saklıdır.`
  - Sağ: KARAKAR Web logo + popup

### WhatsApp Butonu
- Sabit sağ alt köşe (fixed bottom-6 right-6)
- Yeşil (#25D366) yuvarlak buton
- Pulse animasyonu
- Tüm sayfalarda görünür
- Mobilde sticky CTA bar varken sağa kaydırılır

### Sticky CTA Bar (Mobil)
- Mobilde altta sabit bar (fixed bottom-0)
- bg-primary text-white
- İki buton: "Ara" (telefon ikonu) + "WhatsApp" (mesaj ikonu)
- 50/50 genişlik, aralarında border
- Sadece mobilde görünür (lg:hidden)
- Scroll'da görünür, sayfanın en üstündeyken gizli

### Back to Top Butonu
- Sabit sağ alt (fixed bottom-20 right-6, WhatsApp'ın üstünde)
- bg-dark/80 text-white, rounded-full, 40x40px
- ChevronUp ikonu
- 300px scroll sonrası görünür
- Smooth scroll ile en üste çıkar
- Mobilde sticky CTA bar varken gizlenir

### Cookie Consent Banner (KVKK/GDPR)
- Sayfanın altında sabit panel (fixed bottom-0, full width)
- bg-white border-t shadow-2xl rounded-t-2xl (masaüstü: max-w-lg, sağ alt köşe)
- Framer Motion: slide-up animasyonu (initial: y: 100, animate: y: 0)
- **Başlık:** "Çerez Tercihleriniz" (font-semibold)
- **Açıklama:** Kısa metin + Çerez Politikası linki
- **Butonlar:** "Tümünü Kabul Et" (primary) + "Ayarlar" (outline) + "Reddet" (ghost)
- **Ayarlar paneli:** Accordion ile kategori seçimi:
  - Zorunlu Çerezler (her zaman aktif, toggle disabled)
  - Analitik Çerezler (GA4, Clarity) — toggle
  - Pazarlama Çerezler (GTM) — toggle
- Tercih `localStorage`'da saklanır (`cookie-consent` key)
- Kabul edilmeden analitik/pazarlama scriptleri **yüklenmez**
- 30 gün sonra tekrar sorulur
- Gizlilik Politikası + Çerez Politikası linkleri

### Trust Badges
- Hero bölümünde veya hemen altında
- Yatay sıralı rozetler: Sigortalı Taşıma, Lisanslı Firma, 7/24 Destek, 15+ Yıl Deneyim
- İkon + kısa metin
- bg-white border rounded-lg p-3
- Mobilde 2x2 grid, masaüstünde 4'lü sıra

### Mega Menü (Header)
- Hizmetlerimiz hover → dropdown açılır
- Çözümlerimiz hover → dropdown açılır
- bg-white shadow-xl rounded-b-xl
- Sol: hizmet/çözüm linkleri listesi
- Sağ: öne çıkan hizmet kartı (görsel + CTA)
- Mobilde accordion tarzı açılır

### Yorum Bileşeni (Review)
- Yorum kartı: bg-[#f5f5f5] rounded-xl p-6
- Yıldızlar: sarı (#fbbf24), 5 yıldız ikonu
- Müşteri adı: font-semibold text-dark
- Yorum metni: text-muted-foreground
- Tarih: text-sm text-gray-400
- Slider: Ana sayfada carousel, alt sayfalarda liste
- Yorum formu: yıldız seçimi (tıklanabilir) + ad + yorum textarea + gönder butonu

### Fiyat Kartları (Fiyatlarımız Sayfası)
- Kart: bg-white border rounded-xl p-6 shadow-sm
- Üst: hizmet adı (font-semibold)
- Orta: fiyat aralığı (text-2xl font-bold text-primary)
- Alt: "Detaylı Bilgi" butonu
- Hover: shadow-lg + border-primary
- Popüler kart: border-primary, "Popüler" badge

### İstatistik Sayaçları
- bg-primary text-white py-16
- 4 kolon grid (mobilde 2x2)
- Sayı: text-4xl font-bold (sayaç animasyonu ile yukarı sayar)
- Açıklama: text-sm
- Örnek: 1000+ Taşıma, 15+ Yıl, 50+ Araç, %100 Memnuniyet

### SEO İçerik Alanı (Footer Üstü)
- bg-white py-16
- Container: max-w-[1440px]
- Masaüstü: 2 kolon layout (prose + sidebar TOC)
- Mobil: tek kolon
- Başlık: h2 text-dark
- Alt başlıklar: h3 text-dark
- Paragraflar: text-muted-foreground, line-height: 1.8
- Internal linkler: text-primary underline

## Spacing Token Sistemi (4px Base Grid)

Tüm boşluklar 4px'in katları üzerine kuruludur. Tailwind'in varsayılan spacing scale'i kullanılır:

### Spacing Scale

| Token | Değer | Tailwind | Kullanım |
|---|---|---|---|
| `--space-0.5` | 2px | `p-0.5` | Micro boşluk (ikon-metin arası) |
| `--space-1` | 4px | `p-1` | Minimum boşluk |
| `--space-1.5` | 6px | `p-1.5` | Küçük iç boşluk |
| `--space-2` | 8px | `p-2` | Kompakt iç boşluk |
| `--space-3` | 12px | `p-3` | Küçük padding |
| `--space-4` | 16px | `p-4` | Standart padding |
| `--space-5` | 20px | `p-5` | Orta padding |
| `--space-6` | 24px | `p-6` | Kart iç boşluğu |
| `--space-8` | 32px | `p-8` | Geniş padding |
| `--space-10` | 40px | `p-10` | Section iç boşluğu |
| `--space-12` | 48px | `p-12` | Section arası boşluk |
| `--space-16` | 64px | `p-16` | Mobil section padding |
| `--space-20` | 80px | `p-20` | Orta section padding |
| `--space-24` | 96px | `p-24` | Masaüstü section padding |

### Design Tokens (CSS Custom Properties)

```css
/* globals.css */
:root {
  /* Spacing */
  --radius-sm: 0.375rem;   /* 6px — badge, tag */
  --radius-md: 0.5rem;     /* 8px — input, small card */
  --radius-lg: 0.75rem;    /* 12px — buton, kart */
  --radius-xl: 1rem;       /* 16px — büyük kart, modal */
  --radius-2xl: 1.5rem;    /* 24px — hero kart */
  --radius-full: 9999px;   /* Yuvarlak — avatar, badge */

  /* Border */
  --border-width: 1px;
  --border-color: #e5e5e5;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.1);

  /* Transition */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### Tailwind Extend Konfigürasyonu

```ts
// tailwind.config.ts
extend: {
  borderRadius: {
    'sm': '0.375rem',
    'md': '0.5rem',
    'lg': '0.75rem',
    'xl': '1rem',
    '2xl': '1.5rem',
  },
  spacing: {
    '18': '4.5rem',
    '22': '5.5rem',
  },
}
```

### Site Genişliği Kararı

> **Soru:** Site genişliğini ne düşünüyorsun? Çok detaylı ve deneyimsel çünkü.

**Karar: `max-w-[1440px]` (1440px)**

| Seçenek | Genişlik | Neden? |
|---|---|---|
| ~~max-w-7xl~~ | 1280px | Standart blog/kurumsal siteler için yeterli ama nakliyat gibi çok içerikli siteler için dar |
| **max-w-[1440px]** ✅ | 1440px | **Seçilen.** Detaylı footer, sidebar, galeri, bölge listeleri için ideal. Mega footer'da 5 kolon rahat sığar. Sidebar + içerik alanı rahat nefes alır |
| max-w-[1600px] | 1600px | Çok geniş, 1080p monitörlerde kenarlar boş kalır |

**Uygulama:**
- **Ana container:** `max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8`
- **Hero:** Full-width (container dışı, arka plan tam genişlik)
- **Footer:** Full-width (arka plan tam genişlik, içerik 1440px container)
- **İstatistikler:** Full-width (arka plan tam genişlik)
- **Sidebar'lı sayfalar:** Container içinde `grid grid-cols-1 lg:grid-cols-[1fr_320px]` (içerik + sidebar)

### Layout Spacing Kuralları

| Alan | Mobil | Tablet | Masaüstü | Tailwind |
|---|---|---|---|---|
| Section padding (dikey) | 64px | 80px | 96px | `py-16 md:py-20 lg:py-24` |
| Container max-width | 100% | 100% | 1440px | `max-w-[1440px]` |
| Container padding (yatay) | 16px | 24px | 32px | `px-4 md:px-6 lg:px-8` |
| Kart grid gap | 16px | 24px | 32px | `gap-4 md:gap-6 lg:gap-8` |
| Kart iç boşluk | 20px | 24px | 24px | `p-5 md:p-6` |
| Hero padding (dikey) | 80px | 96px | 120px | `py-20 md:py-24 lg:py-30` |
| Sidebar genişlik | — | — | 320px | `w-80` |
| Sidebar gap | — | — | 32px | `gap-8` |

## Sidebar (Sticky — Gelişmiş Plan)

### Sidebar Kullanılacak Sayfalar

| Sayfa Tipi | Sidebar İçeriği |
|---|---|
| **Hizmet Alt Sayfaları** | TOC + İlgili Hizmetler + Fiyat Hesaplama CTA + Keşif CTA |
| **Çözüm Alt Sayfaları** | TOC + İlgili Çözümler + Keşif CTA |
| **Hizmet Bölgeleri** | TOC + Komşu Bölgeler + Bölge Fiyat Aralığı + Keşif CTA |
| **Blog Yazıları** | TOC + İlgili Yazılar + Popüler Yazılar + Kategoriler |
| **Eşya Depolama** | TOC + Birim Fiyatları + Keşif CTA |
| **Fiyatlarımız** | TOC + Fiyat Hesaplama CTA |
| **SSS** | TOC (kategori bazlı) |
| **Hakkımızda** | TOC + İletişim Bilgileri |
| **Sözleşme Alt** | TOC + PDF İndir + İlgili Hizmet |

### Sidebar Yapısı (Masaüstü)

```
┌─────────────────────────────────┬──────────────┐
│                                 │   SIDEBAR    │
│         ANA İÇERİK             │              │
│         (flex-1)                │   (w-80)     │
│                                 │   sticky     │
│  Hero                           │   top-24     │
│  TOC (mobilde burada)           │              │
│  İçerik                         │  ┌────────┐  │
│  SSS                            │  │  TOC   │  │
│  Yorumlar                       │  ├────────┤  │
│  CTA                            │  │ İlgili │  │
│                                 │  │Sayfalar│  │
│                                 │  ├────────┤  │
│                                 │  │  CTA   │  │
│                                 │  │ Keşif  │  │
│                                 │  └────────┘  │
└─────────────────────────────────┴──────────────┘
```

### Sidebar Bileşenleri

**1. TOC (İçindekiler)**
- bg-white border border-gray-200 rounded-xl p-4
- Başlık: "İçindekiler" (text-sm font-semibold)
- Linkler: text-sm text-muted-foreground
- Aktif link: text-primary font-medium, border-l-2 border-primary
- Scroll spy ile aktif başlık takibi

**2. İlgili Sayfalar**
- bg-[#f5f5f5] rounded-xl p-4 mt-4
- Başlık: "İlgili Hizmetler" / "Komşu Bölgeler" / "İlgili Yazılar"
- Linkler: text-sm, hover:text-primary
- Max 5-8 link

**3. CTA Kutusu**
- bg-primary text-white rounded-xl p-6 mt-4
- Başlık: "Ücretsiz Keşif Talep Et"
- Kısa açıklama
- "Keşif İste" butonu (bg-white text-primary)
- Telefon numarası

**4. Fiyat Aralığı (Bölge Sayfalarında)**
- bg-white border rounded-xl p-4 mt-4
- "Bu Bölge Fiyat Aralığı"
- ₺X.XXX - ₺XX.XXX
- "Fiyat Hesapla" butonu

### Sidebar Responsive Davranış

| Ekran | Davranış |
|---|---|
| **Mobil (< 768px)** | Sidebar gizli. TOC sayfanın üstünde açılır/kapanır. İlgili sayfalar ve CTA, ana içeriğin altında gösterilir |
| **Tablet (768-1024px)** | Sidebar gizli. TOC sayfanın üstünde. İlgili sayfalar ve CTA, ana içeriğin altında |
| **Masaüstü (> 1024px)** | Sidebar sağda, sticky `top-24`, `max-h-[calc(100vh-6rem)]`, overflow-y-auto |

### Sidebar Sticky Kuralları
- `position: sticky; top: 96px` (header yüksekliği + boşluk)
- `max-height: calc(100vh - 6rem)` (ekran yüksekliği - header)
- `overflow-y: auto` (uzun TOC için scroll)
- Scrollbar gizli (webkit-scrollbar: none)
- Footer'a yaklaşınca sticky biter (intersection observer)

## Component Standartları

### Intro Bileşeni (Hero Altı)
- Container: `max-w-3xl mx-auto text-center`
- h2: `text-2xl md:text-3xl font-bold text-dark mb-3`
- Paragraf: `text-base md:text-lg text-muted-foreground leading-relaxed`
- Section: `py-10 md:py-12 lg:py-16`
- Admin panelden düzenlenebilir (pages.json → homepage.intro)

### Liste Standartları (ul / ol)

| Özellik | Değer | Tailwind |
|---|---|---|
| `list-style-position` | inside | `list-inside` |
| `padding-left` | 0 (inside) / 24px (outside) | `pl-0` / `pl-6` |
| Satır aralığı | 1.6 | `leading-relaxed` |
| Madde arası boşluk | 8px | `space-y-2` |
| Marker rengi | muted (#6b7280) | `marker:text-muted-foreground` |
| Nested liste indent | +24px | `pl-6` |

```html
<!-- Unordered List -->
<ul class="list-disc pl-6 space-y-2 text-base leading-relaxed text-foreground">
  <li>Madde 1</li>
  <li>Madde 2</li>
</ul>

<!-- Ordered List -->
<ol class="list-decimal pl-6 space-y-2 text-base leading-relaxed text-foreground">
  <li>Adım 1</li>
  <li>Adım 2</li>
</ol>
```

### Tablo Standartları

| Özellik | Değer | Tailwind |
|---|---|---|
| `border-collapse` | collapse | Varsayılan |
| Dış çerçeve | 1px solid #e5e5e5 | `border border-gray-200` |
| Hücre padding | 12px 16px | `px-4 py-3` |
| Header bg | #f5f5f5 | `bg-gray-100` |
| Header font | 600, 14px | `font-semibold text-sm` |
| Body font | 400, 16px | `text-base` |
| Satır hover | #fafafa | `hover:bg-gray-50` |
| Zebra stripe | Çift satırlar #fafafa | `even:bg-gray-50` |
| Border (satır arası) | 1px solid #e5e5e5 | `border-b border-gray-200` |
| Responsive | Mobilde yatay scroll | `overflow-x-auto` wrapper |
| Rounded | Dış köşeler yuvarlatılmış | `rounded-lg overflow-hidden` |

```html
<div class="overflow-x-auto rounded-lg border border-gray-200">
  <table class="w-full text-left">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-3 text-sm font-semibold text-dark">Başlık</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-gray-200 hover:bg-gray-50">
        <td class="px-4 py-3 text-base">İçerik</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Buton Standartları (Detaylı)

| Özellik | Primary | Secondary | Outline | Ghost |
|---|---|---|---|---|
| bg | `bg-primary` | `bg-dark` | `bg-transparent` | `bg-transparent` |
| text | `text-white` | `text-white` | `text-primary` | `text-primary` |
| border | — | — | `border border-primary` | — |
| padding | `px-6 py-3` | `px-6 py-3` | `px-6 py-3` | `px-4 py-2` |
| radius | `rounded-lg` | `rounded-lg` | `rounded-lg` | `rounded-lg` |
| font | `text-base font-medium` | `text-base font-medium` | `text-base font-medium` | `text-sm font-medium` |
| line-height | 1.5 | 1.5 | 1.5 | 1.5 |
| min-height | 48px | 48px | 48px | 40px |
| hover | `hover:bg-primary/90` | `hover:bg-dark/90` | `hover:bg-primary/5` | `hover:bg-primary/10` |
| transition | `transition-all duration-200` | `transition-all duration-200` | `transition-all duration-200` | `transition-all duration-200` |
| disabled | `opacity-50 cursor-not-allowed` | aynı | aynı | aynı |

> **Kural:** Butonlarda `line-height: 1.5` + `py-3` ile metin asla sıkışmaz. Minimum yükseklik 48px (mobil dokunma hedefi).

### Prose (Rich Text İçerik) Standartları

Blog yazıları, hizmet detayları, çözüm detayları gibi zengin metin alanlarında `@tailwindcss/typography` plugin kullanılır:

```html
<div class="prose prose-lg max-w-none
  prose-headings:text-dark prose-headings:font-bold
  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
  prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
  prose-a:text-primary prose-a:underline
  prose-li:text-foreground prose-li:leading-relaxed
  prose-table:border prose-table:border-gray-200
  prose-th:bg-gray-100 prose-th:px-4 prose-th:py-3
  prose-td:px-4 prose-td:py-3
  prose-img:rounded-lg">
  <!-- Rich text content -->
</div>
```

## Responsive Breakpoints

| Breakpoint | Piksel | Kullanım |
|---|---|---|
| sm | 640px | Küçük mobil |
| md | 768px | Tablet |
| lg | 1024px | Küçük masaüstü |
| xl | 1280px | Masaüstü |
| 2xl | 1536px | Geniş ekran |

### Responsive Grid Kuralları

| Bileşen | Mobil | Tablet | Masaüstü |
|---|---|---|---|
| Hizmet kartları | 1 kolon | 2 kolon | 3 kolon |
| Çözüm kartları | 1 kolon | 2 kolon | 4 kolon |
| Fiyat kartları | 1 kolon | 2 kolon | 3 kolon |
| Blog kartları | 1 kolon | 2 kolon | 3 kolon |
| Bölge kartları | 2 kolon | 3 kolon | 4 kolon |
| Trust badges | 2 kolon | 4 kolon | 4 kolon |
| İstatistikler | 2 kolon | 4 kolon | 4 kolon |
| Footer | 1 kolon (accordion) | 2 kolon | 5 kolon |

## TOC (Table of Contents) Tasarımı

### Masaüstü
- Sticky sidebar (sağ taraf), `top-24`
- bg-white border border-gray-200 rounded-xl p-4
- Başlık: "İçindekiler" (text-sm font-semibold text-dark)
- Linkler: text-sm text-muted-foreground
- Aktif link: text-primary font-medium, sol border-l-2 border-primary
- Hover: text-primary
- Max-height ile scroll, scrollbar gizli
- Smooth scroll animasyonu

### Mobil
- Sayfanın üstünde açılır/kapanır (collapsible)
- bg-[#f5f5f5] rounded-lg p-4
- Başlık: "İçindekiler" + chevron ikonu
- Varsayılan: kapalı
- Tıklanınca açılır, smooth animasyon

## Animasyonlar (Framer Motion)

### Scroll Animasyonları (Viewport Trigger)
| Animasyon | Kullanım | Ayarlar |
|---|---|---|
| **Fade In Up** | Section başlıkları, paragraflar | `y: 30 → 0, opacity: 0 → 1, duration: 0.6` |
| **Fade In Left/Right** | 2 kolonlu bölümlerde sol/sağ | `x: ±40 → 0, opacity: 0 → 1, duration: 0.6` |
| **Stagger Children** | Kart grid'leri (hizmet, çözüm, bölge) | `staggerChildren: 0.1, delayChildren: 0.2` |
| **Scale In** | İstatistik sayaçları, trust badges | `scale: 0.9 → 1, opacity: 0 → 1` |
| **Counter Up** | İstatistik sayıları (1000+, 15+ vb.) | `useMotionValue` + `animate`, duration: 2s |

### Hover Micro-Interactions
| Bileşen | Animasyon |
|---|---|
| **Kartlar** | `scale: 1.02, y: -4, shadow: lg → xl, duration: 0.2` |
| **Butonlar** | `scale: 1.03, duration: 0.15` |
| **Mega Menü Linkleri** | `x: 0 → 4, color transition, duration: 0.15` |
| **Footer Geliştirici** | Popup: `scale: 0.95 → 1, opacity: 0 → 1` |
| **WhatsApp Butonu** | Pulse: `scale: [1, 1.1, 1], infinite, duration: 2s` |

### Sayfa Geçişleri
```tsx
// layout.tsx — AnimatePresence ile sayfa geçişi
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Özel Animasyonlar
| Bileşen | Animasyon |
|---|---|
| **Hero** | Başlık: typewriter veya fade-in-up, CTA: delay ile slide-up |
| **Süreç Adımları** | Sıralı fade-in, bağlantı çizgisi animasyonu |
| **Yorum Slider** | Carousel: slide left/right, auto-play 5s |
| **Cookie Banner** | Slide-up: `y: 100 → 0, duration: 0.4` |
| **Toast Bildirimleri** | Slide-in-right + auto-dismiss 5s |
| **Accordion (SSS)** | Height: `auto → 0`, smooth collapse |
| **TOC Aktif Link** | Border-left: width transition, color transition |

### Performans Kuralları
- `will-change: transform` sadece animasyon sırasında
- `transform` ve `opacity` dışında animasyon yapma (layout shift riski)
- `useReducedMotion()` hook ile erişilebilirlik: `prefers-reduced-motion` destekle
- Viewport dışındaki animasyonlar `whileInView` ile tetiklenir (`once: true`)
- Framer Motion sadece kullanılan sayfalarda dynamic import ile yüklenir

## Erişilebilirlik (Accessibility) Stilleri

### Focus Visible
```css
/* globals.css */
*:focus-visible {
  outline: 2px solid #e3000f;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Skip to Content
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
  İçeriğe Geç
</a>
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
