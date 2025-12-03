# YouTube API 키 보안 가이드 (클라우드 배포용)

## 현재 구조 분석

✅ **현재 구조는 안전합니다!**

현재 프로젝트는 다음과 같이 구성되어 있어 보안에 안전합니다:
- API 키는 **서버 사이드**에서만 사용 (`process.env.YOUTUBE_API_KEY`)
- 클라이언트는 직접 YouTube API를 호출하지 않음
- Next.js API Routes를 통한 프록시 구조
- 환경 변수를 통한 키 관리

## 클라우드 배포 시 보안 조치

### 1. 환경 변수 관리 (가장 중요!)

#### ✅ 올바른 방법 (현재 구조 유지)

```env
# .env.local (로컬 개발용 - Git에 커밋하지 않음)
YOUTUBE_API_KEY=your_api_key_here
```

#### 클라우드 배포 플랫폼별 설정

**Vercel:**
1. 프로젝트 설정 > Environment Variables
2. `YOUTUBE_API_KEY` 추가
3. Production, Preview, Development 환경별로 설정

**Netlify:**
1. Site settings > Environment variables
2. `YOUTUBE_API_KEY` 추가

**AWS/Azure/GCP:**
- 각 플랫폼의 환경 변수 설정 메뉴에서 추가
- 또는 Secrets Manager 사용 (권장)

### 2. Google Cloud Console에서 API 키 제한 설정 (필수!)

#### API 키 제한 사항 설정

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. **API 및 서비스** > **사용자 인증 정보** 선택
3. 생성한 API 키 클릭 (연필 아이콘)

#### 설정 항목

**A. API 제한사항 (권장: 필수)**
```
✅ API 키 제한 선택
   → YouTube Data API v3만 선택
```

**B. 애플리케이션 제한사항**
- **HTTP 리퍼러(웹사이트) 제한사항** (권장)
  ```
  예시:
  https://yourdomain.com/*
  https://*.yourdomain.com/*
  ```

- 또는 **IP 주소 제한사항**
  ```
  클라우드 서버의 고정 IP 주소 입력
  (Vercel, Netlify는 동적 IP이므로 리퍼러 제한 권장)
  ```

**C. 할당량 제한 설정**
- 일일 할당량 설정 (예: 10,000 단위)
- 초과 시 알림 설정

### 3. 코드 레벨 보안 강화

#### A. API 라우트에 Rate Limiting 추가

```typescript
// src/app/api/youtube/search/route.ts 수정 예시
import { NextRequest, NextResponse } from 'next/server';
import { youtubeService } from '@/lib/youtube';

// 간단한 Rate Limiting (IP 기반)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // 10 requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = requestCounts.get(ip);
  
  if (!userLimit || now > userLimit.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export async function GET(request: NextRequest) {
  // IP 주소 가져오기
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Rate Limiting 체크
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  // 기존 코드...
}
```

#### B. 캐싱을 통한 API 호출 최소화

```typescript
// src/lib/youtube.ts 수정 예시
import { google } from 'googleapis';

// 간단한 인메모리 캐시
const cache = new Map<string, { data: any; expiresAt: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1시간

class YouTubeService {
  // ... 기존 코드 ...
  
  private getCacheKey(query: string, maxResults: number): string {
    return `${query}:${maxResults}`;
  }
  
  async searchStretchingShorts(
    query: string,
    maxResults: number = 10
  ): Promise<YouTubeVideo[]> {
    const cacheKey = this.getCacheKey(query, maxResults);
    const cached = cache.get(cacheKey);
    
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }
    
    try {
      // 기존 API 호출 코드...
      const videos = /* API 호출 결과 */;
      
      // 캐시에 저장
      cache.set(cacheKey, {
        data: videos,
        expiresAt: Date.now() + CACHE_TTL
      });
      
      return videos;
    } catch (error) {
      // 캐시된 데이터가 있으면 반환
      if (cached) {
        return cached.data;
      }
      throw error;
    }
  }
}
```

### 4. 모니터링 및 알림 설정

#### Google Cloud Console에서 모니터링

1. **API 및 서비스** > **할당량** 메뉴
2. 일일 사용량 모니터링
3. 할당량 초과 알림 설정

#### 비정상 사용 감지

- 갑작스러운 사용량 증가 모니터링
- 특정 IP에서의 과도한 요청 감지
- API 키가 노출되었을 때 즉시 감지

### 5. API 키 노출 시 대응 방법

만약 API 키가 노출되었다면:

1. **즉시 조치:**
   - Google Cloud Console에서 해당 API 키 삭제 또는 비활성화
   - 새로운 API 키 생성

2. **환경 변수 재설정:**
   - 모든 배포 환경의 환경 변수 업데이트
   - 서비스 재배포

3. **이전 키 사용 내역 확인:**
   - Google Cloud Console에서 사용 로그 확인
   - 비정상적인 사용 패턴 확인

### 6. 추가 보안 권장사항

#### A. API 키 별도 관리

- 프로덕션용 API 키와 개발용 API 키 분리
- 각각 다른 제한 사항 설정

#### B. 백업 데이터 소스

- YouTube API가 실패할 경우를 대비
- 자체 데이터베이스에 인기 영상 캐싱
- API 실패 시 캐시된 데이터 반환

#### C. 에러 처리 강화

```typescript
// src/app/api/youtube/search/route.ts
export async function GET(request: NextRequest) {
  try {
    // ... 기존 코드 ...
  } catch (error: any) {
    console.error('API Error:', error);
    
    // API 키 관련 오류는 상세 정보 노출하지 않음
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
```

## 배포 체크리스트

배포 전 확인 사항:

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] GitHub/GitLab에 API 키가 커밋되지 않았는지 확인
- [ ] 클라우드 플랫폼의 환경 변수 설정 완료
- [ ] Google Cloud Console에서 API 키 제한 설정 완료
- [ ] 할당량 제한 설정 완료
- [ ] 모니터링 및 알림 설정 완료
- [ ] Rate Limiting 구현 (선택사항)
- [ ] 캐싱 구현 (선택사항)

## 비용 관리

### YouTube API 할당량

- **무료 할당량**: 일일 10,000 단위
- **비용**: 초과 시 1,000 단위당 $0.01

### 할당량 계산

```
search.list: 100 units
videos.list: 1 unit per video
```

현재 코드는 각 검색마다 약 100-200 단위를 사용하므로:
- 일일 약 50-100회 검색 가능 (무료 할당량 기준)

### 비용 절감 방법

1. **캐싱 강화** - 동일한 검색 결과 재사용
2. **검색 최적화** - 불필요한 API 호출 최소화
3. **할당량 모니터링** - 사용량 추적

## 요약

### ✅ 이미 잘 되어 있는 것

1. API 키가 서버 사이드에서만 사용됨
2. 환경 변수를 통한 키 관리
3. API Routes를 통한 프록시 구조

### 🔒 추가로 해야 할 것

1. **Google Cloud Console에서 API 키 제한 설정** (최우선)
2. **클라우드 배포 시 환경 변수 설정**
3. **할당량 모니터링 설정**
4. **(선택) Rate Limiting 구현**
5. **(선택) 캐싱 구현**

### ⚠️ 주의사항

- API 키는 절대 클라이언트 코드에 노출하지 않기
- GitHub 등에 커밋하지 않기
- 정기적으로 사용량 모니터링
- 비정상 패턴 즉시 감지

## 결론

현재 구조는 이미 보안에 안전하게 설계되어 있습니다. 클라우드 배포 시에는:

1. **Google Cloud Console에서 API 키 제한 설정** (가장 중요!)
2. **클라우드 플랫폼의 환경 변수에 API 키 설정**
3. **할당량 모니터링 설정**

이 세 가지만 제대로 하면 안전하게 서비스를 운영할 수 있습니다.


