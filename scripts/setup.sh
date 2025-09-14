# setup.sh - Setup script for WSL/Linux
#!/bin/bash

echo "🚀 Setting up Full Stack Application..."

# Create directory structure
echo "📁 Creating project structure..."
mkdir -p fullstack-app/{backend/{app/{api/v1,core,models,schemas,services},tests},frontend/{src/{components,services},public}}

# Create backend files
echo "🐍 Creating backend files..."
cd fullstack-app/backend

# Create __init__.py files
touch app/__init__.py
touch app/core/__init__.py
touch app/models/__init__.py
touch app/schemas/__init__.py
touch app/services/__init__.py
touch app/api/__init__.py
touch app/api/v1/__init__.py
touch tests/__init__.py

cd ../..

# Create frontend files
echo "⚛️ Creating frontend files..."
# Files are created through artifacts above

echo "✅ Project structure created!"
echo ""
echo "Next steps:"
echo "1. Copy the code from each artifact into the respective files"
echo "2. Navigate to the project directory: cd fullstack-app"
echo "3. Copy environment variables: cp .env.example .env"
echo "4. Start with Docker: docker-compose up --build"
echo ""
echo "🌐 Access URLs:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:8000"
echo "- API Docs: http://localhost:8000/api/v1/docs"
