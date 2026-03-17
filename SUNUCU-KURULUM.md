# 🚀 Kozcuoğlu Nakliyat - Sunucu Kurulum Rehberi

## 📋 Sunucu Bilgileri

```
IP: 178.211.130.185
SSH Port: 22 (standart)
Kullanıcı: root
Şifre: qQSbGSSasgAA3HISYF57
Domain: kozcuoglunakliyat.com.tr
Proje Dizini: /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs
```

---

## 🎯 ADIM ADIM KURULUM

### ADIM 1: Sunucuya Bağlan

```bash
ssh root@178.211.130.185
# Şifre: qQSbGSSasgAA3HISYF57
```

---

### ADIM 2: Proje Dizinine Git ve Temizle

```bash
cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs

# Mevcut dosyaları temizle
rm -rf *
rm -rf .[^.]*
```

---

### ADIM 3: Git Clone (GitHub repo URL'sini kullan)

```bash
# GitHub'dan clone et
git clone https://github.com/YOUR_USERNAME/kozcuoglu-nakliyat.git .

# Branch kontrol
git branch
```

---

### ADIM 4: PostgreSQL Database Oluştur

```bash
# PostgreSQL'e bağlan
sudo -u postgres psql
```

PostgreSQL içinde şu komutları çalıştır:

```sql
-- Database oluştur
CREATE DATABASE kozcuoglu_db;

-- User oluştur (güçlü şifre)
CREATE USER kozcuoglu_user WITH ENCRYPTED PASSWORD 'Koz2026!Nakl@DB';

-- Yetkileri ver
GRANT ALL PRIVILEGES ON DATABASE kozcuoglu_db TO kozcuoglu_user;

-- Database owner yap
ALTER DATABASE kozcuoglu_db OWNER TO kozcuoglu_user;

-- Çıkış
\q
```

**Test et:**
```bash
psql -U kozcuoglu_user -d kozcuoglu_db -h localhost
# Şifre: Koz2026!Nakl@DB
# Bağlanırsa çalışıyor, \q ile çık
```

---

### ADIM 5: Environment Dosyası Oluştur

```bash
nano .env.production
```

Aşağıdaki içeriği yapıştır:

```env
# App
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://kozcuoglunakliyat.com.tr
PORT=3000
HOSTNAME=0.0.0.0

# NextAuth
NEXTAUTH_URL=https://kozcuoglunakliyat.com.tr
NEXTAUTH_SECRET=Koz2026!NextAuth@Secret!XyZ123

# Admin Auth
ADMIN_USERNAME=kozcuogluadmin
ADMIN_PASSWORD=Koz2026!Admin@Panel

# Database (PostgreSQL)
DATABASE_URL=postgresql://kozcuoglu_user:Koz2026!Nakl@DB@localhost:5432/kozcuoglu_db

# Redis
REDIS_URL=redis://localhost:6379

# Email (Yandex SMTP)
SMTP_HOST=smtp.yandex.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@kozcuoglunakliyat.com.tr
SMTP_PASS=YOUR_EMAIL_PASSWORD_HERE
SMTP_FROM=info@kozcuoglunakliyat.com.tr

# Analytics (Opsiyonel - şimdilik boş bırak)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_CLARITY_ID=
```

**Kaydet:** `Ctrl+O` → Enter → `Ctrl+X`

---

### ADIM 6: Dependencies Yükle

```bash
npm ci
```

Bu 2-3 dakika sürebilir, bekle...

---

### ADIM 7: Build

```bash
npm run build
```

Bu 3-5 dakika sürebilir, bekle...

---

### ADIM 8: Gerekli Dizinleri Oluştur

```bash
mkdir -p pm2-logs
mkdir -p public/uploads
mkdir -p src/data

# Script'lere execute izni ver
chmod +x deploy.sh
chmod +x sync-data.sh
chmod +x server-setup.sh
```

---

### ADIM 9: PM2 ile Başlat

```bash
# PM2 ile başlat
pm2 start ecosystem.config.js

# Durumu kontrol et
pm2 status

# Logları izle (Ctrl+C ile çık)
pm2 logs kozcuoglu-nakliyat --lines 20

# PM2'yi kaydet
pm2 save

# Sistem başlangıcında otomatik başlat
pm2 startup
# Çıkan komutu kopyala ve çalıştır
```

---

### ADIM 10: Nginx Ayarları (Plesk Panel)

1. Tarayıcıda aç: `https://178.211.130.185:8443`
2. Plesk'e giriş yap
3. **Domains** → **kozcuoglunakliyat.com.tr** → **Apache & nginx Settings**
4. **Additional nginx directives** bölümüne şunu ekle:

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

5. **OK** → **Apply**

---

### ADIM 11: SSL Sertifikası

1. Plesk Panel → **SSL/TLS Certificates**
2. **Let's Encrypt** seç
3. **Email:** info@kozcuoglunakliyat.com.tr
4. **Domain:** kozcuoglunakliyat.com.tr + www.kozcuoglunakliyat.com.tr
5. **Get it free** → **Install**

---

### ADIM 12: Test Et

```bash
# Local test
curl http://localhost:3000

# Domain test
curl https://kozcuoglunakliyat.com.tr
```

Tarayıcıda aç: **https://kozcuoglunakliyat.com.tr**

---

## ✅ KONTROL LİSTESİ

- [ ] SSH bağlantısı çalışıyor
- [ ] Git clone yapıldı
- [ ] PostgreSQL database oluşturuldu
- [ ] `.env.production` dosyası oluşturuldu
- [ ] Dependencies yüklendi (`npm ci`)
- [ ] Build başarılı (`npm run build`)
- [ ] PM2 başlatıldı
- [ ] PM2 startup ayarlandı
- [ ] Nginx reverse proxy ayarlandı
- [ ] SSL sertifikası kuruldu
- [ ] Site açılıyor (https://kozcuoglunakliyat.com.tr)

---

## 🔍 Sorun Giderme

### Site Açılmıyor

```bash
# PM2 durumu
pm2 status

# Logları kontrol et
pm2 logs kozcuoglu-nakliyat --lines 50

# PM2 restart
pm2 restart kozcuoglu-nakliyat
```

### Build Hatası

```bash
# Node version kontrol
node -v  # 20.20.0 olmalı

# Cache temizle
rm -rf .next
npm run build
```

### Database Bağlantı Hatası

```bash
# PostgreSQL durumu
systemctl status postgresql

# Connection test
psql -U kozcuoglu_user -d kozcuoglu_db -h localhost
```

---

## 📝 Önemli Bilgiler

**Admin Panel Girişi:**
- URL: https://kozcuoglunakliyat.com.tr/admin
- Kullanıcı: kozcuogluadmin
- Şifre: Koz2026!Admin@Panel

**Database:**
- Host: localhost
- Port: 5432
- Database: kozcuoglu_db
- User: kozcuoglu_user
- Password: Koz2026!Nakl@DB

**PM2 Komutları:**
```bash
pm2 status                           # Durum
pm2 logs kozcuoglu-nakliyat         # Loglar
pm2 restart kozcuoglu-nakliyat      # Restart
pm2 stop kozcuoglu-nakliyat         # Durdur
pm2 delete kozcuoglu-nakliyat       # Sil
```

---

**Hazırlayan:** KARAKAR Web
**Tarih:** 2026-02-15
