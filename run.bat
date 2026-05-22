@echo off
echo ==========================================
echo   🛡️  CYBERSHIELD AI RUNNER
echo   Developed by issu321
echo ==========================================
echo.

if not exist "venv\Scripts\python.exe" (
    echo ❌ Virtual environment not found.
    echo    Please run install.bat first to set up the project.
    pause
    exit /b 1
)

echo [LAUNCH] Starting CyberShield AI...
echo.

venv\Scripts\python.exe -m streamlit run app.py

pause
