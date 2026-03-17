# Kozcuoğlu Nakliyat — Sayfa Yapısı & URL'ler

## URL Kuralları

1. **Sayfalar:** Trailing slash YOK → `/sayfa-adi`
2. **Hizmet alt sayfaları:** Root'ta → `/evden-eve-nakliyat` (ön ek yok)
3. **Çözüm alt sayfaları:** Root'ta → `/asansorlu-nakliyat` (ön ek yok)
4. **Hizmet Bölgeleri:** `.html` uzantılı → `/bostanci-evden-eve-nakliyat.html`
5. **Blog yazıları:** `.html` uzantılı → `/evden-eve-nakliyat-nedir.html`
6. **Türkçe karakter yok:** ö→o, ü→u, ş→s, ç→c, ğ→g, ı→i
7. **Küçük harf:** Tüm URL'ler lowercase
8. **Tire ile ayırma:** Kelimeler `-` ile ayrılır
9. **Slug benzersizlik:** Her slug tüm içerik tipleri arasında benzersiz olmalı (API'de kontrol)

> **ÖNEMLİ:** Hizmet ve çözüm alt sayfaları `/hizmetlerimiz/` veya `/cozumlerimiz/` ön eki olmadan direkt root'ta açılır. Bu nedenle slug benzersizlik kontrolü kritik önem taşır.

## Slug Benzersizlik Kontrolü

Yeni içerik eklenirken slug'ın tüm veri kaynaklarında benzersiz olduğu kontrol edilir:

| Kontrol Kaynağı | Dosya |
|---|---|
| Hizmetler | `services.json` |
| Çözümler | `solutions.json` |
| Blog yazıları | `blog-posts.json` |
| Hizmet bölgeleri | `regions.json` |
| Sözleşmeler | `contracts.json` |
| Statik sayfalar | Sabit liste (hakkimizda, iletisim, blog, vb.) |

> Çakışma varsa kullanıcıya uyarı gösterilir, kayıt engellenir.

## Sayfa Listesi

### Ana Sayfalar (Statik)

| Sayfa | URL | H1 | Açıklama |
|---|---|---|---|
| Ana Sayfa | `/` | Kozcuoğlu Nakliyat | Hero, intro, hizmetler, fiyat hesaplama, SSS, SEO içerik |
| Hizmetlerimiz | `/hizmetlerimiz` | Hizmetlerimiz | Tüm hizmetler grid (services.json'dan otomatik) |
| Eşya Depolama | `/esya-depolama` | Eşya Depolama | Depolama tesisi, birimler, fiyatlar, galeri, SSS |
| Çözümlerimiz | `/cozumlerimiz` | Çözümlerimiz | Tüm çözümler grid (solutions.json'dan otomatik) |
| Fiyatlarımız | `/fiyatlarimiz` | Nakliyat Fiyatları | Popüler fiyatlar, kategoriler, tümünü gör |
| Fiyat Hesaplama | `/nakliyat-fiyat-hesaplama` | Nakliyat Fiyat Hesaplama | Tüm hesaplama modülleri |
| Hizmet Bölgeleri | `/hizmet-bolgeleri` | Hizmet Bölgeleri | Tüm bölge sayfaları listesi |
| Hakkımızda | `/hakkimizda` | Hakkımızda | Firma bilgileri, tarihçe, ekip |
| İletişim | `/iletisim` | İletişim | Form, adres, harita, telefon, NAP |
| Blog | `/blog` | Blog | Blog yazıları listesi |
| SSS | `/sikca-sorulan-sorular` | Sıkça Sorulan Sorular | FAQ listesi (JSON-LD ile), TOC |
| Referanslar | `/referanslar` | Referanslar & Projeler | Tamamlanan projeler, müşteri portföyü |
| Araç Filomuz | `/arac-filomuz` | Araç Filomuz | Araç tipleri, kapasiteler, görseller |
| Kampanyalar | `/kampanyalar` | Kampanyalar & İndirimler | Aktif kampanyalar, sezonsal fırsatlar |
| Taşıma Takip | `/tasima-takip` | Taşıma Takip | Müşteri takip portalı (kod ile erişim) |
| Galeri | `/galeri` | Galeri | Resim + Video galerisi |
| Sözleşmeler | `/sozlesmeler` | Sözleşmeler | Nakliyat sözleşme şablonları listesi |
| Referanslarımız | `/referanslarimiz` | Referanslarımız | Kurumsal müşteri logoları |
| Taşıma Kontrol Listesi | `/tasima-kontrol-listesi.html` | Taşıma Kontrol Listesi | İnteraktif checklist (blog formatı, catch-all) |
| Gizlilik Politikası | `/gizlilik-politikasi` | Gizlilik Politikası | KVKK/GDPR uyumlu gizlilik metni |
| Çerez Politikası | `/cerez-politikasi` | Çerez Politikası | Çerez kullanım bilgilendirmesi |
| KVKK Aydınlatma Metni | `/kvkk-aydinlatma-metni` | KVKK Aydınlatma Metni | Kişisel verilerin korunması |
| Kullanım Koşulları | `/kullanim-kosullari` | Kullanım Koşulları | Site kullanım şartları |

### Sözleşme Alt Sayfaları — `/[slug]` (Root'ta, admin'den yönetim)

| Sayfa | URL | Breadcrumb |
|---|---|---|
| Evden Eve Nakliyat Sözleşmesi | `/evden-eve-nakliyat-sozlesmesi` | Kozcuoğlu Nakliyat > Sözleşmeler > Evden Eve Nakliyat Sözleşmesi |
| Ofis Taşıma Sözleşmesi | `/ofis-tasima-sozlesmesi` | Kozcuoğlu Nakliyat > Sözleşmeler > Ofis Taşıma Sözleşmesi |
| Eşya Depolama Sözleşmesi | `/esya-depolama-sozlesmesi` | Kozcuoğlu Nakliyat > Sözleşmeler > Eşya Depolama Sözleşmesi |
| Şehirler Arası Nakliyat Sözleşmesi | `/sehirler-arasi-nakliyat-sozlesmesi` | Kozcuoğlu Nakliyat > Sözleşmeler > Şehirler Arası Nakliyat Sözleşmesi |
| Sigorta Taahhütnamesi | `/sigorta-taahutnamesi` | Kozcuoğlu Nakliyat > Sözleşmeler > Sigorta Taahhütnamesi |

> Sözleşmeler admin panelden yönetilir (`contracts.json`). Sözleşme alt sayfaları ön ek olmadan root'ta açılır (`/evden-eve-nakliyat-sozlesmesi`). Slug benzersizlik kontrolüne dahildir.

### Hizmet Alt Sayfaları — `/[slug]` (Dinamik, admin'den yönetim)

| Sayfa | URL | Breadcrumb |
|---|---|---|
| Evden Eve Nakliyat | `/evden-eve-nakliyat` | Kozcuoğlu Nakliyat > Hizmetlerimiz > Evden Eve Nakliyat |
| Ofis Taşıma | `/ofis-tasima` | Kozcuoğlu Nakliyat > Hizmetlerimiz > Ofis Taşıma |
| Ev Taşıma | `/ev-tasima` | Kozcuoğlu Nakliyat > Hizmetlerimiz > Ev Taşıma |
| Parça Eşya Taşıma | `/parca-esya-tasima` | Kozcuoğlu Nakliyat > Hizmetlerimiz > Parça Eşya Taşıma |
| Şehirler Arası Nakliyat | `/sehirler-arasi-nakliyat` | Kozcuoğlu Nakliyat > Hizmetlerimiz > Şehirler Arası Nakliyat |

> Admin panelden yeni hizmet eklendiğinde otomatik olarak `/[yeni-slug]` oluşur. Ana sayfa ve Hizmetlerimiz sayfasındaki grid otomatik güncellenir.

### Eşya Depolama — `/esya-depolama` (Bağımsız Ana Bölüm)

Eşya depolama tesisi olduğu için Hizmetlerimiz'den ayrı, kendi özel yapısına sahip:

| Sayfa | URL | Açıklama |
|---|---|---|
| Eşya Depolama Ana | `/esya-depolama` | Tesis tanıtımı, birimler, fiyatlar, galeri |

> **Neden ayrı?** Fiziksel bir depolama tesisi var. Bu sayfa; tesis görselleri/galeri, depolama birimi tipleri (küçük/orta/büyük), aylık fiyat tablosu, güvenlik özellikleri (kamera, nem kontrolü, sigorta), SSS ve yorum gibi depolamaya özel bileşenler içerir.

### Çözüm Alt Sayfaları — `/[slug]` (Dinamik, admin'den yönetim)

| Sayfa | URL | Breadcrumb |
|---|---|---|
| Asansörlü Nakliyat | `/asansorlu-nakliyat` | Kozcuoğlu Nakliyat > Çözümlerimiz > Asansörlü Nakliyat |
| Ambalajlama & Paketleme | `/ambalajlama-paketleme` | Kozcuoğlu Nakliyat > Çözümlerimiz > Ambalajlama & Paketleme |
| Mobilya Montaj/Demontaj | `/mobilya-montaj-demontaj` | Kozcuoğlu Nakliyat > Çözümlerimiz > Mobilya Montaj/Demontaj |
| Sigortalı Taşıma | `/sigortali-tasima` | Kozcuoğlu Nakliyat > Çözümlerimiz > Sigortalı Taşıma |

> Admin panelden yeni çözüm eklendiğinde otomatik olarak `/[yeni-slug]` oluşur. Ana sayfa ve Çözümlerimiz sayfasındaki grid otomatik güncellenir.

### Hizmet Bölgeleri — İstanbul İlçeleri (Örnek)

| Sayfa | URL | Schema areaServed |
|---|---|---|
| Bostancı Evden Eve Nakliyat | `/bostanci-evden-eve-nakliyat.html` | Place: Bostancı, İstanbul |
| Kartal Evden Eve Nakliyat | `/kartal-evden-eve-nakliyat.html` | Place: Kartal, İstanbul |
| Pendik Evden Eve Nakliyat | `/pendik-evden-eve-nakliyat.html` | Place: Pendik, İstanbul |
| Kadıköy Evden Eve Nakliyat | `/kadikoy-evden-eve-nakliyat.html` | Place: Kadıköy, İstanbul |
| Maltepe Evden Eve Nakliyat | `/maltepe-evden-eve-nakliyat.html` | Place: Maltepe, İstanbul |
| Ataşehir Evden Eve Nakliyat | `/atasehir-evden-eve-nakliyat.html` | Place: Ataşehir, İstanbul |
| Üsküdar Evden Eve Nakliyat | `/uskudar-evden-eve-nakliyat.html` | Place: Üsküdar, İstanbul |
| Beşiktaş Evden Eve Nakliyat | `/besiktas-evden-eve-nakliyat.html` | Place: Beşiktaş, İstanbul |

### Hizmet Bölgeleri — Şehirler Arası (Örnek)

| Sayfa | URL | Schema areaServed |
|---|---|---|
| İstanbul Ankara Evden Eve Nakliyat | `/istanbul-ankara-evden-eve-nakliyat.html` | [City: İstanbul, City: Ankara] |
| İstanbul İzmir Evden Eve Nakliyat | `/istanbul-izmir-evden-eve-nakliyat.html` | [City: İstanbul, City: İzmir] |
| İstanbul Bursa Evden Eve Nakliyat | `/istanbul-bursa-evden-eve-nakliyat.html` | [City: İstanbul, City: Bursa] |
| İstanbul Antalya Evden Eve Nakliyat | `/istanbul-antalya-evden-eve-nakliyat.html` | [City: İstanbul, City: Antalya] |
| İstanbul Eskişehir Evden Eve Nakliyat | `/istanbul-eskisehir-evden-eve-nakliyat.html` | [City: İstanbul, City: Eskişehir] |
| İstanbul Trabzon Evden Eve Nakliyat | `/istanbul-trabzon-evden-eve-nakliyat.html` | [City: İstanbul, City: Trabzon] |
| İstanbul Konya Evden Eve Nakliyat | `/istanbul-konya-evden-eve-nakliyat.html` | [City: İstanbul, City: Konya] |
| İstanbul Adana Evden Eve Nakliyat | `/istanbul-adana-evden-eve-nakliyat.html` | [City: İstanbul, City: Adana] |

> **İlçe vs Şehirler Arası Farkı:**
> - İlçe sayfaları: `serviceType: "Evden Eve Nakliyat"`, `areaServed: Place (tek ilçe)`
> - Şehirler arası sayfaları: `serviceType: "Şehirler Arası Nakliyat"`, `areaServed: [City, City] (iki şehir)`
> - Her iki tip de admin panelden yönetilir, `regions.json`'da `type: "ilce"` veya `type: "sehirlerarasi"` alanı ile ayrılır
> - Tüm bölge sayfalarında TOC + SSS + Yorumlar + Fiyat Hesaplama bulunur

### Blog Yazıları (Örnek)

| Yazı | URL |
|---|---|
| Evden Eve Nakliyat Nedir | `/evden-eve-nakliyat-nedir.html` |
| Nakliyat Fiyatları 2026 | `/nakliyat-fiyatlari-2026.html` |
| Ofis Taşıma Rehberi | `/ofis-tasima-rehberi.html` |
| Ev Taşırken Dikkat Edilmesi Gerekenler | `/ev-tasirken-dikkat-edilmesi-gerekenler.html` |

> Blog yazıları admin panelinden yönetilir. Her blog yazısında TOC + yorumlar bulunur.

### Blog Pagination & Kategori
- **Sayfa başına:** 12 yazı (admin'den değiştirilebilir: 6, 9, 12, 15)
- **URL formatı:** `/blog?page=2`, `/blog?page=3` (query string)
- **Kategori filtre:** `/blog?kategori=rehber`, `/blog?kategori=fiyat`
- **Birleşik:** `/blog?kategori=rehber&page=2`
- **SEO:** `rel="canonical"` her zaman `/blog` (filtreli sayfalar canonical'a işaret eder)
- **Kategoriler:** `settings.json → blogCategories` dizisinden çekilir (admin'den yönetilir)
- **Varsayılan kategoriler:** Rehber, Fiyat, İpucu, Checklist, Karşılaştırma, Bölge, Sezonsal, Sigorta

### Admin Panel Sayfaları

| Sayfa | URL | Açıklama |
|---|---|---|
| Admin Giriş | `/admin` | Login sayfası |
| Dashboard | `/admin/dashboard` | Genel bakış |
| Hizmetler | `/admin/services` | Hizmetlerimiz alt sayfaları CRUD |
| Çözümler | `/admin/solutions` | Çözümlerimiz alt sayfaları CRUD |
| Hizmet Bölgeleri | `/admin/regions` | Hizmet bölgeleri CRUD |
| Blog Yönetimi | `/admin/blog` | Blog yazıları CRUD |
| Yorumlar | `/admin/reviews` | Yorum onay/sil/düzenle |
| Fiyat Modülleri | `/admin/pricing` | Hesaplama modülleri yönetimi |
| Sayfalar | `/admin/pages` | Sayfa içerik yönetimi |
| İletişim Formları | `/admin/messages` | Gelen mesajlar |
| Ayarlar | `/admin/settings` | Site ayarları, NAP bilgileri |
| Keşif Talepleri | `/admin/surveys` | Keşif talep yönetimi (durum takibi) |
| Taşıma Takip | `/admin/tracking` | Taşıma süreç takibi |
| Projeler | `/admin/projects` | Tamamlanan projeler (referans işler) |
| Araç Filosu | `/admin/fleet` | Araç filosu yönetimi |
| Kampanyalar | `/admin/campaigns` | Kampanya yönetimi |
| Galeri | `/admin/gallery` | Resim + Video galeri yönetimi |
| Sözleşmeler | `/admin/contracts` | Sözleşme şablonları yönetimi |
| Referanslarımız | `/admin/clients` | Kurumsal müşteri logoları |
| Yıldızlama | `/admin/ratings` | Sayfa bazlı AggregateRating (manuel/otomatik) |
| İç Linkleme | `/admin/internal-links` | Otomatik iç linkleme kuralları |
| 301 & 404 Yönetimi | `/admin/redirects` | 301 yönlendirme CRUD + 404 log yönetimi |

### Sistem Sayfaları

| Sayfa | URL | Açıklama |
|---|---|---|
| 404 | `/404` | Özel 404 sayfası |
| Sitemap | `/sitemap.xml` | Dinamik sitemap |
| Robots | `/robots.txt` | Crawler kuralları |
| Manifest | `/manifest.json` | PWA manifest |
| llms.txt | `/llms.txt` | GEO — AI/LLM crawlerlar için site özeti |
| llms-full.txt | `/llms-full.txt` | GEO — AI/LLM crawlerlar için detaylı site bilgisi |
| Offline | `/offline` | PWA offline fallback sayfası |

## Breadcrumbs (Ekmek Kırıntısı)

### Genel Kurallar
- İlk eleman her zaman **"Kozcuoğlu Nakliyat"** (Ana Sayfa linki, `/`)
- Son eleman aktif sayfa (link değil, metin)
- JSON-LD `BreadcrumbList` şeması ile desteklenir
- Tüm sayfalarda hero altında görünür
- Mobilde de görünür (tek satır, overflow scroll)

### Breadcrumb Örnekleri

| Sayfa | Breadcrumb |
|---|---|
| Ana Sayfa | — (breadcrumb gösterilmez) |
| Hizmetlerimiz | Kozcuoğlu Nakliyat > **Hizmetlerimiz** |
| Evden Eve Nakliyat (`/evden-eve-nakliyat`) | Kozcuoğlu Nakliyat > Hizmetlerimiz > **Evden Eve Nakliyat** |
| Eşya Depolama | Kozcuoğlu Nakliyat > **Eşya Depolama** |
| Çözümlerimiz | Kozcuoğlu Nakliyat > **Çözümlerimiz** |
| Asansörlü Nakliyat (`/asansorlu-nakliyat`) | Kozcuoğlu Nakliyat > Çözümlerimiz > **Asansörlü Nakliyat** |
| Fiyatlarımız | Kozcuoğlu Nakliyat > **Fiyatlarımız** |
| Hizmet Bölgeleri | Kozcuoğlu Nakliyat > **Hizmet Bölgeleri** |
| Bostancı Evden Eve | Kozcuoğlu Nakliyat > Hizmet Bölgeleri > **Bostancı Evden Eve Nakliyat** |
| Blog | Kozcuoğlu Nakliyat > **Blog** |
| Blog Yazısı | Kozcuoğlu Nakliyat > Blog > **Yazı Başlığı** |
| Hakkımızda | Kozcuoğlu Nakliyat > **Hakkımızda** |
| İletişim | Kozcuoğlu Nakliyat > **İletişim** |
| SSS | Kozcuoğlu Nakliyat > **Sıkça Sorulan Sorular** |
| Referanslar | Kozcuoğlu Nakliyat > **Referanslar** |
| Araç Filomuz | Kozcuoğlu Nakliyat > **Araç Filomuz** |
| Kampanyalar | Kozcuoğlu Nakliyat > **Kampanyalar** |
| Galeri | Kozcuoğlu Nakliyat > **Galeri** |
| Sözleşmeler | Kozcuoğlu Nakliyat > **Sözleşmeler** |
| Sözleşme Alt (`/evden-eve-nakliyat-sozlesmesi`) | Kozcuoğlu Nakliyat > Sözleşmeler > **Evden Eve Nakliyat Sözleşmesi** |
| Referanslarımız | Kozcuoğlu Nakliyat > **Referanslarımız** |
| Taşıma Takip | Kozcuoğlu Nakliyat > **Taşıma Takip** |
| Taşıma Kontrol Listesi | Kozcuoğlu Nakliyat > Blog > **Taşıma Kontrol Listesi** |
| Gizlilik Politikası | Kozcuoğlu Nakliyat > **Gizlilik Politikası** |
| Çerez Politikası | Kozcuoğlu Nakliyat > **Çerez Politikası** |
| KVKK Aydınlatma Metni | Kozcuoğlu Nakliyat > **KVKK Aydınlatma Metni** |
| Kullanım Koşulları | Kozcuoğlu Nakliyat > **Kullanım Koşulları** |

## GEO (Generative Engine Optimization)

AI/LLM crawlerlar (ChatGPT, Gemini, Perplexity vb.) için site bilgisi:

### llms.txt (`/llms.txt`)
```
# Kozcuoğlu Nakliyat

> İstanbul merkezli profesyonel nakliyat firması. Evden eve nakliyat, ofis taşıma, eşya depolama hizmetleri.

## Hizmetlerimiz
- [Evden Eve Nakliyat](/evden-eve-nakliyat)
- [Ofis Taşıma](/ofis-tasima)
- [Ev Taşıma](/ev-tasima)
...

## Çözümlerimiz
- [Asansörlü Nakliyat](/asansorlu-nakliyat)
...

## İletişim
- Müşteri Hizmetleri: 444 7 436
- Telefon: 0216 494 53 37
- GSM + WhatsApp: 0532 138 49 79
- E-Posta: info@kozcuoglunakliyat.com.tr
- Adres: Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul
- Web: https://kozcuoglunakliyat.com.tr
```

### llms-full.txt (`/llms-full.txt`)
- Tüm hizmet, çözüm, bölge sayfalarının başlık + özet listesi
- SSS içerikleri
- Fiyat aralıkları
- İletişim bilgileri

### GEO Kuralları
- `llms.txt` ve `llms-full.txt` build sırasında otomatik oluşturulur (services.json, solutions.json, regions.json, blog-posts.json'dan)
- `robots.txt`'de AI crawlerlar için izin verilir
- Her sayfada `<meta name="description">` AI-friendly, bilgi yoğun olmalı
- Structured data (JSON-LD) AI crawlerlar tarafından da okunur

## Görsel SEO & Yönetimi

### Görseller Lokalde Tutulur
- Tüm görseller `/public/uploads/` altında sunucuda barındırılır
- CDN kullanılmaz (cPanel uyumluluğu için)
- `next/image` ile otomatik optimizasyon (build sırasında)

### Görsel Optimizasyon Pipeline
1. **Upload:** Admin panelde görsel yüklenir
2. **Dönüşüm:** `sharp` ile WebP'ye dönüştürülür
3. **Boyutlandırma:** Responsive srcset için birden fazla boyut oluşturulur (640, 768, 1024, 1280px)
4. **Sıkıştırma:** Kalite %80, max 100KB hedef
5. **İsimlendirme:** SEO uyumlu otomatik dosya adı (Örn: `istanbul-evden-eve-nakliyat-640w.webp`)
6. **Alt Text:** Admin panelde zorunlu alan, anahtar kelime içermeli

### Görsel Klasör Yapısı
```
public/uploads/
├── services/          → Hizmet görselleri
├── solutions/         → Çözüm görselleri
├── blog/              → Blog görselleri
├── regions/           → Hizmet bölgesi görselleri
├── storage/           → Eşya depolama tesis görselleri
├── gallery/           → Genel galeri
└── og/                → Open Graph görselleri (1200x630)
```

### Görsel HTML Çıktısı
```html
<Image
  src="/uploads/services/evden-eve-nakliyat.webp"
  alt="İstanbul evden eve nakliyat hizmeti - Kozcuoğlu Nakliyat"
  width={800}
  height={600}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

## Yorum Sistemi (Review System)

Tüm sayfalarda çalışan, Rich Snippets destekli yorum sistemi:

| Özellik | Detay |
|---|---|
| **Yıldızlama** | 1-5 yıldız, tıklanabilir |
| **Yorum Formu** | Ad, yıldız puanı, yorum metni, hizmet tipi |
| **Admin Onayı** | Yorumlar admin panelden onaylanır, sonra yayınlanır |
| **Schema** | `Review` + `AggregateRating` → Google'da yıldız görünür |
| **Rich Snippets** | ⭐ 4.9 (120 değerlendirme) arama sonuçlarında |

### Yorum Çalışacağı Sayfalar
- Ana sayfa (genel yorumlar)
- Hizmet sayfaları (Evden Eve, Ofis, Ev Taşıma, Parça Eşya vb.)
- Çözüm sayfaları (Asansörlü, Ambalajlama vb.)
- Hizmet bölgeleri sayfaları (Bostancı, Kartal vb.)
- Blog yazıları

### Yorum Veri Yapısı
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

## NAP Tutarlılığı (Name, Address, Phone)

Tüm sayfalarda tutarlı NAP bilgisi:

| Bilgi | Değer | Gösterim Yeri |
|---|---|---|
| **Name** | Kozcuoğlu Nakliyat | Header, Footer, Schema, tüm sayfalar |
| **Address** | Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul | Footer, İletişim, Schema |
| **Phone** | 444 7 436 (Müşteri Hizmetleri) | Header, Footer, İletişim, Schema, Sticky CTA |
| **Phone 2** | 0216 494 53 37 (Sabit) | Footer, İletişim, Schema |
| **GSM** | 0532 138 49 79 (WhatsApp) | Header, Footer, İletişim, WhatsApp butonu, Sticky CTA |
| **Email** | info@kozcuoglunakliyat.com.tr | Footer, İletişim, Schema |

- Footer'da her sayfada NAP bilgisi görünür
- Schema (LocalBusiness, Organization) ile NAP doğrulanır
- Google Business Profile ile NAP eşleşir
- Tüm dış platformlarda (Yandex, Bing Places, sosyal medya) aynı NAP

## TOC (Table of Contents)

Tüm sayfalarda ve yazılarda otomatik TOC oluşturulur:

- Heading'lerden (h2, h3) otomatik oluşturulur
- Sayfanın üst kısmında gösterilir
- Tıklanabilir anchor linkler (`#baslik-adi`)
- Smooth scroll animasyonu
- Masaüstünde sticky sidebar TOC
- Mobilde açılır/kapanır TOC
- Google'da "Jump to" linkleri olarak görünebilir

### TOC Uygulanacak Sayfalar
- Hizmet sayfaları (Evden Eve, Ofis, Ev Taşıma, Parça Eşya vb.)
- Çözüm sayfaları (Asansörlü, Ambalajlama vb.)
- Hizmet bölgeleri sayfaları (Bostancı, Kartal vb.)
- Blog yazıları
- SSS sayfası
- Hakkımızda sayfası
- Fiyatlarımız sayfası

## Sayfa Bölümleri (Sections)

### Ana Sayfa Bölümleri
1. **Hero** — Başlık, açıklama, CTA butonları, arka plan görsel, trust badges
2. **Kampanya Banner** — Aktif kampanya varsa hero altında banner (admin'den yönetim, `campaigns.json` → `showOnHomepage: true`)
3. **Intro** — h2 başlık + 2-3 cümle tanıtım paragrafı (SEO destekli, admin'den düzenlenebilir)
4. **Hizmetlerimiz** — Hizmet kartları grid (`services.json`'dan otomatik çekilir, admin'den eklenen her hizmet burada görünür)
5. **Neden Biz** — 6 avantaj ikonu (Sigorta, 7/24, Profesyonel Ekip, Zamanında, Uygun Fiyat, Deneyim)
6. **Fiyat Hesaplama** — Tab ile tüm hesaplama modülleri
7. **Süreç** — Adım adım nasıl çalışıyoruz (8 adım: Keşif → Teklif → Planlama → Ambalajlama → Yükleme → Taşıma → Montaj → Teslim)
8. **Çözümlerimiz** — Çözüm kartları grid (`solutions.json`'dan otomatik çekilir, admin'den eklenen her çözüm burada görünür)
9. **Galeri** — `gallery.json`'dan "ana sayfada göster" işaretli görseller (admin'den sayı seçilebilir: 4/6/8/12, layout: grid/masonry/carousel, "Tümünü Gör" → `/galeri`)
10. **Hizmet Bölgeleri** — Bölge kartları / linkleri
11. **İstatistikler** — Sayaç animasyonu (10.000+ müşteri, 15.000+ taşıma, 50+ araç, 15+ yıl)
12. **Referanslarımız** — Kurumsal müşteri logoları slider (`clients.json`'dan otomatik, grayscale → hover'da renkli, "Tümünü Gör" → `/referanslarimiz`)
13. **Yorumlar** — Müşteri yorumları slider (yıldızlı, Rich Snippets, AggregateRating)
14. **SSS** — Accordion ile 6-8 soru (FAQPage JSON-LD)
15. **Blog Önizleme** — Son 3 blog yazısı kartı
16. **CTA Bölümü** — Son çağrı, WhatsApp + Telefon + Keşif Talep butonları
17. **SEO İçerik Alanı** — 1500+ kelime, h2-h3 yapılı, TOC'lu, internal linkler (footer üstü)

> **SEO İçerik Alanı Detayı:** Footer'ın hemen üstünde geniş alan. "Kozcuoğlu Nakliyat Hakkında" (h2) başlığı altında alt başlıklar: Evden Eve Nakliyat Hizmetimiz, Ofis Taşıma Çözümlerimiz, Hizmet Verdiğimiz Bölgeler, Nakliyat Sürecimiz, Neden Kozcuoğlu Nakliyat? — Beyaz zemin, 2 kolon (masaüstü), temiz tipografi, internal linkler.

### Hizmetlerimiz Sayfası Bölümleri (`/hizmetlerimiz`)
1. **Hero** — "Hizmetlerimiz" başlığı, açıklama
2. **Hizmet Kartları Grid** — `services.json`'dan otomatik çekilir. Admin'den eklenen her hizmet burada kart olarak görünür. Kart tıklanınca `/[slug]`'a gider.
3. **CTA** — İletişim çağrısı

### Hizmet Alt Sayfası Bölümleri (Evden Eve, Ofis, Ev Taşıma vb.)
1. **Hero** — Hizmet başlığı, açıklama, CTA
2. **TOC** — İçindekiler tablosu
3. **Hizmet Detayı** — İçerik, özellikler
4. **Süreç** — Bu hizmette nasıl çalışıyoruz
5. **Fiyat Hesaplama** — İlgili hesaplama modülü
6. **SSS** — Hizmete özel sorular
7. **Yorumlar** — Hizmete özel müşteri yorumları (yıldızlı)
8. **CTA** — İletişim çağrısı

### Eşya Depolama Sayfası Bölümleri (`/esya-depolama`)
1. **Hero** — "Eşya Depolama" başlığı, açıklama, CTA
2. **TOC** — İçindekiler tablosu
3. **Tesis Tanıtımı** — Depolama tesisi hakkında genel bilgi, konum
4. **Depolama Birimleri** — Birim tipleri kartları (Küçük/Orta/Büyük/Özel), boyut, kapasite
5. **Fiyat Tablosu** — Aylık depolama fiyatları (birim tipine göre)
6. **Galeri** — Tesis fotoğrafları (lightbox, lazy load)
7. **Güvenlik & Özellikler** — 7/24 kamera, nem/sıcaklık kontrolü, sigorta, yangın sistemi
8. **Süreç** — Depolama süreci (Keşif → Paketleme → Taşıma → Depolama → Teslim)
9. **SSS** — Depolamaya özel sorular
10. **Yorumlar** — Depolama müşteri yorumları (yıldızlı)
11. **CTA** — İletişim çağrısı

### Çözümlerimiz Sayfası Bölümleri (`/cozumlerimiz`)
1. **Hero** — "Çözümlerimiz" başlığı, açıklama
2. **Çözüm Kartları Grid** — `solutions.json`'dan otomatik çekilir. Admin'den eklenen her çözüm burada kart olarak görünür. Kart tıklanınca `/[slug]`'a gider.
3. **CTA** — İletişim çağrısı

### Çözüm Alt Sayfası Bölümleri (Asansörlü, Ambalajlama vb.)
1. **Hero** — Çözüm başlığı, açıklama, CTA
2. **TOC** — İçindekiler tablosu
3. **Çözüm Detayı** — İçerik, özellikler
4. **SSS** — Çözüme özel sorular
5. **Yorumlar** — Çözüme özel müşteri yorumları (yıldızlı)
6. **CTA** — İletişim çağrısı

### Fiyatlarımız Sayfası Bölümleri
1. **Hero** — "Nakliyat Fiyatları" başlığı, açıklama
2. **TOC** — İçindekiler tablosu
3. **Popüler Ev Taşıma Fiyatları** — En çok sorulan 3-4 fiyat kartı + "Tümünü Gör" → `/ev-tasima`
4. **Popüler Ofis Taşıma Fiyatları** — En çok sorulan 3-4 fiyat kartı + "Tümünü Gör" → `/ofis-tasima`
5. **Popüler Parça Eşya Fiyatları** — En çok sorulan 3-4 fiyat kartı + "Tümünü Gör" → `/parca-esya-tasima`
6. **Fiyat Hesaplama** — Tüm modüller tab ile
7. **SSS** — Fiyat ile ilgili sorular
8. **CTA** — İletişim çağrısı

### Hizmet Bölgesi Sayfası Bölümleri
1. **Hero** — Bölge + hizmet başlığı, açıklama, CTA
2. **TOC** — İçindekiler tablosu
3. **Bölge Hizmet Detayı** — Bölgeye özel içerik
4. **Fiyat Hesaplama** — İlgili hesaplama modülü
5. **SSS** — Bölgeye özel sorular
6. **Yorumlar** — Bölgeye özel müşteri yorumları (yıldızlı)
7. **CTA** — İletişim çağrısı

### Blog Yazısı Bölümleri
1. **Başlık + Meta** — Yazar, tarih, kategori
2. **TOC** — İçindekiler tablosu
3. **İçerik** — Yazı gövdesi
4. **Yorumlar** — Yazıya özel yorumlar (yıldızlı)
5. **İlgili Yazılar** — Benzer blog yazıları
6. **CTA** — Hizmet çağrısı

### İletişim Sayfası Bölümleri
1. **Hero** — "İletişim" başlığı
2. **NAP Bilgileri** — Firma adı, adres, telefon, e-posta (Schema ile)
3. **İletişim Formu** — Ad, e-posta, telefon, mesaj, hizmet tipi
4. **Google Maps** — Harita embed (lazy load)
   - **Yöntem:** Google Maps Embed API (API key gerektirmez, ücretsiz)
   - **Kaynak:** `settings.json → nap.coordinates` (lat/lng) kullanılır
   - **Lazy load:** `loading="lazy"` attribute ile viewport'a girince yüklenir
   - **Fallback:** Maps yüklenemezse statik harita görseli + "Google Maps'te Aç" linki
   - **Iframe:** `<iframe src="https://www.google.com/maps/embed?pb=..." loading="lazy" />`
5. **Çalışma Saatleri** — OpeningHoursSpecification ile
6. **Sosyal Medya** — Sosyal medya linkleri

### Galeri Sayfası Bölümleri (`/galeri`)
1. **Hero** — "Galeri" başlığı, açıklama
2. **Kategori Filtreleme** — Tab veya buton grubu: Tümü, Nakliyat, Depolama, Araç, Ofis (admin'den kategori eklenir)
3. **Resim Galerisi** — Grid layout (masonry veya düz grid), lightbox ile büyütme, lazy load
4. **Video Galerisi** — YouTube/Vimeo embed kartları, thumbnail + play butonu
5. **CTA** — "Ücretsiz Keşif Talep Et" çağrısı

> Galeri admin panelden yönetilir (`gallery.json`). Her görselin başlık, alt text, kategori, sıra ve "ana sayfada göster" alanları vardır. Ana sayfada gösterilecek resim sayısı ve layout tipi admin'den seçilir.

### Galeri Filtreleme & Pagination
- **Kategori filtre:** URL'de query string: `/galeri?kategori=nakliyat`
- **Pagination:** `/galeri?page=2` (sayfa başına 20 öğe)
- **Birleşik:** `/galeri?kategori=depolama&page=2`
- **SEO:** Galeri sayfası `noindex` değil, ama filtreli/sayfalanmış sayfalar `canonical` olarak `/galeri`'ye işaret eder
- **Lightbox:** Resim tıklandığında tam ekran lightbox (ok tuşları ile gezinme, ESC ile kapat)
- **Video:** YouTube/Vimeo thumbnail tıklandığında modal içinde embed player açılır

### Sözleşmeler Sayfası Bölümleri (`/sozlesmeler`)
1. **Hero** — "Sözleşmeler" başlığı, açıklama
2. **Sözleşme Listesi** — Kart grid: her sözleşme için başlık, kısa açıklama, ilgili hizmet, PDF indirme ikonu
3. **CTA** — İletişim çağrısı

### Sözleşme Alt Sayfası Bölümleri (`/[slug]` — root'ta)
1. **Hero** — Sözleşme başlığı
2. **Aksiyon Butonları** — Sözleşme üstünde sabit bar:
   - 🖨️ **Yazdır** — `window.print()` ile tarayıcı yazdırma (print-friendly CSS)
   - 📤 **Paylaş** — Web Share API (mobil) veya URL kopyala (masaüstü) + WhatsApp/E-posta paylaş
   - 📄 **PDF İndir** — Sunucu tarafında hazır PDF varsa direkt indir, yoksa `html2pdf.js` ile oluştur
   - 📝 **Word İndir** — `html-docx-js` ile .docx olarak indir
3. **TOC** — İçindekiler tablosu (sidebar'da)
4. **Sözleşme İçeriği** — Rich text, maddeler halinde sözleşme metni
5. **İlgili Hizmet** — İlişkili hizmet sayfasına link
6. **CTA** — İletişim çağrısı

### Referanslarımız Sayfası Bölümleri (`/referanslarimiz`)
1. **Hero** — "Referanslarımız" başlığı, "Güvenilir kurumsal müşterilerimiz" açıklaması
2. **Müşteri Logoları Grid** — Kurumsal müşteri logoları grid (4-6 kolon masaüstü, 2-3 kolon mobil)
   - Her logo: şeffaf PNG/SVG, grayscale varsayılan, hover'da renkli
   - Firma adı tooltip olarak görünür
   - Admin panelden sıralama ve göster/gizle kontrolü
3. **İstatistik** — "500+ Kurumsal Müşteri" gibi sayaç
4. **CTA** — "Siz de Kurumsal Müşterimiz Olun" çağrısı

> Referanslarımız admin panelden yönetilir (`clients.json`). Referanslar sayfası (`/referanslar`) tamamlanan projeler, Referanslarımız sayfası (`/referanslarimiz`) ise kurumsal müşteri logolarıdır. İkisi farklı sayfadır.

## Global Bileşenler (Tüm Sayfalarda)

| Bileşen | Açıklama |
|---|---|
| **Header** | Sticky, logo, mega menü (Hizmetlerimiz + Çözümlerimiz dropdown), CTA buton, telefon |
| **Mega Footer** | 4 katmanlı: CTA bar + 5 kolon (Firma, Hizmetler, Çözümler, Bölgeler, İletişim) + Bölge tam liste + Hukuki & Geliştirici |
| **WhatsApp Butonu** | Sabit sağ alt, yeşil, pulse animasyonu → `0532 138 49 79` |
| **Telefon Butonu** | Mobilde WhatsApp yanında → `444 7 436` |
| **Sticky CTA Bar** | Mobilde altta sabit bar: "Ara" (444 7 436) + "WhatsApp" (0532 138 49 79) |
| **Back to Top** | Uzun sayfalarda yukarı çık butonu |
| **Cookie Banner** | KVKK/GDPR uyumlu çerez bildirimi (detay aşağıda) |
| **Trust Badges** | Sigorta, lisans, güvenli taşıma rozetleri |
| **Breadcrumbs** | Tüm sayfalarda (ana sayfa hariç), JSON-LD destekli |

### Footer Geliştirici Bilgisi

Footer'ın en altında, sağ tarafta:

- **Logo:** Koyu footer → `https://karakar.web.tr/KARAKAR-Web-Logo-2.webp`, Açık footer → `https://karakar.web.tr/KARAKAR-Web-Logo-1.webp`
- **Link:** `<a href="https://karakar.web.tr" title="web tasarım" rel="noopener">` (anchor text: "web tasarım")
- **Hover Popup:** Logo üzerine gelince tooltip/popup açılır:
  - Başlık: **KARAKAR Web Tasarım ve Yazılım Ajansı**
  - Alt metin: *Bu Proje "Kozcuoğlu Nakliyat" için özel ve özenle tasarlanmıştır.*
- **Konum:** Footer bottom bar, sağ hizalı

---

# NAKLİYAT SEKTÖRÜNE ÖZEL ÖZELLİKLER

> Aşağıdaki özellikler bir evden eve nakliyat firmasında **mutlaka** olması gereken, müşteri güvenini artıran ve dönüşüm oranını yükselten sektörel gereksinimlerdir.

## Ücretsiz Keşif & Online Teklif Sistemi

### Keşif Talep Formu (Tüm Sayfalarda CTA)
Müşterinin "ücretsiz keşif" talep etmesi nakliyat sektöründe en kritik dönüşüm noktasıdır.

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| Ad Soyad | Text | ✓ | Min 2 karakter |
| Telefon | Tel | ✓ | 05XX formatı |
| Mevcut Adres (İl/İlçe) | Select | ✓ | İl → İlçe bağımlı |
| Yeni Adres (İl/İlçe) | Select | ✓ | İl → İlçe bağımlı |
| Ev Tipi | Select | ✓ | 1+0, 1+1, 2+1, 3+1, 4+1, 5+1, Villa |
| Taşıma Tarihi | Date | ✓ | Min bugün+1 gün |
| Kat (Mevcut) | Number | ✓ | 0-30 |
| Kat (Yeni) | Number | ✓ | 0-30 |
| Asansör (Mevcut) | Toggle | ✓ | Var/Yok |
| Asansör (Yeni) | Toggle | ✓ | Var/Yok |
| Ek Notlar | Textarea | ✗ | İsteğe bağlı |
| Honeypot | Hidden | — | Bot koruması |

### Keşif Talep Akışı
1. Müşteri formu doldurur
2. API → `survey-requests.json`'a kayıt + admin'e e-posta (SMTP)
3. Müşteriye WhatsApp otomatik mesaj: "Talebiniz alındı, en kısa sürede dönüş yapacağız"
4. Admin panelde "Keşif Talepleri" listesi → Durum: Yeni / İletişime Geçildi / Keşif Yapıldı / Teklif Verildi / Onaylandı / İptal
5. Admin notlar ekleyebilir, tarih atayabilir

### Keşif CTA Butonları (Her Sayfada)
- Hero bölümünde: **"Ücretsiz Keşif Talep Et"** (primary buton)
- Sticky CTA bar'da: **"Keşif"** butonu (mobilde)
- Fiyat hesaplama sonucunda: **"Keşif İste"** butonu
- Sayfa sonlarında CTA bölümünde

> **SEO Etkisi:** "ücretsiz keşif", "nakliyat teklif al" gibi yüksek dönüşümlü anahtar kelimeler hedeflenir.

## Taşıma Takip Sistemi (Müşteri Portalı)

### URL: `/tasima-takip`

Müşterinin taşıma sürecini takip edebileceği basit bir portal:

| Adım | Durum | Açıklama |
|---|---|---|
| 1. Keşif Talebi | ✅ Tamamlandı | Keşif talep edildi |
| 2. Keşif | ✅ Tamamlandı | Ekibimiz keşif yaptı |
| 3. Teklif | ✅ Tamamlandı | Fiyat teklifi verildi |
| 4. Onay | ✅ Tamamlandı | Müşteri onayladı |
| 5. Paketleme | 🔄 Devam Ediyor | Eşyalar paketleniyor |
| 6. Yükleme | ⏳ Bekliyor | — |
| 7. Taşıma | ⏳ Bekliyor | — |
| 8. Teslim | ⏳ Bekliyor | — |

### Erişim
- Müşteriye SMS/WhatsApp ile takip kodu gönderilir
- `/tasima-takip?kod=XXXX` ile erişim
- Admin panelden durum güncellenir (`tracking.json`)
- Durum değiştiğinde müşteriye otomatik WhatsApp bildirimi

> **Güven Sinyali:** "Taşımanızı canlı takip edin" → Rakiplerden ayrışma, E-E-A-T Trust sinyali.

## Taşıma Kontrol Listesi (Checklist)

### URL: `/tasima-kontrol-listesi.html` (Blog formatı)

Müşterinin taşınma öncesi, sırası ve sonrası yapması gerekenleri listeleyen interaktif checklist:

### Taşınma Öncesi (2 Hafta)
- [ ] Nakliyat firması araştır ve teklif al
- [ ] Taşıma sigortası yaptır
- [ ] Gereksiz eşyaları ayıkla (sat, bağışla, at)
- [ ] Değerli eşyaların listesini çıkar
- [ ] Yeni adresin elektrik, su, doğalgaz aboneliğini aç
- [ ] Eski adresin aboneliklerini kapat/taşı
- [ ] Ambalaj malzemesi temin et (veya firmadan iste)

### Taşınma Günü
- [ ] Değerli eşyaları (takı, belge, para) kendin taşı
- [ ] Eşya listesini nakliyat ekibiyle kontrol et
- [ ] Eski evi son kez kontrol et (dolap, çekmece, balkon)
- [ ] Yeni evde eşya yerleşim planını ekibe göster
- [ ] Taşıma sonrası eşya sayımı yap

### Taşınma Sonrası
- [ ] Hasarlı eşya varsa fotoğrafla ve firmaya bildir
- [ ] Adres değişikliği bildir (banka, iş, okul, SGK)
- [ ] Komşularla tanış
- [ ] Yorum bırak ⭐

> **SEO Etkisi:** "taşınma kontrol listesi", "ev taşırken yapılacaklar" → Featured Snippet hedefi. Interaktif checklist kullanıcı etkileşimini artırır → düşük bounce rate.

## Referanslar & Tamamlanan Projeler

### URL: `/referanslar`

Gerçek taşıma projelerinin gösterildiği portföy sayfası:

### Proje Kartı İçeriği
- Proje görseli (önce/sonra veya taşıma süreci)
- Müşteri adı (izinli ise)
- Taşıma tipi (Evden Eve / Ofis / Şehirler Arası)
- Nereden → Nereye
- Tarih
- Müşteri yorumu (kısa)
- Yıldız puanı

### Admin Panelde
- `projects.json` → Proje ekleme/düzenleme
- Görsel yükleme (önce/sonra)
- Müşteri izni checkbox

> **E-E-A-T Experience:** Gerçek projeler = gerçek deneyim kanıtı. Google bunu çok sever.

## Araç Filomuz

### URL: `/arac-filomuz`

Firmanın araç filosunun gösterildiği sayfa:

| Araç Tipi | Kapasite | Kullanım |
|---|---|---|
| Panelvan | 1+0, 1+1 ev | Parça eşya, küçük taşıma |
| Kamyonet | 1+1, 2+1 ev | Standart ev taşıma |
| Kamyon (Kapalı Kasa) | 2+1, 3+1 ev | Büyük ev taşıma |
| TIR | 4+1+ ev, ofis | Büyük ofis, villa, şehirler arası |
| Asansörlü Araç | Tüm katlar | Dış cephe asansörü |

### Araç Kartı İçeriği
- Araç görseli
- Araç tipi ve modeli
- Kapasite (m³ ve ev tipi)
- Özellikler (kapalı kasa, hava süspansiyon, GPS takip)

> **Güven Sinyali:** "50+ araçlık filo" → Trust badge'i destekler. Araç görselleri E-E-A-T Experience.

## Sigorta Bilgilendirme

### Her Hizmet Sayfasında Sigorta Bölümü

Nakliyat sigortası müşterinin en büyük endişesidir. Her hizmet sayfasında:

- **Sigorta Kapsamı:** Hangi eşyalar sigorta kapsamında
- **Sigorta Limiti:** Maksimum teminat tutarı
- **Hasar Süreci:** Hasar durumunda ne yapılır (adım adım)
- **Sigorta Belgesi:** Örnek sigorta poliçesi görseli
- **Sigorta Ortağı:** Anlaşmalı sigorta şirketi logosu

### Sigorta SSS (Her Hizmet Sayfasında)
- "Nakliyat sigortası neleri kapsar?"
- "Hasar durumunda ne yapmalıyım?"
- "Sigorta ücreti ne kadar?"
- "Değerli eşyalar için ek sigorta var mı?"

> **SEO:** "nakliyat sigortası", "eşya taşıma sigortası" → Yüksek arama hacimli anahtar kelimeler.

## Kurumsal Belgeler & Sertifikalar

### Hakkımızda Sayfasında Belgeler Bölümü

| Belge | Açıklama |
|---|---|
| K1 Yetki Belgesi | Karayolu taşımacılık yetki belgesi |
| Ticaret Sicil Gazetesi | Firma tescil belgesi |
| Vergi Levhası | Vergi mükellefiyet belgesi |
| Sigorta Poliçesi | Nakliyat sigorta belgesi |
| İSG Sertifikası | İş sağlığı ve güvenliği |
| TSE Hizmet Yeterlilik | Hizmet kalite belgesi |
| Müşteri Memnuniyeti Ödülü | Varsa ödül belgeleri |

### Gösterim
- Belge görselleri (bulanık/watermark'lı)
- Lightbox ile büyütme
- "Belge doğrulama için iletişime geçin" notu

> **E-E-A-T Authority + Trust:** Resmi belgeler = güvenilirlik kanıtı. Google Quality Raters bu belgeleri arar.

## WhatsApp Entegrasyonu (Gelişmiş)

### Otomatik WhatsApp Mesaj Şablonları

| Tetikleyici | Mesaj |
|---|---|
| Keşif Talebi | "Merhaba {ad}, keşif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz. — Kozcuoğlu Nakliyat" |
| Fiyat Hesaplama | "Merhaba, {hizmet} için tahmini fiyatınız: {fiyat} TL. Detaylı bilgi için: {link}" |
| Taşıma Durumu | "Merhaba {ad}, taşımanızın durumu güncellendi: {durum}. Takip: {link}" |
| Yorum İsteği | "Merhaba {ad}, taşımanız tamamlandı! Deneyiminizi değerlendirir misiniz? {link}" |

### WhatsApp Buton Varyasyonları
- **Genel:** "Bilgi Al" → Standart mesaj
- **Fiyat Hesaplama Sonucu:** "WhatsApp ile Gönder" → Hesaplama sonucunu mesaj olarak gönder
- **Hizmet Sayfası:** "Bu Hizmet Hakkında Bilgi Al" → Hizmet adı otomatik mesajda
- **Bölge Sayfası:** "{Bölge} Nakliyat Teklif Al" → Bölge adı otomatik mesajda

## Acil Nakliyat / Hızlı Taşıma

### Her Hizmet Sayfasında "Acil Nakliyat" Bölümü

- **Aynı gün taşıma** imkanı
- **7/24 hizmet** vurgusu
- **Acil hat:** Direkt telefon numarası (büyük, dikkat çekici)
- **Acil form:** Sadece Ad + Telefon + "Hemen Ara" butonu (minimal, hızlı)

> **SEO:** "acil nakliyat", "bugün taşınmam lazım", "aynı gün nakliyat" → Yüksek dönüşümlü anahtar kelimeler.

## Kampanyalar & Sezonsal İndirimler

### URL: `/kampanyalar`

| Kampanya Tipi | Dönem | Örnek |
|---|---|---|
| Erken Rezervasyon | Sürekli | "30 gün önceden rezervasyon yapana %10 indirim" |
| Hafta İçi | Sürekli | "Hafta içi taşımalarda %15 indirim" |
| Kış Kampanyası | Kasım-Şubat | "Kış aylarında özel fiyatlar" |
| Yaz Kampanyası | Haziran-Ağustos | "Yaz taşıma paketi" |
| Kombi Paket | Sürekli | "Nakliyat + Depolama paketi %20 indirim" |

### Admin Panelde
- `campaigns.json` → Kampanya ekleme/düzenleme
- Başlangıç/bitiş tarihi
- İndirim yüzdesi veya sabit tutar
- Aktif/pasif toggle
- Ana sayfada banner olarak gösterim

> **SEO:** "nakliyat indirimi", "ucuz nakliyat", "nakliyat kampanya" → Fiyat odaklı aramalar.

## Nakliyat Hesap Makinesi — Gelişmiş Özellikler

### Mevcut Fiyat Hesaplama'ya Ek Özellikler

| Özellik | Açıklama |
|---|---|
| **Eşya Listesi** | Oda oda eşya seçimi (yatak odası: yatak, dolap, komodin...) |
| **Fotoğraf Yükleme** | Müşteri ev fotoğrafı yükler → daha doğru fiyat |
| **Harita Entegrasyonu** | Adres arası mesafe otomatik hesaplama |
| **Kat + Asansör Çarpanı** | Kat sayısı ve asansör durumuna göre fiyat ayarlama |
| **Ek Hizmetler** | Ambalajlama, montaj/demontaj, sigorta checkbox'ları |
| **Karşılaştırma** | "Asansörlü vs Asansörsüz" fiyat karşılaştırma |
| **PDF Teklif** | Hesaplama sonucunu PDF olarak indir |
| **WhatsApp Paylaş** | Hesaplama sonucunu WhatsApp ile gönder |

### Eşya Listesi Detayı (Oda Bazlı)
```
Yatak Odası:
☑ Çift kişilik yatak (1)
☑ Gardırop (1)
☐ Komodin (0)
☑ Şifonyer (1)

Salon:
☑ Koltuk takımı (1)
☑ TV ünitesi (1)
☐ Kitaplık (0)

Mutfak:
☑ Buzdolabı (1)
☑ Çamaşır makinesi (1)
☑ Bulaşık makinesi (1)
```

> **SEO:** "nakliyat fiyat hesaplama", "ev taşıma ücreti hesapla" → Çok yüksek arama hacmi. Detaylı hesaplama aracı = uzun oturum süresi = SEO sinyali.

## Hizmet Bölgeleri — İlçe Sayfası Zenginleştirme

### Her İlçe Sayfasında Olması Gerekenler

| Bölüm | İçerik |
|---|---|
| **Bölge Tanıtımı** | İlçe hakkında kısa bilgi (nüfus, konum, özellikler) |
| **Hizmet Detayı** | Bu bölgede verilen hizmetler |
| **Mesafe Bilgisi** | Merkezden (Pendik) bu ilçeye mesafe ve süre |
| **Fiyat Aralığı** | Bu bölge için tahmini fiyat aralığı |
| **Bölge Haritası** | İlçe sınırlarını gösteren mini harita |
| **Komşu Bölgeler** | Yakın ilçe sayfalarına linkler |
| **Bölge SSS** | İlçeye özel sorular |
| **Bölge Yorumları** | Bu ilçeden müşteri yorumları |
| **Fiyat Hesaplama** | Bu bölge için önceden doldurulmuş hesaplama |

### Komşu Bölgeler Internal Link Yapısı
```
Kadıköy sayfasında:
→ Bostancı Evden Eve Nakliyat
→ Ataşehir Evden Eve Nakliyat  
→ Maltepe Evden Eve Nakliyat
→ Üsküdar Evden Eve Nakliyat
```

> **Local SEO:** Komşu bölge linkleri Google'a "bu firma tüm İstanbul'a hizmet veriyor" sinyali gönderir.

## Nakliyat Süreci Görselleştirme (Timeline)

### Her Hizmet Sayfasında Süreç Bölümü

```
1. Keşif & Teklif    →  2. Planlama    →  3. Ambalajlama    →  4. Yükleme
      📋                    📅                 📦                  🚛
   Ücretsiz keşif      Tarih belirleme    Profesyonel         Dikkatli
   Detaylı teklif      Ekip atama         paketleme           yükleme

5. Taşıma    →  6. Boşaltma    →  7. Montaj    →  8. Teslim
     🚚              📥              🔧              ✅
   Sigortalı       Dikkatli        Mobilya         Eşya sayımı
   taşıma          indirme         kurulum         Müşteri onay
```

> **UX:** Görsel timeline müşteriye güven verir. **SEO:** HowTo schema ile Google'da adım snippet.

## Müşteri Memnuniyet Garantisi

### Her Sayfada Trust Bölümü

| Garanti | İkon | Açıklama |
|---|---|---|
| **%100 Memnuniyet** | ✅ | Memnun kalmazsanız ücret iadesi |
| **Sigorta Güvencesi** | 🛡️ | Tüm eşyalar sigortalı |
| **Zamanında Teslimat** | ⏰ | Söz verilen tarihte teslim |
| **Gizli Maliyet Yok** | 💰 | Teklifteki fiyat = son fiyat |
| **7/24 Destek** | 📞 | Her zaman ulaşılabilir |
| **Profesyonel Ekip** | 👷 | Eğitimli, deneyimli personel |

> **Dönüşüm:** Garantiler müşterinin karar vermesini hızlandırır. **E-E-A-T Trust:** Google kalite değerlendirmesinde güven sinyali.

## Sosyal Kanıt Bileşenleri

### Ana Sayfada Sosyal Kanıt Bölümü

| Bileşen | İçerik |
|---|---|
| **Google Yıldızı** | Google Business'tan çekilen gerçek puan: ⭐ 4.9 (250+ değerlendirme) |
| **Müşteri Sayısı** | "10.000+ mutlu müşteri" sayaç animasyonu |
| **Taşıma Sayısı** | "15.000+ başarılı taşıma" sayaç animasyonu |
| **Medya Logoları** | Basında çıkan haberler (varsa) |
| **Marka Logoları** | Kurumsal müşteri logoları (izinli) |
| **Video Testimonial** | Gerçek müşteri video yorumu (1-2 adet) |

## Karşılaştırma Tablosu — "Neden Kozcuoğlu?"

### Ana Sayfa veya Hakkımızda'da

| Özellik | Kozcuoğlu | Diğer Firmalar |
|---|---|---|
| Sigorta | ✅ Tam sigorta | ❌ Kısmi veya yok |
| Fiyat Garantisi | ✅ Gizli maliyet yok | ❌ Ek ücretler |
| Profesyonel Ekip | ✅ Eğitimli personel | ❌ Günlük işçi |
| Ambalajlama | ✅ Profesyonel | ❌ Basit |
| Araç Filosu | ✅ 50+ modern araç | ❌ Kısıtlı |
| Takip Sistemi | ✅ Online takip | ❌ Yok |
| 7/24 Destek | ✅ Her zaman | ❌ Mesai saatleri |

> **Dönüşüm:** Karşılaştırma tablosu müşterinin karar vermesini kolaylaştırır. **SEO:** Tablo formatı Google Featured Snippet hedefi.

---

## Çerez & Gizlilik Politikaları

### Cookie Consent Banner
- Sayfa ilk yüklendiğinde altta görünür
- "Kabul Et" + "Ayarlar" + "Reddet" butonları
- Kategoriler: Zorunlu (her zaman aktif), Analitik (GA4, Clarity), Pazarlama (GTM)
- Tercih `localStorage`'da saklanır
- Kabul edilmeden analitik/pazarlama scriptleri yüklenmez
- Framer Motion ile slide-up animasyonu

### Hukuki Sayfalar

| Sayfa | URL |
|---|---|
| Gizlilik Politikası | `/gizlilik-politikasi` |
| Çerez Politikası | `/cerez-politikasi` |
| KVKK Aydınlatma Metni | `/kvkk-aydinlatma-metni` |
| Kullanım Koşulları | `/kullanim-kosullari` |

> Bu sayfalar admin panelden düzenlenebilir (pages.json). Footer'da linkler bulunur.

## SMTP & Form Sistemi

### E-Posta Gönderimi
- **Kütüphane:** Nodemailer
- **SMTP:** Admin ayarlarından yapılandırılır (host, port, user, pass)
- **Gönderim:** İletişim formu + fiyat hesaplama sonucu → admin e-postasına
- **Alıcı:** `info@kozcuoglunakliyat.com.tr` (settings.json'dan)
- **Template:** HTML e-posta şablonu (firma logosu, düzgün format)

### İletişim Formu
| Alan | Tip | Zorunlu | Validasyon |
|---|---|---|---|
| Ad Soyad | Text | ✓ | Min 2 karakter |
| Telefon | Tel | ✓ | Türkiye formatı (05XX) |
| E-Posta | Email | ✗ | E-posta formatı |
| Hizmet Tipi | Select | ✓ | Hizmet listesinden seç |
| Mesaj | Textarea | ✓ | Min 10 karakter |
| Honeypot | Hidden | — | Bot koruması |

### Form Özellikleri
- React Hook Form + Zod validasyon
- Gerçek zamanlı hata mesajları (Türkçe)
- Gönderim sırasında loading spinner
- Başarı: Yeşil toast + "Mesajınız alındı, en kısa sürede dönüş yapacağız"
- Hata: Kırmızı toast + "Bir hata oluştu, lütfen tekrar deneyin"
- Rate limiting: Aynı IP'den 5dk'da max 3 form
- SMTP ile admin'e e-posta + messages.json'a kayıt
- Honeypot field ile bot koruması

## Admin Panel — SEO Ayarları (Sayfa Bazlı)

Her sayfa için admin panelden düzenlenebilir SEO ayarları:

### Sayfa SEO Alanları
| Alan | Açıklama |
|---|---|
| SEO Title | Özel title tag (boşsa otomatik oluşturulur) |
| SEO Description | Özel meta description (boşsa otomatik) |
| OG Image | Özel Open Graph görseli |
| Canonical URL | Özel canonical (boşsa otomatik) |
| Robots | index/noindex, follow/nofollow seçimi |
| Schema Tipi | Sayfa için uygulanacak JSON-LD şema tipleri (çoklu seçim) |
| Özel Schema | Manuel JSON-LD ekleme alanı (ileri düzey) |

### Schema Seçim Sistemi
Admin panelde her sayfa için uygulanacak schema tipleri seçilebilir:

| Schema | Açıklama | Varsayılan Sayfalar |
|---|---|---|
| Organization | Firma bilgileri | Tüm sayfalar |
| MovingCompany | Nakliyat firması | Ana sayfa, İletişim |
| Service | Hizmet detayı | Hizmet, Çözüm sayfaları |
| FAQPage | SSS | SSS olan tüm sayfalar |
| BreadcrumbList | Breadcrumb | Tüm sayfalar (ana sayfa hariç) |
| Article | Blog yazısı | Blog yazıları |
| Review + AggregateRating | Yorumlar | Yorum olan sayfalar |
| HowTo | Nasıl yapılır | Uygun blog/çözüm sayfaları |
| ItemList | Liste | Liste sayfaları |
| Offer | Fiyat | Fiyatlarımız |

> Varsayılan şemalar otomatik atanır, admin isterse değiştirebilir veya özel schema ekleyebilir.

## Next.js Routing Yapısı

```
src/app/
├── (site)/
│   ├── page.tsx                          → /
│   ├── hizmetlerimiz/
│   │   └── page.tsx                      → /hizmetlerimiz (liste)
│   ├── esya-depolama/
│   │   └── page.tsx                      → /esya-depolama (bağımsız)
│   ├── cozumlerimiz/
│   │   └── page.tsx                      → /cozumlerimiz (liste)
│   ├── fiyatlarimiz/
│   │   └── page.tsx                      → /fiyatlarimiz
│   ├── nakliyat-fiyat-hesaplama/
│   │   └── page.tsx                      → /nakliyat-fiyat-hesaplama
│   ├── hizmet-bolgeleri/
│   │   └── page.tsx                      → /hizmet-bolgeleri
│   ├── hakkimizda/
│   │   └── page.tsx                      → /hakkimizda
│   ├── iletisim/
│   │   └── page.tsx                      → /iletisim
│   ├── blog/
│   │   └── page.tsx                      → /blog
│   ├── sikca-sorulan-sorular/
│   │   └── page.tsx                      → /sikca-sorulan-sorular
│   ├── referanslar/
│   │   └── page.tsx                      → /referanslar
│   ├── arac-filomuz/
│   │   └── page.tsx                      → /arac-filomuz
│   ├── kampanyalar/
│   │   └── page.tsx                      → /kampanyalar
│   ├── tasima-takip/
│   │   └── page.tsx                      → /tasima-takip (noindex)
│   ├── galeri/
│   │   └── page.tsx                      → /galeri
│   ├── sozlesmeler/
│   │   └── page.tsx                      → /sozlesmeler (liste)
│   ├── referanslarimiz/
│   │   └── page.tsx                      → /referanslarimiz
│   ├── offline/
│   │   └── page.tsx                      → /offline (PWA offline fallback)
│   ├── gizlilik-politikasi/
│   │   └── page.tsx                      → /gizlilik-politikasi
│   ├── cerez-politikasi/
│   │   └── page.tsx                      → /cerez-politikasi
│   ├── kvkk-aydinlatma-metni/
│   │   └── page.tsx                      → /kvkk-aydinlatma-metni
│   ├── kullanim-kosullari/
│   │   └── page.tsx                      → /kullanim-kosullari
│   ├── [slug]/
│   │   └── page.tsx                      → /evden-eve-nakliyat (dinamik: hizmet + çözüm + sözleşme)
│   ├── [...slug]/
│   │   └── page.tsx                      → /*.html (catch-all: blog + hizmet bölgeleri + taşıma kontrol listesi)
│   └── layout.tsx                        → Site layout (Header + Footer)
├── (admin)/
│   ├── admin/
│   │   ├── page.tsx                      → /admin (login)
│   │   ├── dashboard/page.tsx            → /admin/dashboard
│   │   ├── services/page.tsx             → /admin/services
│   │   ├── solutions/page.tsx            → /admin/solutions
│   │   ├── regions/page.tsx              → /admin/regions
│   │   ├── blog/page.tsx                 → /admin/blog
│   │   ├── reviews/page.tsx              → /admin/reviews
│   │   ├── pricing/page.tsx              → /admin/pricing
│   │   ├── pages/page.tsx                → /admin/pages
│   │   ├── messages/page.tsx             → /admin/messages
│   │   ├── settings/page.tsx             → /admin/settings
│   │   ├── surveys/page.tsx              → /admin/surveys
│   │   ├── tracking/page.tsx             → /admin/tracking
│   │   ├── projects/page.tsx             → /admin/projects
│   │   ├── fleet/page.tsx                → /admin/fleet
│   │   ├── campaigns/page.tsx            → /admin/campaigns
│   │   ├── gallery/page.tsx              → /admin/gallery
│   │   ├── contracts/page.tsx            → /admin/contracts
│   │   ├── clients/page.tsx              → /admin/clients
│   │   ├── ratings/page.tsx              → /admin/ratings
│   │   ├── internal-links/page.tsx       → /admin/internal-links
│   │   └── redirects/page.tsx            → /admin/redirects (301 & 404)
│   └── layout.tsx                        → Admin layout (Sidebar)
├── api/                                  → API routes
├── layout.tsx                            → Root layout
├── globals.css                           → Global stiller
└── not-found.tsx                         → 404 sayfası
```

> **Routing Mantığı:** `[slug]/page.tsx` hizmet, çözüm ve sözleşme alt sayfalarını serve eder. Slug'a göre sırasıyla `services.json` → `solutions.json` → `contracts.json`'da aranır. Bulunamazsa `notFound()` döner. `[...slug]/page.tsx` ise `.html` uzantılı blog ve hizmet bölgesi sayfalarını yakalar.

## next.config.js URL Ayarları

```js
const nextConfig = {
  trailingSlash: false,
  // .html uzantılı sayfalar [...slug] catch-all route ile yakalanır
  // Next.js App Router'da .html uzantılı URL'ler otomatik olarak
  // [...slug]/page.tsx tarafından handle edilir
  // Rewrite gerekirse aşağıdaki yapı kullanılır:
  async rewrites() {
    return [
      // Blog yazıları: /evden-eve-nakliyat-nedir.html → [...slug] catch-all
      // Hizmet bölgeleri: /bostanci-evden-eve-nakliyat.html → [...slug] catch-all
      // Taşıma kontrol listesi: /tasima-kontrol-listesi.html → [...slug] catch-all
      // NOT: [...slug]/page.tsx içinde slug'dan .html kaldırılıp
      // blog-posts.json ve regions.json'da aranır
    ]
  },
  // 301 Redirect'ler redirects.json'dan otomatik beslenir
  async redirects() {
    // Build sırasında redirects.json okunur ve buraya eklenir
    // lib/redirects-loader.ts ile otomatik
    const redirects = [] // redirects.json'dan yüklenir
    return redirects.map(r => ({
      source: r.oldUrl,
      destination: r.newUrl,
      permanent: r.type === '301',
    }))
  },
}
```

> **ÖNEMLİ:** `.html` uzantılı URL'ler `[...slug]/page.tsx` catch-all route tarafından yakalanır. Bu route içinde slug'dan `.html` uzantısı kaldırılıp sırasıyla `blog-posts.json` → `regions.json` → özel sayfalar (taşıma kontrol listesi) içinde aranır. Bulunamazsa `notFound()` döner ve 404 loglanır.
