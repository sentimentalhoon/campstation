# Deployment Guide for Ubuntu Server
# 우분투 서버 배포 가이드

This guide explains how to deploy CampStation to a remote Ubuntu server.
이 가이드는 원격 우분투 서버에 CampStation을 배포하는 방법을 설명합니다.

---

## 1. Prerequisites (사전 준비)

Ensure your server meets the following requirements:
서버가 다음 요구사항을 충족하는지 확인하세요:

- **OS**: Ubuntu 20.04 or 22.04 LTS recommended. (Ubuntu 20.04 또는 22.04 LTS 권장)
- **Ports**: Open ports `80` (HTTP) and `443` (HTTPS) in your firewall. (방화벽에서 80, 443 포트 개방)
- **Domain**: Point your domain (e.g., `mycamp.duckdns.org`) to the server's IP. (도메인을 서버 IP에 연결)

### Install Docker & Git (Docker 및 Git 설치)

If not installed, run the following commands:
설치되어 있지 않다면 아래 명령어를 실행하세요:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install -y git

# Install Docker (This usually includes docker compose plugin)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group (Log out and back in after this)
sudo usermod -aG docker $USER

# Verify installation (설치 확인)
# You should see Docker Compose version v2.x.x
docker compose version
```

> **Note**: If `docker compose` command is not found, try installing the plugin:
> **참고**: 만약 `docker compose` 명령어가 없다면 플러그인을 설치하세요:
> `sudo apt install docker-compose-plugin`

---

## 2. Clone Repository (저장소 복제)

Clone the project to your server:
서버에 프로젝트를 복제합니다:

```bash
git clone https://github.com/sentimentalhoon/campstation.git
cd campstation
```

---

## 3. Environment Setup (환경 설정)

### Generate `.env` (환경변수 파일 생성)

Use the generator script to create a secure variable file.
생성 스크립트를 사용하여 보안 환경 변수 파일을 생성합니다.

```bash
chmod +x generate-prod-env.sh
./generate-prod-env.sh
```

### Review `.env` (.env 확인)

Check if the domain and other settings are correct.
도메인 등 설정이 올바른지 확인합니다.

```bash
nano .env
```

---

## 4. SSL & Domain Setup (SSL 및 도메인 설정)

**⚠️ Important**: Perform this step only ONCE when setting up for the first time.
**⚠️ 중요**: 이 단계는 초기 설정 시 **한 번만** 수행하면 됩니다.

Run the initialization script to issue SSL certificates:
초기화 스크립트를 실행하여 SSL 인증서를 발급받으세요:

```bash
chmod +x init-letsencrypt.sh
./init-letsencrypt.sh
```

> The script will automatically request certificates from Let's Encrypt and configure Nginx.
> 스크립트는 Let's Encrypt에서 인증서를 요청하고 Nginx를 자동으로 설정합니다.

---

## 5. Run Application (애플리케이션 실행)

Start the production environment:
프로덕션 환경을 시작합니다:

```bash
# Using Docker Compose V2 (Recommended)
docker compose -f docker-compose.prod.yml up -d

# OR using older standalone binary
# docker-compose -f docker-compose.prod.yml up -d
```

Verify status:
상태 확인:

```bash
docker compose -f docker-compose.prod.yml ps
```

---

## 6. Update & Maintenance (업데이트 및 유지보수)

### To Update the App (앱 업데이트 시)

When you have new code changes:
새로운 코드 변경사항이 있을 때:

```bash
# 1. Pull latest changes
git pull

# 2. Rebuild and restart containers
docker compose -f docker-compose.prod.yml up --build -d
```

### To Renew Certificates (인증서 갱신 시)

Certbot attempts automatic renewal, but you can force it manually if needed:
Certbot이 자동 갱신을 시도하지만, 필요한 경우 수동으로 갱신할 수 있습니다:

```bash
docker compose -f docker-compose.prod.yml run --rm certbot renew
docker compose -f docker-compose.prod.yml exec nginx nginx -s reload
```

---

## 7. Coexistence with PSMO-Community (PSMO 커뮤니티와 함께 실행 시)

If you are running this on the same server as `psmo-community`, you must use the **Integration Mode** to avoid port conflicts (80/443).
만약 `psmo-community`와 같은 서버에서 실행한다면, 포트 충돌(80/443)을 피하기 위해 **통합 모드**를 사용해야 합니다.

### 1. Run CampStation (CampStation 실행)

Use `docker-compose.integrate.yml` instead. This runs the app on port `3001` without its own Nginx/Certbot.
`docker-compose.integrate.yml`을 사용하세요. 이 파일은 Nginx/Certbot 없이 앱을 `3001` 포트에서 실행합니다.

```bash
# Generate env if not done
./generate-prod-env.sh

# Start services
docker compose -f docker-compose.integrate.yml up -d
```

### 2. Configure PSMO Nginx (PSMO Nginx 설정)

Copy the integration config to PSMO's nginx configuration folder.
통합 설정 파일을 PSMO의 Nginx 설정 폴더로 복사하세요.

```bash
# Assuming /path/to/psmo-community is where PSMO is
cp psmo-integration-mycamp.conf /path/to/psmo-community/infrastructure/nginx/conf.d/mycamp.conf
```

### 3. Issue Certificate (PSMO Certbot)

Since PSMO handles SSL, use PSMO's Certbot to get the certificate.
SSL을 PSMO가 처리하므로, PSMO의 Certbot을 사용해 인증서를 발급합니다.

```bash
# Run inside PSMO folder
cd /path/to/psmo-community

# Request certificate using PSMO's certbot service
docker compose -f docker-compose.prod.yml run --rm certbot certonly --webroot -w /var/www/certbot -d mycamp.duckdns.org
```

### 4. Reload PSMO Nginx

```bash
docker compose -f docker-compose.prod.yml exec nginx nginx -s reload
```
