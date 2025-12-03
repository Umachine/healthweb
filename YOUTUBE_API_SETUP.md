# YouTube API 키 발급 및 설정 가이드

이 문서는 YouTube Data API v3 키를 발급받고 프로젝트에 설정하는 방법을 안내합니다.

## 1. Google Cloud Console 접속

1. 브라우저에서 [Google Cloud Console](https://console.cloud.google.com/) 접속
2. Google 계정으로 로그인

## 2. 프로젝트 생성 또는 선택

1. 상단의 프로젝트 선택 드롭다운 클릭
2. **"새 프로젝트"** 클릭 또는 기존 프로젝트 선택
3. 프로젝트 이름 입력 (예: "health-web")
4. **"만들기"** 클릭

## 3. YouTube Data API v3 활성화

1. 좌측 메뉴에서 **"API 및 서비스"** > **"라이브러리"** 선택
2. 검색창에 **"YouTube Data API v3"** 입력
3. **"YouTube Data API v3"** 클릭
4. **"사용 설정"** 버튼 클릭

## 4. API 키 생성

1. 좌측 메뉴에서 **"API 및 서비스"** > **"사용자 인증 정보"** 선택
2. 상단의 **"+ 사용자 인증 정보 만들기"** 클릭
3. **"API 키"** 선택
4. 생성된 API 키가 표시됩니다
5. (선택) API 키 제한 설정 (권장)
   - 생성된 API 키 옆의 **연필 아이콘(수정)** 클릭
   - **"API 제한사항"** 섹션에서 **"API 키 제한"** 선택
   - **"YouTube Data API v3"**만 선택
   - **"HTTP 리퍼러(웹사이트)" 제한사항**에서 필요한 도메인 추가 (선택사항)
   - **"저장"** 클릭

## 5. 프로젝트에 API 키 설정

### 방법 1: .env.local 파일 생성 (권장)

1. 프로젝트 루트 디렉토리(`C:\healthWeb`)에 `.env.local` 파일 생성
2. 다음 내용을 입력:

```env
YOUTUBE_API_KEY=여기에_발급받은_API_키_입력
```

예시:
```env
YOUTUBE_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
```

### 방법 2: 환경 변수로 설정

Windows 명령 프롬프트:
```cmd
set YOUTUBE_API_KEY=여기에_발급받은_API_키_입력
```

PowerShell:
```powershell
$env:YOUTUBE_API_KEY="여기에_발급받은_API_키_입력"
```

## 6. 확인 사항

- ✅ `.env.local` 파일이 프로젝트 루트에 생성되었는지 확인
- ✅ API 키가 올바르게 입력되었는지 확인 (공백이나 따옴표 없이)
- ✅ 서버 재시작 (`.env.local` 파일을 수정한 경우 반드시 필요)

## 7. 테스트

서버를 실행하여 YouTube API가 정상 작동하는지 확인:

```bash
npm run dev
```

스트레칭 추천 페이지에서 영상이 정상적으로 로드되는지 확인하세요.

## 문제 해결

### API 키 오류가 발생하는 경우

1. **API 키가 올바르게 설정되었는지 확인**
   - `.env.local` 파일에 `YOUTUBE_API_KEY=` 뒤에 키가 올바르게 입력되었는지 확인
   - 공백이나 따옴표가 포함되지 않았는지 확인

2. **YouTube Data API v3가 활성화되었는지 확인**
   - Google Cloud Console에서 API가 활성화되어 있는지 확인

3. **API 할당량 확인**
   - Google Cloud Console에서 할당량이 초과되지 않았는지 확인
   - 무료 할당량: 일일 10,000 단위

4. **서버 재시작**
   - `.env.local` 파일을 수정한 경우 반드시 개발 서버를 재시작해야 합니다

## 참고 자료

- [Google Cloud Console](https://console.cloud.google.com/)
- [YouTube Data API v3 문서](https://developers.google.com/youtube/v3)
- [API 할당량 및 한도](https://developers.google.com/youtube/v3/determine_quota_cost)

