# DEPLOYMENT GUIDE - VDS PLESK

**Proje:** Kozcuoğlu Nakliyat  
**Platform:** VDS + Plesk Panel  
**Tarih:** 14 Şubat 2026

---

## 📋 İÇİNDEKİLER

1. [Teknik Bilgiler](#teknik-bilgiler)
2. [Sunucu Gereksinimleri](#sunucu-gereksinimleri)
3. [Kurulum Adımları](#kurulum-adımları)
4. [Plesk Panel Ayarları](#plesk-panel-ayarları)
5. [Domain ve SSL](#domain-ve-ssl)
6. [Environment Variables](#environment-variables)
7. [Database Setup](#database-setup)
8. [Deployment](#deployment)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)

---

## 🔧 TEKNİK BİLGİLER

### Kullanılan Teknolojiler

#### Frontend:
- **Next.js 16.1.6** (App Router, Turbopack)
- **React 19** (Server Components)
- **TypeScript 5.x**
- **Tailwind CSS 3.x**
- **shadcn/ui** (UI Components)

#### Backend:
- **Next.js API Routes** (Serverless Functions)
- **NextAuth.js** (Authentication)
- **JSON File System** (Current - PostgreSQL'e geçilecek)

#### Build & Dev Tools:
- **Turbopack** (Development)
- **Webpack** (Production Build)
- **ESLint** (Linting)
- **PostCSS** (CSS Processing)

#### Deployment:
- **Node.js 20.x** (LTS)
- **PM2** (Process Manager)
- **Nginx** (Reverse Proxy - Plesk'te built-in)

---

## 💻 SUNUCU GEREKSİNİMLERİ

### Minimum Gereksinimler:
- **CPU:** 2 Core
- **RAM:** 4 GB
- **Disk:** 20 GB SSD
- **Bandwidth:** 100 GB/ay

### Önerilen Gereksinimler:
- **CPU:** 4 Core
- **RAM:** 8 GB
- **Disk:** 50 GB SSD
- **Bandwidth:** 500 GB/ay

### İşletim Sistemi:
- **Ubuntu 22.04 LTS** (önerilen)
- **Ubuntu 20.04 LTS**
- **CentOS 8/9**
- **Debian 11/12**

---

## 📦 KURULUM ADIMLARI

### ADIM 1: Sunucuya Bağlan

```bash
# SSH ile bağlan
ssh root@your-server-ip

# Veya Plesk'ten Terminal aç
# Plesk Panel → Tools & Settings → Terminal
```

---

### ADIM 2: Sistem Güncellemesi

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS
sudo yum update -y
```

---

### ADIM 3: Node.js Kurulumu

```bash
# Node.js 20.x LTS kurulumu (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Node.js versiyonunu kontrol et
node --version  # v20.x.x olmalı
npm --version   # 10.x.x olmalı

# CentOS için:
# curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
# sudo yum install -y nodejs
```

---

### ADIM 4: PM2 Kurulumu (Process Manager)

```bash
# PM2'yi global olarak kur
sudo npm install -g pm2

# PM2 versiyonunu kontrol et
pm2 --version

# PM2'yi sistem başlangıcına ekle
pm2 startup
# Çıkan komutu çalıştır (sudo env PATH=... gibi)
```

---

### ADIM 5: Git Kurulumu

```bash
# Git kur (Ubuntu/Debian)
sudo apt install -y git

# CentOS
# sudo yum install -y git

# Git versiyonunu kontrol et
git --version
```

---

### ADIM 6: PostgreSQL Kurulumu (Gelecek için)

```bash
# PostgreSQL 15 kur (Ubuntu/Debian)
sudo apt install -y postgresql postgresql-contrib

# PostgreSQL servisini başlat
sudo systemctl start postgresql
sudo systemctl enable postgresql

# PostgreSQL versiyonunu kontrol et
psql --version

# CentOS için:
# sudo yum install -y postgresql-server postgresql-contrib
# sudo postgresql-setup initdb
# sudo systemctl start postgresql
# sudo systemctl enable postgresql
```

---

### ADIM 7: Redis Kurulumu (Caching için)

```bash
# Redis kur (Ubuntu/Debian)
sudo apt install -y redis-server

# Redis servisini başlat
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Redis'i test et
redis-cli ping  # PONG dönmeli

# CentOS için:
# sudo yum install -y redis
# sudo systemctl start redis
# sudo systemctl enable redis
```

---

### ADIM 8: Nginx Ayarları (Plesk'te otomatik)

Plesk'te Nginx zaten kurulu. Sadece ayarları yapacağız.

---

## 🌐 PLESK PANEL AYARLARI

### ADIM 1: Domain Ekle

1. **Plesk Panel'e giriş yap**
2. **Websites & Domains** → **Add Domain**
3. Domain adını gir: `kozcuoglunakliyat.com.tr`
4. **Document Root:** `/var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs`
5. **Create** butonuna tıkla

---

### ADIM 2: Node.js Extension Kur

1. **Extensions** → **My Extensions**
2. **Node.js** extension'ını bul ve kur
3. Extension'ı aktif et

---

### ADIM 3: Node.js Ayarları

1. **Websites & Domains** → Domain seç
2. **Node.js** sekmesine git
3. Ayarlar:
   - **Node.js version:** 20.x
   - **Application mode:** Production
   - **Application root:** `/httpdocs`
   - **Application startup file:** `server.js` (oluşturacağız)
   - **Custom environment variables:** (sonra ekleyeceğiz)

---

## 🔐 SSL SERTİFİKASI

### Let's Encrypt (Ücretsiz)

1. **Websites & Domains** → Domain seç
2. **SSL/TLS Certificates**
3. **Install** (Let's Encrypt)
4. Email adresini gir
5. **Get it free** butonuna tıkla
6. **Install** et

### SSL Redirect

1. **Hosting Settings**
2. **Permanent SEO-safe 301 redirect from HTTP to HTTPS** işaretle
3. **OK** butonuna tıkla

---

## 📁 PROJE DEPLOYMENT

### ADIM 1: Proje Dosyalarını Yükle

#### Yöntem 1: Git Clone (Önerilen)

```bash
# Proje klasörüne git
cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs

# Mevcut dosyaları temizle
sudo rm -rf *

# Git repository'den clone et (GitHub/GitLab kullanıyorsan)
sudo git clone https://github.com/username/kozcuoglu.git .

# Veya local'den rsync ile yükle
# rsync -avz --exclude 'node_modules' --exclude '.next' \
#   /Users/karakar/Desktop/kozcuoglu/ \
#   root@your-server-ip:/var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs/
```

#### Yöntem 2: FTP/SFTP (Plesk File Manager)

1. **Plesk Panel** → **Files**
2. `/httpdocs` klasörüne git
3. Proje dosyalarını yükle (node_modules ve .next hariç)

---

### ADIM 2: Dependencies Kur

```bash
# Proje klasöründe
cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs

# Node modules kur
npm install

# Production dependencies only
# npm ci --only=production
```

---

### ADIM 3: Environment Variables Oluştur

```bash
# .env.local dosyası oluştur
nano .env.local
```

`.env.local` içeriği:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=https://kozcuoglunakliyat.com.tr

# NextAuth
NEXTAUTH_URL=https://kozcuoglunakliyat.com.tr
NEXTAUTH_SECRET=your-super-secret-key-min-32-characters-long-random-string

# Admin Credentials (ilk giriş için)
ADMIN_EMAIL=admin@kozcuoglunakliyat.com.tr
ADMIN_PASSWORD=your-secure-password

# Database (PostgreSQL - gelecekte)
# DATABASE_URL=postgresql://user:password@localhost:5432/kozcuoglu

# Redis (gelecekte)
# REDIS_URL=redis://localhost:6379

# Email (gelecekte - SendGrid/Mailgun)
# EMAIL_SERVER=smtp://username:password@smtp.sendgrid.net:587
# EMAIL_FROM=noreply@kozcuoglunakliyat.com.tr

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# File Upload (gelecekte - S3/Cloudinary)
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
```

**NEXTAUTH_SECRET oluştur:**

```bash
# Random secret oluştur
openssl rand -base64 32
```

---

### ADIM 4: Build Oluştur

```bash
# Production build
npm run build

# Build başarılı oldu mu kontrol et
ls -la .next
```

---

### ADIM 5: Custom Server Oluştur (PM2 için)

`server.js` dosyası oluştur:

```bash
nano server.js
```

`server.js` içeriği:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```

---

### ADIM 6: PM2 ile Başlat

```bash
# PM2 ecosystem dosyası oluştur
nano ecosystem.config.js
```

`ecosystem.config.js` içeriği:

```javascript
module.exports = {
  apps: [{
    name: 'kozcuoglu-nakliyat',
    script: 'server.js',
    instances: 'max', // CPU core sayısı kadar instance
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    autorestart: true,
    watch: false
  }]
};
```

```bash
# Logs klasörü oluştur
mkdir -p logs

# PM2 ile başlat
pm2 start ecosystem.config.js

# PM2 durumunu kontrol et
pm2 status

# Logları izle
pm2 logs kozcuoglu-nakliyat

# PM2'yi kaydet (reboot sonrası otomatik başlasın)
pm2 save
```

---

### ADIM 7: Nginx Reverse Proxy (Plesk)

Plesk'te otomatik yapılır ama manuel ayar gerekirse:

```bash
# Nginx config dosyası
sudo nano /etc/nginx/conf.d/kozcuoglunakliyat.conf
```

```nginx
upstream nextjs_upstream {
  server 127.0.0.1:3000;
  keepalive 64;
}

server {
  listen 80;
  server_name kozcuoglunakliyat.com.tr www.kozcuoglunakliyat.com.tr;
  
  # SSL redirect
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name kozcuoglunakliyat.com.tr www.kozcuoglunakliyat.com.tr;

  # SSL certificates (Let's Encrypt)
  ssl_certificate /etc/letsencrypt/live/kozcuoglunakliyat.com.tr/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/kozcuoglunakliyat.com.tr/privkey.pem;

  # Security headers
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-XSS-Protection "1; mode=block" always;
  add_header Referrer-Policy "no-referrer-when-downgrade" always;

  # Gzip compression
  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

  # Static files
  location /_next/static {
    alias /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs/.next/static;
    expires 365d;
    access_log off;
  }

  location /uploads {
    alias /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs/public/uploads;
    expires 30d;
    access_log off;
  }

  # Next.js app
  location / {
    proxy_pass http://nextjs_upstream;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

```bash
# Nginx'i test et
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl reload nginx
```

---

## 🗄️ DATABASE SETUP (PostgreSQL)

### Database Oluştur

```bash
# PostgreSQL'e bağlan
sudo -u postgres psql

# Database oluştur
CREATE DATABASE kozcuoglu;

# User oluştur
CREATE USER kozcuoglu_user WITH ENCRYPTED PASSWORD 'your-secure-password';

# Yetkileri ver
GRANT ALL PRIVILEGES ON DATABASE kozcuoglu TO kozcuoglu_user;

# Çıkış
\q
```

### Prisma Migration (Gelecekte)

```bash
# Prisma CLI kur
npm install -D prisma

# Prisma init
npx prisma init

# Migration çalıştır
npx prisma migrate deploy

# Prisma Client generate
npx prisma generate
```

---

## 🔄 DEPLOYMENT WORKFLOW

### Güncelleme Yaparken

```bash
# 1. Proje klasörüne git
cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs

# 2. Git pull (veya dosyaları yükle)
git pull origin main

# 3. Dependencies güncelle
npm install

# 4. Build oluştur
npm run build

# 5. PM2'yi yeniden başlat
pm2 restart kozcuoglu-nakliyat

# 6. Logları kontrol et
pm2 logs kozcuoglu-nakliyat --lines 50
```

### Otomatik Deployment (GitHub Actions - Gelecekte)

`.github/workflows/deploy.yml` oluştur:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs
            git pull origin main
            npm install
            npm run build
            pm2 restart kozcuoglu-nakliyat
```

---

## 📊 MONITORING & MAINTENANCE

### PM2 Monitoring

```bash
# PM2 dashboard
pm2 monit

# Memory/CPU kullanımı
pm2 status

# Logları izle
pm2 logs kozcuoglu-nakliyat --lines 100

# Hata logları
pm2 logs kozcuoglu-nakliyat --err

# Log dosyalarını temizle
pm2 flush
```

### Disk Kullanımı

```bash
# Disk kullanımını kontrol et
df -h

# Proje klasörü boyutu
du -sh /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs

# node_modules boyutu
du -sh /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs/node_modules

# Log dosyaları boyutu
du -sh /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs/logs
```

### Backup

```bash
# Otomatik backup scripti oluştur
nano /root/backup-kozcuoglu.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
PROJECT_DIR="/var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs"

# Backup klasörü oluştur
mkdir -p $BACKUP_DIR

# Proje dosyalarını yedekle (node_modules hariç)
tar -czf $BACKUP_DIR/kozcuoglu_$DATE.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='logs' \
  $PROJECT_DIR

# 30 günden eski backup'ları sil
find $BACKUP_DIR -name "kozcuoglu_*.tar.gz" -mtime +30 -delete

echo "Backup completed: kozcuoglu_$DATE.tar.gz"
```

```bash
# Script'i executable yap
chmod +x /root/backup-kozcuoglu.sh

# Cron job ekle (her gün saat 03:00)
crontab -e

# Ekle:
0 3 * * * /root/backup-kozcuoglu.sh >> /var/log/backup-kozcuoglu.log 2>&1
```

---

## 🔧 TROUBLESHOOTING

### Site Açılmıyor

```bash
# 1. PM2 durumunu kontrol et
pm2 status

# 2. PM2 loglarını kontrol et
pm2 logs kozcuoglu-nakliyat --lines 50

# 3. Port dinleniyor mu?
netstat -tulpn | grep 3000

# 4. Nginx durumu
sudo systemctl status nginx

# 5. Nginx logları
sudo tail -f /var/log/nginx/error.log
```

### Build Hatası

```bash
# 1. node_modules sil ve tekrar kur
rm -rf node_modules package-lock.json
npm install

# 2. .next sil ve tekrar build et
rm -rf .next
npm run build

# 3. Disk dolmuş mu?
df -h

# 4. Memory yeterli mi?
free -h
```

### 500 Internal Server Error

```bash
# 1. PM2 loglarını kontrol et
pm2 logs kozcuoglu-nakliyat --err

# 2. Environment variables kontrol et
cat .env.local

# 3. File permissions kontrol et
ls -la

# 4. PM2'yi yeniden başlat
pm2 restart kozcuoglu-nakliyat
```

### Yavaş Çalışıyor

```bash
# 1. Memory kullanımı
pm2 monit

# 2. CPU kullanımı
top

# 3. Disk I/O
iostat

# 4. PM2 cluster mode kullan
# ecosystem.config.js'de instances: 'max'
```

---

## ✅ DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] Node.js 20.x kurulu
- [ ] PM2 kurulu
- [ ] PostgreSQL kurulu (gelecek için)
- [ ] Redis kurulu (gelecek için)
- [ ] Domain DNS ayarları yapıldı
- [ ] SSL sertifikası alındı
- [ ] Environment variables hazır
- [ ] Backup stratejisi belirlendi

### Deployment

- [ ] Proje dosyaları yüklendi
- [ ] Dependencies kuruldu
- [ ] Build oluşturuldu
- [ ] PM2 ile başlatıldı
- [ ] Nginx reverse proxy ayarlandı
- [ ] SSL redirect aktif
- [ ] Loglar kontrol edildi

### Post-Deployment

- [ ] Site açılıyor mu? (https://kozcuoglunakliyat.com.tr)
- [ ] Admin panel çalışıyor mu? (/admin)
- [ ] SSL çalışıyor mu? (yeşil kilit)
- [ ] Tüm sayfalar render ediliyor mu?
- [ ] Form gönderimi çalışıyor mu?
- [ ] File upload çalışıyor mu?
- [ ] Performance test yapıldı mı?
- [ ] Mobile responsive kontrol edildi mi?
- [ ] SEO metadata kontrol edildi mi?
- [ ] Analytics çalışıyor mu?
- [ ] Backup çalışıyor mu?
- [ ] Monitoring aktif mi?

---

## 📞 DESTEK

**Geliştirici:** KARAKAR Web  
**Telefon:** +90 545 181 4040  
**E-Posta:** info@karakar.web.tr  
**Website:** https://karakar.web.tr

---

## 📚 EK KAYNAKLAR

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Plesk Documentation](https://docs.plesk.com/)

---

**Son Güncelleme:** 14 Şubat 2026  
**Versiyon:** 1.0
