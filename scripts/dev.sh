

# dev.sh - Development mode with hot reload
#!/bin/bash

echo "🔧 Starting development environment..."

# Stop any running containers
docker-compose down

# Start with development overrides
docker-compose -f docker-compose.yml up --build

echo "🔧 Development environment started!"
echo "- Backend: http://localhost:8000 (auto-reload enabled)"
echo "- Frontend: http://localhost:3000 (hot-reload enabled)"
