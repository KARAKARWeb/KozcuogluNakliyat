# 🚀 Kozcuoğlu Nakliyat - Yeni Sunucu Deployment Rehberi

## 📋 Sunucu Bilgileri

```
IP: 178.211.130.185
Port: 22 (standart)
Kullanıcı: root
Şifre: qQSbGSSasgAA3HISYF57
Domain: kozcuoglunakliyat.com.tr
GitHub: https://github.com/KARAKARWeb/Kozcuoglu-Nakliyat.git
```

---

## 🎯 DEPLOYMENT ADIMLARI

### ADIM 1: Sunucuya Bağlan ve Sistem Güncelle

```bash
# SSH ile bağlan (standart port 22)
ssh root@178.211.130.185
# Şifre: qQSbGSSasgAA3HISYF57

# Sistem güncellemesi
apt update && apt upgrade -y

# Gerekli paketleri kur
apt install -y curl wget git build-essential software-properties-common
```

---

### ADIM 2: Node.js v20 LTS Kurulumu

```bash
# NodeSource repository ekle
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Node.js v20 LTS kur
apt install -y nodejs

# Sürüm kontrolü
node -v  # v20.x.x olmalı
npm -v   # 10.x.x olmalı
```

---

### ADIM 3: PM2 Kurulumu

```bash
# PM2 global kur
npm install -g pm2@latest

# PM2 startup ayarla
pm2 startup systemd

# Çıkan komutu çalıştır (örnek):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# Sürüm kontrolü
pm2 -v  # 5.4.2 olmalı
```

---

### ADIM 4: PostgreSQL Kurulumu

```bash
# PostgreSQL kur
apt install -y postgresql postgresql-contrib

# PostgreSQL servisini başlat
systemctl start postgresql
systemctl enable postgresql

# PostgreSQL'e bağlan
sudo -u postgres psql
```

**PostgreSQL içinde:**

```sql
-- Database oluştur
CREATE DATABASE kozcuoglu_db;

-- User oluştur
CREATE USER kozcuoglu_user WITH ENCRYPTED PASSWORD 'Koz2026!Nakl@DB';

-- Yetkileri ver
GRANT ALL PRIVILEGES ON DATABASE kozcuoglu_db TO kozcuoglu_user;
ALTER DATABASE kozcuoglu_db OWNER TO kozcuoglu_user;

-- Public schema yetkisi
\c kozcuoglu_db
GRANT ALL ON SCHEMA public TO kozcuoglu_user;

-- Çıkış
\q
```

**Test et:**
```bash
psql -U kozcuoglu_user -d kozcuoglu_db -h localhost
# Şifre: Koz2026!Nakl@DB
# \q ile çık
```

---

### ADIM 5: Redis Kurulumu

```bash
# Redis kur
apt install -y redis-server

# Redis yapılandırması
nano /etc/redis/redis.conf
```

**Değiştirilecekler:**
```conf
# supervised no → supervised systemd
supervised systemd

# bind 127.0.0.1 ::1 (değiştirme, local kalmalı)
```

**Redis'i başlat:**
```bash
systemctl restart redis-server
systemctl enable redis-server

# Test et
redis-cli ping  # PONG dönmeli
```

---

### ADIM 6: Nginx Kurulumu

```bash
# Nginx kur
apt install -y nginx

# Nginx başlat
systemctl start nginx
systemctl enable nginx

# Firewall ayarları
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw enable
```

---

### ADIM 7: Proje Dizini Oluştur ve GitHub'dan Clone Et

```bash
# Proje dizini oluştur
mkdir -p /var/www/kozcuoglu
cd /var/www/kozcuoglu

# GitHub'dan clone et
git clone https://github.com/KARAKARWeb/Kozcuoglu-Nakliyat.git .

# Branch kontrol
git branch  # main olmalı
```

---

### ADIM 8: Environment Dosyası Oluştur

```bash
cd /var/www/kozcuoglu
nano .env.production
```

**İçerik:**

```env
# App
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://kozcuoglunakliyat.com.tr
PORT=3000
HOSTNAME=0.0.0.0

# NextAuth
NEXTAUTH_URL=https://kozcuoglunakliyat.com.tr
NEXTAUTH_SECRET=kozcuoglu_nextauth_secret_2026_production_key_secure

# Database
DATABASE_URL=postgresql://kozcuoglu_user:Koz2026!Nakl@DB@localhost:5432/kozcuoglu_db

# Redis
REDIS_URL=redis://localhost:6379

# Email (Nodemailer)
SMTP_HOST=mail.kozcuoglunakliyat.com.tr
SMTP_PORT=587
SMTP_USER=info@kozcuoglunakliyat.com.tr
SMTP_PASSWORD=your_email_password_here
SMTP_FROM=info@kozcuoglunakliyat.com.tr

# Admin
ADMIN_EMAIL=admin@kozcuoglunakliyat.com.tr
```

**Dosyayı kaydet:** `Ctrl+X`, `Y`, `Enter`

---

### ADIM 9: Dependencies Kur ve Build Al

```bash
cd /var/www/kozcuoglu

# Dependencies kur
npm install

# Prisma generate
npx prisma generate

# Prisma migrate (production)
npx prisma migrate deploy

# Next.js build
npm run build

# Build kontrolü
ls -la .next  # .next klasörü oluşmuş olmalı
```

---

### ADIM 10: Uploads ve Logs Dizinleri Oluştur

```bash
cd /var/www/kozcuoglu

# Dizinleri oluştur
mkdir -p public/uploads/{services,solutions,regions,blog,gallery,fleet,clients,general}
mkdir -p logs

# İzinleri ayarla
chmod -R 755 public/uploads
chmod -R 755 logs
```

---

### ADIM 11: PM2 Ecosystem Dosyası Oluştur

```bash
cd /var/www/kozcuoglu
nano ecosystem.config.js
```

**İçerik:**

```javascript
module.exports = {
  apps: [{
    name: 'kozcuoglu-nakliyat',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/kozcuoglu',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    },
    max_memory_restart: '1G',
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
```

---

### ADIM 12: PM2 ile Uygulamayı Başlat

```bash
cd /var/www/kozcuoglu

# PM2 ile başlat
pm2 start ecosystem.config.js

# Durumu kontrol et
pm2 status
pm2 logs kozcuoglu-nakliyat --lines 50

# Startup'a kaydet
pm2 save

# Test et
curl http://localhost:3000
```

---

### ADIM 13: Nginx Yapılandırması

```bash
# Nginx config oluştur
nano /etc/nginx/sites-available/kozcuoglunakliyat.com.tr
```

**İçerik:**

```nginx
# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name kozcuoglunakliyat.com.tr www.kozcuoglunakliyat.com.tr;
    
    # Let's Encrypt için
    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt;
    }
    
    # Diğer tüm istekleri HTTPS'e yönlendir
    location / {
        return 301 https://kozcuoglunakliyat.com.tr$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name kozcuoglunakliyat.com.tr www.kozcuoglunakliyat.com.tr;

    # SSL sertifikaları (Let's Encrypt kurulumundan sonra)
    # ssl_certificate /etc/letsencrypt/live/kozcuoglunakliyat.com.tr/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/kozcuoglunakliyat.com.tr/privkey.pem;

    # SSL ayarları
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # www → non-www redirect
    if ($host = www.kozcuoglunakliyat.com.tr) {
        return 301 https://kozcuoglunakliyat.com.tr$request_uri;
    }

    # Next.js proxy
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
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Static files cache
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public files
    location /uploads {
        alias /var/www/kozcuoglu/public/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Nginx'i aktifleştir:**

```bash
# Symlink oluştur
ln -s /etc/nginx/sites-available/kozcuoglunakliyat.com.tr /etc/nginx/sites-enabled/

# Default config'i kaldır
rm /etc/nginx/sites-enabled/default

# Nginx test
nginx -t

# Nginx restart
systemctl restart nginx
```

---

### ADIM 14: Let's Encrypt SSL Sertifikası

```bash
# Certbot kur
apt install -y certbot python3-certbot-nginx

# Let's Encrypt dizini oluştur
mkdir -p /var/www/letsencrypt

# SSL sertifikası al
certbot certonly --webroot -w /var/www/letsencrypt -d kozcuoglunakliyat.com.tr -d www.kozcuoglunakliyat.com.tr --email info@kozcuoglunakliyat.com.tr --agree-tos --no-eff-email

# Nginx config'de SSL satırlarını aktifleştir
nano /etc/nginx/sites-available/kozcuoglunakliyat.com.tr
# ssl_certificate ve ssl_certificate_key satırlarının başındaki # işaretini kaldır

# Nginx restart
systemctl restart nginx

# SSL otomatik yenileme testi
certbot renew --dry-run
```

---

### ADIM 15: DNS Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, vs.) şu DNS kayıtlarını ekleyin:

```
A Record:
  Host: @
  Value: 178.211.130.185
  TTL: 3600

A Record:
  Host: www
  Value: 178.211.130.185
  TTL: 3600
```

**DNS propagation kontrolü:**
```bash
dig kozcuoglunakliyat.com.tr +short
# 178.211.130.185 dönmeli

dig www.kozcuoglunakliyat.com.tr +short
# 178.211.130.185 dönmeli
```

---

## ✅ FINAL TEST

```bash
# 1. PM2 durumu
pm2 status

# 2. Nginx durumu
systemctl status nginx

# 3. PostgreSQL durumu
systemctl status postgresql

# 4. Redis durumu
systemctl status redis-server

# 5. Uygulama logları
pm2 logs kozcuoglu-nakliyat --lines 100

# 6. Nginx logları
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# 7. Curl testi
curl http://localhost:3000
curl https://kozcuoglunakliyat.com.tr

# 8. SSL testi
curl -I https://kozcuoglunakliyat.com.tr
```

---

## 🔄 GÜNCELLEME (Yeni Deployment)

```bash
cd /var/www/kozcuoglu

# GitHub'dan pull
git pull origin main

# Dependencies güncelle (gerekirse)
npm install

# Prisma migrate (gerekirse)
npx prisma migrate deploy

# Build
npm run build

# PM2 reload (zero-downtime)
pm2 reload kozcuoglu-nakliyat

# Logları kontrol et
pm2 logs kozcuoglu-nakliyat --lines 50
```

---

## 🛠️ SORUN GİDERME

### PM2 restart
```bash
pm2 restart kozcuoglu-nakliyat
pm2 logs kozcuoglu-nakliyat
```

### Nginx restart
```bash
systemctl restart nginx
nginx -t  # Config test
```

### Database bağlantı sorunu
```bash
psql -U kozcuoglu_user -d kozcuoglu_db -h localhost
# Şifre: Koz2026!Nakl@DB
```

### Port kontrolü
```bash
netstat -tulpn | grep :3000
netstat -tulpn | grep :80
netstat -tulpn | grep :443
```

### Disk alanı kontrolü
```bash
df -h
du -sh /var/www/kozcuoglu
```

---

## 📊 MONİTORİNG

```bash
# PM2 monitoring
pm2 monit

# System resources
htop

# Nginx access log
tail -f /var/log/nginx/access.log

# Application logs
pm2 logs kozcuoglu-nakliyat
```

---

## 🎯 DEPLOYMENT TAMAMLANDI!

Site şu adreste yayında olmalı:
**https://kozcuoglunakliyat.com.tr**

Tüm servisler çalışıyor ve otomatik restart ayarlandı! 🚀
