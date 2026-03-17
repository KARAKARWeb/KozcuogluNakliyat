#!/bin/bash

# Kozcuoğlu Nakliyat - Deployment Script
# Bu script sunucuda çalıştırılır

set -e

echo "🚀 Kozcuoğlu Nakliyat Deployment Başlıyor..."

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Değişkenler
APP_DIR="/var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs"
APP_NAME="kozcuoglu-nakliyat"
GIT_REPO="https://github.com/KARAKARWeb/Kozcuoglu-Nakliyat.git"
BRANCH="main"

# Deployment lock kontrolü
if [ -f "$APP_DIR/.deployment-lock" ]; then
    echo -e "${RED}❌ Deployment zaten çalışıyor!${NC}"
    exit 1
fi

# Lock oluştur
touch "$APP_DIR/.deployment-lock"

# Cleanup function
cleanup() {
    rm -f "$APP_DIR/.deployment-lock"
}
trap cleanup EXIT

cd "$APP_DIR"

echo -e "${YELLOW}📥 Git pull...${NC}"
git pull origin $BRANCH

echo -e "${YELLOW}📦 Dependencies yükleniyor...${NC}"
npm ci --production=false

echo -e "${YELLOW}🏗️  Build başlıyor...${NC}"
npm run build

echo -e "${YELLOW}🔄 PM2 restart...${NC}"
pm2 restart $APP_NAME --update-env

echo -e "${YELLOW}💾 PM2 save...${NC}"
pm2 save

echo -e "${GREEN}✅ Deployment tamamlandı!${NC}"

# Health check
sleep 3
if pm2 list | grep -q "$APP_NAME.*online"; then
    echo -e "${GREEN}✅ Uygulama çalışıyor!${NC}"
else
    echo -e "${RED}❌ Uygulama başlatılamadı!${NC}"
    pm2 logs $APP_NAME --lines 50
    exit 1
fi
