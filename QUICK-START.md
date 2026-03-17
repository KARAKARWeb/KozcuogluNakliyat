# 🚀 Kozcuoğlu Nakliyat - Hızlı Başlangıç

## 📦 İlk Kurulum (Sunucuda)

### 1. Sunucuya Bağlan

```bash
ssh -p 112 root@YOUR_SERVER_IP
```

### 2. Proje Dizinine Git

```bash
cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs
```

### 3. Git Clone (İlk Kez)

```bash
# Mevcut dosyaları temizle
rm -rf *
rm -rf .* 2>/dev/null || true

# Git clone
git clone https://github.com/YOUR_USERNAME/kozcuoglu-nakliyat.git .
```

### 4. Environment Dosyası Oluştur

```bash
cp env.example .env.production
nano .env.production
```

**Önemli:** Aşağıdaki değerleri güncelle:
- `NEXTAUTH_SECRET` → `openssl rand -base64 32` ile oluştur
- `ADMIN_PASSWORD` → Güçlü şifre
- `DATABASE_URL` → PostgreSQL şifresi
- `SMTP_PASS` → Email şifresi

### 5. PostgreSQL Database

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE kozcuoglu_db;
CREATE USER kozcuoglu_user WITH ENCRYPTED PASSWORD 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE kozcuoglu_db TO kozcuoglu_user;
ALTER DATABASE kozcuoglu_db OWNER TO kozcuoglu_user;
\q
```

### 6. Dependencies & Build

```bash
npm ci
npm run build
```

### 7. Dizinleri Oluştur

```bash
mkdir -p pm2-logs
mkdir -p public/uploads
chmod +x deploy.sh
chmod +x sync-data.sh
```

### 8. PM2 Başlat

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 9. Nginx Ayarları (Plesk)

Plesk Panel → Domains → kozcuoglunakliyat.com.tr → Apache & nginx Settings

**Nginx ek direktifler ekle:**

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

**Kaydet ve Uygula**

### 10. SSL Sertifikası

Plesk Panel → SSL/TLS Certificates → Let's Encrypt → Install

---

## 🔄 Günlük Kullanım

### Local'den Deploy (Önerilen)

```bash
# Local makinede
./quick-deploy.sh
```

Bu tek komut:
1. Git push yapar
2. Data dosyalarını senkronize eder
3. Sunucuda deployment yapar
4. PM2'yi restart eder

### Sadece Data Sync

```bash
# Local makinede
./sync-data.sh
```

### Manuel Deploy (Sunucuda)

```bash
# Sunucuda
cd /var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs
./deploy.sh
```

---

## 📊 Monitoring

### PM2 Durumu

```bash
pm2 status
pm2 logs kozcuoglu-nakliyat
pm2 monit
```

### Site Kontrolü

```bash
curl http://localhost:3000
curl https://kozcuoglunakliyat.com.tr
```

---

## 🛠️ Sorun Giderme

### Uygulama Çalışmıyor

```bash
pm2 logs kozcuoglu-nakliyat --lines 100
pm2 restart kozcuoglu-nakliyat
```

### Build Hatası

```bash
rm -rf .next
npm run build
```

### Port Kullanımda

```bash
lsof -i :3000
pm2 delete kozcuoglu-nakliyat
pm2 start ecosystem.config.js
```

---

## 📝 Önemli Dosyalar

- `ecosystem.config.js` - PM2 config
- `deploy.sh` - Sunucu deployment script
- `sync-data.sh` - Data senkronizasyon script
- `quick-deploy.sh` - Tek komut deployment
- `.env.production` - Production environment variables
- `DEPLOYMENT.md` - Detaylı deployment rehberi

---

## 🔐 Güvenlik Kontrol Listesi

- [ ] `.env.production` oluşturuldu ve güvenli şifreler kullanıldı
- [ ] PostgreSQL şifresi güçlü
- [ ] Admin panel şifresi güçlü
- [ ] SSL sertifikası kuruldu
- [ ] Firewall (UFW) aktif
- [ ] Fail2ban çalışıyor
- [ ] PM2 startup ayarlandı

---

## 🌐 URL'ler

- **Site:** https://kozcuoglunakliyat.com.tr
- **Admin:** https://kozcuoglunakliyat.com.tr/admin
- **Plesk:** https://YOUR_SERVER_IP:8443

---

## 📞 Destek

Sorun yaşarsan:
1. `pm2 logs` kontrol et
2. `DEPLOYMENT.md` oku
3. Sistem kaynaklarını kontrol et: `htop`

---

**Hazırlayan:** KARAKAR Web
**Tarih:** 2026-02-15
