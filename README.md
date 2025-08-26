# React + FastAPI Monorepo Starter

A modern full-stack development template featuring React 19 (Vite + TypeScript) frontend and FastAPI (Python 3.13) backend. Optimized for fast local development, comprehensive testing with coverage, CI/CD, and optional Docker deployment.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green?logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue?logo=typescript)
![Python](https://img.shields.io/badge/Python-3.13+-yellow?logo=python)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0+-blue?logo=tailwindcss)

## ✨ Features

- **Modern Stack**: React 19, FastAPI, TypeScript, TailwindCSS
- **Development Tools**: Vite with HMR, auto-reload, proxy configuration
- **Testing**: Comprehensive test suites with coverage reporting
- **Code Quality**: ESLint, Prettier, Ruff, mypy with strict configurations
- **CI/CD**: GitHub Actions workflow for automated testing and building
- **Containerization**: Docker support with multi-stage builds and development configs
- **Production Ready**: Optimized builds with compression, security headers, health checks

## 🚀 Quick Start

### Prerequisites

- Node.js 24+
- Python 3.13+
- Git

### Option 1: Manual Setup

#### 1. Client Setup
```bash
cd client
npm install
npm run dev
```

#### 2. API Setup (separate terminal)
```bash
cd api
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
cp env.example .env
uvicorn app.main:app --reload --port 8000
```

### Option 2: Using Make (Recommended)
```bash
make setup    # Install dependencies and setup environment
make dev      # Start both servers in separate processes
```

### Option 3: Using Python Dev Manager
```bash
python dev-server.py  # Cross-platform process manager
```

### Option 4: Using Windows Batch (Windows Only)
```cmd
dev-server.bat  # Spawns servers in separate windows
```

### Option 5: Using Docker
```bash
# Production build
docker compose up --build

# Development with hot-reload
docker compose -f docker-compose.dev.yml up --build
```

## 🌐 Access Points

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:8000](http://localhost:8000)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root message |
| GET | `/health` | Health check |
| GET | `/api/` | API root message |
| GET | `/api/health` | API health check |

## 🧪 Testing

### Run All Tests
```bash
make test
```

### Individual Testing
```bash
# Client tests
cd client && npm test

# API tests  
cd api && pytest

# Watch mode
cd client && npm run test:watch
```

### Coverage Reports
- Client: Automatically generated in `client/coverage/`
- API: Generated in `api/htmlcov/` and `api/coverage.xml`

## 🔧 Development Commands

```bash
# Development options
make dev           # Start both servers (separate processes)
make dev-parallel  # Start servers in parallel (Make)
make dev-client    # Start only React client
make dev-api       # Start only FastAPI server

# Quality checks
make lint          # Lint all code
make format        # Format all code
make type-check    # Type check all code
make check         # Run all quality checks

# Building
make build         # Build client for production

# Cleaning
make clean         # Clean all build artifacts

# Dependencies
make update        # Update all dependencies
```

## 📁 Project Structure

```
monorepo/
├── client/                 # React 19 + Vite + TypeScript
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utilities and API client
│   │   └── __tests__/     # Test files
│   ├── public/            # Static assets
│   └── dist/              # Build output
├── api/                   # FastAPI Python backend
│   ├── app/
│   │   ├── main.py        # FastAPI application
│   │   ├── config.py      # Configuration management
│   │   └── logging.py     # Logging setup
│   └── tests/             # API tests
├── .github/
│   └── workflows/         # CI/CD pipelines
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
└── Makefile              # Development commands
```

## 🐳 Docker Development

The project includes optimized Docker configurations:

- **Multi-stage builds** for minimal production images
- **Development containers** with hot-reload
- **Health checks** for service monitoring
- **Security best practices** with non-root users

```bash
# Start development environment
make docker-dev

# Stop services
make docker-down

# Clean Docker resources
make docker-clean
```

## 🔄 CI/CD Pipeline

GitHub Actions workflow includes:

- **Parallel testing** for client and API
- **Code quality checks** (linting, formatting, type checking)
- **Docker build verification**
- **Integration testing**
- **Coverage reporting**
- **Artifact uploads**

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool with HMR
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS 4.0** - Utility-first CSS framework
- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing utilities

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server with hot-reload
- **Pydantic v2** - Data validation and settings
- **pytest** - Testing framework with async support
- **Ruff** - Fast Python linter and formatter

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Make** - Task automation
- **ESLint/Prettier** - JavaScript code quality
- **mypy** - Python static type checking

## 📋 Environment Variables

### API Configuration
```bash
APP_ENV=development          # Environment (development/production)
PORT=8000                   # Server port
LOG_LEVEL=info              # Logging level
CORS_ORIGINS=http://localhost:3000  # Allowed CORS origins
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and ensure tests pass: `make check`
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Emilio Crocco**

## 🌟 Acknowledgments

- Built with modern web development best practices
- Inspired by production-ready application architectures
- Designed for developer productivity and maintainability