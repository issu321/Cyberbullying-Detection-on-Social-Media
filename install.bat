@echo off
echo ==========================================
echo   🛡️  CYBERSHIELD AI INSTALLER
echo   Developed by issu321
echo ==========================================
echo.

echo [CHECK] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.11+
    pause
    exit /b 1
)

echo [SETUP] Creating virtual environment...
python -m venv venv

echo [SETUP] Activating virtual environment...
call venv\Scriptsctivate.bat

echo [INSTALL] Upgrading pip...
venv\Scripts\python.exe -m pip install --upgrade pip -q

echo [INSTALL] Installing dependencies...
venv\Scripts\python.exe -m pip install -r requirements.txt -q

echo [DOWNLOAD] Downloading NLTK data...
venv\Scripts\python.exe -c "import nltk; nltk.download('vader_lexicon', quiet=True); nltk.download('stopwords', quiet=True); nltk.download('punkt', quiet=True); nltk.download('punkt_tab', quiet=True)"

echo.
echo ==========================================
echo   ✅ INSTALLATION COMPLETE
echo ==========================================
echo.
echo [LAUNCH] Starting CyberShield AI...
echo.

venv\Scripts\python.exe -m streamlit run app.py

pause
