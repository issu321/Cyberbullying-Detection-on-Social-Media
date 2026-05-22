#!/bin/bash
set -e

echo "=========================================="
echo "  🛡️  CYBERSHIELD AI INSTALLER"
echo "  Developed by issu321"
echo "=========================================="
echo "Python version: 3.11+ required"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ==========================================
#  VENV CONFIRMATION
# ==========================================

echo -e "${YELLOW}[IMPORTANT NOTICE]${NC}"
echo ""
echo "Python Virtual Environment (venv) is REQUIRED."
echo ""
echo "Before continuing:"
echo "• Create a Python venv"
echo "• Activate the venv"
echo ""
echo "Type ${GREEN}yes${NC}  -> (if you have created and activated the venv) Continue installation"
echo "Type ${RED}exit${NC} -> (if you have not created or activated the venv) Stop installer and create/activate venv first"
echo ""

read -p "Enter choice (yes/exit): " USER_INPUT

# Exit installer safely
if [ "$USER_INPUT" = "exit" ]; then
    echo ""
    echo -e "${RED}[EXIT]${NC} Installer terminated by user."
    echo ""
    echo "Create and activate venv first:"
    echo "------------------------------------------"
    echo "python3 -m venv venv"
    echo "source venv/bin/activate"
    echo "bash install.sh"
    echo "------------------------------------------"
    echo ""
    exit 1
fi

# Continue only if user typed yes
if [ "$USER_INPUT" != "yes" ]; then
    echo ""
    echo -e "${RED}[ERROR]${NC} Invalid input."
    echo "Run installer again and type only: yes or exit"
    echo ""
    exit 1
fi

echo ""
echo -e "${GREEN}[OK]${NC} Continuing installation..."
echo ""

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
