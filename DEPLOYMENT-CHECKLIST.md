# 🚀 DEPLOYMENT CHECKLIST - Kozcuoğlu Nakliyat

## ⚠️ HER DEPLOYMENT ÖNCESİ MUTLAKA KONTROL ET

---

## 📋 1. BUILD VE TEST

### **A. Production Build**
```bash
cd /Users/karakar/Desktop/kozcuoglu
npm run build
```

**Kontrol:**
- ✅ Build başarılı mı? (hata yok)
- ✅ TypeScript hataları yok mu?
- ✅ Tüm sayfalar generate oldu mu? (142 sayfa)

---

### **B. Production Server Başlat**
```bash
npm start
```

**Kontrol:**
- ✅ Server başladı mı? (`http://localhost:3000`)
- ✅ Terminal'de hata yok mu?

---

### **C. Chrome Lighthouse Test**

**Adımlar:**
1. Chrome'da `http://localhost:3000` aç
2. DevTools aç (`Cmd + Option + I`)
3. Lighthouse sekmesine git
4. **Mode:** Navigation, **Device:** Mobile
5. **Categories:** Tümünü seç
6. "Analyze page load" tıkla

**Hedef Skorlar:**
- ✅ **Performance:** 85+ (ideal: 90+)
- ✅ **Accessibility:** 90+
- ✅ **Best Practices:** 95+
- ✅ **SEO:** 100

**Eğer skorlar düşükse:**
- Performance < 85: Optimizasyon gerekiyor
- Accessibility < 90: Erişilebilirlik sorunları var
- Best Practices < 95: Kod kalitesi sorunları
- SEO < 100: SEO hataları var

---

## 📋 2. HEADER KONTROLÜ

### **Ana Sayfa Header**
```
http://localhost:3000
```

**Kontrol Listesi:**
- ✅ Logo görünüyor mu?
- ✅ Tüm menü öğeleri var mı?
  - Kurumsal
  - Çözümlerimiz
  - Hizmetlerimiz
  - Depolama
  - **Fiyatlar** ← ÖNEMLİ!
  - Referanslar
  - Hizmet Bölgeleri
  - İletişim
- ✅ **Fiyatlar menüsü açılıyor mu?**
  - Fiyat Hesapla
  - Evden Eve Nakliyat Fiyatları
  - Diğer dinamik pricing pages
- ✅ Mega menüler düzgün açılıyor mu?
- ✅ Mobil menü çalışıyor mu?
- ✅ "Ücretsiz Keşif" butonu var mı?

---

## 📋 3. FOOTER KONTROLÜ

### **Footer Bölümleri**

**Kontrol Listesi:**
- ✅ **Kurumsal** bölümü tam mı?
- ✅ **Hizmetler** bölümü tam mı?
- ✅ **Fiyatlarımız** bölümü var mı?
  - Fiyat Hesapla
  - Evden Eve Nakliyat Fiyatları
  - Tümünü Gör linki
- ✅ **İletişim** bilgileri doğru mu?
  - Adres
  - Telefon: 444 7 436
  - Email: info@kozcuoglunakliyat.com.tr
  - WhatsApp linki çalışıyor mu?
- ✅ Sosyal medya ikonları var mı?
- ✅ Copyright yılı güncel mi? (2026)
- ✅ Alt footer linkleri çalışıyor mu?
  - Gizlilik Politikası
  - Çerez Politikası
  - KVKK
  - Kullanım Koşulları

---

## 📋 4. FİYAT ARAÇLARI KONTROLÜ

### **A. Ana Sayfa Fiyat Hesaplama**
```
http://localhost:3000
```

**Hero Section:**
- ✅ "Hızlı Fiyat Hesapla" widget görünüyor mu?
- ✅ İlçe seçimleri çalışıyor mu?
- ✅ Ev tipi seçimi çalışıyor mu?
- ✅ Hesapla butonu çalışıyor mu?
- ✅ Sonuç gösteriliyor mu?

---

### **B. Fiyat Hesaplama Sayfası**
```
http://localhost:3000/nakliyat-fiyat-hesaplama
```

**Kontrol:**
- ✅ Breadcrumb çalışıyor mu?
- ✅ Fiyat hesaplama formu tam mı?
- ✅ Tüm adımlar çalışıyor mu? (6 adım)
- ✅ Fotoğraf yükleme çalışıyor mu?
- ✅ Sonuç sayfası gösteriliyor mu?
- ✅ WhatsApp paylaş butonu çalışıyor mu?
- ✅ PDF indirme çalışıyor mu?
- ✅ **"Ücretsiz Ekle" embed widget gösteriliyor mu?**
- ✅ Fiyat tablosu görünüyor mu?
- ✅ SSS bölümü var mı?

---

### **C. Fiyatlarımız Sayfası**
```
http://localhost:3000/fiyatlarimiz
```

**Kontrol:**
- ✅ Pricing cards görünüyor mu?
- ✅ "Evden Eve Nakliyat Fiyatları" kartı var mı?
- ✅ Diğer dinamik pricing pages kartları var mı?
- ✅ Her kart tıklanabiliyor mu?
- ✅ Fiyat aralıkları gösteriliyor mu?

---

### **D. Evden Eve Nakliyat Fiyatları**
```
http://localhost:3000/evden-eve-nakliyat-fiyatlari
```

**Kontrol:**
- ✅ Sayfa açılıyor mu?
- ✅ Fiyat aralıkları gösteriliyor mu?
- ✅ Faktörler listesi var mı?
- ✅ CTA butonları çalışıyor mu?

---

## 📋 5. ADMIN PANEL KONTROLÜ

### **A. Admin Giriş**
```
http://localhost:3000/admin
```

**Kontrol:**
- ✅ Login sayfası açılıyor mu?
- ✅ Giriş yapılabiliyor mu?

---

### **B. Pricing Pages Yönetimi**
```
http://localhost:3000/admin/pricing-pages
```

**Kontrol:**
- ✅ Liste görünüyor mu?
- ✅ Yeni pricing page eklenebiliyor mu?
- ✅ Düzenleme çalışıyor mu?
- ✅ Kaydetme çalışıyor mu?
- ✅ Değişiklikler frontend'de görünüyor mu?

---

### **C. Pages Yönetimi**
```
http://localhost:3000/admin/pages/nakliyat-fiyat-hesaplama
```

**Kontrol:**
- ✅ Sayfa düzenleyici açılıyor mu?
- ✅ Tüm section'lar düzenlenebiliyor mu?
- ✅ Fiyat tablosu düzenlenebiliyor mu?
- ✅ Kaydetme çalışıyor mu?
- ✅ Değişiklikler frontend'de görünüyor mu?

---

## 📋 6. DİNAMİK İÇERİK KONTROLÜ

### **A. Kampanyalar**
```
http://localhost:3000
```

**Kontrol:**
- ✅ Aktif kampanya banner'ı görünüyor mu?
- ✅ Kampanya detayları doğru mu?

---

### **B. Blog**
```
http://localhost:3000/blog
```

**Kontrol:**
- ✅ Blog listesi görünüyor mu?
- ✅ Blog detay sayfaları açılıyor mu?

---

### **C. Hizmetler**
```
http://localhost:3000/hizmetlerimiz
```

**Kontrol:**
- ✅ Hizmet listesi tam mı?
- ✅ Hizmet detay sayfaları açılıyor mu?

---

## 📋 7. MOBİL UYUMLULUK

### **Chrome DevTools Mobile Test**

**Adımlar:**
1. DevTools aç (`Cmd + Option + I`)
2. Toggle device toolbar (`Cmd + Shift + M`)
3. **Device:** iPhone 12 Pro

**Kontrol:**
- ✅ Header mobilde düzgün görünüyor mu?
- ✅ Hamburger menü çalışıyor mu?
- ✅ Fiyat hesaplama formu mobilde kullanılabilir mi?
- ✅ Butonlar tıklanabilir mi? (min 48x48px)
- ✅ Footer mobilde düzgün görünüyor mu?
- ✅ Resimler responsive mı?

---

## 📋 8. PERFORMANS KONTROLÜ

### **A. Network Tab**

**Kontrol:**
- ✅ İlk yükleme < 3 saniye
- ✅ Toplam sayfa boyutu < 2 MB
- ✅ Render-blocking kaynaklar minimize edilmiş mi?

---

### **B. Console Hataları**

**Kontrol:**
- ✅ Console'da kırmızı hata yok mu?
- ✅ 404 hataları yok mu?
- ✅ API hataları yok mu?

---

## 📋 9. SEO KONTROLÜ

### **A. Meta Tags**

**Ana sayfa kontrol:**
```bash
curl http://localhost:3000 | grep -i "<meta"
```

**Kontrol:**
- ✅ `<title>` var mı?
- ✅ `<meta name="description">` var mı?
- ✅ `<meta property="og:title">` var mı?
- ✅ `<meta property="og:image">` var mı?
- ✅ Canonical URL doğru mu?

---

### **B. Sitemap**
```
http://localhost:3000/sitemap.xml
```

**Kontrol:**
- ✅ Sitemap açılıyor mu?
- ✅ Tüm sayfalar listelenmiş mi?

---

### **C. Robots.txt**
```
http://localhost:3000/robots.txt
```

**Kontrol:**
- ✅ Robots.txt açılıyor mu?
- ✅ Sitemap URL'i doğru mu?

---

## 📋 10. GÜVENLİK KONTROLÜ

### **A. HTTPS**
- ✅ Production'da HTTPS kullanılıyor mu?
- ✅ Mixed content uyarısı yok mu?

---

### **B. Headers**
- ✅ CSP (Content Security Policy) aktif mi?
- ✅ X-Frame-Options ayarlanmış mı?
- ✅ CORS ayarları doğru mu?

---

## 📋 11. EMBED WİDGET KONTROLÜ

### **A. Embed Script**
```
http://localhost:3000/embed/fiyat-hesaplama.js
```

**Kontrol:**
- ✅ Script dosyası erişilebilir mi?
- ✅ CORS headers doğru mu?

---

### **B. Embed Sayfası**
```
http://localhost:3000/embed/fiyat-hesaplama
```

**Kontrol:**
- ✅ Sayfa açılıyor mu?
- ✅ Form çalışıyor mu?
- ✅ "Ücretsiz Ekle" kutusu gösterilmiyor mu? ✅

---

## 📋 12. VERİ KAYBI KONTROLÜ

### **A. Fiyat Tablosu**
```
http://localhost:3000/admin/pages/nakliyat-fiyat-hesaplama
```

**Kontrol:**
- ✅ Fiyat tablosu verileri kaybolmamış mı?
- ✅ 5 satır var mı?
- ✅ Tüm sütunlar dolu mu?

---

### **B. Pricing Pages**
```
http://localhost:3000/admin/pricing-pages
```

**Kontrol:**
- ✅ Tüm pricing pages mevcut mu?
- ✅ Veriler kaybolmamış mı?

---

## ✅ DEPLOYMENT ONAY LİSTESİ

Tüm kontroller tamamlandıktan sonra:

- [ ] Build başarılı
- [ ] Lighthouse skorları hedefte (Performance 85+)
- [ ] Header menüleri çalışıyor
- [ ] Footer tam ve doğru
- [ ] Fiyat araçları çalışıyor
- [ ] Admin panel çalışıyor
- [ ] Mobil uyumlu
- [ ] SEO ayarları tamam
- [ ] Güvenlik headers aktif
- [ ] Embed widget çalışıyor
- [ ] Veri kaybı yok

**TÜMÜ TAMAM MI? → DEPLOYMENT YAP! 🚀**

---

## 🚀 DEPLOYMENT KOMUTU

```bash
# Vercel deployment
vercel --prod

# veya cPanel/FTP
npm run build
# .next klasörünü sunucuya yükle
```

---

## 📝 DEPLOYMENT SONRASI

1. ✅ Production URL'de tüm kontrolleri tekrarla
2. ✅ Google Search Console'a sitemap gönder
3. ✅ Lighthouse'u production'da çalıştır
4. ✅ Gerçek cihazlarda test et

---

**Son Güncelleme:** 2026-02-16
**Versiyon:** 1.0.0
