# Store Intelligence System - Setup Script (Windows PowerShell)

Write-Host "========================================"
Write-Host " Store Intelligence System Setup"
Write-Host "========================================"

# Copy environment files
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "[OK] Created .env from .env.example"
}

# Backend setup
Write-Host ""
Write-Host "--- Backend Setup ---"
Set-Location backend
if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env" }
npm install
Write-Host "[OK] Backend dependencies installed"
Set-Location ..

# Frontend setup
Write-Host ""
Write-Host "--- Frontend Setup ---"
Set-Location frontend
if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env" }
npm install
Write-Host "[OK] Frontend dependencies installed"
Set-Location ..

# AI Service setup
Write-Host ""
Write-Host "--- AI Service Setup ---"
Set-Location ai-service
if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env" }
if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    deactivate
    Write-Host "[OK] AI Service dependencies installed"
} else {
    Write-Host "[!] Python not found. Install Python 3.11+ manually."
}
Set-Location ..

Write-Host ""
Write-Host "========================================"
Write-Host " Setup Complete!"
Write-Host "========================================"
Write-Host ""
Write-Host "Start services:"
Write-Host "  docker-compose up -d          # All services via Docker"
Write-Host "  cd backend; npm run dev       # Backend only"
Write-Host "  cd frontend; npm run dev      # Frontend only"
Write-Host ""
