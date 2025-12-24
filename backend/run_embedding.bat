@echo off
echo ========================================
echo RAG Backend - Embedding Setup Script
echo ========================================
echo.

echo [1/4] Checking Qdrant connection...
curl -s http://localhost:6333/collections >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Qdrant is not running!
    echo.
    echo Please start Qdrant first:
    echo   docker run -d -p 6333:6333 qdrant/qdrant
    echo.
    echo Or if you have Qdrant installed locally, start it:
    echo   qdrant
    echo.
    pause
    exit /b 1
)
echo [OK] Qdrant is running at http://localhost:6333
echo.

echo [2/4] Checking environment variables...
if not exist "..\\.env" (
    echo [ERROR] .env file not found!
    pause
    exit /b 1
)
echo [OK] .env file found
echo.

echo [3/4] Installing dependencies...
call uv sync
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

echo [4/4] Starting embedding process...
echo This will embed all documentation from ai-book/build/
echo This may take several minutes depending on the amount of content.
echo.
pause

echo.
echo Running embedding...
uv run python main.py

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo [SUCCESS] Embedding completed!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Test retrieval: uv run python retrieving.py
    echo 2. Start API server: uv run python api.py
    echo.
) else (
    echo.
    echo ========================================
    echo [ERROR] Embedding failed!
    echo ========================================
    echo Please check the error messages above.
    echo.
)

pause
