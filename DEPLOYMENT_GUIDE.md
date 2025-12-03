# 배포 가이드 - 무료 플랫폼 선택 및 배포 방법

## 추천 플랫폼 비교

### 1. Vercel + Supabase/Neon (추천 ⭐)
**장점:**
- Next.js 공식 배포 플랫폼 (최적화됨)
- 자동 배포 및 CDN 제공
- Supabase/Neon: PostgreSQL 무료 티어 제공 (500MB 저장공간)
- GitHub 연동으로 자동 배포

**단점:**
- 데이터베이스는 별도 서비스 필요

**무료 한도:**
- Vercel: 월 100GB 대역폭, 무제한 요청
- Supabase: 500MB DB, 2GB 대역폭
- Neon: 0.5GB DB (무료)

---

### 2. Railway (추천 ⭐⭐)
**장점:**
- 앱과 데이터베이스를 한 플랫폼에서 관리
- PostgreSQL 무료 티어 포함
- 간단한 설정
- 자동 배포

**단점:**
- 무료 크레딧 제한 (월 $5 크레딧)

**무료 한도:**
- 월 $5 크레딧 (소규모 프로젝트에 충분)

---

### 3. Render
**장점:**
- 무료 티어 제공
- PostgreSQL 포함
- 자동 배포

**단점:**
- 무료 티어는 15분 비활성 시 슬리프 모드 (첫 요청 시 느림)
- 빌드 시간 제한

**무료 한도:**
- 웹 서비스: 무료 (슬리프 모드)
- PostgreSQL: 90일 무료, 이후 유료

---

## 배포 방법 (Railway 추천)

Railway는 설정이 간단하고 앱과 DB를 한 곳에서 관리할 수 있어 추천합니다.

### 단계 1: GitHub에 코드 푸시

1. GitHub에 새 저장소 생성
2. 로컬에서 다음 명령어 실행:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/사용자명/healthWeb.git
git push -u origin main
```

### 단계 2: Railway 계정 생성 및 프로젝트 생성

1. [Railway](https://railway.app/) 접속
2. "Start a New Project" 클릭
3. GitHub 계정으로 로그인
4. "Deploy from GitHub repo" 선택
5. 방금 푸시한 저장소 선택

### 단계 3: PostgreSQL 데이터베이스 추가

1. Railway 대시보드에서 프로젝트 선택
2. "+ New" 버튼 클릭
3. "Database" → "Add PostgreSQL" 선택
4. 데이터베이스가 생성되면 "Variables" 탭에서 `DATABASE_URL` 확인

### 단계 4: 환경 변수 설정

1. 프로젝트의 "Variables" 탭 클릭
2. 다음 환경 변수 추가:

```
YOUTUBE_API_KEY=your_youtube_api_key_here
DATABASE_URL=postgresql://... (Railway가 자동으로 생성한 값)
NODE_ENV=production
```

### 단계 5: 빌드 설정

1. 프로젝트의 "Settings" 탭 클릭
2. "Build Command" 설정:
   ```
   npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```
3. "Start Command" 설정:
   ```
   npm start
   ```

### 단계 6: 배포 및 마이그레이션

1. Railway가 자동으로 배포 시작
2. 배포 완료 후 "Deployments" 탭에서 로그 확인
3. 배포가 완료되면 자동으로 도메인 생성됨 (예: `healthweb-production.up.railway.app`)

### 단계 7: 커스텀 도메인 설정 (선택사항)

1. "Settings" → "Domains" 탭
2. "Generate Domain" 클릭 또는 커스텀 도메인 추가

---

## 배포 방법 (Vercel + Supabase)

### Vercel 배포

1. [Vercel](https://vercel.com/) 접속 및 GitHub 로그인
2. "Add New Project" 클릭
3. 저장소 선택
4. 환경 변수 추가:
   - `YOUTUBE_API_KEY`
   - `DATABASE_URL` (Supabase에서 가져올 예정)
   - `NODE_ENV=production`
5. "Deploy" 클릭

### Supabase 데이터베이스 설정

1. [Supabase](https://supabase.com/) 접속 및 계정 생성
2. "New Project" 생성
3. 프로젝트 설정:
   - 이름: healthweb
   - 데이터베이스 비밀번호 설정
   - 리전 선택 (가장 가까운 지역)
4. 프로젝트 생성 후 "Settings" → "Database" → "Connection string"에서 `DATABASE_URL` 복사
5. Vercel 환경 변수에 `DATABASE_URL` 추가
6. Supabase SQL Editor에서 Prisma 마이그레이션 실행:

```sql
-- Prisma 마이그레이션 파일의 SQL을 여기에 실행
```

또는 로컬에서:

```bash
npx prisma migrate deploy
```

---

## 배포 전 체크리스트

- [ ] GitHub에 코드 푸시 완료
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] `YOUTUBE_API_KEY` 준비
- [ ] 데이터베이스 마이그레이션 준비
- [ ] 프로덕션 환경 변수 설정
- [ ] 빌드 테스트 (`npm run build`)

---

## 배포 후 확인사항

1. 웹사이트 접속 테스트
2. API 엔드포인트 테스트 (`/api/youtube/search`, `/api/blog/search`)
3. 데이터베이스 연결 확인
4. 에러 로그 확인 (플랫폼 대시보드)

---

## 문제 해결

### 빌드 실패
- 로그 확인: Railway/Vercel 대시보드의 "Deployments" 탭
- 로컬에서 `npm run build` 테스트

### 데이터베이스 연결 실패
- `DATABASE_URL` 환경 변수 확인
- Prisma 마이그레이션 실행 확인
- 데이터베이스가 활성화되어 있는지 확인 (Render의 경우 슬리프 모드일 수 있음)

### API 오류
- `YOUTUBE_API_KEY` 환경 변수 확인
- Rate Limiting 로그 확인

---

## 비용 비교

| 플랫폼 | 무료 한도 | 추천도 |
|--------|----------|--------|
| Railway | 월 $5 크레딧 | ⭐⭐⭐ |
| Vercel + Supabase | 넉넉한 무료 한도 | ⭐⭐⭐ |
| Render | 제한적 (슬리프 모드) | ⭐⭐ |

**소규모 프로젝트라면 Railway가 가장 간단하고 추천합니다!**

