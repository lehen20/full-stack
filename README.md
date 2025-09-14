# Full Stack Web Application

A production-grade full-stack web application built with React frontend, FastAPI backend, and PostgreSQL database. This starter template includes CRUD operations, Docker containerization, and comprehensive testing.

## 🏗️ Architecture

- **Frontend**: React 18 with modern hooks and functional components
- **Backend**: FastAPI with SQLAlchemy ORM and Pydantic validation
- **Database**: PostgreSQL 15
- **Containerization**: Docker and Docker Compose
- **Testing**: Jest (frontend) and pytest (backend)

## 🚀 Features

- ✅ Complete CRUD operations for user management
- ✅ RESTful API with automatic OpenAPI documentation
- ✅ Form validation and error handling
- ✅ Responsive design with modern CSS
- ✅ Database migrations with Alembic
- ✅ Unit tests for both frontend and backend
- ✅ Docker containerization for easy deployment
- ✅ Production-ready configuration
- ✅ CORS configuration for cross-origin requests
- ✅ Environment variable configuration

## 📁 Project Structure

```
fullstack-app/
├── backend/
│   ├── app/
│   │   ├── api/v1/           # API routes
│   │   ├── core/             # Core configuration
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   └── main.py           # FastAPI application
│   ├── tests/                # Backend tests
│   ├── Dockerfile            # Backend container
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── App.js            # Main React component
│   │   └── index.js          # React entry point
│   ├── public/               # Static assets
│   ├── Dockerfile            # Frontend container
│   └── package.json          # Node.js dependencies
├── docker-compose.yml        # Multi-container orchestration
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## 🛠️ Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.12+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fullstack-app
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Start the application**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api/v1/docs

### Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up database** (PostgreSQL must be running)
   ```bash
   # Update DATABASE_URL in .env file
   # Run the application - tables will be created automatically
   uvicorn app.main:app --reload
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Run All Tests in Docker

```bash
# Backend tests
docker-compose exec backend pytest tests/ -v

# Frontend tests
docker-compose exec frontend npm test -- --watchAll=false
```

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/api/v1/docs
- ReDoc: http://localhost:8000/api/v1/redoc

### Available Endpoints

- `GET /api/v1/users/` - List all users
- `POST /api/v1/users/` - Create new user
- `GET /api/v1/users/{id}` - Get user by ID
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user

## 🔧 Configuration

### Environment Variables

Key environment variables (see `.env.example`):

- `POSTGRES_USER` - Database username
- `POSTGRES_PASSWORD` - Database password  
- `POSTGRES_DB` - Database name
- `DATABASE_URL` - Full database connection string
- `CORS_ORIGINS` - Allowed CORS origins
- `SECRET_KEY` - JWT secret key
- `REACT_APP_API_URL` - Frontend API URL

### Database Configuration

The application uses PostgreSQL with SQLAlchemy ORM. Database tables are created automatically on startup.

For production, consider using database migrations:

```bash
# Initialize Alembic (if not done)
cd backend
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head
```

## 🚀 Production Deployment

### Using Docker Compose

1. **Update environment variables**
   ```bash
   # Set production values in .env
   POSTGRES_PASSWORD=your-secure-password
   SECRET_KEY=your-production-secret-key
   ```

2. **Build and run**
   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

### Security Considerations

- Change default passwords and secret keys
- Use HTTPS in production
- Configure proper CORS origins
- Implement authentication/authorization as needed
- Regular security updates for dependencies
- Database backups and monitoring

## 🛠️ Development Guidelines

### Adding New Features

1. **Backend**: Add models, schemas, services, and routes
2. **Frontend**: Create components and integrate with API
3. **Tests**: Write unit tests for new functionality
4. **Documentation**: Update API documentation

### Code Quality

- Follow PEP 8 for Python code
- Use ESLint and Prettier for JavaScript
- Write meaningful commit messages
- Add appropriate error handling
- Document complex functions

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL configuration
   - Verify network connectivity in Docker

2. **CORS errors**
   - Update CORS_ORIGINS in backend configuration
   - Ensure frontend URL is included

3. **Port conflicts**
   - Change ports in docker-compose.yml
   - Update REACT_APP_API_URL accordingly

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For support and questions:
- Check the documentation
- Review existing issues
- Create a new issue with detailed description