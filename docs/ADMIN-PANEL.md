# Kozcuoğlu Nakliyat — Admin Panel Yapısı

## Genel Bilgi

- **Tip:** Custom Admin Panel (Next.js içinde)
- **Kimlik Doğrulama:** NextAuth.js
- **Veritabanı:** SQLite veya JSON dosya tabanlı (cPanel uyumlu)
- **URL Prefix:** `/admin/`
- **Erişim:** Sadece yetkili kullanıcılar
- **Rich Text Editor:** TipTap veya EditorJS (blog, hizmet, çözüm, bölge içerikleri)

## Admin Panel Sayfaları

### 1. Giriş — `/admin`
- E-posta + Şifre ile giriş
- bcrypt ile şifre hashleme
- JWT token ile oturum yönetimi
- Başarısız giriş denemesi limiti

### 2. Dashboard — `/admin/dashboard`
- Toplam sayfa görüntüleme (varsa)
- Son gelen iletişim formları
- Blog yazısı sayısı
- Hizmet sayısı
- Çözüm sayısı
- Hizmet bölgesi sayısı
- Onay bekleyen yorum sayısı
- Aktif fiyat hesaplama modülü sayısı
- Hızlı erişim linkleri

### 3. Hizmetler Yönetimi — `/admin/services`

#### Hizmet Listesi
- Tüm hizmetler tablo halinde
- Başlık, slug, sıra, durum (yayında/taslak), düzenle/sil butonları
- Sürükle-bırak ile sıralama

#### Slug Benzersizlik Kontrolü
Hizmet eklenirken/düzenlenirken slug'ın tüm veri kaynaklarında (services, solutions, blog-posts, regions, statik sayfalar) benzersiz olduğu kontrol edilir. Çakışma varsa uyarı gösterilir, kayıt engellenir.

#### Hizmet Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Başlık | Text | Hizmet başlığı (Örn: "Evden Eve Nakliyat") |
| Slug | Text | URL slug (otomatik, düzenlenebilir) → `/[slug]` |
| Kısa Açıklama | Textarea | Kart açıklaması |
| İçerik | Rich Text Editor | Hizmet detay içeriği |
| İkon | Icon Picker | Hizmet kartı ikonu (Lucide) |
| Kapak Görseli | Image Upload | OG image ve sayfa görseli |
| Fiyat Modülü | Select | Hangi fiyat hesaplama modülü atanacak |
| SSS | Dynamic List | Hizmete özel soru-cevap ekleme |
| SEO Title | Text | Özel SEO başlığı (opsiyonel) |
| SEO Description | Textarea | Özel meta description (opsiyonel) |
| Sıra | Number | Listeleme sırası |
| Durum | Select | Yayında / Taslak |

#### Hizmet URL Formatı
- Slug otomatik: "Evden Eve Nakliyat" → `evden-eve-nakliyat`
- Son URL: `/evden-eve-nakliyat`
- Ana sayfa ve Hizmetlerimiz sayfasındaki grid otomatik güncellenir

### 4. Çözümler Yönetimi — `/admin/solutions`

#### Çözüm Listesi
- Tüm çözümler tablo halinde
- Başlık, slug, sıra, durum, düzenle/sil butonları
- Sürükle-bırak ile sıralama

#### Çözüm Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Başlık | Text | Çözüm başlığı (Örn: "Asansörlü Nakliyat") |
| Slug | Text | URL slug (otomatik, düzenlenebilir) → `/[slug]` |
| Kısa Açıklama | Textarea | Kart açıklaması |
| İçerik | Rich Text Editor | Çözüm detay içeriği |
| İkon | Icon Picker | Çözüm kartı ikonu (Lucide) |
| Kapak Görseli | Image Upload | OG image ve sayfa görseli |
| SSS | Dynamic List | Çözüme özel soru-cevap ekleme |
| SEO Title | Text | Özel SEO başlığı (opsiyonel) |
| SEO Description | Textarea | Özel meta description (opsiyonel) |
| Sıra | Number | Listeleme sırası |
| Durum | Select | Yayında / Taslak |

#### Çözüm URL Formatı
- Slug otomatik: "Asansörlü Nakliyat" → `asansorlu-nakliyat`
- Son URL: `/asansorlu-nakliyat`
- Ana sayfa ve Çözümlerimiz sayfasındaki grid otomatik güncellenir
- Slug benzersizlik kontrolü: tüm veri kaynaklarında kontrol edilir

### 5. Hizmet Bölgeleri Yönetimi — `/admin/regions`

#### Bölge Listesi
- Tüm bölgeler tablo halinde
- Bölge adı, slug, durum (yayında/taslak), düzenleme/sil butonları

#### Bölge Ekle/Düzenleme
| Alan | Tip | Açıklama |
|---|---|---|
| Bölge Adı | Text | Örn: "Bostancı Evden Eve Nakliyat" |
| Slug | Text | Örn: "bostanci-evden-eve-nakliyat" (otomatik, düzenlenebilir) |
| İçerik | Rich Text Editor | Bölgeye özel içerik (Markdown veya WYSIWYG) |
| Özet | Textarea | Meta description için kısa özet |
| Kapak Görseli | Image Upload | OG image ve sayfa görseli |
| Bölge Tipi | Select | `ilce` (İstanbul ilçesi) / `sehirlerarasi` (Şehirler arası) |
| Hizmet Tipi | Select | Evden Eve Nakliyat, Ofis Taşıma, Ev Taşıma |
| Fiyat Modülü | Select | Hangi fiyat hesaplama modülü atanacak |
| SSS | Dynamic List | Bölgeye özel soru-cevap ekleme |
| SEO Title | Text | Özel SEO başlığı (opsiyonel) |
| SEO Description | Textarea | Özel meta description (opsiyonel) |
| Durum | Select | Yayında / Taslak |

#### Bölge URL Formatı
- Slug otomatik: "Bostancı Evden Eve Nakliyat" → `bostanci-evden-eve-nakliyat`
- Son URL: `/bostanci-evden-eve-nakliyat.html`

### 6. Blog Yönetimi — `/admin/blog`

#### Blog Listesi
- Tüm yazılar tablo halinde
- Başlık, tarih, durum (yayında/taslak), düzenle/sil butonları
- Arama ve filtreleme

#### Blog Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Başlık | Text | Yazı başlığı |
| Slug | Text | URL slug (otomatik oluşturulur, düzenlenebilir) |
| İçerik | Rich Text Editor | Yazı içeriği (Markdown veya WYSIWYG) |
| Özet | Textarea | Meta description için kısa özet |
| Kapak Görseli | Image Upload | OG image ve yazı görseli |
| Kategori | Select | Blog kategorisi (admin'den yönetilen liste, `settings.json → blogCategories`) |
| Etiketler | Multi-Select | SEO etiketleri |
| Yazar | Text | Yazar adı |
| SEO Title | Text | Özel SEO başlığı (opsiyonel) |
| SEO Description | Textarea | Özel meta description (opsiyonel) |
| Durum | Select | Yayında / Taslak |
| Yayın Tarihi | Date | Yayınlanma tarihi |

#### Blog URL Formatı
- Slug otomatik: "İstanbul Evden Eve Nakliyat" → `istanbul-evden-eve-nakliyat`
- Son URL: `/istanbul-evden-eve-nakliyat.html`

### 7. Yorumlar Yönetimi — `/admin/reviews`

#### Yorum Listesi
- Tüm yorumlar tablo halinde
- Ad, yıldız, yorum özeti, sayfa, durum (onaylı/beklemede/reddedildi), tarih
- Filtreleme: sayfa bazlı, durum bazlı, yıldız bazlı

#### Yorum İşlemleri
| İşlem | Açıklama |
|---|---|
| Onayla | Yorumu yayına al |
| Reddet | Yorumu reddet (gizle) |
| Sil | Yorumu kalıcı sil |
| Düzenle | Yorum metnini düzenle |

#### Yorum Veri Yapısı
```json
{
  "id": "1",
  "name": "Müşteri Adı",
  "rating": 5,
  "comment": "Çok profesyonel hizmet aldık.",
  "serviceType": "evden-eve-nakliyat",
  "pageSlug": "/evden-eve-nakliyat",
  "status": "approved",
  "createdAt": "2026-01-15T10:00:00Z"
}
```

### 8. Fiyat Modülleri — `/admin/pricing`

#### Modül Listesi
- Tüm modüller tablo halinde
- Ad, atanan sayfa sayısı, durum (aktif/pasif), düzenle/sil

#### Modül Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Modül Adı | Text | Örn: "Ev Taşıma Hesaplama" |
| Slug | Text | Örn: "ev-tasima" |
| Baz Fiyat | Number | Minimum fiyat (TL) |
| Alanlar | Dynamic Form Builder | Alan ekle/sil/düzenle |
| Fiyat Parametreleri | Key-Value | km ücreti, kat ücreti vb. |
| Atanan Sayfalar | Multi-Select | Hangi sayfalarda gösterilecek |
| Durum | Toggle | Aktif / Pasif |

#### Alan Tipleri (Form Builder)
- **Text** — Metin girişi
- **Number** — Sayı girişi
- **Select** — Açılır liste
- **Multi-Checkbox** — Çoklu seçim
- **Checkbox** — Tek seçim (Evet/Hayır)
- **Date** — Tarih seçici
- **Dependent Select** — Bağımlı açılır liste (İl → İlçe)

### 9. Sayfa Yönetimi — `/admin/pages`

#### Düzenlenebilir Alanlar
| Alan | Açıklama |
|---|---|
| Hero Başlık | Sayfa hero bölümü başlığı |
| Hero Açıklama | Sayfa hero bölümü açıklaması |
| İçerik | Sayfa ana içeriği |
| SEO Title | Meta title |
| SEO Description | Meta description |
| OG Image | Sosyal medya görseli |

### 10. İletişim Formları — `/admin/messages`
- Gelen mesajlar tablo halinde
- Ad, e-posta, telefon, mesaj, tarih
- Okundu/Okunmadı durumu
- Silme özelliği
- Fiyat hesaplama sonuçları da burada listelenir

### 11. Ayarlar — `/admin/settings`

#### NAP Bilgileri (Name, Address, Phone)
| Ayar | Açıklama |
|---|---|
| Firma Adı | NAP — Name |
| Firma Adresi | NAP — Address (sokak, ilçe, il, posta kodu) |
| Telefon | NAP — Phone |
| E-posta | İletişim e-postası |
| Koordinatlar | Enlem / Boylam (Google Maps + Schema) |
| Çalışma Saatleri | Gün bazlı açılış/kapanış saatleri |

#### Site Ayarları — Genel
| Ayar | Tip | Açıklama |
|---|---|---|
| Site Başlığı | Text | Genel site başlığı (title suffix: "| Kozcuoğlu Nakliyat") |
| Site Açıklaması | Textarea | Genel meta description (varsayılan) |
| WhatsApp Numarası | Text | WhatsApp linki için numara |
| WhatsApp Varsayılan Mesaj | Text | Varsayılan mesaj şablonu |
| Footer Metni | Text | Footer alt kısım yazısı |
| Copyright Yılı | Text | Otomatik veya manuel (Örn: "2026") |
| Şifre Değiştir | Password | Admin şifre güncelleme |

#### Site Ayarları — Logo & Favicon & Görseller (SEO Uyumlu)
| Ayar | Tip | Açıklama |
|---|---|---|
| **Logo (Açık Tema)** | Image Upload | Header'da kullanılacak logo (şeffaf PNG/SVG, önerilen: 200x60px) |
| **Logo (Koyu Tema)** | Image Upload | Koyu footer'da kullanılacak logo (beyaz/açık renk) |
| **Logo Alt Text** | Text | Logo alt text (SEO: "Kozcuoğlu Nakliyat Logo") |
| **Favicon (ICO)** | Image Upload | 32x32 px `.ico` dosyası (tarayıcı sekmesi) |
| **Favicon (SVG)** | Image Upload | SVG favicon (modern tarayıcılar) |
| **Apple Touch Icon** | Image Upload | 180x180 px PNG (iOS ana ekran) |
| **OG Default Image** | Image Upload | 1200x630 px (sayfa bazlı OG image yoksa bu kullanılır) |
| **PWA Icon (192)** | Image Upload | 192x192 px PNG (manifest.json) |
| **PWA Icon (512)** | Image Upload | 512x512 px PNG (manifest.json splash) |
| **PWA Maskable Icon** | Image Upload | 512x512 px PNG (maskable, safe zone %80) |

> **SEO Notu:** Logo ve favicon'lar `settings.json`'da saklanır. Build sırasında `<head>`'e otomatik eklenir: `<link rel="icon">`, `<link rel="apple-touch-icon">`, `<link rel="manifest">`. OG image her sayfada `og:image` olarak kullanılır (sayfa bazlı override varsa o geçerli).

#### Site Ayarları — Sosyal Medya & sameAs (Schema Entity)
| Ayar | Tip | Açıklama |
|---|---|---|
| Facebook | URL | `https://www.facebook.com/kozcuoglunakliyat` |
| Instagram | URL | `https://www.instagram.com/kozcuoglunakliyat` |
| YouTube | URL | `https://www.youtube.com/@kozcuoglunakliyat` |
| LinkedIn | URL | `https://tr.linkedin.com/company/kozcuoglunakliyat` |
| Twitter / X | URL | `https://twitter.com/kozcuoglunak` |
| TikTok | URL | `https://www.tiktok.com/@kozcuoglunakliyat` |
| Pinterest | URL | `https://tr.pinterest.com/kozcuoglunakliyat` |
| Google Business | URL | `https://g.page/kozcuoglunakliyat` |
| Google Maps | URL | `https://www.google.com/maps/place/Kozcuoğlu+Nakliyat` |
| Şikayetvar | URL | `https://www.sikayetvar.com/kozcuoglu-nakliyat` |
| Sahibinden | URL | `https://www.sahibinden.com/kozcuoglu-nakliyat` |
| Wikidata | URL | `https://www.wikidata.org/wiki/QXXXXXXX` |
| **Ekstra sameAs** | Multi-Text | Sınırsız ek URL eklenebilir (yeni platform eklemek için) |

> **Önemli:** Bu URL'ler `settings.json`'a kaydedilir. Tüm sayfalardaki `Organization` / `MovingCompany` schema'sının `sameAs` alanına otomatik olarak eklenir. Admin istediği zaman değiştirebilir, yeni platform ekleyebilir veya silebilir. Boş bırakılan alanlar schema'ya eklenmez.

#### Site Ayarları — Entegrasyonlar
| Ayar | Tip | Açıklama |
|---|---|---|
| Google Analytics ID | Text | GA4 ölçüm ID'si (G-XXXXXXX) |
| Google Tag Manager ID | Text | GTM container ID'si (GTM-XXXXXXX) |
| Google Search Console | Text | Doğrulama meta tag'ı veya HTML dosya adı |
| Tawk.to Widget ID | Text | Canlı destek widget kodu |
| Microsoft Clarity ID | Text | Clarity proje ID'si |
| IndexNow API Key | Text | IndexNow anahtar (Bing/Yandex anında indexleme) |
| SMTP Host | Text | E-posta sunucu adresi |
| SMTP Port | Number | Port (587 TLS / 465 SSL) |
| SMTP Kullanıcı | Text | E-posta adresi |
| SMTP Şifre | Password | E-posta şifresi |
| SMTP Gönderen Ad | Text | "Kozcuoğlu Nakliyat" |

#### Özel Kod Ekleme Alanları
| Alan | Açıklama | Yerleşim |
|---|---|---|
| Head Kodu | `<head>` içine eklenen özel kod (meta, script, style, doğrulama tagları vb.) | `<head>` kapanmadan önce |
| Body Başı Kodu | `<body>` açıldıktan hemen sonra eklenen kod (GTM noscript, chat widget vb.) | `<body>` açıldıktan sonra |
| Footer Kodu | `</body>` kapanmadan önce eklenen kod (analytics, tracking pixel, özel script vb.) | `</body>` kapanmadan önce |

- Her alan: `textarea` (code editor görünümü, monospace font)
- Kaydet butonuyla `settings.json`'a yazılır
- Next.js `layout.tsx`'de `dangerouslySetInnerHTML` ile render edilir
- Güvenlik: Sadece admin erişebilir, XSS riski admin sorumluluğunda

## Veritabanı Yapısı

### Tablolar / JSON Dosyaları

```
data/
├── settings.json          → Site ayarları + NAP + sameAs + Logo/Favicon + Entegrasyonlar
├── services.json          → Hizmetlerimiz alt sayfaları
├── solutions.json         → Çözümlerimiz alt sayfaları
├── blog-posts.json        → Blog yazıları
├── regions.json           → Hizmet bölgeleri
├── reviews.json           → Müşteri yorumları
├── pricing-modules.json   → Fiyat hesaplama modülleri
├── pages.json             → Sayfa içerikleri
├── messages.json          → İletişim formları
├── users.json             → Admin kullanıcıları
├── survey-requests.json   → Keşif talepleri
├── tracking.json          → Taşıma takip verileri
├── projects.json          → Referans projeler
├── fleet.json             → Araç filosu
├── campaigns.json         → Kampanyalar
├── gallery.json           → Galeri (resim + video)
├── contracts.json         → Sözleşme şablonları
├── clients.json           → Kurumsal müşteri logoları
├── ratings.json           → Sayfa bazlı yıldızlama
├── internal-links.json    → Otomatik iç linkleme kuralları
├── redirects.json         → 301 yönlendirme kuralları
├── 404-logs.json          → Yakalanan 404 hataları logu
├── notifications.json     → Admin panel bildirimleri
└── activity-logs.json     → Admin işlem geçmişi
```

### Örnek: services.json
```json
[
  {
    "id": "1",
    "title": "Evden Eve Nakliyat",
    "slug": "evden-eve-nakliyat",
    "shortDescription": "Profesyonel evden eve nakliyat hizmeti.",
    "content": "...",
    "icon": "Home",
    "coverImage": "/uploads/services/evden-eve-nakliyat.webp",
    "pricingModuleId": "ev-tasima",
    "faq": [
      { "question": "Fiyat nasıl belirlenir?", "answer": "..." }
    ],
    "seoTitle": "",
    "seoDescription": "",
    "order": 1,
    "status": "published",
    "createdAt": "2026-01-15T10:00:00Z",
    "updatedAt": "2026-01-15T10:00:00Z"
  }
]
```

### Örnek: settings.json
```json
{
  "nap": {
    "companyName": "Kozcuoğlu Nakliyat",
    "address": {
      "street": "Kaynarca Mah. Bahattin Veled Cad. No:37",
      "district": "Pendik",
      "city": "İstanbul",
      "postalCode": "34890",
      "country": "TR"
    },
    "phones": {
      "customerService": "444 7 436",
      "landline": "0216 494 53 37",
      "gsm": "0532 138 49 79"
    },
    "email": "info@kozcuoglunakliyat.com.tr",
    "coordinates": { "lat": 40.9279, "lng": 29.2333 },
    "workingHours": [
      { "day": "Pazartesi-Cumartesi", "open": "08:00", "close": "20:00" },
      { "day": "Pazar", "open": "09:00", "close": "18:00" }
    ]
  },
  "site": {
    "title": "Kozcuoğlu Nakliyat",
    "titleSuffix": "| Kozcuoğlu Nakliyat",
    "description": "İstanbul evden eve nakliyat, ofis taşıma, eşya depolama hizmetleri.",
    "url": "https://kozcuoglunakliyat.com.tr",
    "whatsappNumber": "905321384979",
    "whatsappDefaultMessage": "Merhaba, bilgi almak istiyorum.",
    "footerText": "© 2026 Kozcuoğlu Nakliyat. Tüm hakları saklıdır.",
    "copyrightYear": "2026"
  },
  "logos": {
    "lightLogo": "/uploads/logo/logo-light.svg",
    "darkLogo": "/uploads/logo/logo-dark.svg",
    "logoAltText": "Kozcuoğlu Nakliyat Logo",
    "faviconIco": "/favicon.ico",
    "faviconSvg": "/favicon.svg",
    "appleTouchIcon": "/icons/apple-touch-icon.png",
    "ogDefaultImage": "/uploads/og/default-og.webp",
    "pwaIcon192": "/icons/icon-192x192.png",
    "pwaIcon512": "/icons/icon-512x512.png",
    "pwaMaskableIcon": "/icons/maskable-icon.png"
  },
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
  ],
  "integrations": {
    "googleAnalyticsId": "G-XXXXXXX",
    "googleTagManagerId": "GTM-XXXXXXX",
    "googleSearchConsole": "google-site-verification=XXXXX",
    "tawkToWidgetId": "",
    "microsoftClarityId": "",
    "indexNowApiKey": ""
  },
  "smtp": {
    "host": "mail.kozcuoglunakliyat.com.tr",
    "port": 587,
    "user": "info@kozcuoglunakliyat.com.tr",
    "pass": "***",
    "fromName": "Kozcuoğlu Nakliyat"
  },
  "blogCategories": [
    { "name": "Rehber", "slug": "rehber" },
    { "name": "Fiyat", "slug": "fiyat" },
    { "name": "İpucu", "slug": "ipucu" },
    { "name": "Checklist", "slug": "checklist" },
    { "name": "Karşılaştırma", "slug": "karsilastirma" },
    { "name": "Bölge", "slug": "bolge" },
    { "name": "Sezonsal", "slug": "sezonsal" },
    { "name": "Sigorta", "slug": "sigorta" }
  ],
  "customCode": {
    "headCode": "",
    "bodyStartCode": "",
    "footerCode": ""
  }
}
```

### Örnek: reviews.json
```json
[
  {
    "id": "1",
    "name": "Ahmet Yılmaz",
    "rating": 5,
    "comment": "Çok profesyonel ve güvenilir bir nakliyat firması.",
    "serviceType": "evden-eve-nakliyat",
    "pageSlug": "/evden-eve-nakliyat",
    "status": "approved",
    "createdAt": "2026-01-10T14:30:00Z"
  }
]
```

### Örnek: blog-posts.json
```json
[
  {
    "id": "1",
    "title": "İstanbul Evden Eve Nakliyat",
    "slug": "istanbul-evden-eve-nakliyat",
    "content": "...",
    "excerpt": "...",
    "coverImage": "/uploads/blog/istanbul-nakliyat.webp",
    "category": "nakliyat",
    "tags": ["istanbul", "evden eve", "nakliyat"],
    "author": "Kozcuoğlu Nakliyat",
    "seoTitle": "",
    "seoDescription": "",
    "status": "published",
    "publishDate": "2026-01-15",
    "createdAt": "2026-01-15T10:00:00Z",
    "updatedAt": "2026-01-15T10:00:00Z"
  }
]
```

## Görsel Yönetimi

- **Upload:** Admin panelde drag & drop görsel yükleme
- **Sıkıştırma:** Otomatik WebP dönüşümü + boyut optimizasyonu
- **Dosya Adı:** SEO uyumlu otomatik isimlendirme (Örn: `istanbul-evden-eve-nakliyat.webp`)
- **Klasör:** `/public/uploads/{services|solutions|blog|regions}/`
- **Alt Text:** Her görsel için zorunlu alt text alanı

## Slug Generator (Türkçe → Slug)

Otomatik dönüşüm utility:
- Türkçe karakterler: ö→o, ü→u, ş→s, ç→c, ğ→g, ı→i, İ→i
- Boşluklar: tire (`-`) ile değiştirilir
- Küçük harf
- Özel karakterler kaldırılır
- Örnek: "Bostancı Evden Eve Nakliyat" → `bostanci-evden-eve-nakliyat`

## Güvenlik

- NextAuth.js ile JWT tabanlı oturum
- bcrypt ile şifre hashleme
- API route'larda middleware ile yetki kontrolü
- CSRF token koruması
- Rate limiting (giriş denemesi + API)
- Input sanitization (XSS koruması)
- Admin işlemleri log kaydı
- Admin sayfaları robots.txt'de `Disallow: /admin/`

### 12. Keşif Talepleri — `/admin/surveys`

#### Talep Listesi
- Tüm keşif talepleri tablo halinde
- Ad, telefon, nereden→nereye, ev tipi, tarih, durum, oluşturma tarihi
- Filtreleme: durum bazlı, tarih bazlı

#### Durum Yönetimi
| Durum | Renk | Açıklama |
|---|---|---|
| Yeni | 🔵 Mavi | Yeni talep geldi |
| İletişime Geçildi | 🟡 Sarı | Müşteriyle iletişim kuruldu |
| Keşif Yapıldı | 🟠 Turuncu | Ekip keşif yaptı |
| Teklif Verildi | 🟣 Mor | Fiyat teklifi verildi |
| Onaylandı | 🟢 Yeşil | Müşteri onayladı |
| İptal | 🔴 Kırmızı | İptal edildi |

#### Talep Detay
- Müşteri bilgileri (ad, telefon, e-posta)
- Adres bilgileri (mevcut/yeni il/ilçe, kat, asansör)
- Ev tipi, taşıma tarihi
- Admin notları (textarea)
- Durum değiştirme
- WhatsApp ile mesaj gönder butonu

#### Veri: `survey-requests.json`

### 13. Taşıma Takip — `/admin/tracking`

#### Takip Listesi
- Aktif taşımalar tablo halinde
- Müşteri adı, takip kodu, mevcut durum, tarih

#### Takip Yönetimi
- 8 adımlı süreç durumu güncelleme (Keşif→Teklif→Onay→Paketleme→Yükleme→Taşıma→Boşaltma→Teslim)
- Durum değiştiğinde müşteriye otomatik WhatsApp bildirimi
- Takip kodu otomatik oluşturma (6 haneli)

#### Veri: `tracking.json`

### 14. Projeler (Referans İşler) — `/admin/projects`

#### Proje Listesi
- Tamamlanan projeler tablo halinde
- Müşteri, tip, nereden→nereye, tarih, durum

#### Proje Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Proje Başlığı | Text | Örn: "Kadıköy → Beşiktaş 3+1 Ev Taşıma" |
| Müşteri Adı | Text | İzinli ise |
| Taşıma Tipi | Select | Evden Eve / Ofis / Şehirler Arası |
| Nereden | Text | Kaynak adres/ilçe |
| Nereye | Text | Hedef adres/ilçe |
| Tarih | Date | Taşıma tarihi |
| Görseller | Multi Image Upload | Önce/sonra görseller |
| Müşteri Yorumu | Textarea | Kısa yorum |
| Yıldız | Number | 1-5 |
| Sıra | Number | Listeleme sırası |
| Durum | Select | Yayında / Taslak |

#### Veri: `projects.json`

### 15. Araç Filosu — `/admin/fleet`

#### Araç Listesi
- Tüm araçlar tablo halinde
- Araç tipi, kapasite, durum

#### Araç Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Araç Tipi | Text | Örn: "Kapalı Kasa Kamyon" |
| Model | Text | Araç modeli |
| Kapasite (m³) | Number | Yük hacmi |
| Uygun Ev Tipi | Text | Örn: "2+1, 3+1 ev" |
| Özellikler | Multi-Text | Kapalı kasa, GPS, hava süspansiyon vb. |
| Görsel | Image Upload | Araç fotoğrafı |
| Sıra | Number | Listeleme sırası |
| Durum | Select | Aktif / Pasif |

#### Veri: `fleet.json`

### 16. Kampanyalar — `/admin/campaigns`

#### Kampanya Listesi
- Tüm kampanyalar tablo halinde
- Başlık, indirim, başlangıç/bitiş, durum (aktif/pasif/süresi dolmuş)

#### Kampanya Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Başlık | Text | Örn: "Erken Rezervasyon İndirimi" |
| Açıklama | Textarea | Kampanya detayı |
| İndirim Tipi | Select | Yüzde (%) / Sabit Tutar (TL) |
| İndirim Değeri | Number | 10, 15, 500 vb. |
| Başlangıç Tarihi | Date | Kampanya başlangıcı |
| Bitiş Tarihi | Date | Kampanya bitişi |
| Kapak Görseli | Image Upload | Kampanya banner'ı |
| Ana Sayfada Göster | Toggle | Ana sayfada banner olarak göster |
| Durum | Select | Aktif / Pasif |

#### Veri: `campaigns.json`

### 17. Galeri Yönetimi — `/admin/gallery`

#### Resim Galerisi
- Tüm resimler grid halinde (thumbnail)
- Drag & drop sıralama
- Toplu yükleme (multi upload)
- Her resim için: başlık, alt text, kategori, sıra, ana sayfada göster (toggle)

#### Video Galerisi
- YouTube/Vimeo embed URL'leri
- Her video için: başlık, açıklama, thumbnail, kategori, sıra, ana sayfada göster (toggle)

#### Galeri Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Başlık | Text | Görsel/video başlığı |
| Tip | Select | Resim / Video |
| Dosya/URL | Upload / Text | Resim dosyası veya video embed URL |
| Alt Text | Text | SEO alt text (resim için zorunlu) |
| Kategori | Select | Genel, Nakliyat, Depolama, Araç, Ofis vb. |
| Sıra | Number | Listeleme sırası |
| Ana Sayfada Göster | Toggle | Ana sayfa galeri section'ında gösterilsin mi |
| Durum | Select | Yayında / Gizli |

#### Ana Sayfa Galeri Ayarları
- Gösterilecek resim sayısı (admin'den seçilebilir: 4, 6, 8, 12)
- Galeri layout tipi: Grid / Masonry / Carousel
- "Tümünü Gör" butonu → `/galeri` sayfasına link

#### Veri: `gallery.json`

### 18. Sözleşmeler — `/admin/contracts`

#### Sözleşme Listesi
- Tüm sözleşme şablonları tablo halinde
- Başlık, slug, durum

#### Sözleşme Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Başlık | Text | Örn: "Evden Eve Nakliyat Sözleşmesi" |
| Slug | Text | URL slug → `/evden-eve-nakliyat-sozlesmesi` (root'ta, ön ek yok) |
| İçerik | Rich Text Editor | Sözleşme metni (maddeler halinde) |
| PDF | File Upload | İndirilebilir PDF versiyonu (opsiyonel) |
| Word | File Upload | İndirilebilir Word (.docx) versiyonu (opsiyonel) |
| İlgili Hizmet | Select | Hangi hizmetle ilişkili |
| Durum | Select | Yayında / Taslak |

> **Sözleşme Aksiyon Butonları:** Her sözleşme sayfasında otomatik olarak Yazdır, Paylaş, PDF İndir, Word İndir butonları gösterilir. PDF/Word admin'den yüklenmişse o dosya indirilir, yüklenmemişse sayfa içeriğinden otomatik oluşturulur (`html2pdf.js` + `html-docx-js`).

#### Örnek Sözleşmeler
- Evden Eve Nakliyat Sözleşmesi
- Ofis Taşıma Sözleşmesi
- Eşya Depolama Sözleşmesi
- Şehirler Arası Nakliyat Sözleşmesi
- Sigorta Taahhütnamesi

#### Veri: `contracts.json`

### 19. Referanslarımız (Müşteri Logoları) — `/admin/clients`

#### Müşteri Logo Listesi
- Kurumsal müşteri logoları grid halinde
- Drag & drop sıralama

#### Logo Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Firma Adı | Text | Kurumsal müşteri adı |
| Logo | Image Upload | Firma logosu (şeffaf PNG/SVG önerilir) |
| Website | URL | Firma web sitesi (opsiyonel, link verilmez, sadece kayıt) |
| Sıra | Number | Listeleme sırası |
| Durum | Select | Göster / Gizle |

#### Veri: `clients.json`

### 20. Yıldızlama & AggregateRating — `/admin/ratings`

#### Sayfa Bazlı Rating Yönetimi

Her sayfa için AggregateRating değerlerini **manuel** veya **otomatik** oluşturma:

| Mod | Açıklama |
|---|---|
| **Otomatik** | O sayfadaki onaylı yorumların ortalaması ve sayısı otomatik hesaplanır |
| **Manuel** | Admin istediği rating değerini ve yorum sayısını elle girer |

#### Rating Ayarları (Sayfa Bazlı)
| Alan | Tip | Açıklama |
|---|---|---|
| Sayfa | Select | Hangi sayfa için (tüm sayfalar listesi) |
| Mod | Toggle | Otomatik / Manuel |
| Rating Değeri (Manuel) | Number | 1.0 - 5.0 (0.1 hassasiyet) |
| Yorum Sayısı (Manuel) | Number | Toplam değerlendirme sayısı |
| Best Rating | Number | Varsayılan: 5 |
| Worst Rating | Number | Varsayılan: 1 |

#### Otomatik Hesaplama Mantığı
```
AggregateRating = {
  ratingValue: reviews.filter(r => r.pageSlug === slug && r.status === 'approved').avg(r => r.rating),
  reviewCount: reviews.filter(r => r.pageSlug === slug && r.status === 'approved').length,
  bestRating: 5,
  worstRating: 1
}
```

#### Rich Snippets Çıktısı (Google SERP)
```
Kozcuoğlu Nakliyat - Evden Eve Nakliyat
⭐⭐⭐⭐⭐ 4.9 (127 değerlendirme) · ₺3.500 - ₺25.000
İstanbul'da profesyonel evden eve nakliyat hizmeti...
```

#### Google SERP'te Görünecek Bilgiler
| Bilgi | Schema | Kaynak |
|---|---|---|
| **Yıldızlar** | AggregateRating → ratingValue | Otomatik/Manuel |
| **Değerlendirme Sayısı** | AggregateRating → reviewCount | Otomatik/Manuel |
| **Fiyat Aralığı** | Offer → priceRange | Fiyat hesaplama modülünden |
| **Breadcrumb** | BreadcrumbList | Otomatik |
| **SSS** | FAQPage → mainEntity | SSS bölümünden |
| **Site Linkleri** | SiteNavigationElement | Otomatik |
| **Arama Kutusu** | WebSite → SearchAction | Ana sayfa |

#### Veri: `ratings.json`

### 21. Otomatik İç Linkleme Sistemi — `/admin/internal-links`

#### Anahtar Kelime Listesi
Tablo halinde tüm tanımlı anahtar kelimeler:

| Kolon | Açıklama |
|---|---|
| Anahtar Kelime | Hedef kelime (Örn: "evden eve nakliyat") |
| Hedef URL | Link gideceği sayfa (Örn: `/evden-eve-nakliyat`) |
| Max Link Sayısı | Tüm sitede bu kelimeden max kaç link çıkacak (1, 2, 3, 5, 10 vb.) |
| Bold Sayısı | Kaç tanesinde `<strong>` olacak |
| Eğik Sayısı | Kaç tanesinde `<em>` olacak |
| Altı Çizili Sayısı | Kaç tanesinde `<u>` olacak |
| Farklı Renk Sayısı | Kaç tanesinde özel renk olacak |
| Renk Kodu | Farklı renk HEX kodu (Örn: `#e3000f`) |
| Durum | Aktif / Pasif |

#### Anahtar Kelime Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Anahtar Kelime | Text | Hedef kelime veya kelime grubu |
| Hedef URL | Select + Text | Mevcut sayfalardan seç veya özel URL gir |
| Max Link Sayısı | Number | Tüm sitede max kaç yerde link çıkacak (varsayılan: 1) |
| Bold Sayısı | Number | Kaç tanesinde bold (varsayılan: 0) |
| Eğik Sayısı | Number | Kaç tanesinde italic (varsayılan: 0) |
| Altı Çizili Sayısı | Number | Kaç tanesinde underline (varsayılan: 0) |
| Farklı Renk Sayısı | Number | Kaç tanesinde özel renk (varsayılan: 0) |
| Renk Kodu | Color Picker | HEX renk kodu |
| Durum | Toggle | Aktif / Pasif |

#### Çalışma Mantığı
1. Admin anahtar kelimeleri ve kuralları tanımlar
2. "Başlat" butonuna basıldığında sistem tüm sayfa içeriklerini tarar
3. Her sayfanın rich text içeriğinde (hizmet, çözüm, bölge, blog) anahtar kelimeyi arar
4. Bulunan kelimeleri kurallara göre `<a>` tag'ı ile sarar
5. Stil kurallarına göre `<strong>`, `<em>`, `<u>`, `style="color:..."` ekler
6. Max link sayısını aşmaz — sayıya ulaşınca durur
7. Aynı sayfada aynı kelimeye birden fazla link vermez (sayfa başına max 1)
8. Sonuç raporu gösterir: "X sayfada Y link oluşturuldu"

#### Örnek Kural
```json
{
  "keyword": "evden eve nakliyat",
  "targetUrl": "/evden-eve-nakliyat",
  "maxLinks": 5,
  "boldCount": 2,
  "italicCount": 1,
  "underlineCount": 0,
  "colorCount": 1,
  "colorCode": "#e3000f",
  "status": "active"
}
```

#### Güvenlik Kuralları
- Hedef sayfanın kendi içeriğinde kendi linkini oluşturmaz
- H1, H2, H3 heading'lerin içinde link oluşturmaz
- Zaten link olan kelimeleri tekrar linklemez
- Admin'in belirlediği sayıların dışına çıkmaz
- "Geri Al" butonu ile tüm otomatik linkleri kaldırabilir

#### Veri: `internal-links.json`

### 22. 301 Redirect & 404 Yönetimi — `/admin/redirects`

> Bu sayfa iki bölümden oluşur: **301 Yönlendirmeler** ve **404 Hata Logları**. Aynı sayfada tab yapısıyla gösterilir.

#### Tab 1: 301 Yönlendirmeler

Eski URL'lerden yeni URL'lere kalıcı yönlendirme kuralları:

| Kolon | Açıklama |
|---|---|
| Eski URL | Yönlendirilecek kaynak URL (Örn: `/eski-sayfa`) |
| Yeni URL | Hedef URL (Örn: `/evden-eve-nakliyat`) |
| Tip | 301 (kalıcı) / 302 (geçici) |
| Hit Sayısı | Bu kurala kaç kez istek geldi (otomatik sayaç) |
| Son Hit | Son istek tarihi |
| Durum | Aktif / Pasif |
| Oluşturma | Tarih |

##### Yönlendirme Ekle/Düzenle
| Alan | Tip | Açıklama |
|---|---|---|
| Eski URL | Text | Kaynak URL (Örn: `/hizmetlerimiz/evden-eve-nakliyat`) |
| Yeni URL | Select + Text | Mevcut sayfalardan seç veya özel URL gir |
| Tip | Select | 301 Kalıcı (varsayılan) / 302 Geçici |
| Not | Text | Neden yönlendirme yapıldı (opsiyonel) |

##### Toplu İçe Aktarma
- CSV/JSON dosyasından toplu yönlendirme kuralı yükleme
- Format: `eski_url,yeni_url,tip`
- Eski site taşıma sırasında tüm URL'leri tek seferde aktarma

##### Teknik Uygulama
```js
// next.config.js — redirects() fonksiyonuna otomatik eklenir
async redirects() {
  const rules = JSON.parse(fs.readFileSync('data/redirects.json'))
  return rules
    .filter(r => r.status === 'active')
    .map(r => ({
      source: r.oldUrl,
      destination: r.newUrl,
      permanent: r.type === '301'
    }))
}
```

#### Tab 2: 404 Hata Logları

Sitede yakalanan tüm 404 hatalarının otomatik loglanması:

| Kolon | Açıklama |
|---|---|
| URL | 404 dönen sayfa URL'si |
| Hit Sayısı | Bu URL'ye kaç kez istek geldi |
| Son Hit | Son istek tarihi |
| Referrer | Nereden gelindi (varsa) |
| User Agent | Tarayıcı/bot bilgisi |
| Durum | Yeni / İncelendi / 301 Oluşturuldu / Yoksay |

##### 404 → 301 Hızlı Dönüştürme
Her 404 kaydının yanında **"301 Oluştur"** butonu:
1. Butona tıkla
2. Hedef URL seç (mevcut sayfalardan veya özel URL)
3. Kaydet → Otomatik olarak `redirects.json`'a 301 kuralı eklenir
4. 404 kaydının durumu "301 Oluşturuldu" olarak güncellenir

##### 404 Yakalama Mekanizması
```ts
// src/app/not-found.tsx
export default function NotFound() {
  // 404 logla (API route'a istek at)
  useEffect(() => {
    fetch('/api/log-404', {
      method: 'POST',
      body: JSON.stringify({
        url: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    })
  }, [])
  
  return <Custom404Page />
}
```

##### Otomatik Uyarılar
```
⚠️ Son 24 saatte 15 yeni 404 hatası yakalandı
⚠️ "/eski-hizmet-sayfasi" URL'sine 50+ istek geldi → 301 oluşturmanız önerilir
✅ Bu hafta 3 yeni 301 kuralı oluşturuldu
```

##### 404 Log Temizleme
- "Yoksay" olarak işaretlenen kayıtları toplu silme
- 90 günden eski logları otomatik temizleme (ayarlanabilir)
- Dışa aktarma (CSV)

#### Veri: `redirects.json` + `404-logs.json`

```json
// redirects.json örnek
[
  {
    "id": "1",
    "oldUrl": "/hizmetlerimiz/evden-eve-nakliyat",
    "newUrl": "/evden-eve-nakliyat",
    "type": "301",
    "hitCount": 45,
    "lastHit": "2026-02-13T14:30:00Z",
    "note": "Eski site URL yapısından taşıma",
    "status": "active",
    "createdAt": "2026-01-15T10:00:00Z"
  }
]

// 404-logs.json örnek
[
  {
    "id": "1",
    "url": "/eski-sayfa-adi",
    "hitCount": 12,
    "lastHit": "2026-02-13T16:00:00Z",
    "referrer": "https://www.google.com",
    "userAgent": "Mozilla/5.0...",
    "status": "new",
    "createdAt": "2026-02-10T08:00:00Z"
  }
]
```

---

## Yedekleme & Dışa Aktarma

- JSON verilerini tek tıkla yedekleme (ZIP)
- Yedekten geri yükleme
- Blog yazılarını CSV/JSON olarak dışa aktarma
- 301 kurallarını CSV/JSON olarak dışa/içe aktarma
- 404 loglarını CSV olarak dışa aktarma

## Admin Panel UI

- **Sidebar:** Sol tarafta navigasyon menüsü (22 bölüm, gruplandırılmış)
  - **İçerik:** Hizmetler, Çözümler, Bölgeler, Blog, Sayfalar
  - **CRM:** Keşif Talepleri, Taşıma Takip, Mesajlar
  - **Medya:** Galeri, Projeler, Araç Filosu
  - **Pazarlama:** Kampanyalar, Referanslar (Logolar), Sözleşmeler
  - **SEO:** Yorumlar, Yıldızlama, İç Linkleme, **301 & 404 Yönetimi**
  - **Sistem:** Fiyat Modülleri, Ayarlar
- **Header:** Üstte kullanıcı bilgisi, bildirimler, çıkış butonu
- **Responsive:** Mobilde hamburger menü
- **Tema:** Koyu sidebar (#122032), beyaz içerik alanı
- **Bileşenler:** shadcn/ui tabanlı (Table, Form, Dialog, Toast, Tabs)
- **Loading:** Skeleton loader ile yükleme durumları
- **Draft Preview:** Taslak içeriği canlı önizleme
