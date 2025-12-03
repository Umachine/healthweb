# GitHub 푸시 가이드

## Git 설치 확인

현재 시스템에 Git이 설치되어 있지 않거나 PATH에 없는 것 같습니다.

## Git 설치 방법

### 1. Git 설치
1. [Git 공식 웹사이트](https://git-scm.com/download/win)에서 Windows용 Git 다운로드
2. 설치 프로그램 실행 및 기본 설정으로 설치
3. 설치 완료 후 **새 터미널/명령 프롬프트를 열어야** PATH가 적용됩니다

### 2. GitHub 저장소 생성
1. [GitHub](https://github.com)에 로그인
2. 우측 상단 "+" 버튼 → "New repository" 클릭
3. 저장소 이름 입력 (예: `healthWeb`)
4. "Public" 또는 "Private" 선택
5. **"Initialize this repository with a README" 체크 해제** (이미 README가 있으므로)
6. "Create repository" 클릭
7. 생성된 저장소의 URL 복사 (예: `https://github.com/사용자명/healthWeb.git`)

## 푸시 명령어

Git 설치 후 다음 명령어를 순서대로 실행하세요:

### 방법 1: .gitignore를 활용한 자동 제외 (추천)

`.gitignore` 파일이 이미 설정되어 있으므로, `git add .`를 사용해도 자동으로 제외됩니다:

```bash
# 1. Git 초기화
git init

# 2. .gitignore에 따라 파일 추가 (node_modules, .env 등 자동 제외)
git add .

# 3. 첫 커밋
git commit -m "Initial commit: Health Web project with security improvements"

# 4. 메인 브랜치로 이름 변경
git branch -M main

# 5. 원격 저장소 추가 (여기에 본인의 GitHub 저장소 URL 입력)
git remote add origin https://github.com/사용자명/healthWeb.git

# 6. 푸시
git push -u origin main
```

### 방법 2: 명시적으로 파일 추가 (더 안전)

특정 파일/폴더만 명시적으로 추가하려면:

```bash
# 1. Git 초기화
git init

# 2. 프로젝트 파일만 선택적으로 추가
git add package.json package-lock.json
git add tsconfig.json next.config.js tailwind.config.js postcss.config.js
git add railway.json
git add .gitignore
git add README.md DEPLOYMENT_GUIDE.md
git add prisma/schema.prisma
git add src/
git add public/

# 3. 추가된 파일 확인
git status

# 4. 첫 커밋
git commit -m "Initial commit: Health Web project with security improvements"

# 5. 메인 브랜치로 이름 변경
git branch -M main

# 6. 원격 저장소 추가
git remote add origin https://github.com/사용자명/healthWeb.git

# 7. 푸시
git push -u origin main
```

### 커밋 전 확인

커밋하기 전에 어떤 파일이 추가될지 확인하려면:

```bash
# 추가될 파일 미리보기
git status

# 또는 더 자세히 보기
git add -n .  # dry-run 모드 (실제로 추가하지 않고 확인만)
```

## 주의사항

- `.env` 파일은 `.gitignore`에 포함되어 있어 자동으로 제외됩니다
- `node_modules`도 자동으로 제외됩니다
- GitHub 저장소 URL은 본인의 실제 저장소 URL로 변경해야 합니다

