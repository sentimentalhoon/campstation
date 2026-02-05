#!/bin/bash

# Configuration
TEMPLATE_FILE="production.env"
TARGET_FILE=".env"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}### CampStation Production .env Generator ###${NC}"

# Check if template exists
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo -e "${RED}Error: Template file '$TEMPLATE_FILE' not found.${NC}"
    exit 1
fi

# Check if target already exists
if [ -f "$TARGET_FILE" ]; then
    echo -e "${YELLOW}Warning: '$TARGET_FILE' already exists.${NC}"
    read -p "Do you want to overwrite it? (y/N): " choice
    if [[ ! "$choice" =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
fi

echo "Generating secure secrets..."

# Generate secrets
NEXTAUTH_SECRET=$(openssl rand -base64 32 | tr -d '/+=' | cut -c1-32)
POSTGRES_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-24)
MINIO_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-24)

# Copy template to target
cp "$TEMPLATE_FILE" "$TARGET_FILE"

# Replace placeholders
# Using sed with different delimiter to avoid issues with standard characters
# Mac OS (BSD) sed requires backup extension '' for -i
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_CMD="sed -i ''"
else
    SED_CMD="sed -i"
fi

$SED_CMD "s/NEXTAUTH_SECRET=changeme_openssl_rand_base64_32/NEXTAUTH_SECRET=$NEXTAUTH_SECRET/" "$TARGET_FILE"
$SED_CMD "s/POSTGRES_PASSWORD=use_strong_password_here/POSTGRES_PASSWORD=$POSTGRES_PASSWORD/" "$TARGET_FILE"
$SED_CMD "s/MINIO_ROOT_PASSWORD=use_strong_password_here/MINIO_ROOT_PASSWORD=$MINIO_PASSWORD/" "$TARGET_FILE"

echo -e "${GREEN}Success! '$TARGET_FILE' has been created.${NC}"
echo "----------------------------------------------------"
echo -e "NEXTAUTH_SECRET:   ${YELLOW}Generated${NC}"
echo -e "POSTGRES_PASSWORD: ${YELLOW}Generated${NC}"
echo -e "MINIO_PASSWORD:    ${YELLOW}Generated${NC}"
echo "----------------------------------------------------"
echo "Please review '$TARGET_FILE' to ensure all values are correct."