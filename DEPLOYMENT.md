# Kozcuoğlu Nakliyat - Deployment Rehberi

## 🎯 Genel Bakış

Bu proje **Plesk VDS** üzerinde **PM2** ile çalışacak şekilde yapılandırılmıştır.

**Sunucu Bilgileri:**
- IP: 178.211.130.185
- SSH Port: 22 (standart)
- Kullanıcı: root
- Şifre: qQSbGSSasgAA3HISYF57
- Domain: kozcuoglunakliyat.com.tr
- OS: Ubuntu 22.04.5 LTS
- Node.js: 20.20.0
- PM2: 6.0.14
- PostgreSQL: 14.20
- Redis: 6.x

---

## 📋 İlk Kurulum (Sunucuda Bir Kez Yapılır)

### 1. Proje Dizinini Hazırla

```bash
cd /var/www/vhosts/kozcuoglunakliyat.com.tr
rm -rf httpdocs/*
cd httpdocs
```

### 2. Git Repository Clone

```bash
git clone https://github.com/YOUR_USERNAME/kozcuoglu-nakliyat.git .
# veya
git init
git remote add origin https://github.com/YOUR_USERNAME/kozcuoglu-nakliyat.git
git pull origin main
```

### 3. Environment Variables Oluştur

```bash
nano .env.production
```

**`.env.production` içeriği:**

```env
# App
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://kozcuoglunakliyat.com.tr
PORT=3000
HOSTNAME=0.0.0.0

# NextAuth
NEXTAUTH_URL=https://kozcuoglunakliyat.com.tr
NEXTAUTH_SECRET=GENERATE_RANDOM_SECRET_HERE

# Admin Auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=STRONG_PASSWORD_HERE

# Database (PostgreSQL)
DATABASE_URL=postgresql://kozcuoglu_user:STRONG_PASSWORD@localhost:5432/kozcuoglu_db

# Redis
REDIS_URL=redis://localhost:6379

# Email (Yandex SMTP)
SMTP_HOST=smtp.yandex.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@kozcuoglunakliyat.com.tr
SMTP_PASS=YOUR_EMAIL_PASSWORD
SMTP_FROM=info@kozcuoglunakliyat.com.tr

# Analytics (Opsiyonel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX
```

### 4. PostgreSQL Database Oluştur

```bash
sudo -u postgres psql

CREATE DATABASE kozcuoglu_db;
CREATE USER kozcuoglu_user WITH ENCRYPTED PASSWORD 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE kozcuoglu_db TO kozcuoglu_user;
\q
```

### 5. Dependencies Yükle

```bash
npm ci
```

### 6. Build

```bash
npm run build
```

### 7. Gerekli Dizinleri Oluştur

```bash
mkdir -p pm2-logs
mkdir -p public/uploads
mkdir -p src/data
```

### 8. Data Dosyalarını Kopyala

Local'den sunucuya data dosyalarını kopyala (ilk seferlik):

```bash
# Local makineden çalıştır
./sync-data.sh
```

### 9. PM2 ile Başlat

```bash
pm2 start ecosystem.config.js
pm2 save
```

### 10. Nginx Reverse Proxy (Plesk)

Plesk → Domains → kozcuoglunakliyat.com.tr → Apache & nginx Settings

**Nginx ek direktifler:**

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

### 11. SSL Sertifikası

Plesk → SSL/TLS Certificates → Let's Encrypt

---

## 🔄 Güncelleme (Her Deploy'da)

### Otomatik Deployment

Sunucuda:

```bash
cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs
./deploy.sh
```

### Manuel Deployment

```bash
cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs

# 1. Git pull
git pull origin main

# 2. Dependencies
npm ci

# 3. Build
npm run build

# 4. PM2 restart
pm2 restart kozcuoglu-nakliyat

# 5. Save
pm2 save
```

---

## 📊 Data Senkronizasyonu

Local'den sunucuya data ve uploads senkronize etmek için:

```bash
# Local makineden
./sync-data.sh
```

Bu script:
- `src/data/*.json` dosyalarını senkronize eder
- `public/uploads/*` dosyalarını senkronize eder
- PM2'yi restart eder

---

## 🔍 Monitoring

### PM2 Durumu

```bash
pm2 status
pm2 logs kozcuoglu-nakliyat
pm2 monit
```

### Loglar

```bash
# Tüm loglar
pm2 logs

# Sadece error loglar
tail -f pm2-logs/err.log

# Sadece output loglar
tail -f pm2-logs/out.log
```

### Health Check

```bash
curl http://localhost:3000
curl https://kozcuoglunakliyat.com.tr
```

---

## 🛠️ Sorun Giderme

### Uygulama Başlamıyor

```bash
# Logları kontrol et
pm2 logs kozcuoglu-nakliyat --lines 100

# PM2'yi tamamen restart et
pm2 delete kozcuoglu-nakliyat
pm2 start ecosystem.config.js
pm2 save
```

### Build Hatası

```bash
# Cache temizle
rm -rf .next
npm run build
```

### Port Zaten Kullanımda

```bash
# Port 3000'i kullanan process'i bul
lsof -i :3000

# Kill et
kill -9 PID
```

### Database Bağlantı Hatası

```bash
# PostgreSQL durumunu kontrol et
systemctl status postgresql

# PostgreSQL restart
sudo systemctl restart postgresql

# Connection test
psql -U kozcuoglu_user -d kozcuoglu_db -h localhost
```

---

## 🔐 Güvenlik

### Firewall (UFW)

```bash
sudo ufw status
```

Açık portlar:
- 112/tcp (SSH)
- 80/tcp (HTTP)
- 443/tcp (HTTPS)
- 8443/tcp (Plesk)

### Fail2ban

```bash
sudo systemctl status fail2ban
sudo fail2ban-client status
```

### Environment Variables

`.env.production` dosyası **asla** git'e commit edilmemelidir!

---

## 📝 Önemli Notlar

1. **Data Dosyaları:** `src/data/*.json` dosyaları git'te değil, `sync-data.sh` ile senkronize edilir
2. **Uploads:** `public/uploads/*` dosyaları git'te değil, `sync-data.sh` ile senkronize edilir
3. **PM2 Resurrect:** Sunucu reboot olduğunda PM2 otomatik başlar
4. **Cluster Mode:** 2 instance çalışır (CPU core sayısına göre ayarlanabilir)
5. **Memory Limit:** 1GB (ecosystem.config.js'de ayarlanabilir)

---

## 🚀 Hızlı Komutlar

```bash
# Deployment
./deploy.sh

# Data sync
./sync-data.sh

# PM2 restart
pm2 restart kozcuoglu-nakliyat

# Logları izle
pm2 logs kozcuoglu-nakliyat --lines 100

# PM2 durumu
pm2 status

# Build
npm run build

# Production start (manuel)
npm run start
```

---

## 📞 Destek

Sorun yaşarsanız:
1. PM2 loglarını kontrol edin
2. Nginx error loglarını kontrol edin
3. PostgreSQL loglarını kontrol edin
4. Sistem kaynaklarını kontrol edin (htop)

---

**Son Güncelleme:** 2026-02-15
**Versiyon:** 1.0.0
