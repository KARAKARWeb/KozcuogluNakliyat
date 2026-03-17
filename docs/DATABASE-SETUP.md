# PostgreSQL Lokal Kurulum Rehberi

## 🎯 Amaç
JSON dosyalarından PostgreSQL'e geçiş için lokal test ortamı hazırlama.

## ✅ ADIM 6: PostgreSQL Kurulumu (macOS)

### Homebrew ile Kurulum
```bash
# PostgreSQL 15 kurulumu
brew install postgresql@15

# PostgreSQL servisini başlat
brew services start postgresql@15

# Kurulum kontrolü
psql --version
# Beklenen: psql (PostgreSQL) 15.x
```

### Database Oluşturma
```bash
# PostgreSQL'e bağlan
psql postgres

# Database oluştur
CREATE DATABASE kozcuoglu;

# User oluştur (opsiyonel - development için postgres user yeterli)
CREATE USER kozcuoglu_dev WITH PASSWORD 'dev_password_123';

# Yetkileri ver
GRANT ALL PRIVILEGES ON DATABASE kozcuoglu TO kozcuoglu_dev;

# Çıkış
\q
```

### Test
```bash
# Database'e bağlan
psql kozcuoglu

# Tablo listesi (şu an boş olmalı)
\dt

# Çıkış
\q
```

---

## ✅ ADIM 7: Prisma ORM Kurulumu

### Package Kurulumu
```bash
cd /Users/karakar/Desktop/kozcuoglu

# Prisma CLI (development dependency)
npm install -D prisma

# Prisma Client (production dependency)
npm install @prisma/client

# bcryptjs (password hashing için)
npm install bcryptjs
npm install -D @types/bcryptjs
```

### Kurulum Kontrolü
```bash
# Prisma version
npx prisma --version

# Beklenen: prisma@5.x.x
```

---

## ✅ ADIM 8: Environment Variables

### .env Dosyası Oluştur
```bash
# .env dosyası oluştur (root dizinde)
touch .env
```

### .env İçeriği
```env
# Database
DATABASE_URL="postgresql://postgres:@localhost:5432/kozcuoglu?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Email (opsiyonel)
EMAIL_PROVIDER="sendgrid"
EMAIL_API_KEY=""
EMAIL_FROM_NAME="Kozcuoğlu Nakliyat"
EMAIL_FROM_ADDRESS="info@kozcuoglunakliyat.com.tr"

# Storage (opsiyonel)
STORAGE_PROVIDER="local"

# CDN (opsiyonel)
CDN_PROVIDER="cloudfront"
CDN_DOMAIN="cdn.kozcuoglunakliyat.com.tr"
```

### .env.example Oluştur
```bash
# .env.example (git'e eklenebilir)
cp .env .env.example

# Hassas bilgileri temizle
# .env.example'da sadece key'leri bırak, value'ları boş yap
```

### .gitignore Kontrolü
```bash
# .gitignore'da .env olduğundan emin ol
cat .gitignore | grep .env

# Yoksa ekle
echo ".env" >> .gitignore
```

---

## ✅ ADIM 9: Database Connection Test

### Prisma Client Oluştur
```bash
# Prisma Client generate et
npx prisma generate
```

### Connection Test Script
```bash
# Test script oluştur
cat > scripts/test-db-connection.ts << 'EOF'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    
    // Database'e bağlan
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Raw query test
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('📊 PostgreSQL version:', result);
    
    // Disconnect
    await prisma.$disconnect();
    console.log('👋 Disconnected from database');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
EOF

# Test çalıştır
npx ts-node scripts/test-db-connection.ts
```

### Beklenen Çıktı
```
🔌 Testing database connection...
✅ Database connection successful!
📊 PostgreSQL version: [ { version: 'PostgreSQL 15.x ...' } ]
👋 Disconnected from database
```

---

## ✅ ADIM 10: Backup Stratejisi

### JSON Backup
```bash
# Mevcut JSON dosyalarını yedekle
mkdir -p backups/json-backup-$(date +%Y%m%d)
cp -r data/* backups/json-backup-$(date +%Y%m%d)/

# Backup kontrolü
ls -la backups/json-backup-$(date +%Y%m%d)/
```

### PostgreSQL Backup Script
```bash
# Backup script oluştur
cat > scripts/backup-database.sh << 'EOF'
#!/bin/bash

# Backup directory
BACKUP_DIR="backups/postgres"
mkdir -p $BACKUP_DIR

# Timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Backup filename
BACKUP_FILE="$BACKUP_DIR/kozcuoglu_$TIMESTAMP.sql"

# PostgreSQL dump
pg_dump kozcuoglu > $BACKUP_FILE

# Compress
gzip $BACKUP_FILE

echo "✅ Backup created: $BACKUP_FILE.gz"

# Keep only last 7 backups
ls -t $BACKUP_DIR/*.sql.gz | tail -n +8 | xargs rm -f

echo "🧹 Old backups cleaned"
EOF

# Executable yap
chmod +x scripts/backup-database.sh

# Test backup
./scripts/backup-database.sh
```

### Restore Script
```bash
# Restore script oluştur
cat > scripts/restore-database.sh << 'EOF'
#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./restore-database.sh <backup-file.sql.gz>"
  exit 1
fi

BACKUP_FILE=$1

# Decompress
gunzip -c $BACKUP_FILE > /tmp/restore.sql

# Drop and recreate database
psql postgres -c "DROP DATABASE IF EXISTS kozcuoglu;"
psql postgres -c "CREATE DATABASE kozcuoglu;"

# Restore
psql kozcuoglu < /tmp/restore.sql

# Cleanup
rm /tmp/restore.sql

echo "✅ Database restored from: $BACKUP_FILE"
EOF

# Executable yap
chmod +x scripts/restore-database.sh
```

---

## 📊 DURUM KONTROLÜ

### Tamamlanan Adımlar
- [x] 6. PostgreSQL kurulumu ✅
- [x] 7. Prisma ORM kurulumu ✅
- [x] 8. Environment variables ✅
- [x] 9. Database connection test ✅
- [x] 10. Backup stratejisi ✅

### Sonraki Adımlar
- [ ] 11-15. Schema Definition (ZATEN HAZIR)
- [ ] 16-20. Migration Scripts (ZATEN HAZIR)
- [ ] 21-25. Testing & Deployment

---

## 🎯 SONRAKI ADIM

Migration çalıştırma:
```bash
# 1. Prisma migration oluştur
npx prisma migrate dev --name init

# 2. Seed data ekle
npx prisma db seed

# 3. JSON → PostgreSQL migration (opsiyonel)
npx ts-node scripts/migrate-json-to-db.ts
```

---

## ⚠️ SORUN GİDERME

### PostgreSQL Başlamıyorsa
```bash
# Servisi durdur
brew services stop postgresql@15

# Servisi başlat
brew services start postgresql@15

# Durum kontrol
brew services list | grep postgresql
```

### Connection Error
```bash
# PostgreSQL çalışıyor mu?
pg_isready

# Port kontrolü
lsof -i :5432

# Log kontrol
tail -f /opt/homebrew/var/log/postgresql@15.log
```

### Prisma Generate Hatası
```bash
# node_modules temizle
rm -rf node_modules
npm install

# Prisma client yeniden oluştur
npx prisma generate
```

---

## 📝 NOTLAR

1. **Lokal development için** `postgres` user yeterli
2. **Production için** ayrı user oluşturun
3. **Backup'ları düzenli alın** (günlük önerilir)
4. **Migration'ları test edin** önce lokal, sonra production
5. **JSON dosyalarını saklayin** rollback için

---

## ✅ HAZIR!

Setup tamamlandı! Şimdi migration çalıştırabilirsiniz.
