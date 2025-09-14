
# run.sh - Quick run script
#!/bin/bash

echo "🚀 Starting Full Stack Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ Please review and update .env file if needed."
fi

# Build and start services
echo "🏗️ Building and starting services..."
docker-compose up --build -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo ""
    echo "🌐 Access URLs:"
    echo "- Frontend: http://localhost:3000"
    echo "- Backend: http://localhost:8000"
    echo "- API Docs: http://localhost:8000/api/v1/docs"
    echo ""
    echo "📊 View logs: docker-compose logs -f"
    echo "🛑 Stop services: docker-compose down"
else
    echo "❌ Some services failed to start. Check logs:"
    docker-compose logs
fi