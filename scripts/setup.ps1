
# Windows PowerShell versions

# setup.ps1
Write-Host "🚀 Setting up Full Stack Application..." -ForegroundColor Green

# Create directory structure
Write-Host "📁 Creating project structure..." -ForegroundColor Blue
New-Item -ItemType Directory -Force -Path "fullstack-app\backend\app\api\v1"
New-Item -ItemType Directory -Force -Path "fullstack-app\backend\app\core"
New-Item -ItemType Directory -Force -Path "fullstack-app\backend\app\models"
New-Item -ItemType Directory -Force -Path "fullstack-app\backend\app\schemas"
New-Item -ItemType Directory -Force -Path "fullstack-app\backend\app\services"
New-Item -ItemType Directory -Force -Path "fullstack-app\backend\tests"
New-Item -ItemType Directory -Force -Path "fullstack-app\frontend\src\components"
New-Item -ItemType Directory -Force -Path "fullstack-app\frontend\src\services"
New-Item -ItemType Directory -Force -Path "fullstack-app\frontend\public"

# Create __init__.py files
Write-Host "🐍 Creating backend files..." -ForegroundColor Blue
Set-Location "fullstack-app\backend"
New-Item -ItemType File -Name "__init__.py" -Path "app\"
New-Item -ItemType File -Name "__init__.py" -Path "app\core\"
New-Item -ItemType File -Name "__init__.py" -Path "app\models\"
New-Item -ItemType File -Name "__init__.py" -Path "app\schemas\"
New-Item -ItemType File -Name "__init__.py" -Path "app\services\"
New-Item -ItemType File -Name "__init__.py" -Path "app\api\"
New-Item -ItemType File -Name "__init__.py" -Path "app\api\v1\"
New-Item -ItemType File -Name "__init__.py" -Path "tests\"
Set-Location "..\..\"

Write-Host "✅ Project structure created!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Copy the code from each artifact into the respective files"
Write-Host "2. Navigate to the project directory: cd fullstack-app"
Write-Host "3. Copy environment variables: Copy-Item .env.example .env"
Write-Host "4. Start with Docker: docker-compose up --build"

# run.ps1
Write-Host "🚀 Starting Full Stack Application..." -ForegroundColor Green

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker is not running. Please start Docker first." -ForegroundColor Red
    exit 1
}

# Check if .env exists
if (!(Test-Path .env)) {
    Write-Host "📝 Creating .env from .env.example..." -ForegroundColor Blue
    Copy-Item .env.example .env
    Write-Host "✅ Please review and update .env file if needed." -ForegroundColor Green
}

# Build and start services
Write-Host "🏗️ Building and starting services..." -ForegroundColor Blue
docker-compose up --build -d

Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "✅ Services started!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access URLs:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000"
Write-Host "- Backend: http://localhost:8000"
Write-Host "- API Docs: http://localhost:8000/api/v1/docs"