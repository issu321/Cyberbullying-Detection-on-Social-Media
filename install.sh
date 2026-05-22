#!/bin/bash
set -e

echo "=========================================="
echo "  🛡️  CYBERSHIELD AI INSTALLER"
echo "  Developed by issu321"
echo "=========================================="
echo "Python version: 3.11+ required"
echo "Python Venv is REQUIRED"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ==========================================
#  VENV USER CONFIRMATION
# ==========================================

echo -e "${YELLOW}[IMPORTANT]${NC} Kali Linux users must create and activate a Python virtual environment before continuing."
echo ""
read -p "Enter y if venv is already CREATED & ACTIVATED, or n to exit: " CONFIRM

# If user enters n -> exit immediately
if [[ "$CONFIRM" == "n" || "$CONFIRM" == "N" ]]; then
    echo ""
    echo -e "${RED}[EXIT]${NC} Please create and activate a Python virtual environment first."
    echo ""
    echo "Run the following commands manually:"
    echo "------------------------------------------"
    echo "python3 -m venv venv"
    echo "source venv/bin/activate"
    echo "bash install.sh"
    echo "------------------------------------------"
    echo ""
    exit 1
fi

# If user enters y -> continue execution
if [[ "$CONFIRM" == "y" || "$CONFIRM" == "Y" ]]; then
    echo ""
    echo -e "${GREEN}[OK]${NC} Continuing installation..."
else
    echo ""
    echo -e "${RED}[ERROR]${NC} Invalid input."
    echo "Create Python Virtual Environment first."
    echo "Please run the installer again and enter y or n only."
    exit 1
fi

# ==========================================
#  VERIFY ACTIVE VENV
# ==========================================

if [[ -z "$VIRTUAL_ENV" ]]; then
    echo ""
    echo -e "${RED}[ERROR]${NC} No ACTIVE virtual environment detected."
    echo ""
    echo "Activate your venv first using:"
    echo "source venv/bin/activate"
    echo ""
    exit 1
fi

echo -e "${GREEN}[OK]${NC} Active virtual environment detected"

PYTHON_VERSION=$(python3 -c 'import sys; print(sys.version_info.major, sys.version_info.minor)' | tr ' ' '.')
echo -e "${GREEN}[OK]${NC} Python $PYTHON_VERSION found"

echo -e "${BLUE}[INSTALL]${NC} Upgrading pip..."
pip install --upgrade pip -q

echo -e "${BLUE}[INSTALL]${NC} Installing dependencies..."
pip install -r requirements.txt -q

echo -e "${BLUE}[DOWNLOAD]${NC} Downloading NLTK data..."
python3 -c "import nltk; nltk.download('vader_lexicon', quiet=True); nltk.download('stopwords', quiet=True); nltk.download('punkt', quiet=True)"

echo ""
echo "=========================================="
echo -e "${GREEN}✅ INSTALLATION COMPLETE${NC}"
echo "=========================================="
echo ""

echo -e "${BLUE}[LAUNCH]${NC} Starting CyberShield AI..."
echo ""

python3 -m streamlit run app.py