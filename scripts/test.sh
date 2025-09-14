
# test.sh - Run all tests
#!/bin/bash

echo "🧪 Running all tests..."

echo "🐍 Running backend tests..."
docker-compose exec -T backend pytest tests/ -v

echo "⚛️ Running frontend tests..."
docker-compose exec -T frontend npm test -- --watchAll=false --coverage

echo "✅ Tests completed!"
