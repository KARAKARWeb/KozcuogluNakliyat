#!/bin/bash

# Kozcuoğlu Nakliyat - Quick Deploy
# Local'den tek komutla deploy

set -e

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Değişkenler
SERVER_USER="root"
SERVER_HOST="178.211.130.185"
SERVER_PORT="112"
REMOTE_DIR="/var/www/vhosts/kozcuoglunakliyat.com.tr/httpdocs"

echo -e "${BLUE}🚀 Kozcuoğlu Nakliyat - Quick Deploy${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Git push
echo -e "${YELLOW}📤 Git push...${NC}"
git add .
read -p "Commit mesajı: " commit_msg
git commit -m "$commit_msg" || echo "No changes to commit"
git push origin main

# 2. Data sync
echo -e "${YELLOW}🔄 Data senkronize ediliyor...${NC}"
./sync-data.sh

# 3. Sunucuda deployment
echo -e "${YELLOW}🚀 Sunucuda deployment başlatılıyor...${NC}"
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "cd $REMOTE_DIR && ./deploy.sh"

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment tamamlandı!${NC}"
echo -e "${BLUE}🌐 Site: https://kozcuoglunakliyat.com.tr${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
