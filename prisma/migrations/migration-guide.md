# Database Migration Guide

## Kurulum

### 1. PostgreSQL Kurulumu

```bash
# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# Docker
docker run --name kozcuoglu-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
```

### 2. Database Oluşturma

```bash
# PostgreSQL'e bağlan
psql postgres

# Database oluştur
CREATE DATABASE kozcuoglu;
CREATE USER kozcuoglu_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE kozcuoglu TO kozcuoglu_user;
```

### 3. Environment Variables

`.env` dosyasına ekleyin:

```env
DATABASE_URL="postgresql://kozcuoglu_user:your_password@localhost:5432/kozcuoglu?schema=public"
```

### 4. Prisma Kurulumu

```bash
# Prisma CLI ve Client kurulumu
npm install -D prisma
npm install @prisma/client bcryptjs
npm install -D @types/bcryptjs

# Prisma Client oluştur
npx prisma generate
```

### 5. Migration Çalıştırma

```bash
# İlk migration
npx prisma migrate dev --name init

# Sonraki migration'lar
npx prisma migrate dev --name add_new_field

# Production migration
npx prisma migrate deploy
```

### 6. Seed Data

```bash
# Seed script çalıştır
npx prisma db seed

# Manuel seed
npx ts-node prisma/seed.ts
```

## Migration Komutları

### Development

```bash
# Schema değişikliklerini migration olarak kaydet
npx prisma migrate dev

# Migration'ları sıfırla (DİKKAT: Tüm veri silinir!)
npx prisma migrate reset

# Migration durumunu kontrol et
npx prisma migrate status
```

### Production

```bash
# Production migration (veri kaybı olmadan)
npx prisma migrate deploy

# Migration geçmişini kontrol et
npx prisma migrate status
```

### Database Yönetimi

```bash
# Prisma Studio (GUI)
npx prisma studio

# Database'i schema'ya göre güncelle (geliştirme için)
npx prisma db push

# Mevcut database'den schema oluştur
npx prisma db pull
```

## Schema Değişiklikleri

### Yeni Model Ekleme

1. `prisma/schema.prisma` dosyasını düzenle
2. `npx prisma migrate dev --name add_model_name` çalıştır
3. Prisma Client otomatik güncellenir

### Field Ekleme

```prisma
model Blog {
  // ... mevcut fieldlar
  newField String? // Nullable yaparak veri kaybını önle
}
```

```bash
npx prisma migrate dev --name add_blog_new_field
```

### Field Silme (Güvenli)

```prisma
model Blog {
  // newField String? // Önce comment yap
}
```

```bash
# Migration oluştur
npx prisma migrate dev --name remove_blog_new_field

# Veriyi kontrol et, sorun yoksa kalıcı sil
```

## Veri Güvenliği

### Backup Alma

```bash
# PostgreSQL backup
pg_dump kozcuoglu > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql kozcuoglu < backup_20240214_120000.sql
```

### Migration Rollback

```bash
# Son migration'ı geri al
npx prisma migrate resolve --rolled-back <migration_name>

# Backup'tan restore
psql kozcuoglu < backup.sql
```

## Production Deployment

### 1. Environment Variables

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public&sslmode=require"
NODE_ENV=production
```

### 2. Migration Strategy

```bash
# Build öncesi
npx prisma generate
npx prisma migrate deploy

# Build
npm run build

# Start
npm start
```

### 3. Zero-Downtime Migration

1. Yeni field'ları nullable olarak ekle
2. Uygulama kodunu güncelle
3. Deploy et
4. Veriyi doldur
5. Field'ı required yap (gerekirse)

## Troubleshooting

### Migration Hatası

```bash
# Migration durumunu kontrol et
npx prisma migrate status

# Başarısız migration'ı çöz
npx prisma migrate resolve --applied <migration_name>
```

### Schema Senkronizasyon

```bash
# Schema'yı database ile senkronize et
npx prisma db push --accept-data-loss # DİKKAT: Sadece development'ta!
```

### Connection Hatası

```bash
# Database bağlantısını test et
npx prisma db execute --stdin <<< "SELECT 1"
```

## Best Practices

1. **Her zaman backup alın** - Production migration öncesi
2. **Nullable fieldlar** - Yeni fieldları önce nullable ekleyin
3. **Test edin** - Migration'ları önce staging'de test edin
4. **Rollback planı** - Her migration için rollback stratejisi hazırlayın
5. **Veri migration** - Büyük veri değişikliklerini ayrı script'lerle yapın
6. **Index'ler** - Performans için gerekli index'leri ekleyin
7. **Foreign key'ler** - İlişkileri doğru tanımlayın

## Monitoring

### Query Logging

```typescript
// src/lib/prisma.ts
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});
```

### Performance

```bash
# Slow query'leri bul
# PostgreSQL'de
SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;
```
