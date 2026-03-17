#!/bin/bash

# Kozcuoğlu Nakliyat - Data Sync Script
# Local'den sunucuya data ve uploads senkronizasyonu

set -e

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Değişkenler
SERVER_USER="root"
SERVER_HOST="178.211.130.185"
SERVER_PORT="112" # SSH port
REMOTE_DIR="/var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs"
LOCAL_DIR="$(pwd)"

echo "🔄 Data Sync Başlıyor..."

# Data files sync
echo -e "${YELLOW}📁 Data dosyaları senkronize ediliyor...${NC}"
rsync -avz --progress \
    -e "ssh -p $SERVER_PORT" \
    "$LOCAL_DIR/src/data/" \
    "$SERVER_USER@$SERVER_HOST:$REMOTE_DIR/src/data/" \
    --exclude=".gitkeep"

# Uploads sync
echo -e "${YELLOW}📸 Upload dosyaları senkronize ediliyor...${NC}"
rsync -avz --progress \
    -e "ssh -p $SERVER_PORT" \
    "$LOCAL_DIR/public/uploads/" \
    "$SERVER_USER@$SERVER_HOST:$REMOTE_DIR/public/uploads/" \
    --exclude=".gitkeep"

echo -e "${GREEN}✅ Senkronizasyon tamamlandı!${NC}"

# Sunucuda PM2 restart
echo -e "${YELLOW}🔄 Sunucuda uygulama yeniden başlatılıyor...${NC}"
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "cd $REMOTE_DIR && pm2 restart kozcuoglu-nakliyat"

echo -e "${GREEN}✅ Tüm işlemler tamamlandı!${NC}"
