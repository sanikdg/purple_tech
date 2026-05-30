#!/bin/bash
# Store Intelligence System - Setup Script (Linux/macOS)
set -e

echo "========================================"
echo " Store Intelligence System Setup"
echo "========================================"

# Copy environment files
if [ ! -f .env ]; then
  cp .env.example .env
  echo "[✓] Created .env from .env.example"
fi

# Backend setup
echo ""
echo "--- Backend Setup ---"
cd backend
if [ ! -f .env ]; then cp .env.example .env; fi
npm install
echo "[✓] Backend dependencies installed"
cd ..

# Frontend setup
echo ""
echo "--- Frontend Setup ---"
cd frontend
if [ ! -f .env ]; then cp .env.example .env; fi
npm install
echo "[✓] Frontend dependencies installed"
cd ..

# AI Service setup
echo ""
echo "--- AI Service Setup ---"
cd ai-service
if [ ! -f .env ]; then cp .env.example .env; fi
if command -v python3 &> /dev/null; then
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  deactivate
  echo "[✓] AI Service dependencies installed"
else
  echo "[!] Python3 not found. Install Python 3.11+ manually."
fi
cd ..

echo ""
echo "========================================"
echo " Setup Complete!"
echo "========================================"
echo ""
echo "Start services:"
echo "  docker-compose up -d          # All services via Docker"
echo "  cd backend && npm run dev     # Backend only"
echo "  cd frontend && npm run dev    # Frontend only"
echo ""
