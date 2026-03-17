# Kozcuoğlu Nakliyat — Proje Geliştirme Planı (Step-by-Step)

> Bu dosya projenin başından sonuna tüm fazları ve alt fazları sırasıyla tanımlar.
> Sıralama: Proje kurulumu → Backend/API → Admin Panel → Frontend → SEO/Schema → PWA → Test → Deploy

---

## FAZ 1 — Proje Kurulumu & Altyapı

### 1.1 Proje İskeleti
- [ ] Next.js 14+ projesi oluştur (App Router, TypeScript)
- [ ] pnpm ile bağımlılık yönetimi
- [ ] `.gitignore`, `.env.local`, `.env.example` dosyaları
- [ ] `tsconfig.json` path alias ayarları (`@/components`, `@/lib` vb.)

### 1.2 TailwindCSS & Design Token Kurulumu
- [ ] TailwindCSS kurulumu + `tailwind.config.ts`
- [ ] Renk paleti tanımla (primary, dark, gray, muted)
- [ ] Tipografi ölçeği tanımla (fontSize + lineHeight)
- [ ] Spacing token sistemi (4px grid)
- [ ] Border radius, shadow, transition CSS custom properties (`globals.css`)
- [ ] `@tailwindcss/typography` plugin kurulumu (prose standartları)

### 1.3 shadcn/ui Kurulumu
- [ ] shadcn/ui init (New York theme, CSS variables)
- [ ] Temel bileşenler ekle: Button, Card, Input, Textarea, Select, Dialog, Toast, Tabs, Accordion, Table, Badge, Dropdown Menu, Sheet, Skeleton, Avatar
- [ ] Buton varyantları özelleştir (Primary, Secondary, Outline, Ghost — DESIGN.md'ye uygun)

### 1.4 Font & İkon Kurulumu
- [ ] Inter fontu `next/font` ile self-hosted
- [ ] JetBrains Mono (admin code editor için)
- [ ] Lucide Icons kurulumu

### 1.5 Klasör Yapısı Oluşturma
- [ ] `src/app/(site)/` — Public site route group
- [ ] `src/app/(admin)/admin/` — Admin panel route group
- [ ] `src/app/api/` — API routes
- [ ] `src/components/ui/` — shadcn/ui bileşenleri
- [ ] `src/components/layout/` — Header, Footer, Sticky CTA Bar
- [ ] `src/components/global/` — WhatsApp, BackToTop, CookieBanner, TrustBadges
- [ ] `src/components/pricing/` — Fiyat hesaplama modülleri
- [ ] `src/components/reviews/` — Yorum sistemi
- [ ] `src/components/toc/` — Table of Contents
- [ ] `src/components/seo/` — JSON-LD, Meta, NAP
- [ ] `src/components/sections/` — Hero, Intro, Services, Solutions, Stats vb.
- [ ] `src/lib/` — Utility fonksiyonlar
- [ ] `src/data/` — JSON veritabanı dosyaları
- [ ] `src/hooks/` — Custom React hooks
- [ ] `src/types/` — TypeScript tipleri
- [ ] `public/uploads/` — services, solutions, blog, regions, storage, gallery, og alt klasörleri
- [ ] `public/icons/` — PWA ikonları

### 1.6 Veritabanı (JSON) Başlangıç Dosyaları
- [ ] `data/settings.json` — Site ayarları + NAP + sameAs + Logo/Favicon + Entegrasyonlar + blogCategories + özel kod alanları
- [ ] `data/services.json` — Hizmetler (başlangıç verisi ile)
- [ ] `data/solutions.json` — Çözümler (başlangıç verisi ile)
- [ ] `data/blog-posts.json` — Boş dizi
- [ ] `data/regions.json` — Hizmet bölgeleri (başlangıç verisi ile)
- [ ] `data/reviews.json` — Boş dizi
- [ ] `data/pricing-modules.json` — Ev Taşıma + Ofis Taşıma modülleri
- [ ] `data/pages.json` — Sayfa içerikleri (homepage intro, SEO içerik alanı vb.)
- [ ] `data/messages.json` — Boş dizi
- [ ] `data/users.json` — Admin kullanıcı (bcrypt hash ile)
- [ ] `data/survey-requests.json` — Boş dizi (keşif talepleri)
- [ ] `data/tracking.json` — Boş dizi (taşıma takip)
- [ ] `data/projects.json` — Boş dizi (referans projeler)
- [ ] `data/fleet.json` — Boş dizi (araç filosu)
- [ ] `data/campaigns.json` — Boş dizi (kampanyalar)
- [ ] `data/gallery.json` — Boş dizi (galeri)
- [ ] `data/contracts.json` — Boş dizi (sözleşmeler)
- [ ] `data/clients.json` — Boş dizi (müşteri logoları)
- [ ] `data/ratings.json` — Boş dizi (sayfa bazlı rating)
- [ ] `data/internal-links.json` — Boş dizi (iç linkleme kuralları)
- [ ] `data/redirects.json` — Boş dizi (301 yönlendirmeler)
- [ ] `data/404-logs.json` — Boş dizi (404 hata logları)
- [ ] `data/notifications.json` — Boş dizi (admin bildirimleri)
- [ ] `data/activity-logs.json` — Boş dizi (admin işlem geçmişi)

> **Referans:** Her JSON dosyasının detaylı veri yapısı (alanlar, tipler, örnek kayıtlar) `ADMIN-PANEL.md` dosyasında tanımlıdır. Başlangıç verisi olan dosyalar (services, solutions, regions, pricing-modules, settings, pages, users) örnek kayıtlarla oluşturulur. Diğerleri boş dizi `[]` ile başlar.

### 1.7 TypeScript Tip Tanımları
- [ ] `types/service.ts` — Service interface
- [ ] `types/solution.ts` — Solution interface
- [ ] `types/blog.ts` — BlogPost interface
- [ ] `types/region.ts` — Region interface
- [ ] `types/review.ts` — Review interface
- [ ] `types/pricing.ts` — PricingModule, PricingField interface
- [ ] `types/settings.ts` — Settings interface (NAP, sameAs, logo/favicon, entegrasyonlar, özel kodlar dahil)
- [ ] `types/message.ts` — Message interface
- [ ] `types/user.ts` — User interface
- [ ] `types/survey.ts` — SurveyRequest interface (keşif talebi)
- [ ] `types/tracking.ts` — TrackingItem interface (8 adımlı süreç)
- [ ] `types/project.ts` — Project interface (referans işler)
- [ ] `types/vehicle.ts` — Vehicle interface (araç filosu)
- [ ] `types/campaign.ts` — Campaign interface (kampanyalar)
- [ ] `types/gallery.ts` — GalleryItem interface (resim + video)
- [ ] `types/contract.ts` — Contract interface (sözleşmeler)
- [ ] `types/client.ts` — Client interface (müşteri logoları)
- [ ] `types/rating.ts` — Rating interface (sayfa bazlı AggregateRating)
- [ ] `types/internal-link.ts` — InternalLink interface (iç linkleme kuralları)
- [ ] `types/redirect.ts` — Redirect interface (301 yönlendirme)
- [ ] `types/log404.ts` — Log404 interface (404 hata logu)
- [ ] `types/api.ts` — ApiResponse<T> generic interface (`{ success, data?, error?, message? }`)

### 1.8 Utility Fonksiyonlar
- [ ] `lib/slugify.ts` — Türkçe → slug dönüştürücü
- [ ] `lib/slug-check.ts` — Slug benzersizlik kontrolü (tüm JSON dosyaları + statik sayfalar)
- [ ] `lib/db.ts` — JSON dosya okuma/yazma helper (fs)
- [ ] `lib/auth.ts` — NextAuth konfigürasyonu
- [ ] `lib/breadcrumbs.ts` — Sayfa yoluna göre breadcrumb dizisi oluşturma (ilk eleman: "Kozcuoğlu Nakliyat")
- [ ] `lib/llms-generator.ts` — Build sırasında llms.txt ve llms-full.txt oluşturma
- [ ] `lib/image-pipeline.ts` — sharp ile WebP dönüşüm, boyutlandırma, sıkıştırma
- [ ] `lib/utils.ts` — cn(), formatDate(), formatPrice() vb.
- [ ] `lib/constants.ts` — Site sabitleri (NAP, URL'ler)

---

## FAZ 2 — Backend / API Routes

### 2.1 Kimlik Doğrulama
- [ ] NextAuth.js kurulumu (Credentials provider)
- [ ] `api/auth/[...nextauth]/route.ts`
- [ ] JWT token yapılandırması
- [ ] bcrypt ile şifre doğrulama
- [ ] Admin middleware (API route koruması)

### 2.2 Hizmetler API
- [ ] `GET /api/services` — Tüm hizmetleri listele
- [ ] `GET /api/services/[slug]` — Tek hizmet getir
- [ ] `POST /api/services` — Hizmet ekle (auth)
- [ ] `PUT /api/services/[id]` — Hizmet güncelle (auth)
- [ ] `DELETE /api/services/[id]` — Hizmet sil (auth)
- [ ] `PUT /api/services/reorder` — Sıralama güncelle (auth)

### 2.3 Çözümler API
- [ ] `GET /api/solutions` — Tüm çözümleri listele
- [ ] `GET /api/solutions/[slug]` — Tek çözüm getir
- [ ] `POST /api/solutions` — Çözüm ekle (auth)
- [ ] `PUT /api/solutions/[id]` — Çözüm güncelle (auth)
- [ ] `DELETE /api/solutions/[id]` — Çözüm sil (auth)
- [ ] `PUT /api/solutions/reorder` — Sıralama güncelle (auth)

### 2.4 Hizmet Bölgeleri API
- [ ] `GET /api/regions` — Tüm bölgeleri listele
- [ ] `GET /api/regions/[slug]` — Tek bölge getir
- [ ] `POST /api/regions` — Bölge ekle (auth)
- [ ] `PUT /api/regions/[id]` — Bölge güncelle (auth)
- [ ] `DELETE /api/regions/[id]` — Bölge sil (auth)

### 2.5 Blog API
- [ ] `GET /api/blog` — Tüm yazıları listele
- [ ] `GET /api/blog/[slug]` — Tek yazı getir
- [ ] `POST /api/blog` — Yazı ekle (auth)
- [ ] `PUT /api/blog/[id]` — Yazı güncelle (auth)
- [ ] `DELETE /api/blog/[id]` — Yazı sil (auth)

### 2.6 Yorumlar API
- [ ] `GET /api/reviews` — Tüm yorumları listele (admin: tümü, public: onaylı)
- [ ] `GET /api/reviews?page=[slug]` — Sayfaya özel yorumlar
- [ ] `POST /api/reviews` — Yorum gönder (public, status: pending)
- [ ] `PUT /api/reviews/[id]` — Yorum onayla/reddet/düzenle (auth)
- [ ] `DELETE /api/reviews/[id]` — Yorum sil (auth)
- [ ] `GET /api/reviews/aggregate?page=[slug]` — Sayfa bazlı ortalama puan

### 2.7 Fiyat Hesaplama API
- [ ] `GET /api/pricing` — Tüm modülleri listele
- [ ] `GET /api/pricing/[slug]` — Tek modül getir
- [ ] `POST /api/pricing` — Modül ekle (auth)
- [ ] `PUT /api/pricing/[id]` — Modül güncelle (auth)
- [ ] `DELETE /api/pricing/[id]` — Modül sil (auth)
- [ ] `POST /api/pricing/calculate` — Fiyat hesapla (public)

### 2.8 Sayfalar API
- [ ] `GET /api/pages/[slug]` — Sayfa içeriği getir
- [ ] `PUT /api/pages/[slug]` — Sayfa içeriği güncelle (auth)

### 2.9 İletişim Formu API
- [ ] `POST /api/messages` — Mesaj gönder (public, rate limit)
- [ ] `GET /api/messages` — Tüm mesajları listele (auth)
- [ ] `PUT /api/messages/[id]` — Okundu işaretle (auth)
- [ ] `DELETE /api/messages/[id]` — Mesaj sil (auth)

### 2.10 Ayarlar API
- [ ] `GET /api/settings` — Ayarları getir
- [ ] `PUT /api/settings` — Ayarları güncelle (auth)

### 2.11 Görsel Yükleme API
- [ ] `POST /api/upload` — Görsel yükle (auth)
- [ ] Otomatik WebP dönüşümü (sharp)
- [ ] SEO uyumlu dosya adı
- [ ] Boyut sıkıştırma
- [ ] Alt klasöre kaydet (services/solutions/blog/regions)

### 2.12 Keşif Talepleri API
- [ ] `POST /api/surveys` — Keşif talebi gönder (public, rate limit: 5dk'da max 2)
- [ ] `GET /api/surveys` — Tüm talepleri listele (auth)
- [ ] `PUT /api/surveys/[id]` — Durum güncelle + not ekle (auth)
- [ ] `DELETE /api/surveys/[id]` — Talep sil (auth)
- [ ] Talep sonrası: admin'e SMTP e-posta + müşteriye WhatsApp otomatik mesaj

### 2.13 Taşıma Takip API
- [ ] `GET /api/tracking?kod=[KOD]` — Takip kodu ile durum sorgula (public)
- [ ] `GET /api/tracking` — Tüm takipler listele (auth)
- [ ] `POST /api/tracking` — Yeni takip oluştur (auth)
- [ ] `PUT /api/tracking/[id]` — Durum güncelle (auth) + WhatsApp bildirimi
- [ ] `DELETE /api/tracking/[id]` — Takip sil (auth)

### 2.14 Projeler (Referans İşler) API
- [ ] `GET /api/projects` — Tüm projeleri listele
- [ ] `POST /api/projects` — Proje ekle (auth)
- [ ] `PUT /api/projects/[id]` — Proje güncelle (auth)
- [ ] `DELETE /api/projects/[id]` — Proje sil (auth)
- [ ] `PUT /api/projects/reorder` — Sıralama güncelle (auth)

### 2.15 Araç Filosu API
- [ ] `GET /api/fleet` — Tüm araçları listele
- [ ] `POST /api/fleet` — Araç ekle (auth)
- [ ] `PUT /api/fleet/[id]` — Araç güncelle (auth)
- [ ] `DELETE /api/fleet/[id]` — Araç sil (auth)

### 2.16 Kampanyalar API
- [ ] `GET /api/campaigns` — Tüm kampanyaları listele
- [ ] `GET /api/campaigns/active` — Aktif kampanyaları getir (public, ana sayfa banner)
- [ ] `POST /api/campaigns` — Kampanya ekle (auth)
- [ ] `PUT /api/campaigns/[id]` — Kampanya güncelle (auth)
- [ ] `DELETE /api/campaigns/[id]` — Kampanya sil (auth)

### 2.17 Galeri API
- [ ] `GET /api/gallery` — Tüm galeri öğelerini listele (filtreleme: tip, kategori)
- [ ] `GET /api/gallery/homepage` — Ana sayfa galeri öğeleri (public)
- [ ] `POST /api/gallery` — Galeri öğesi ekle (auth, toplu yükleme destekli)
- [ ] `PUT /api/gallery/[id]` — Galeri öğesi güncelle (auth)
- [ ] `DELETE /api/gallery/[id]` — Galeri öğesi sil (auth)
- [ ] `PUT /api/gallery/reorder` — Sıralama güncelle (auth)

### 2.18 Sözleşmeler API
- [ ] `GET /api/contracts` — Tüm sözleşmeleri listele
- [ ] `GET /api/contracts/[slug]` — Tek sözleşme getir
- [ ] `POST /api/contracts` — Sözleşme ekle (auth, slug benzersizlik kontrolü)
- [ ] `PUT /api/contracts/[id]` — Sözleşme güncelle (auth)
- [ ] `DELETE /api/contracts/[id]` — Sözleşme sil (auth)

### 2.19 Referanslarımız (Müşteri Logoları) API
- [ ] `GET /api/clients` — Tüm müşteri logolarını listele
- [ ] `POST /api/clients` — Logo ekle (auth)
- [ ] `PUT /api/clients/[id]` — Logo güncelle (auth)
- [ ] `DELETE /api/clients/[id]` — Logo sil (auth)
- [ ] `PUT /api/clients/reorder` — Sıralama güncelle (auth)

### 2.20 Yıldızlama & AggregateRating API
- [ ] `GET /api/ratings` — Tüm rating ayarlarını listele (auth)
- [ ] `GET /api/ratings/[pageSlug]` — Sayfa bazlı rating getir (public, schema için)
- [ ] `PUT /api/ratings/[pageSlug]` — Rating ayarı güncelle (auth)

### 2.21 Otomatik İç Linkleme API
- [ ] `GET /api/internal-links` — Tüm kuralları listele (auth)
- [ ] `POST /api/internal-links` — Kural ekle (auth)
- [ ] `PUT /api/internal-links/[id]` — Kural güncelle (auth)
- [ ] `DELETE /api/internal-links/[id]` — Kural sil (auth)
- [ ] `POST /api/internal-links/execute` — Tüm sayfalarda linkleme başlat (auth)
- [ ] `POST /api/internal-links/rollback` — Tüm otomatik linkleri geri al (auth)

### 2.22 301 Redirect & 404 API
- [ ] `GET /api/redirects` — Tüm yönlendirmeleri listele (auth)
- [ ] `POST /api/redirects` — Yönlendirme ekle (auth)
- [ ] `POST /api/redirects/import` — Toplu CSV/JSON içe aktarma (auth)
- [ ] `PUT /api/redirects/[id]` — Yönlendirme güncelle (auth)
- [ ] `DELETE /api/redirects/[id]` — Yönlendirme sil (auth)
- [ ] `POST /api/log-404` — 404 hatası logla (public, rate limit)
- [ ] `GET /api/404-logs` — 404 loglarını listele (auth)
- [ ] `PUT /api/404-logs/[id]` — Log durumu güncelle (auth)
- [ ] `DELETE /api/404-logs/bulk` — Toplu log silme (auth)

### 2.23 API Güvenlik & Middleware
- [ ] Rate limiting middleware (endpoint bazlı farklı limitler)
- [ ] CSRF token kontrolü
- [ ] Input sanitization (XSS koruması)
- [ ] Admin auth middleware (tüm POST/PUT/DELETE)
- [ ] Error handling standardı (try-catch, tutarlı JSON response formatı)
- [ ] API response formatı: `{ success: boolean, data?: any, error?: string, message?: string }`

---

## FAZ 3 — Admin Panel (Frontend)

### 3.1 Admin Layout
- [ ] `(admin)/layout.tsx` — Sidebar + Header + Content area
- [ ] Sidebar navigasyon (22 bölüm, gruplandırılmış)
- [ ] Koyu sidebar (#122032), beyaz içerik alanı
- [ ] Mobilde hamburger menü (Sheet)
- [ ] Kullanıcı bilgisi + çıkış butonu
- [ ] Auth guard (giriş yapmamışsa /admin'e yönlendir)

### 3.2 Giriş Sayfası — `/admin`
- [ ] Login formu (e-posta + şifre)
- [ ] NextAuth signIn
- [ ] Hata mesajları
- [ ] Rate limit uyarısı

### 3.3 Dashboard — `/admin/dashboard`
- [ ] Özet kartları (hizmet, çözüm, bölge, blog, yorum, mesaj sayıları)
- [ ] Ek özet kartları: keşif talebi (yeni/toplam), aktif taşıma takip, galeri görsel sayısı, aktif kampanya
- [ ] Uyarı kartları: yeni 404 hataları, onay bekleyen yorumlar, okunmamış mesajlar, yeni keşif talepleri
- [ ] Son gelen mesajlar listesi
- [ ] Onay bekleyen yorumlar
- [ ] Son keşif talepleri (son 5)
- [ ] Hızlı erişim linkleri

### 3.4 Hizmetler Yönetimi — `/admin/services`
- [ ] Hizmet listesi tablosu (başlık, slug, sıra, durum, işlemler)
- [ ] Sürükle-bırak sıralama
- [ ] Hizmet ekle/düzenle formu (Dialog veya ayrı sayfa)
- [ ] Rich Text Editor entegrasyonu
- [ ] Görsel yükleme
- [ ] SSS (dinamik liste) ekleme
- [ ] Fiyat modülü atama
- [ ] SEO alanları (title, description)
- [ ] Silme onay dialogu

### 3.5 Çözümler Yönetimi — `/admin/solutions`
- [ ] Çözüm listesi tablosu
- [ ] Sürükle-bırak sıralama
- [ ] Çözüm ekle/düzenle formu
- [ ] Rich Text Editor + görsel + SSS + SEO alanları
- [ ] Silme onay dialogu

### 3.6 Hizmet Bölgeleri — `/admin/regions`
- [ ] Bölge listesi tablosu
- [ ] Bölge ekle/düzenle formu
- [ ] Rich Text Editor + görsel + SSS + SEO alanları
- [ ] Hizmet tipi + fiyat modülü atama
- [ ] Silme onay dialogu

### 3.7 Blog Yönetimi — `/admin/blog`
- [ ] Blog listesi tablosu (başlık, tarih, durum, işlemler)
- [ ] Arama ve filtreleme
- [ ] Blog ekle/düzenle formu
- [ ] Rich Text Editor + görsel + kategori + etiketler + SEO
- [ ] Taslak/Yayında durumu
- [ ] Silme onay dialogu

### 3.8 Yorumlar Yönetimi — `/admin/reviews`
- [ ] Yorum listesi tablosu (ad, yıldız, yorum, sayfa, durum, tarih)
- [ ] Filtreleme (sayfa, durum, yıldız)
- [ ] Onayla / Reddet / Sil butonları
- [ ] Yorum düzenleme dialogu
- [ ] Toplu işlem (seçili yorumları onayla/sil)

### 3.9 Fiyat Modülleri — `/admin/pricing`
- [ ] Modül listesi tablosu
- [ ] Modül ekle/düzenle formu
- [ ] Dinamik form builder (alan ekle/sil/düzenle)
- [ ] Fiyat parametreleri (key-value)
- [ ] Sayfa atama (multi-select)
- [ ] Aktif/Pasif toggle

### 3.10 Sayfa Yönetimi — `/admin/pages`
- [ ] Sayfa listesi (ana sayfa, hakkımızda, iletişim vb.)
- [ ] Her sayfa için: Hero başlık, Hero açıklama, İçerik, SEO alanları
- [ ] Ana sayfa Intro alanı (h2 + paragraf) düzenleme
- [ ] Ana sayfa SEO içerik alanı düzenleme

### 3.11 İletişim Formları — `/admin/messages`
- [ ] Mesaj listesi tablosu
- [ ] Okundu/Okunmadı durumu
- [ ] Mesaj detay dialogu
- [ ] Silme
- [ ] Fiyat hesaplama sonuçları da burada

### 3.12 Ayarlar — `/admin/settings`
- [ ] NAP bilgileri formu (firma adı, adres, telefon, e-posta, koordinatlar)
- [ ] Çalışma saatleri (gün bazlı)
- [ ] Site ayarları (başlık, açıklama, WhatsApp numarası, footer metni)
- [ ] Logo & Favicon yönetimi (açık/koyu logo, ICO, SVG, Apple Touch, OG default, PWA ikonları)
- [ ] Sosyal medya & sameAs linkleri (12+ platform + sınırsız ekstra URL)
- [ ] Entegrasyon ayarları (GA4, GTM, Clarity, Tawk.to, IndexNow, SMTP)
- [ ] Özel kod ekleme alanları (Head, Body başı, Footer)
- [ ] Blog kategorileri yönetimi (CRUD)
- [ ] Yedekleme tab'ı (ZIP indir, geri yükle)
- [ ] İşlem geçmişi tab'ı (activity log)
- [ ] Şifre değiştirme

### 3.13 Keşif Talepleri — `/admin/surveys`
- [ ] Talep listesi tablosu (ad, telefon, nereden→nereye, ev tipi, tarih, durum)
- [ ] Filtreleme: durum bazlı, tarih bazlı
- [ ] Durum yönetimi (Yeni→İletişim→Keşif→Teklif→Onay→İptal) — renk kodlu
- [ ] Talep detay dialogu (müşteri bilgileri + adres + admin notları)
- [ ] WhatsApp ile mesaj gönder butonu
- [ ] Silme onay dialogu

### 3.14 Taşıma Takip — `/admin/tracking`
- [ ] Aktif taşımalar tablosu (müşteri, takip kodu, durum, tarih)
- [ ] Yeni takip oluştur (otomatik 6 haneli kod)
- [ ] 8 adımlı süreç durumu güncelleme (Keşif→Teklif→Onay→Paketleme→Yükleme→Taşıma→Boşaltma→Teslim)
- [ ] Durum değiştiğinde WhatsApp bildirimi tetikle
- [ ] Silme onay dialogu

### 3.15 Projeler (Referans İşler) — `/admin/projects`
- [ ] Proje listesi tablosu (başlık, müşteri, tip, nereden→nereye, tarih, durum)
- [ ] Proje ekle/düzenle formu (başlık, müşteri, tip, adresler, tarih, görseller, yorum, yıldız)
- [ ] Çoklu görsel yükleme (önce/sonra)
- [ ] Sürükle-bırak sıralama
- [ ] Silme onay dialogu

### 3.16 Araç Filosu — `/admin/fleet`
- [ ] Araç listesi tablosu (tip, model, kapasite, durum)
- [ ] Araç ekle/düzenle formu (tip, model, kapasite m³, uygun ev tipi, özellikler, görsel)
- [ ] Sıralama
- [ ] Silme onay dialogu

### 3.17 Kampanyalar — `/admin/campaigns`
- [ ] Kampanya listesi tablosu (başlık, indirim, başlangıç/bitiş, durum)
- [ ] Kampanya ekle/düzenle formu (başlık, açıklama, indirim tipi/değeri, tarihler, görsel, ana sayfada göster toggle)
- [ ] Otomatik durum: aktif/pasif/süresi dolmuş
- [ ] Silme onay dialogu

### 3.18 Galeri — `/admin/gallery`
- [ ] Resim galerisi grid (thumbnail) + Video listesi
- [ ] Drag & drop sıralama, toplu yükleme (multi upload)
- [ ] Galeri öğesi ekle/düzenle (başlık, tip, dosya/URL, alt text, kategori, sıra, ana sayfada göster toggle)
- [ ] Ana sayfa galeri ayarları (gösterilecek sayı: 4/6/8/12, layout: grid/masonry/carousel)
- [ ] Silme onay dialogu

### 3.19 Sözleşmeler — `/admin/contracts`
- [ ] Sözleşme listesi tablosu (başlık, slug, ilgili hizmet, durum)
- [ ] Sözleşme ekle/düzenle formu (başlık, slug, Rich Text içerik, PDF upload, Word upload, ilgili hizmet)
- [ ] Slug benzersizlik kontrolü (tüm veri kaynaklarında)
- [ ] Silme onay dialogu

### 3.20 Referanslarımız (Müşteri Logoları) — `/admin/clients`
- [ ] Logo listesi grid (thumbnail)
- [ ] Logo ekle/düzenle formu (firma adı, logo upload, website, sıra, durum)
- [ ] Drag & drop sıralama
- [ ] Silme onay dialogu

### 3.21 Yıldızlama & Rating — `/admin/ratings`
- [ ] Sayfa bazlı rating listesi tablosu (sayfa, mod, rating, yorum sayısı)
- [ ] Rating ayarı düzenle (otomatik/manuel toggle, manuel değerler)
- [ ] Otomatik mod: onaylı yorumlardan hesaplanan değerleri göster

### 3.22 İç Linkleme & Redirects — **2 ayrı sayfa**

> **Açıklama:** Bu madde iki ayrı admin sayfasını kapsar. Sidebar'da SEO grubu altında ayrı ayrı listelenir.

**Sayfa A: `/admin/internal-links` — İç Linkleme**
- [ ] İç linkleme kuralları tablosu (keyword, hedef URL, max link, stil)
- [ ] Kural ekle/düzenle formu
- [ ] "Başlat" butonu (tüm sayfalarda linkleme) + "Geri Al" butonu
- [ ] Sonuç raporu dialogu

**Sayfa B: `/admin/redirects` — 301 & 404 Yönetimi (tab yapısı)**
- [ ] 301 Redirect tab'ı: yönlendirme CRUD (eski→yeni URL, tip, not, hit sayacı)
- [ ] Toplu CSV/JSON içe aktarma
- [ ] 404 Log tab'ı: 404 logları tablosu, durum güncelle, toplu silme
- [ ] 404 → 301 hızlı dönüştürme butonu

---

## FAZ 4 — Frontend / Public Site

### 4.1 Root Layout & Global Bileşenler
- [ ] `layout.tsx` — HTML yapısı, font, meta viewport
- [ ] Settings'den head/body/footer özel kodları render et
- [ ] `globals.css` — CSS reset, design tokens, base stiller
- [ ] Tipografi reset (h1-h6, p, ul/ol, li, button, table varsayılan margin/padding)

### 4.2 Site Layout
- [ ] `(site)/layout.tsx` — Header + Footer + global bileşenler
- [ ] **Header** — Sticky, logo, mega menü (Hizmetlerimiz + Çözümlerimiz dropdown), CTA buton, mobil hamburger
- [ ] **Footer** — NAP bilgileri, hizmet/çözüm/bölge linkleri, sosyal medya, copyright, KARAKAR Web
- [ ] **WhatsApp Butonu** — Sabit sağ alt, pulse animasyonu
- [ ] **Sticky CTA Bar** — Mobilde altta (Ara + WhatsApp)
- [ ] **Back to Top** — 300px scroll sonrası görünür
- [ ] **Cookie Banner** — KVKK uyumlu, localStorage

### 4.3 Ana Sayfa — `/`
- [ ] **1. Hero** — Başlık (h1), açıklama, CTA butonları, arka plan görsel, trust badges
- [ ] **2. Kampanya Banner** — Aktif kampanya varsa göster (campaigns.json'dan, `showOnHomepage: true`)
- [ ] **3. Intro** — h2 + paragraf (admin'den düzenlenebilir)
- [ ] **4. Hizmetlerimiz** — Hizmet kartları grid (services.json'dan)
- [ ] **5. Neden Biz** — 6 avantaj ikonu
- [ ] **6. Fiyat Hesaplama** — Tab ile tüm modüller
- [ ] **7. Süreç** — 8 adım (Keşif → Teklif → Onay → Paketleme → Yükleme → Taşıma → Boşaltma → Teslim)
- [ ] **8. Çözümlerimiz** — Çözüm kartları grid (solutions.json'dan)
- [ ] **9. Galeri** — gallery.json'dan ana sayfada gösterilecek görseller (admin'den sayı/layout seçimi)
- [ ] **10. Hizmet Bölgeleri** — Bölge kartları (regions.json'dan)
- [ ] **11. İstatistikler** — Sayaç animasyonu (Framer Motion)
- [ ] **12. Referanslarımız** — Müşteri logoları slider (clients.json'dan, grayscale → hover renkli)
- [ ] **13. Yorumlar** — Carousel slider (yıldızlı, reviews.json'dan, AggregateRating)
- [ ] **14. SSS** — Accordion (FAQPage JSON-LD)
- [ ] **15. Blog Önizleme** — Son 3 blog yazısı kartı
- [ ] **16. CTA Bölümü** — WhatsApp + Telefon + Keşif
- [ ] **17. SEO İçerik Alanı** — 1500+ kelime, h2-h3, TOC, internal linkler

### 4.4 Hizmetlerimiz Sayfası — `/hizmetlerimiz`
- [ ] Hero + Hizmet kartları grid (services.json'dan otomatik) + CTA
- [ ] ItemList JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Hizmetlerimiz

### 4.5 Hizmet Alt Sayfaları — `/[slug]` (dinamik route, ön ek yok)
- [ ] Hero + TOC + Hizmet detayı + Süreç + Fiyat hesaplama + SSS + Yorumlar + CTA
- [ ] Service + FAQPage + AggregateRating + BreadcrumbList JSON-LD
- [ ] Tek template, services.json'dan veri çekme
- [ ] `generateStaticParams()` ile SSG
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Hizmetlerimiz > [Hizmet Adı]

### 4.6 Eşya Depolama — `/esya-depolama` (bağımsız ana bölüm)
- [ ] Hero + TOC
- [ ] Tesis Tanıtımı (konum, genel bilgi)
- [ ] Depolama Birimleri (Küçük/Orta/Büyük/Özel kartları)
- [ ] Fiyat Tablosu (aylık fiyatlar)
- [ ] Galeri (tesis fotoğrafları, lightbox)
- [ ] Güvenlik & Özellikler (kamera, nem kontrolü, sigorta, yangın)
- [ ] Süreç (Keşif → Paketleme → Taşıma → Depolama → Teslim)
- [ ] SSS + Yorumlar + CTA
- [ ] Service + FAQPage + AggregateRating JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Eşya Depolama

### 4.7 Çözümlerimiz Sayfası — `/cozumlerimiz`
- [ ] Hero + Çözüm kartları grid (solutions.json'dan otomatik) + CTA
- [ ] ItemList JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Çözümlerimiz

### 4.8 Çözüm Alt Sayfaları — `/[slug]` (dinamik route, ön ek yok)
- [ ] Hero + TOC + Çözüm detayı + SSS + Yorumlar + CTA
- [ ] Service + FAQPage + AggregateRating + BreadcrumbList JSON-LD
- [ ] Tek template, solutions.json'dan veri çekme
- [ ] `generateStaticParams()` ile SSG
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Çözümlerimiz > [Çözüm Adı]

### 4.9 Fiyatlarımız — `/fiyatlarimiz`
- [ ] Hero + TOC
- [ ] Popüler Ev Taşıma fiyat kartları + "Tümünü Gör"
- [ ] Popüler Ofis Taşıma fiyat kartları + "Tümünü Gör"
- [ ] Popüler Parça Eşya fiyat kartları + "Tümünü Gör"
- [ ] Fiyat hesaplama (tab)
- [ ] SSS + CTA
- [ ] Offer/AggregateOffer JSON-LD

### 4.10 Fiyat Hesaplama — `/nakliyat-fiyat-hesaplama`
- [ ] Tüm modüller tab ile
- [ ] Hesaplama sonucu: fiyat aralığı + detay tablosu
- [ ] WhatsApp'a gönder + Bizi arayın + Form ile gönder

### 4.11 Hizmet Bölgeleri Listesi — `/hizmet-bolgeleri`
- [ ] Bölge kartları grid
- [ ] ItemList JSON-LD

### 4.12 Hizmet Bölgesi Sayfası — `/*.html` (catch-all)
- [ ] Hero + TOC + Bölge detayı + Fiyat hesaplama + SSS + Yorumlar + CTA
- [ ] Service (areaServed + Place) + FAQPage + AggregateRating JSON-LD

### 4.13 Blog Listesi — `/blog`
- [ ] Blog kartları grid + pagination
- [ ] Kategori filtreleme
- [ ] ItemList JSON-LD

### 4.14 Blog Yazısı — `/*.html` (catch-all)
- [ ] Başlık + meta + TOC + İçerik (prose) + Yorumlar + İlgili yazılar + CTA
- [ ] Article + AggregateRating JSON-LD
- [ ] HowTo JSON-LD (uygun içeriklerde)

### 4.15 Hakkımızda — `/hakkimizda`
- [ ] Hero + TOC + Firma bilgileri + Tarihçe + Ekip + CTA
- [ ] Organization JSON-LD

### 4.16 İletişim — `/iletisim`
- [ ] Hero + NAP bilgileri + İletişim formu + Google Maps (lazy) + Çalışma saatleri + Sosyal medya
- [ ] MovingCompany (NAP + GeoCoordinates + OpeningHours) JSON-LD

### 4.17 SSS — `/sikca-sorulan-sorular`
- [ ] Hero + TOC + Accordion SSS listesi
- [ ] FAQPage JSON-LD

### 4.18 Taşıma Kontrol Listesi — `/*.html` (catch-all)
- [ ] `/tasima-kontrol-listesi.html` sayfası (blog formatı, `[...slug]` catch-all ile yakalanır)
- [ ] İnteraktif checkbox'lar (tıklanabilir, localStorage'da ilerleme kaydı)
- [ ] 3 bölüm: Taşınma Öncesi (2 Hafta), Taşınma Günü, Taşınma Sonrası
- [ ] HowTo JSON-LD schema (adım adım)
- [ ] Print-friendly CSS (`@media print`)
- [ ] "İlerlemeyi Sıfırla" butonu
- [ ] CTA: "Ücretsiz Keşif Talep Et" + "Fiyat Hesapla"

### 4.19 Referanslar & Projeler — `/referanslar`
- [ ] Hero + Proje kartları grid (projects.json'dan)
- [ ] Her kart: başlık, müşteri, tip, nereden→nereye, tarih, önce/sonra görseller, yorum
- [ ] Lightbox ile görsel büyütme
- [ ] CollectionPage + ItemList (CreativeWork) JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Referanslar

### 4.20 Araç Filomuz — `/arac-filomuz`
- [ ] Hero + Araç kartları grid (fleet.json'dan)
- [ ] Her kart: araç tipi, model, kapasite m³, uygun ev tipi, özellikler, görsel
- [ ] WebPage + ItemList (Vehicle) JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Araç Filomuz

### 4.21 Kampanyalar — `/kampanyalar`
- [ ] Hero + Kampanya kartları grid (campaigns.json'dan, aktif + süresi dolmuş ayrı)
- [ ] Her kart: başlık, açıklama, indirim, tarih aralığı, görsel, "Teklif Al" CTA
- [ ] WebPage + ItemList (Offer validFrom/validThrough) JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Kampanyalar

### 4.22 Galeri — `/galeri`
- [ ] Hero + Kategori filtreleme (tab/buton grubu) + Resim grid (masonry/grid) + Video kartları
- [ ] Lightbox (ok tuşları, ESC, swipe) + Video modal (YouTube/Vimeo embed)
- [ ] Pagination (sayfa başına 20 öğe, query string)
- [ ] CollectionPage + ImageGallery + VideoObject JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Galeri

### 4.23 Sözleşmeler Listesi — `/sozlesmeler`
- [ ] Hero + Sözleşme kartları grid (contracts.json'dan)
- [ ] Her kart: başlık, kısa açıklama, ilgili hizmet, PDF indirme ikonu
- [ ] CollectionPage + ItemList JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Sözleşmeler

### 4.24 Sözleşme Alt Sayfası — `/[slug]` (root'ta, `[slug]/page.tsx` ile serve)
- [ ] Hero + Aksiyon butonları (Yazdır, Paylaş, PDF İndir, Word İndir)
- [ ] Rich Text içerik (prose formatı)
- [ ] PDF: admin'den yüklenmişse direkt, yoksa `html2pdf.js` ile oluştur
- [ ] Word: admin'den yüklenmişse direkt, yoksa `html-docx-js` ile .docx oluştur
- [ ] Print-friendly CSS (`@media print`)
- [ ] Sidebar: TOC + PDF İndir + İlgili Hizmet
- [ ] WebPage + BreadcrumbList JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Sözleşmeler > [Sözleşme Adı]

### 4.25 Referanslarımız (Müşteri Logoları) — `/referanslarimiz`
- [ ] Hero + Müşteri logoları grid (clients.json'dan)
- [ ] Grayscale → hover'da renkli efekti
- [ ] CollectionPage + ItemList (Organization) JSON-LD
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Referanslarımız

### 4.26 Taşıma Takip — `/tasima-takip`
- [ ] Takip kodu giriş formu (6 haneli kod)
- [ ] Sonuç: 8 adımlı süreç timeline (aktif adım vurgulu)
- [ ] noindex meta tag
- [ ] WebPage JSON-LD (noindex)
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Taşıma Takip

### 4.27 Keşif Talep Formu (Paylaşılan Bileşen)
- [ ] Ad, Telefon, E-Posta, Mevcut Adres (İl/İlçe/Kat/Asansör), Yeni Adres (İl/İlçe/Kat/Asansör)
- [ ] Ev Tipi (1+1, 2+1, 3+1, 4+1, villa), Taşıma Tarihi, Notlar
- [ ] React Hook Form + Zod validasyon
- [ ] API route: `/api/surveys` → survey-requests.json'a kayıt + admin'e SMTP
- [ ] Başarı toast + WhatsApp onay mesajı
- [ ] Rate limiting: 5dk'da max 2 talep
- [ ] Tüm sayfalarda CTA butonundan açılır (Dialog/Sheet)

### 4.28 404 Sayfası
- [ ] Özel 404 tasarımı
- [ ] Ana sayfaya yönlendirme + arama önerisi
- [ ] 404 loglama: `not-found.tsx` → `/api/log-404` API çağrısı → `404-logs.json`'a kayıt

### 4.29 Yorum Bileşeni (Paylaşılan)
- [ ] Yorum listesi (yıldızlı kartlar)
- [ ] Yorum formu (ad + yıldız seçimi + yorum + gönder)
- [ ] Başarı/hata toast mesajları
- [ ] Sayfa bazlı filtreleme

### 4.30 TOC Bileşeni (Paylaşılan)
- [ ] Heading'lerden otomatik oluşturma
- [ ] Masaüstü: sticky sidebar sağ taraf
- [ ] Mobil: collapsible üst kısım
- [ ] Aktif bölüm highlight (Intersection Observer)
- [ ] Smooth scroll

### 4.31 Fiyat Hesaplama Bileşeni (Paylaşılan)
- [ ] Dinamik form render (pricing-modules.json'dan)
- [ ] Bağımlı select (İl → İlçe)
- [ ] Gerçek zamanlı hesaplama
- [ ] Sonuç gösterimi (fiyat aralığı + detay)
- [ ] WhatsApp mesaj formatı + gönder
- [ ] Form ile gönder

### 4.32 Breadcrumbs Bileşeni (Paylaşılan)
- [ ] Sayfa yolundan otomatik breadcrumb oluşturma
- [ ] İlk eleman: "Kozcuoğlu Nakliyat" (Ana Sayfa linki)
- [ ] Son eleman: aktif sayfa (link değil)
- [ ] JSON-LD BreadcrumbList şeması ile destekleme
- [ ] Mobilde tek satır, overflow scroll

### 4.33 İletişim Formu & SMTP
- [ ] React Hook Form + Zod validasyon
- [ ] Form alanları: Ad Soyad, Telefon, E-Posta, Hizmet Tipi, Mesaj, Honeypot
- [ ] Gerçek zamanlı hata mesajları (Türkçe)
- [ ] Loading spinner, başarı/hata toast (Sonner)
- [ ] API route: `/api/messages` → Nodemailer ile SMTP gönderim (FAZ 2.9 ile aynı endpoint)
- [ ] SMTP ayarları: settings.json'dan (host, port, user, pass)
- [ ] HTML e-posta şablonu (firma logosu, düzgün format)
- [ ] Rate limiting: aynı IP'den 5dk'da max 3 form
- [ ] Honeypot field ile bot koruması
- [ ] Gelen mesajlar messages.json'a kayıt

### 4.34 Cookie Consent Banner
- [ ] Cookie consent bileşeni (Framer Motion slide-up)
- [ ] "Tümünü Kabul Et" + "Ayarlar" + "Reddet" butonları
- [ ] Ayarlar paneli: Zorunlu / Analitik / Pazarlama toggle
- [ ] localStorage'da tercih saklama (`cookie-consent` key)
- [ ] Kabul edilmeden analitik/pazarlama scriptleri yüklenmez
- [ ] 30 gün sonra tekrar sorulma
- [ ] Çerez Politikası + Gizlilik Politikası linkleri

### 4.35 Hukuki Sayfalar
- [ ] `/gizlilik-politikasi` — Gizlilik Politikası
- [ ] `/cerez-politikasi` — Çerez Politikası
- [ ] `/kvkk-aydinlatma-metni` — KVKK Aydınlatma Metni
- [ ] `/kullanim-kosullari` — Kullanım Koşulları
- [ ] Admin panelden düzenlenebilir (pages.json)
- [ ] Footer'da linkler

### 4.36 Footer Geliştirici Bileşeni
- [ ] KARAKAR Web logo (koyu footer: Logo-2.webp)
- [ ] "web tasarım" anchor text linki → https://karakar.web.tr
- [ ] Hover popup: Framer Motion tooltip
- [ ] Popup içerik: Ajans adı + proje notu
- [ ] Footer bottom bar: Copyright (sol) + Geliştirici (sağ)

### 4.37 Erişilebilirlik (Accessibility)
- [ ] `<html lang="tr">`
- [ ] Skip to Content linki
- [ ] Focus visible stilleri (`:focus-visible` outline)
- [ ] ARIA labels (butonlar, ikonlar, formlar)
- [ ] Keyboard navigation (tab sırası)
- [ ] `prefers-reduced-motion` desteği
- [ ] Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`)
- [ ] Form error messages: `role="alert"`

---

## FAZ 5 — SEO & Structured Data

### 5.1 Meta Tags & Metadata API
- [ ] Her sayfa için dinamik title, description, OG tags
- [ ] `generateMetadata()` fonksiyonu (Next.js Metadata API)
- [ ] Canonical URL'ler
- [ ] Robots meta (admin sayfaları noindex)
- [ ] Alternate hreflang (gerekirse)

### 5.2 JSON-LD Şemaları
- [ ] Organization (tüm sayfalar)
- [ ] MovingCompany (ana sayfa + iletişim)
- [ ] Service (hizmet + çözüm + bölge sayfaları)
- [ ] BreadcrumbList (tüm sayfalar)
- [ ] FAQPage (SSS olan tüm sayfalar)
- [ ] Article (blog yazıları)
- [ ] WebSite (ana sayfa)
- [ ] Review + AggregateRating (yorum olan sayfalar)
- [ ] HowTo (uygun blog/çözüm sayfaları)
- [ ] ItemList (liste sayfaları)
- [ ] Offer/AggregateOffer (fiyatlarımız)
- [ ] SiteNavigationElement (header menü)
- [ ] Place (hizmet bölgeleri)
- [ ] ContactPoint + OpeningHoursSpecification + GeoCoordinates (iletişim)

### 5.3 Sitemap & Robots
- [ ] `next-sitemap` kurulumu
- [ ] Dinamik sitemap (tüm sayfalar + blog + bölgeler)
- [ ] Görsel sitemap
- [ ] `robots.txt` (admin disallow, AI crawlerlar allow)

### 5.4 GEO (Generative Engine Optimization)
- [ ] `lib/llms-generator.ts` — Build script
- [ ] `/llms.txt` otomatik oluşturma (firma bilgisi, hizmetler, çözümler, iletişim)
- [ ] `/llms-full.txt` otomatik oluşturma (tüm sayfaların başlık+özet, SSS, fiyat aralıkları)
- [ ] `robots.txt`'ye AI crawler izinleri (GPTBot, Google-Extended, ChatGPT-User, anthropic-ai, PerplexityBot)
- [ ] Her deploy'da otomatik güncelleme

### 5.5 Görsel SEO Pipeline
- [ ] `lib/image-pipeline.ts` — sharp ile WebP dönüşüm
- [ ] Responsive srcset boyutları (640, 768, 1024, 1280px)
- [ ] SEO uyumlu dosya adlandırma
- [ ] Alt text zorunluluğu (admin panelde)
- [ ] Görsel sitemap entegrasyonu

### 5.6 NAP Tutarlılığı
- [ ] Header'da NAP
- [ ] Footer'da NAP
- [ ] İletişim sayfasında NAP
- [ ] Schema'da NAP
- [ ] Tüm NAP bilgileri settings.json'dan çekilir (tek kaynak)

### 5.7 301 Redirect Haritası
- [ ] Eski site URL'lerini analiz et
- [ ] `next.config.js` → `redirects()` ile yönlendirme
- [ ] Test et

### 5.8 Entity SEO — @id Referans Sistemi
- [ ] Organization schema'ya `@id: ".../#organization"` ekle
- [ ] MovingCompany schema'ya `@id: ".../#movingcompany"` ekle
- [ ] Tüm Service schema'larda `provider` → `@id` referansı kullan
- [ ] Tüm Article schema'larda `author`/`publisher` → `@id` referansı kullan
- [ ] `alternateName` dizisi ekle (arama varyasyonları)
- [ ] `sameAs` genişlet (Google Maps, LinkedIn, Şikayetvar, Facebook, Instagram, YouTube)

### 5.9 IndexNow — Anında İndeksleme
- [ ] `/api/indexnow` API route oluştur
- [ ] `INDEXNOW_API_KEY` environment variable
- [ ] `/indexnow-key.txt` public dosya
- [ ] Admin panelden içerik güncellendiğinde otomatik tetikleme
- [ ] Yeni blog/bölge/hizmet eklendiğinde otomatik tetikleme

### 5.10 Edge SEO Headers
- [ ] `next.config.js` → `headers()` ile güvenlik başlıkları
- [ ] HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- [ ] Static assets için `Cache-Control: immutable` (1 yıl)
- [ ] Uploads için `Cache-Control: public, max-age=31536000`

### 5.11 Semantic HTML5 Microdata (Yedek)
- [ ] Header'da `itemscope itemtype="MovingCompany"` + `itemprop="name"` + `itemprop="telephone"`
- [ ] Footer'da `<address>` + `itemscope itemtype="PostalAddress"`
- [ ] JSON-LD + Microdata çift sinyal (NAP bilgisi için)

### 5.12 Video SEO (VideoObject Schema)
- [ ] YouTube embed varsa `VideoObject` schema ekle
- [ ] `thumbnailUrl`, `duration`, `uploadDate`, `embedUrl` alanları
- [ ] `publisher` → `@id` referansı

### 5.13 Featured Snippet Hedefleme
- [ ] Hedef sorguları belirle (fiyat, süre, nedir, nasıl yapılır)
- [ ] `<h2>` soru formatı + hemen altında 40-60 kelime cevap
- [ ] Liste snippet: `<ol>` 5-8 madde
- [ ] Tablo snippet: `<table>` fiyat karşılaştırma
- [ ] HowTo schema ile adım snippet

### 5.14 Çoklu Sitemap Stratejisi
- [ ] Sitemap index: `/sitemap.xml`
- [ ] `/sitemap-pages.xml` (statik sayfalar)
- [ ] `/sitemap-services.xml` (hizmetler)
- [ ] `/sitemap-solutions.xml` (çözümler)
- [ ] `/sitemap-regions.xml` (ilçe + şehirler arası)
- [ ] `/sitemap-blog.xml` (blog yazıları)
- [ ] `/sitemap-images.xml` (görsel sitemap)
- [ ] `next-sitemap.config.js` → priority + changefreq ayarları

### 5.15 Web Vitals Monitoring (RUM)
- [ ] `web-vitals` paketi kurulumu
- [ ] `src/lib/web-vitals.ts` → CLS, FID, LCP, FCP, TTFB, INP ölçümü
- [ ] GA4'e gerçek kullanıcı CWV verisi gönderme
- [ ] Search Console CWV raporuyla karşılaştırma

### 5.16 SEO Audit Script (Build Time)
- [ ] `scripts/seo-audit.ts` oluştur
- [ ] Title karakter kontrolü (50-60)
- [ ] Description karakter kontrolü (150-160)
- [ ] Alt text boş mu kontrolü
- [ ] JSON-LD geçerlilik kontrolü
- [ ] Slug çakışma kontrolü
- [ ] Canonical URL doğruluk kontrolü
- [ ] Build sırasında hata varsa uyarı

### 5.17 Content Freshness Stratejisi
- [ ] `dateModified` metadata her sayfada
- [ ] Sitemap `lastmod` ile tutarlılık
- [ ] Admin panelde "Son Güncelleme" tarihi otomatik

### 5.18 Eşya Depolama — SelfStorage Schema
- [ ] `SelfStorage` tipi (LocalBusiness alt tipi)
- [ ] `amenityFeature` (7/24 kamera, nem kontrolü, yangın, sigorta)
- [ ] `UnitPriceSpecification` (aylık fiyat, unitCode: MON)
- [ ] 3 birim tipi: Küçük (5m²), Orta (10m²), Büyük (20m²)

### 5.19 Fiyat Hesaplama — SoftwareApplication Schema
- [ ] `SoftwareApplication` tipi
- [ ] `applicationCategory: "UtilitiesApplication"`
- [ ] `price: 0` (ücretsiz araç)

### 5.20 Şehirler Arası Bölge Sayfaları
- [ ] `regions.json`'da `type: "sehirlerarasi"` alanı
- [ ] `areaServed: [City, City]` yapısı (iki şehir)
- [ ] URL: `/istanbul-[sehir]-evden-eve-nakliyat.html`
- [ ] Breadcrumb: Kozcuoğlu Nakliyat > Hizmet Bölgeleri > İstanbul Ankara Evden Eve Nakliyat
- [ ] Her şehir için özel fiyat aralığı ve SSS

### 5.21 Ücretsiz Keşif & Online Teklif Sistemi
- [ ] Keşif Talep Formu (Ad, Telefon, Mevcut/Yeni Adres İl/İlçe, Ev Tipi, Tarih, Kat, Asansör)
- [ ] `survey-requests.json` veri yapısı + API route
- [ ] Admin panelde "Keşif Talepleri" sayfası (durum yönetimi: Yeni→İletişim→Keşif→Teklif→Onay→İptal)
- [ ] SMTP ile admin'e bildirim
- [ ] WhatsApp otomatik mesaj: "Talebiniz alındı"
- [ ] Tüm sayfalarda "Ücretsiz Keşif Talep Et" CTA butonu
- [ ] Sticky CTA bar'a "Keşif" butonu ekle (mobil)

### 5.22 Taşıma Takip Sistemi
- [ ] `/tasima-takip` sayfası (noindex)
- [ ] `tracking.json` veri yapısı (8 adımlı süreç)
- [ ] Takip kodu ile erişim (`?kod=XXXX`)
- [ ] Admin panelde durum güncelleme
- [ ] Durum değişikliğinde WhatsApp bildirimi

### 5.23 Referanslar & Projeler Sayfası
- [ ] `/referanslar` sayfası
- [ ] `projects.json` veri yapısı (görsel, müşteri, tip, nereden→nereye, tarih, yorum)
- [ ] Admin panelde proje ekleme/düzenleme
- [ ] Önce/sonra görsel yükleme
- [ ] CreativeWork schema

### 5.24 Araç Filomuz Sayfası
- [ ] `/arac-filomuz` sayfası
- [ ] `fleet.json` veri yapısı (araç tipi, kapasite m³, görsel, özellikler)
- [ ] Admin panelde araç ekleme/düzenleme
- [ ] Vehicle schema

### 5.25 Kampanyalar Sayfası
- [ ] `/kampanyalar` sayfası
- [ ] `campaigns.json` veri yapısı (başlık, açıklama, indirim, başlangıç/bitiş tarihi, aktif/pasif)
- [ ] Admin panelde kampanya yönetimi
- [ ] Ana sayfada aktif kampanya banner'ı
- [ ] Offer schema (validFrom/validThrough)

### 5.26 Sigorta Bilgilendirme Bölümü
- [ ] Her hizmet sayfasında sigorta bölümü (kapsam, limit, hasar süreci)
- [ ] Sigorta SSS (4 soru)
- [ ] Sigorta ortağı logo gösterimi
- [ ] Admin panelden sigorta bilgisi düzenleme

### 5.27 Kurumsal Belgeler & Sertifikalar
- [ ] Hakkımızda sayfasında belgeler bölümü
- [ ] K1 Yetki Belgesi, Ticaret Sicil, Vergi Levhası, Sigorta Poliçesi, İSG, TSE
- [ ] Belge görselleri (watermark'lı) + lightbox
- [ ] Admin panelden belge yükleme

### 5.28 WhatsApp Gelişmiş Entegrasyon
- [ ] Sayfa bazlı otomatik mesaj şablonları (hizmet adı, bölge adı otomatik)
- [ ] Fiyat hesaplama sonucu WhatsApp ile paylaş
- [ ] Keşif talebi sonrası otomatik WhatsApp mesajı
- [ ] Taşıma durumu değişikliğinde WhatsApp bildirimi

### 5.29 Acil Nakliyat Bölümü
- [ ] Her hizmet sayfasında "Acil Nakliyat" bölümü
- [ ] Aynı gün taşıma vurgusu, 7/24 hizmet
- [ ] Minimal acil form: Ad + Telefon + "Hemen Ara"
- [ ] Büyük, dikkat çekici telefon numarası

### 5.30 Fiyat Hesaplama Gelişmiş Özellikler
- [ ] Oda bazlı eşya listesi seçimi (yatak odası, salon, mutfak, banyo)
- [ ] Kat + asansör çarpanı
- [ ] Ek hizmetler checkbox (ambalajlama, montaj, sigorta)
- [ ] PDF teklif indirme
- [ ] WhatsApp ile paylaşma
- [ ] Fotoğraf yükleme (opsiyonel)

### 5.31 İlçe Sayfası Zenginleştirme
- [ ] Bölge tanıtımı (nüfus, konum)
- [ ] Merkezden mesafe ve süre bilgisi
- [ ] Komşu bölgeler internal link yapısı
- [ ] Bölge haritası (mini)
- [ ] Bölge için önceden doldurulmuş fiyat hesaplama

### 5.32 Sosyal Kanıt & Trust Bileşenleri
- [ ] Google Business yıldız puanı gösterimi
- [ ] Sayaç animasyonları (10.000+ müşteri, 15.000+ taşıma, 50+ araç, 15+ yıl)
- [ ] Kurumsal müşteri logoları (izinli)
- [ ] "Neden Kozcuoğlu?" karşılaştırma tablosu
- [ ] Memnuniyet garantisi badge'leri (6 adet)

### 5.33 CRO & Dönüşüm İzleme
- [ ] GA4 dönüşüm hedefleri (keşif, telefon, whatsapp, hesaplama, form, yorum, pdf)
- [ ] GTM event tracking kurulumu
- [ ] Microsoft Clarity heatmap entegrasyonu
- [ ] Mobil CRO: Sticky CTA bar'a "Keşif" butonu, tek adım form
- [ ] Dönüşüm artırma: aciliyet, kıtlık, sosyal kanıt, güven badge'leri

### 5.34 Nakliyat Blog İçerik Stratejisi
- [ ] Blog kategorileri: Rehber, Fiyat, İpucu, Checklist, Karşılaştırma, Bölge, Sezonsal, Sigorta
- [ ] Blog yazı şablonu (10 zorunlu bileşen)
- [ ] Mevsimsel içerik takvimi
- [ ] Anahtar kelime haritası (birincil + uzun kuyruk + mevsimsel)

### 5.35 Galeri Sistemi
- [ ] `/galeri` sayfası (Resim + Video galerisi)
- [ ] `gallery.json` veri yapısı (başlık, tip, dosya/URL, alt text, kategori, sıra, ana sayfada göster)
- [ ] Admin panelde galeri yönetimi (`/admin/gallery`)
- [ ] Drag & drop sıralama, toplu yükleme
- [ ] Video galerisi: YouTube/Vimeo embed
- [ ] Ana sayfada galeri section (admin'den sayı seçimi: 4/6/8/12, layout: grid/masonry/carousel)
- [ ] Lightbox görüntüleme (resim büyütme)
- [ ] Kategori filtreleme (Genel, Nakliyat, Depolama, Araç, Ofis)

### 5.36 Sözleşmeler Sistemi
- [ ] `/sozlesmeler` liste sayfası
- [ ] Sözleşme alt sayfaları root'ta: `/evden-eve-nakliyat-sozlesmesi` (ön ek yok, `[slug]/page.tsx` ile serve)
- [ ] `contracts.json` veri yapısı (başlık, slug, içerik, PDF, Word, ilgili hizmet)
- [ ] Admin panelde sözleşme yönetimi (`/admin/contracts`)
- [ ] Rich Text Editor ile sözleşme içeriği
- [ ] Aksiyon butonları: Yazdır (`window.print`), Paylaş (Web Share API + URL kopyala), PDF İndir, Word İndir
- [ ] PDF: admin'den yüklenmişse direkt indir, yoksa `html2pdf.js` ile oluştur
- [ ] Word: admin'den yüklenmişse direkt indir, yoksa `html-docx-js` ile .docx oluştur
- [ ] Print-friendly CSS (`@media print` ile gereksiz elementleri gizle)
- [ ] Slug benzersizlik kontrolüne sözleşmeleri dahil et
- [ ] Örnek sözleşmeler: Evden Eve, Ofis, Depolama, Şehirler Arası, Sigorta Taahhütnamesi

### 5.37 Referanslarımız (Müşteri Logoları)
- [ ] `/referanslarimiz` sayfası
- [ ] `clients.json` veri yapısı (firma adı, logo, website, sıra)
- [ ] Admin panelde logo yönetimi (`/admin/clients`)
- [ ] Ana sayfada müşteri logoları slider (grayscale → hover'da renkli)
- [ ] Drag & drop sıralama

### 5.38 Yıldızlama & AggregateRating Sistemi
- [ ] `ratings.json` veri yapısı (sayfa, mod, rating, yorum sayısı)
- [ ] Admin panelde sayfa bazlı rating yönetimi (`/admin/ratings`)
- [ ] Otomatik mod: onaylı yorumlardan hesaplama
- [ ] Manuel mod: admin'in elle girdiği değerler
- [ ] Rich Snippets çıktısı: Google SERP'te yıldızlar + değerlendirme sayısı + fiyat aralığı
- [ ] Her sayfanın JSON-LD'sine AggregateRating ekleme (ratings.json'dan)

### 5.39 Otomatik İç Linkleme Sistemi
- [ ] `internal-links.json` veri yapısı (keyword, targetUrl, maxLinks, bold/italic/underline/color sayıları)
- [ ] Admin panelde iç linkleme kuralları yönetimi (`/admin/internal-links`)
- [ ] "Başlat" butonu: tüm sayfa içeriklerini tarayıp kurallara göre link oluşturma
- [ ] Stil kuralları: bold, eğik, altı çizili, farklı renk (sayı + renk kodu)
- [ ] Güvenlik: kendi sayfasına link vermez, heading'lerde link oluşturmaz, mevcut linkleri bozmaz
- [ ] "Geri Al" butonu: tüm otomatik linkleri kaldırma
- [ ] Sonuç raporu: "X sayfada Y link oluşturuldu"

### 5.40 Mega Footer
- [ ] 4 katmanlı footer yapısı (CTA bar + 5 kolon ana + bölge tam liste + hukuki+geliştirici)
- [ ] Footer CTA bar: "Hemen Teklif Alın" + "Ücretsiz Keşif" + "Bizi Arayın"
- [ ] 5 kolon: Firma, Hizmetlerimiz, Çözümlerimiz, Hizmet Bölgeleri, İletişim
- [ ] Hizmet Bölgeleri tam liste: `regions.json`'dan tüm bölgeler (4-6 kolon grid)
- [ ] Mobilde accordion tarzı açılır/kapanır footer
- [ ] Hukuki linkler: Gizlilik, Çerez, KVKK, Kullanım Koşulları, Sözleşmeler

### 5.41 Sticky Sidebar
- [ ] Sidebar bileşeni: TOC + İlgili Sayfalar + CTA Kutusu + Fiyat Aralığı
- [ ] Hizmet/Çözüm/Bölge/Blog/SSS/Hakkımızda/Sözleşme sayfalarında sidebar
- [ ] Masaüstü: sticky `top-24`, `w-80`, `max-h-[calc(100vh-6rem)]`
- [ ] Mobil/Tablet: sidebar gizli, TOC sayfanın üstünde açılır/kapanır
- [ ] Scroll spy ile aktif başlık takibi
- [ ] Footer'a yaklaşınca sticky biter (intersection observer)

### 5.42 SEO 10+ Seviyesi — Speakable Schema
- [ ] Her sayfada `SpeakableSpecification` schema ekle (h1, intro, ilk SSS cevabı)
- [ ] Sesli arama uyumlu cümleler: kısa, net, konuşma dili
- [ ] Fiyat aralıkları sesli okunabilir formatta

### 5.43 SEO 10+ Seviyesi — Wikidata & Knowledge Panel
- [ ] Wikidata'da firma kaydı oluştur
- [ ] `sameAs` listesini genişlet (12+ platform: Facebook, Instagram, YouTube, LinkedIn, TikTok, Pinterest, Sahibinden, Şikayetvar, Wikidata)
- [ ] Google Knowledge Panel stratejisi: doğrulanmış profiller + basın haberleri

### 5.44 SEO 10+ Seviyesi — Nested JSON-LD
- [ ] Hizmet sayfalarında iç içe schema: WebPage → Service → AggregateOffer → AggregateRating → OfferCatalog → Review
- [ ] SERP'te 4-5 satır yer kaplama hedefi (yıldız + fiyat + breadcrumb + SSS)

### 5.45 SEO 10+ Seviyesi — Dinamik FAQ (PAA Hedefli)
- [ ] SSS soruları gerçek arama sorgularından türet (Google Suggest, PAA)
- [ ] Her hizmet sayfasında min 5, bölge sayfasında min 3, blog'da min 3 SSS
- [ ] Admin panelde SSS yönetimi (sayfa bazlı)

### 5.46 SEO 10+ Seviyesi — Internal Link Skoru Dashboard
- [ ] Orphan page tespiti (hiçbir sayfadan link almayan)
- [ ] Link depth analizi (max 3 tık kuralı)
- [ ] Anchor text dağılımı raporu
- [ ] Otomatik uyarılar (min 3 internal link kuralı)

### 5.47 SEO 10+ Seviyesi — Predictive SEO (Mevsimsel Takvim)
- [ ] Nakliyat sektörü aylık arama takvimi (12 ay)
- [ ] Admin panelde "İçerik Takvimi" bölümü (hatırlatma + taslak)
- [ ] Mevsimsel SSS ve kampanya otomasyonu

### 5.48 SEO 10+ Seviyesi — CrUX Perfect Score
- [ ] LCP < 1.2s hedefi (hero priority + kritik CSS inline + font preload)
- [ ] INP < 50ms hedefi (requestIdleCallback + useTransition)
- [ ] CLS < 0.01 hedefi (width/height + size-adjust + skeleton)

### 5.49 SEO 10+ Seviyesi — Schema Doğrulama Pipeline
- [ ] `validate-schemas.ts` — build time schema doğrulama
- [ ] `seo-audit.ts` — title/desc/h1/alt kontrol
- [ ] `broken-links.ts` — kırık link kontrolü
- [ ] `sitemap-validate.ts` — sitemap tutarlılık
- [ ] Hata varsa build fail

### 5.50 SEO 10+ Seviyesi — Semantic HTML5 Landmarks
- [ ] Her sayfada tutarlı landmark yapısı (header/nav/main/article/section/aside/footer)
- [ ] ARIA label'lar (ana menü, TOC, sidebar, SSS)
- [ ] Skip to content linki
- [ ] Microdata + JSON-LD birlikte (NAP alanlarında)

### 5.51 SEO 10+ Seviyesi — Search Console API Dashboard
- [ ] Admin panelde SEO dashboard (gösterim, tıklama, pozisyon, CTR, CWV)
- [ ] Otomatik uyarılar (sıralama düşüşü, index çıkma, CWV kötüleşme)
- [ ] Haftalık SEO raporu (e-posta/WhatsApp)

### 5.52 SEO 10+ Seviyesi — Otomatik Alt Text Önerisi
- [ ] Görsel yüklendiğinde şablon bazlı alt text önerisi
- [ ] Sayfa bağlamına göre (hizmet/bölge/proje/araç/galeri)
- [ ] Boş alt text ile kayıt engelleme

### 5.53 SEO 10+ Seviyesi — Link Building & Dış Link Stratejisi
- [ ] 20+ yerel dizine NAP tutarlı kayıt
- [ ] Broken link building stratejisi
- [ ] Basın bülteni / PR çalışması planı
- [ ] Admin panelde kazanılan/kaybedilen dış link takibi

### 5.54 301 Redirect & 404 Yönetimi
- [ ] `/admin/redirects` sayfası (tab yapısı: 301 + 404)
- [ ] 301 yönlendirme CRUD (eski URL → yeni URL, tip, not, hit sayacı)
- [ ] Toplu CSV/JSON içe aktarma (eski site taşıma)
- [ ] `next.config.js` `redirects()` fonksiyonuna `redirects.json`'dan otomatik besleme
- [ ] 404 otomatik loglama (`not-found.tsx` → `/api/log-404` → `404-logs.json`)
- [ ] 404 → 301 hızlı dönüştürme butonu (tek tıkla yönlendirme oluştur)
- [ ] 404 log temizleme (90 gün otomatik, toplu silme, CSV dışa aktarma)
- [ ] Dashboard uyarıları (yeni 404'ler, yüksek hit'li 404'ler)

> **ÖNEMLİ NOT:** 5.55-5.69 arası maddeler SEO değil, **Admin Panel Altyapı & Genel Özellikler** kapsamındadır. FAZ 5 altında toplanmıştır çünkü SEO/site özellikleriyle paralel geliştirilir. Geliştirici bu maddeleri atlamasın.

### 5.55 Dashboard Ayarları Genişletme
- [ ] Logo & Favicon yönetimi (açık/koyu tema, ICO, SVG, Apple Touch, PWA ikonları)
- [ ] OG Default Image yönetimi (1200x630)
- [ ] sameAs linkleri yönetimi (12+ platform + sınırsız ekstra URL)
- [ ] Entegrasyon ayarları (GA4, GTM, Clarity, Tawk.to, IndexNow, SMTP)
- [ ] `settings.json`'dan tüm schema'lara otomatik sameAs besleme

### 5.56 Admin Panel Bildirim Sistemi
- [ ] Bildirim veri yapısı: `notifications.json` (id, tip, mesaj, link, okundu, tarih)
- [ ] Bildirim üreten olaylar: yeni yorum, yeni mesaj, yeni keşif talebi, yeni 404 hatası, kampanya süresi dolma
- [ ] Header'da bildirim ikonu + okunmamış sayı badge
- [ ] Bildirim dropdown listesi (son 10)
- [ ] Okundu/okunmadı toggle
- [ ] Tümünü okundu işaretle butonu

### 5.57 Admin Panel Global Arama
- [ ] Header'da arama input (Cmd+K / Ctrl+K kısayolu)
- [ ] Tüm modüllerde arama: hizmet, çözüm, bölge, blog, yorum, mesaj, keşif, sözleşme
- [ ] Sonuçlar dropdown'da gruplandırılmış (Hizmetler, Blog, Yorumlar vb.)
- [ ] Tıklayınca ilgili sayfaya yönlendirme
- [ ] Debounce ile performanslı arama (300ms)

### 5.58 Admin Panel Activity Log
- [ ] `activity-logs.json` veri yapısı (id, userId, action, target, details, ip, tarih)
- [ ] Loglanan işlemler: ekleme, güncelleme, silme, giriş, çıkış, ayar değişikliği
- [ ] `/admin/settings` altında "İşlem Geçmişi" tab'ı
- [ ] Filtreleme: tarih aralığı, işlem tipi, kullanıcı
- [ ] 90 gün sonra otomatik temizleme

### 5.59 Yedekleme Sistemi Detayı
- [ ] `/admin/settings` altında "Yedekleme" tab'ı
- [ ] Tek tıkla ZIP yedekleme (tüm JSON dosyaları + uploads klasörü)
- [ ] Otomatik yedekleme: haftalık (cron job veya API route ile)
- [ ] Yedek dosya: `/backups/backup-YYYY-MM-DD.zip`
- [ ] Son 5 yedek saklanır, eskiler otomatik silinir
- [ ] Yedekten geri yükleme: ZIP yükle → JSON dosyaları üzerine yaz (onay dialogu ile)
- [ ] Yedek indirme butonu

### 5.60 E-Posta Şablonları
- [ ] `lib/email-templates.ts` — HTML e-posta şablon fonksiyonları
- [ ] **İletişim formu şablonu:** Firma logosu + müşteri bilgileri + mesaj + tarih
- [ ] **Keşif talebi şablonu:** Firma logosu + talep detayları (adres, ev tipi, tarih, kat)
- [ ] **Taşıma durumu şablonu:** Firma logosu + takip kodu + mevcut durum + sonraki adım
- [ ] **Yorum bildirimi şablonu:** Firma logosu + yorum detayı + onay/reddet linkleri
- [ ] Tüm şablonlar responsive (mobil uyumlu HTML e-posta)
- [ ] Footer: firma NAP bilgileri + "Bu e-posta otomatik gönderilmiştir"

### 5.61 Admin Panel Dark Mode
- [ ] Dark mode toggle (header'da güneş/ay ikonu)
- [ ] `localStorage` ile tercih saklama (`admin-theme` key)
- [ ] Sistem tercihine uyum (`prefers-color-scheme`)
- [ ] TailwindCSS `dark:` class'ları ile uygulama
- [ ] Sidebar zaten koyu (#122032), içerik alanı dark mode'da koyu gri (#1a1a2e)

### 5.62 Admin Responsive Tablo Stratejisi
- [ ] Masaüstü (1024px+): Normal tablo görünümü
- [ ] Tablet (768-1023px): Yatay scroll + sticky ilk kolon
- [ ] Mobil (< 768px): Kart görünümüne dönüşüm (her satır bir kart)
- [ ] Tüm tablolarda: sıralama, arama, sayfalama (10/25/50 satır)
- [ ] Toplu seçim checkbox'ı + toplu işlem butonları

### 5.63 Admin Görsel Crop & Resize
- [ ] Görsel yükleme sırasında crop aracı (react-image-crop veya react-easy-crop)
- [ ] Preset oranlar: 16:9 (hero), 4:3 (kart), 1:1 (profil), 1200x630 (OG)
- [ ] Crop sonrası otomatik WebP dönüşüm + boyutlandırma
- [ ] Önizleme: crop sonucu göster, onaydan sonra kaydet

### 5.64 500 Hata Sayfası & Error Boundary
- [ ] `src/app/error.tsx` — Global error boundary (React Error Boundary)
- [ ] `src/app/global-error.tsx` — Root layout hataları için
- [ ] 500 hata sayfası tasarımı: "Bir hata oluştu" + "Ana Sayfaya Dön" + "Tekrar Dene" butonları
- [ ] Hata loglama: console.error + opsiyonel external service (Sentry vb.)
- [ ] API hata response formatı: `{ success: false, error: "Hata mesajı", statusCode: 500 }`

### 5.65 Loading States & Skeleton
- [ ] Sayfa geçişlerinde üst loading bar (NProgress tarzı, `next/navigation` events)
- [ ] Skeleton loader uygulanacak bileşenler: hizmet kartları, blog kartları, yorum listesi, galeri grid, fiyat hesaplama
- [ ] Admin panelde tablo yüklenirken skeleton satırları
- [ ] `loading.tsx` dosyaları: her route group için (site + admin)
- [ ] Suspense boundary'ler: dinamik bileşenler için

### 5.66 Blog Kategori Yönetimi (Admin)
- [ ] `settings.json → blogCategories` dizisi (admin'den CRUD)
- [ ] `/admin/settings` altında "Blog Kategorileri" tab'ı
- [ ] Kategori ekleme/düzenleme/silme (ad, slug, açıklama)
- [ ] Varsayılan kategoriler: Rehber, Fiyat, İpucu, Checklist, Karşılaştırma, Bölge, Sezonsal, Sigorta
- [ ] Kategori silindiğinde o kategorideki yazılar "Genel" kategorisine taşınır

### 5.67 Content-Security-Policy Header
- [ ] `next.config.js` → `headers()` içinde CSP tanımı
- [ ] `default-src 'self'`
- [ ] `script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.tawk.to *.clarity.ms`
- [ ] `style-src 'self' 'unsafe-inline'`
- [ ] `img-src 'self' data: *.google.com *.googleapis.com *.gstatic.com`
- [ ] `frame-src *.google.com *.youtube.com *.vimeo.com *.tawk.to`
- [ ] `connect-src 'self' *.google-analytics.com *.clarity.ms *.tawk.to`
- [ ] Report-Only modda test, sonra enforce

### 5.68 Hreflang Hazırlık (Gelecek)
- [ ] `<link rel="alternate" hreflang="tr" href="..." />` tüm sayfalarda
- [ ] `<link rel="alternate" hreflang="x-default" href="..." />` tüm sayfalarda
- [ ] Metadata API'de `alternates.languages` tanımı
- [ ] İleride çoklu dil eklenirse altyapı hazır

### 5.69 Progressive Enhancement
- [ ] JavaScript devre dışıyken temel içerik okunabilir (SSG/SSR sayesinde)
- [ ] Fiyat hesaplama: JS yoksa "Bizi Arayın" fallback göster
- [ ] Formlar: `<noscript>` içinde telefon/WhatsApp alternatifi
- [ ] Carousel/slider: JS yoksa statik grid göster
- [ ] Cookie banner: JS yoksa varsayılan olarak sadece zorunlu çerezler

---

## FAZ 6 — Performans Optimizasyonu (PSI %100)

### 6.1 Görsel Optimizasyonu
- [ ] `next/image` ile tüm görseller
- [ ] WebP format, responsive srcset
- [ ] Lazy loading (viewport dışı)
- [ ] Blur placeholder
- [ ] OG image'lar (1200x630)

### 6.2 Font Optimizasyonu
- [ ] `next/font` ile self-hosted Inter
- [ ] `font-display: swap`
- [ ] Subset (latin + latin-ext)

### 6.3 JavaScript Optimizasyonu
- [ ] Dynamic import (ağır bileşenler: fiyat hesaplama, harita, carousel)
- [ ] Tree shaking
- [ ] Bundle analizi
- [ ] Third-party script'ler lazy load (GA4, GTM, Clarity, Tawk.to)

### 6.4 CSS Optimizasyonu
- [ ] Tailwind purge (kullanılmayan CSS kaldır)
- [ ] Critical CSS inline
- [ ] Unused CSS kontrolü

### 6.5 Core Web Vitals
- [ ] LCP < 2.5s (hero görsel optimize)
- [ ] FID/INP < 200ms (JS minimize)
- [ ] CLS < 0.1 (layout shift yok, görsel boyutları sabit)

### 6.6 Güvenlik Başlıkları
- [ ] `next.config.js` → security headers
- [ ] X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- [ ] Content-Security-Policy
- [ ] Strict-Transport-Security

---

## FAZ 7 — PWA

### 7.1 PWA Kurulumu
- [ ] `next-pwa` kurulumu + konfigürasyonu
- [ ] `manifest.json` oluştur
- [ ] PWA ikonları (72-512px)
- [ ] Service worker stratejileri (NetworkFirst, CacheFirst, StaleWhileRevalidate)

### 7.2 Offline Destek
- [ ] Offline sayfalar cache'e al
- [ ] Offline fallback sayfası tasarla
- [ ] API cache stratejisi

### 7.3 Install & iOS
- [ ] Custom install prompt
- [ ] Splash screen
- [ ] iOS meta tags

---

## FAZ 8 — Test & QA

### 8.1 Fonksiyonel Test
- [ ] Tüm sayfalar doğru render oluyor mu?
- [ ] Admin panel CRUD işlemleri çalışıyor mu? (22 bölüm tek tek)
- [ ] Fiyat hesaplama doğru sonuç veriyor mu?
- [ ] Yorum sistemi çalışıyor mu (gönder, onayla, göster)?
- [ ] İletişim formu çalışıyor mu (SMTP gönderim + messages.json kayıt)?
- [ ] Keşif talep formu çalışıyor mu (SMTP + WhatsApp + survey-requests.json)?
- [ ] Taşıma takip sistemi çalışıyor mu (kod sorgulama + durum güncelleme + WhatsApp)?
- [ ] WhatsApp mesaj formatı doğru mu (sayfa bazlı şablonlar)?
- [ ] TOC doğru çalışıyor mu (scroll spy, smooth scroll)?
- [ ] Mega menü doğru çalışıyor mu (hover, mobil accordion)?
- [ ] Galeri lightbox çalışıyor mu (ok tuşları, ESC, swipe)?
- [ ] Sözleşme PDF/Word indirme çalışıyor mu?
- [ ] Kampanya banner ana sayfada gösteriliyor mu?
- [ ] Blog pagination ve kategori filtreleme çalışıyor mu?
- [ ] Slug benzersizlik kontrolü çalışıyor mu (tüm veri kaynakları)?
- [ ] Cookie consent banner çalışıyor mu (script engelleme)?
- [ ] Admin bildirim sistemi çalışıyor mu?
- [ ] Admin global arama çalışıyor mu (Cmd+K)?
- [ ] Yedekleme sistemi çalışıyor mu (ZIP indir/geri yükle)?
- [ ] 301 redirect'ler çalışıyor mu (redirects.json → next.config.js)?
- [ ] 404 loglama çalışıyor mu (not-found.tsx → API → 404-logs.json)?

### 8.1.1 PWA Test
- [ ] Offline fallback sayfası çalışıyor mu?
- [ ] Service worker doğru cache stratejisi uyguluyor mu?
- [ ] Install prompt görünüyor mu?
- [ ] iOS'ta PWA düzgün çalışıyor mu (splash, meta tags)?
- [ ] Precache edilen sayfalar offline erişilebilir mi?

### 8.2 SEO Test
- [ ] Google Rich Results Test — tüm şemalar geçerli mi?
- [ ] Schema Markup Validator
- [ ] Sitemap.xml doğru mu?
- [ ] Robots.txt doğru mu?
- [ ] Canonical URL'ler doğru mu?
- [ ] Meta tags doğru mu?
- [ ] NAP tutarlılığı kontrol

### 8.3 Performans Test
- [ ] Google PageSpeed Insights — Mobil %100
- [ ] Google PageSpeed Insights — Masaüstü %100
- [ ] Lighthouse audit
- [ ] Core Web Vitals kontrol
- [ ] Bundle size analizi

### 8.4 Responsive Test
- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Laptop (1280px)
- [ ] Desktop (1536px+)

### 8.5 Tarayıcı Testi
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet

### 8.6 Erişilebilirlik
- [ ] WCAG AA kontrast oranları
- [ ] Keyboard navigasyon
- [ ] Screen reader uyumluluğu
- [ ] Focus visible stiller
- [ ] Alt text kontrol

---

## FAZ 9 — Veri Göçü (Eski Site)

### 9.1 Eski Site Analizi
- [ ] Mevcut URL'leri listele
- [ ] Mevcut içerikleri çek (web scraping veya manuel)
- [ ] Mevcut görselleri indir

### 9.2 İçerik Aktarımı
- [ ] Blog yazılarını JSON'a aktar
- [ ] Hizmet bölgelerini JSON'a aktar
- [ ] Görselleri optimize edip `/public/uploads/` altına taşı

### 9.3 301 Redirect
- [ ] Eski URL → Yeni URL eşleştirmesi
- [ ] `next.config.js` redirects
- [ ] Test

---

## FAZ 10 — Deploy & Yayın

### 10.1 Vercel Deploy
- [ ] Vercel'e bağla
- [ ] Environment variables ayarla
- [ ] Build test
- [ ] Custom domain bağla (kozcuoglunakliyat.com.tr)
- [ ] SSL sertifikası kontrol

### 10.2 cPanel Deploy (Alternatif)
- [ ] cPanel → Setup Node.js App → Node.js 18+ seç
- [ ] Application root + startup file ayarla
- [ ] `npm install` → `npm run build` → `npm start`
- [ ] .htaccess: Proxy ile Node.js portuna yönlendirme
- [ ] Environment variables ayarla (cPanel Node.js App ayarlarından)
- [ ] Domain bağımsız çalışma testi (relative path, settings.json'dan site.url)

### 10.3 Yayın Sonrası
- [ ] Google Search Console'a sitemap gönder
- [ ] Google Business Profile güncelle (NAP)
- [ ] Bing Webmaster Tools
- [ ] Yandex Webmaster
- [ ] Analytics çalışıyor mu kontrol
- [ ] Tawk.to canlı destek çalışıyor mu kontrol
- [ ] Son bir PSI testi
- [ ] Son bir Rich Results testi

---

## Özet — Faz Sıralaması

| Faz | Konu | Adım Sayısı | Tahmini Süre |
|---|---|---|---|
| 1 | Proje Kurulumu & Altyapı | 1.1-1.8 | 2-3 gün |
| 2 | Backend / API Routes | 2.1-2.23 | 4-5 gün |
| 3 | Admin Panel Frontend | 3.1-3.22 | 7-10 gün |
| 4 | Public Site Frontend | 4.1-4.37 | 10-14 gün |
| 5 | SEO & Structured Data | 5.1-5.69 | 5-7 gün |
| 6 | Performans Optimizasyonu | 6.1-6.6 | 1-2 gün |
| 7 | PWA | 7.1-7.3 | 1 gün |
| 8 | Test & QA | 8.1-8.6 | 3-4 gün |
| 9 | Veri Göçü | 9.1-9.3 | 1-2 gün |
| 10 | Deploy & Yayın | 10.1-10.3 | 1 gün |
| **Toplam** | | **~170 adım** | **35-48 gün** |
