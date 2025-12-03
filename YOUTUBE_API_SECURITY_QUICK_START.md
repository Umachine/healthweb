# YouTube API 보안 빠른 시작 가이드

## 클라우드 배포 시 필수 설정

### 1단계: Google Cloud Console에서 API 키 제한 설정 (5분)

**가장 중요합니다!** 이것만 제대로 설정하면 90%의 보안 문제를 해결할 수 있습니다.

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. **API 및 서비스** > **사용자 인증 정보** 클릭
3. 생성한 API 키 클릭 (연필 아이콘)
4. 다음 설정:

```
✅ API 제한사항
   → "API 키 제한" 선택
   → "YouTube Data API v3"만 체크

✅ 애플리케이션 제한사항
   → "HTTP 리퍼러(웹사이트) 제한사항" 선택
   → 다음 URL 추가:
     https://yourdomain.com/*
     https://*.yourdomain.com/*
```

5. **저장** 클릭

### 2단계: 클라우드 배포 시 환경 변수 설정 (2분)

#### Vercel의 경우:
1. 프로젝트 설정 > Environment Variables
2. `YOUTUBE_API_KEY` 추가
3. Production, Preview, Development 모두에 추가

#### Netlify의 경우:
1. Site settings > Environment variables
2. `YOUTUBE_API_KEY` 추가

#### 기타 플랫폼:
- 각 플랫폼의 환경 변수 설정 메뉴 사용
- 키 이름: `YOUTUBE_API_KEY`

### 3단계: (선택) Rate Limiting 적용 (10분)

추가 보안이 필요하다면:

1. `src/lib/rateLimit.ts` 파일이 있는지 확인
2. `src/app/api/youtube/search/route.ts` 파일을 `route.enhanced.ts.example`의 내용으로 교체

자세한 내용은 `YOUTUBE_API_SECURITY.md` 참고

## 핵심 포인트

### ✅ 이미 안전한 부분
- API 키는 서버에서만 사용됨
- 클라이언트는 직접 API를 호출하지 않음

### 🔒 반드시 해야 할 것
1. **Google Cloud Console에서 API 키 제한 설정** ← 최우선!
2. 클라우드 플랫폼에 환경 변수 설정

### 💡 선택적으로 할 수 있는 것
- Rate Limiting 추가
- 캐싱 구현
- 모니터링 설정

## 문제 발생 시

### API 키가 노출되었다면:
1. Google Cloud Console에서 즉시 키 삭제
2. 새 키 생성
3. 환경 변수 업데이트

### 할당량 초과:
1. Google Cloud Console에서 사용량 확인
2. 할당량 제한 설정
3. 캐싱으로 호출 횟수 줄이기

## 체크리스트

배포 전 확인:
- [ ] API 키가 GitHub에 커밋되지 않았는지
- [ ] Google Cloud Console에서 API 키 제한 설정
- [ ] 클라우드 플랫폼 환경 변수 설정
- [ ] 할당량 모니터링 설정

## 더 알아보기

상세한 가이드는 `YOUTUBE_API_SECURITY.md` 파일을 참고하세요.


