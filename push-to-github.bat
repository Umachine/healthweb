@echo off
echo ========================================
echo GitHub 푸시 스크립트
echo ========================================
echo.

REM Git 설치 확인
git --version >nul 2>&1
if errorlevel 1 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo.
    echo Git 설치 방법:
    echo 1. https://git-scm.com/download/win 에서 다운로드
    echo 2. 설치 후 새 명령 프롬프트를 열어주세요
    echo.
    pause
    exit /b 1
)

echo [1/6] Git 초기화 확인...
if not exist .git (
    git init
    echo Git 저장소가 초기화되었습니다.
) else (
    echo Git 저장소가 이미 초기화되어 있습니다.
)
echo.

echo [2/6] 파일 추가 중...
echo .gitignore에 따라 자동으로 제외됩니다 (node_modules, .env 등)
git add .
echo.
echo 추가된 파일 확인:
git status --short
echo.
pause
echo.

echo [3/6] 커밋 생성 중...
git commit -m "Initial commit: Health Web project with security improvements"
if errorlevel 1 (
    echo 이미 커밋된 변경사항이 없거나 커밋에 실패했습니다.
) else (
    echo 커밋이 완료되었습니다.
)
echo.

echo [4/6] 브랜치 확인...
git branch -M main
echo.

echo [5/6] 원격 저장소 확인...
git remote -v >nul 2>&1
if errorlevel 1 (
    echo.
    echo 원격 저장소가 설정되어 있지 않습니다.
    echo.
    set /p REPO_URL="GitHub 저장소 URL을 입력하세요 (예: https://github.com/사용자명/healthWeb.git): "
    if "!REPO_URL!"=="" (
        echo 저장소 URL이 입력되지 않았습니다.
        pause
        exit /b 1
    )
    git remote add origin !REPO_URL!
    echo 원격 저장소가 추가되었습니다.
) else (
    echo 원격 저장소가 이미 설정되어 있습니다.
    git remote -v
)
echo.

echo [6/6] GitHub에 푸시 중...
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo [오류] 푸시에 실패했습니다.
    echo.
    echo 가능한 원인:
    echo 1. GitHub 인증이 필요할 수 있습니다 (Personal Access Token 필요)
    echo 2. 저장소 URL이 잘못되었을 수 있습니다
    echo 3. 네트워크 연결을 확인해주세요
    echo.
    echo GitHub 인증 방법:
    echo - GitHub Settings ^> Developer settings ^> Personal access tokens
    echo - 토큰 생성 후 비밀번호 대신 사용
    echo.
) else (
    echo.
    echo ========================================
    echo 푸시가 완료되었습니다!
    echo ========================================
    echo.
)

pause

