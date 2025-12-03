# 건강한 스포츠 활동 - 스트레칭 가이드 웹 서비스

국민들의 안전하고 건강한 스포츠 활동을 위한 스트레칭 관련 웹 서비스입니다.

## 주요 기능

1. **스트레칭 Shorts**
   - YouTube API를 통한 1분 이하 스트레칭 영상 제공
   - 자체 데이터베이스와 통합 검색
   - 운동 종류별, 트렌드별 스트레칭 추천

2. **기록 및 Alert 기능**
   - 운동 기록 저장 및 관리
   - 스케줄 기반 알림 기능
   - 진행 상황 추적

3. **Q&A 기능 (유료화)**
   - 전문가(트레이너, 스포츠 지도사)와의 상담
   - 지역별, 조건별 1:1 매칭 시스템
   - 무료 쿠폰 시스템 (5-10분 무료 대화)

## 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Prisma ORM)
- **External APIs**: YouTube Data API v3

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example` 파일을 참고하여 `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/healthweb
```

### 3. 데이터베이스 설정

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate dev
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
healthWeb/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API Routes
│   │   └── [pages]/      # 페이지
│   ├── components/       # React 컴포넌트
│   └── lib/              # 유틸리티 및 서비스
├── prisma/               # Prisma 스키마
└── public/               # 정적 파일
```

## YouTube API 키 발급

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "라이브러리"에서 "YouTube Data API v3" 활성화
4. "사용자 인증 정보"에서 API 키 생성
5. 생성된 키를 `.env.local` 파일의 `YOUTUBE_API_KEY`에 설정

## 배포

이 프로젝트를 클라우드 플랫폼에 배포하는 방법은 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)를 참고하세요.

### 빠른 배포 (Railway 추천)

1. [Railway](https://railway.app/)에 GitHub 계정으로 로그인
2. "New Project" → "Deploy from GitHub repo" 선택
3. 저장소 선택 후 자동 배포
4. PostgreSQL 데이터베이스 추가
5. 환경 변수 설정:
   - `YOUTUBE_API_KEY`
   - `DATABASE_URL` (Railway가 자동 생성)
   - `NODE_ENV=production`

자세한 배포 가이드는 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)를 확인하세요.

## 라이선스

이 프로젝트는 공모전 참가용으로 개발되었습니다.

