# CampStation

CampStation is a comprehensive camping campsite booking application built with Next.js 16. It offers a seamless experience for users to discover, book, and review campsites, while providing robust management tools for campsite owners.

CampStation은 Next.js 16으로 구축된 종합 캠핑장 예약 애플리케이션입니다. 사용자에게는 캠핑장 검색, 예약, 리뷰 작성을 위한 원활한 경험을 제공하며, 캠핑장 소유주에게는 강력한 관리 도구를 제공합니다.

## 🛠 Technology Stack / 기술 스택

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Authentication**: [NextAuth.js](https://authjs.dev/)
-   **Infrastructure**: Docker Compose

## ✨ Features / 주요 기능

-   **User Authentication**: Secure login and signup flows using NextAuth.
    -   **사용자 인증**: NextAuth를 사용한 안전한 로그인 및 회원가입.
-   **Role-Based Access**: Distinct roles for Users and Admins/Owners.
    -   **권한 관리**: 일반 사용자 및 관리자/소유주를 위한 구분된 권한 체계.
-   **Campsite Management**: Create, update, and manage campsite listings with ease.
    -   **캠핑장 관리**: 캠핑장 등록, 수정 및 관리를 손쉽게 처리.
-   **Booking System**: Real-time reservation capability with status tracking.
    -   **예약 시스템**: 상태 추적이 가능한 실시간 예약 기능.
-   **Reviews & Ratings**: Community-driven feedback system for campsites.
    -   **리뷰 및 평점**: 커뮤니티 기반의 캠핑장 피드백 시스템.
-   **Media Management**: S3-compatible image storage using MinIO.
    -   **미디어 관리**: MinIO를 사용한 S3 호환 이미지 저장소.

## 🚀 Getting Started / 시작하기

### Prerequisites / 사전 준비

-   [Node.js](https://nodejs.org/) (v18+ recommended / v18 이상 권장)
-   [Docker](https://www.docker.com/) & Docker Compose

### Installation & Running / 설치 및 실행

1.  **Start Infrastructure Services (인프라 서비스 시작)**
    Start the necessary backing services (Postgres, Redis, MinIO, etc.) using Docker Compose:
    Docker Compose를 사용하여 필요한 백엔드 서비스(Postgres, Redis, MinIO 등)를 시작합니다:

    ```bash
    docker-compose up -d
    ```

2.  **Install Dependencies (의존성 설치)**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Database Migration (데이터베이스 마이그레이션)**
    Initialize the database and apply the Prisma schema:
    데이터베이스를 초기화하고 Prisma 스키마를 적용합니다:

    ```bash
    npx prisma migrate dev
    ```

4.  **Run Development Server (개발 서버 실행)**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
    브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 🔌 Local Services & Tools / 로컬 서비스 및 도구

Development environment services and their default access points:
개발 환경에서 사용되는 서비스 및 기본 접속 정보입니다:

| Service (서비스) | Port / URL | Default Credentials (기본 계정) |
| :--- | :--- | :--- |
| **Web Application** | [http://localhost:3000](http://localhost:3000) | - |
| **Nginx Gateway** | [http://localhost](http://localhost) | - |
| **Msg Broker (Redis)** | `6379` | - |
| **Database (Postgres)** | `5432` | `postgres` / `postgres` |
| **MinIO Console** (S3) | [http://localhost:9001](http://localhost:9001) | `campstation_minio_user` / `campstation_minio_password` |
| **PgAdmin** (DB GUI) | [http://localhost:5050](http://localhost:5050) | `admin@campstation.com` / `admin` |
| **Mailpit** (Email) | [http://localhost:8025](http://localhost:8025) | - |

## 📂 Project Structure / 프로젝트 구조

-   `src/app`: Next.js App Router pages and layouts. (페이지 및 레이아웃)
-   `src/components`: Reusable UI components and design system. (재사용 가능한 UI 컴포넌트)
-   `src/lib`: Shared utilities and library configurations. (공유 유틸리티 및 라이브러리 설정)
-   `prisma/`: Database schema and migrations. (DB 스키마 및 마이그레이션)
-   `docker/`: Infrastructure configuration files. (인프라 설정 파일)
