# Kozcuoğlu Nakliyat — Fiyat Hesaplama Modülü

## Genel Mantık

- Admin panelinden her hizmet türü için **ayrı fiyat hesaplama modülü** oluşturulabilir/silinebilir
- Her modülün kendine özel **parametreleri** (alanları) vardır
- Modüller sayfalara **atanır** (hangi sayfada hangi modül gösterilecek)
- Ana sayfada tüm modüller **tab ile geçiş** yapılarak gösterilir
- Hizmet sayfalarında sadece **ilgili modül** gösterilir

## Modül Yapısı

### Her Modülde Bulunan Bilgiler

```json
{
  "id": "ev-tasima",
  "name": "Ev Taşıma Hesaplama",
  "slug": "ev-tasima",
  "assignedPages": ["/", "/ev-tasima", "/evden-eve-nakliyat"],
  "baseFiyat": 3500,
  "fields": [...],
  "formpieces": [...],
  "active": true
}
```

## Örnek Modüller

### 1. Ev Taşıma Hesaplama

| Alan | Tip | Seçenekler | Fiyat Etkisi |
|---|---|---|---|
| Nereden (İl) | Select | İstanbul, Ankara, İzmir... | Mesafe bazlı |
| Nereden (İlçe) | Select | İl'e bağlı dinamik | Mesafe bazlı |
| Nereye (İl) | Select | İstanbul, Ankara, İzmir... | Mesafe bazlı |
| Nereye (İlçe) | Select | İl'e bağlı dinamik | Mesafe bazlı |
| Ev Tipi | Select | 1+0, 1+1, 2+1, 3+1, 4+1, 5+1, Villa | Çarpan |
| Bulunduğu Kat | Number | 0-20 | Kat başı ek ücret |
| Asansör Var mı? | Checkbox | Evet/Hayır | Varsa indirim |
| Taşınacak Kat | Number | 0-20 | Kat başı ek ücret |
| Hedef Asansör Var mı? | Checkbox | Evet/Hayır | Varsa indirim |
| Eşya Listesi | Multi-Checkbox | Oda bazlı eşya seçimi | Eşya başı ek |
| Paketleme İstiyor mu? | Checkbox | Evet/Hayır | Ek ücret |
| Sigorta İstiyor mu? | Checkbox | Evet/Hayır | Ek ücret |
| Taşınma Tarihi | Date | Tarih seçici | Hafta sonu ek |

### 2. Ofis Taşıma Hesaplama

| Alan | Tip | Seçenekler | Fiyat Etkisi |
|---|---|---|---|
| Nereden (İl) | Select | İstanbul, Ankara, İzmir... | Mesafe bazlı |
| Nereden (İlçe) | Select | İl'e bağlı dinamik | Mesafe bazlı |
| Nereye (İl) | Select | İstanbul, Ankara, İzmir... | Mesafe bazlı |
| Nereye (İlçe) | Select | İl'e bağlı dinamik | Mesafe bazlı |
| Ofis Büyüklüğü (m²) | Number | 10-1000 | m² bazlı çarpan |
| Bulunduğu Kat | Number | 0-50 | Kat başı ek ücret |
| Asansör Var mı? | Checkbox | Evet/Hayır | Varsa indirim |
| Hedef Kat | Number | 0-50 | Kat başı ek ücret |
| Hedef Asansör Var mı? | Checkbox | Evet/Hayır | Varsa indirim |
| Ofis Eşyaları | Multi-Checkbox | Masa, sandalye, dolap, bilgisayar, yazıcı, sunucu vb. | Eşya başı ek |
| Paketleme | Checkbox | Evet/Hayır | Ek ücret |
| Sigorta | Checkbox | Evet/Hayır | Ek ücret |
| Taşınma Tarihi | Date | Tarih seçici | Hafta sonu ek |
| Hafta Sonu / Mesai Dışı | Checkbox | Evet/Hayır | Ek ücret |

## Fiyat Hesaplama Formülü

```
Toplam = Baz Fiyat
       + (Mesafe Ücreti × km)
       + (Ev Tipi Çarpanı × Baz Fiyat)
       + (Kaynak Kat × Kat Ücreti) - (Asansör varsa indirim)
       + (Hedef Kat × Kat Ücreti) - (Asansör varsa indirim)
       + (Seçilen Eşya Toplam Ücreti)
       + (Paketleme Ücreti)
       + (Sigorta Ücreti)
       + (Hafta Sonu Ek Ücreti)
```

### Admin Panelinde Ayarlanabilir Değerler

| Parametre | Varsayılan | Açıklama |
|---|---|---|
| Baz Fiyat | 3500 TL | Minimum taşıma ücreti |
| Km Başı Ücret | 15 TL | Mesafe ücreti |
| Kat Başı Ücret | 200 TL | Her kat için ek ücret |
| Asansör İndirimi | %30 | Asansör varsa kat ücretinden indirim |
| Paketleme Ücreti | 1500 TL | Paketleme hizmeti |
| Sigorta Ücreti | 500 TL | Sigorta hizmeti |
| Hafta Sonu Ek | %20 | Hafta sonu taşıma ek ücreti |

## Hesaplama Sonucu

Kullanıcıya gösterilecek:

1. **Tahmini Fiyat Aralığı** → "₺8.500 - ₺12.000" (min-max)
2. **Detay Tablosu** → Her kalemin ayrı ayrı ücreti
3. **WhatsApp'tan Teklif Al** butonu → Hesaplama detayları mesaj olarak WhatsApp'a gider
4. **Bizi Arayın** butonu → Click-to-call (444 7 436 — firma müşteri hizmetleri)
5. **Form ile Gönder** → İletişim formuna detaylar otomatik doldurulur

## WhatsApp Mesaj Formatı

```
Merhaba, nakliyat fiyat hesaplama sonucum:

📦 Hizmet: Ev Taşıma
📍 Nereden: İstanbul / Kadıköy
📍 Nereye: İstanbul / Beşiktaş
🏠 Ev Tipi: 3+1
🏢 Kat: 5 (Asansör var)
📅 Tarih: 15.03.2026
💰 Tahmini: ₺8.500 - ₺12.000

Detaylı teklif almak istiyorum.
```

## Sayfa Atama Mantığı

| Sayfa | Gösterilecek Modül | Gösterim Şekli |
|---|---|---|
| Ana Sayfa `/` | Tüm aktif modüller | Tab ile geçiş |
| Ev Taşıma `/ev-tasima` | Ev Taşıma modülü | Direkt gösterim |
| Ofis Taşıma `/ofis-tasima` | Ofis Taşıma modülü | Direkt gösterim |
| Evden Eve `/evden-eve-nakliyat` | Ev Taşıma modülü | Direkt gösterim |
| Parça Eşya `/parca-esya-tasima` | Parça Eşya modülü | Direkt gösterim |
| Şehirler Arası `/sehirler-arasi-nakliyat` | Şehirler Arası modülü | Direkt gösterim |
| Fiyatlarımız `/fiyatlarimiz` | Tüm aktif modüller | Tab ile geçiş |
| Fiyat Hesaplama `/nakliyat-fiyat-hesaplama` | Tüm aktif modüller | Tab ile geçiş |
| Hizmet Bölgesi `/*.html` | İlgili hizmet modülü | Direkt gösterim |

## Fiyatlarımız Sayfası Entegrasyonu

`/fiyatlarimiz` sayfasında fiyat hesaplama modülünün yanı sıra popüler fiyat kartları gösterilir:

| Bölüm | İçerik | Link |
|---|---|---|
| Popüler Ev Taşıma | 3-4 fiyat kartı (1+1, 2+1, 3+1, 4+1) | Tümünü Gör → `/ev-tasima` |
| Popüler Ofis Taşıma | 3-4 fiyat kartı (50m², 100m², 200m²) | Tümünü Gör → `/ofis-tasima` |
| Popüler Parça Eşya | 3-4 fiyat kartı (buzdolabı, çamaşır mak., koltuk) | Tümünü Gör → `/parca-esya-tasima` |

Fiyat kartları admin panelinden yönetilebilir (statik veya pricing-modules.json'dan çekilir).

## Admin Panel — Modül Yönetimi

### Modül Ekleme
1. Modül adı ve slug gir
2. Alanları tanımla (tip, seçenekler, fiyat etkisi)
3. Baz fiyat ve çarpanları ayarla
4. Sayfalara ata
5. Aktif/Pasif yap

### Modül Düzenleme
- Alanları ekle/sil/düzenle
- Fiyat parametrelerini güncelle
- Sayfa atamalarını değiştir

### Modül Silme
- Modül silindiğinde atandığı sayfalardan otomatik kaldırılır
