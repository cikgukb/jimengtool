@echo off
title UKB Seedance Prompt Generator
echo ==========================================
echo    UKB Seedance Prompt Generator
echo ==========================================
echo Memulakan server (proxy + frontend)...
echo.

cd /d "%~dp0"

REM Pastikan dependencies dah ada
if not exist "node_modules" (
    echo [INFO] node_modules tidak dijumpai. Menjalankan npm install...
    call npm install
    echo.
)

echo [INFO] Server akan dibuka di http://localhost:8080
echo [INFO] Tekan CTRL+C untuk matikan server.
echo.

REM Buka browser secara automatik selepas 3 saat
start "" cmd /c "timeout /t 3 >nul & start http://localhost:8080"

REM Start server
node server.js

pause
