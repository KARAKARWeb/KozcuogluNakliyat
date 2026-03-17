#!/bin/bash

# Kozcuoğlu Nakliyat - Server Setup Script
# Sunucuda ilk kurulum için

set -e

echo "🚀 Kozcuoğlu Nakliyat - Server Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# PostgreSQL Database Setup
echo "📊 PostgreSQL Database oluşturuluyor..."

sudo -u postgres psql << EOF
-- Database oluştur
CREATE DATABASE kozcuoglu_db;

-- User oluştur
CREATE USER kozcuoglu_user WITH ENCRYPTED PASSWORD 'Koz2026!Nakl@DB';

-- Yetkileri ver
GRANT ALL PRIVILEGES ON DATABASE kozcuoglu_db TO kozcuoglu_user;

-- Database owner yap
ALTER DATABASE kozcuoglu_db OWNER TO kozcuoglu_user;

-- Bağlantı testi
\c kozcuoglu_db
\q
EOF

echo "✅ PostgreSQL database oluşturuldu!"
echo ""
echo "Database Bilgileri:"
echo "  Database: kozcuoglu_db"
echo "  User: kozcuoglu_user"
echo "  Password: Koz2026!Nakl@DB"
echo "  Host: localhost"
echo "  Port: 5432"
echo ""
echo "Connection String:"
echo "  postgresql://kozcuoglu_user:Koz2026!Nakl@DB@localhost:5432/kozcuoglu_db"
