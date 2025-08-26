# React + FastAPI Monorepo Makefile

.PHONY: help install install-client install-api dev dev-parallel dev-client dev-api dev-api-direct test test-client test-api test-watch-client lint lint-client lint-api lint-fix lint-fix-client lint-fix-api format format-client format-api type-check type-check-client type-check-api build build-client clean clean-client clean-api docker-up docker-down docker-dev docker-clean update update-client update-api setup check

# Default target
help:
	@echo ""
	@echo "=================================================="
	@echo " React + FastAPI Monorepo - Available Commands"
	@echo "=================================================="
	@echo ""
	@echo "  help          Show this help message"
	@echo "  install       Install dependencies for both client and API"
	@echo "  dev           Start both servers in separate processes (recommended)"
	@echo "  dev-parallel  Start servers in parallel using Make"
	@echo "  dev-client    Start only the client development server"
	@echo "  dev-api       Start only the API development server"
	@echo "  test          Run tests for both client and API"
	@echo "  lint          Lint both client and API code"
	@echo "  format        Format both client and API code"
	@echo "  type-check    Run type checking for both client and API"
	@echo "  build         Build client for production"
	@echo "  clean         Clean build artifacts and caches"
	@echo "  check         Run all quality checks (lint, type-check, test)"
	@echo "  setup         Install dependencies and setup environment"
	@echo "  update        Update all dependencies"
	@echo ""
	@echo "  docker-up     Start services with Docker Compose"
	@echo "  docker-down   Stop Docker Compose services"
	@echo "  docker-dev    Start development services with Docker Compose"
	@echo ""
	@echo "================================================="

# Install dependencies
install: install-client install-api

install-client:
	@echo [CLIENT] Installing dependencies...
	cd client && npm install

install-api:
	@echo [API] Installing dependencies...
	cd api && python -m venv .venv
	cd api && source .venv/bin/activate && pip install -r requirements-dev.txt

# Development servers
dev:
	@echo [DEV] Starting both servers in separate processes...
	python dev-server.py

dev-parallel:
	@echo ""
	@echo "[DEV] Starting development servers in parallel (Make)..."
	@echo "[INFO] API will be available at http://localhost:8000"
	@echo "[INFO] Client will be available at http://localhost:3000"
	@echo ""
	$(MAKE) -j2 dev-api dev-client

dev-client:
	@echo [CLIENT] Starting development server...
	cd client && npm run dev

dev-api:
	@echo [API] Starting development server...
	@cd api && test -f .env || cp env.example .env
	cd api && source .venv/bin/activate && python dev.py

dev-api-direct:
	@echo [API] Starting development server (direct uvicorn)...
	@cd api && test -f .env || cp env.example .env
	cd api && source .venv/bin/activate && python -m uvicorn app.main:app --reload --port 8000 --reload-delay 1 --timeout-keep-alive 5

# Testing
test: test-client test-api

test-client:
	@echo [CLIENT] Running tests...
	cd client && npm test

test-api:
	@echo [API] Running tests...
	cd api && source .venv/bin/activate && pytest

test-watch-client:
	@echo [CLIENT] Running tests in watch mode...
	cd client && npm run test:watch

# Linting
lint: lint-client lint-api

lint-client:
	@echo [CLIENT] Linting code...
	cd client && npm run lint

lint-api:
	@echo [API] Linting code...
	cd api && source .venv/bin/activate && ruff check .

lint-fix: lint-fix-client lint-fix-api

lint-fix-client:
	@echo [CLIENT] Fixing lint issues...
	cd client && npm run lint:fix

lint-fix-api:
	@echo [API] Fixing lint issues...
	cd api && source .venv/bin/activate && ruff check --fix .

# Formatting
format: format-client format-api

format-client:
	@echo [CLIENT] Formatting code...
	cd client && npm run format

format-api:
	@echo [API] Formatting code...
	cd api && source .venv/bin/activate && ruff format .

# Type checking
type-check: type-check-client type-check-api

type-check-client:
	@echo [CLIENT] Type checking...
	cd client && npm run type-check

type-check-api:
	@echo [API] Type checking...
	cd api && source .venv/bin/activate && mypy .

# Building
build: build-client

build-client:
	@echo [BUILD] Building client for production...
	cd client && npm run build

# Cleaning
clean: clean-client clean-api

clean-client:
	@echo [CLEAN] Cleaning client...
	cd client && rm -rf node_modules dist .vite

clean-api:
	@echo [CLEAN] Cleaning API...
	cd api && rm -rf .venv __pycache__ .pytest_cache htmlcov .coverage coverage.xml

# Docker commands
docker-up:
	@echo [DOCKER] Starting services with Docker Compose...
	docker compose up --build

docker-down:
	@echo [DOCKER] Stopping Docker Compose services...
	docker compose down

docker-dev:
	@echo [DOCKER] Starting development services with Docker Compose...
	docker compose -f docker-compose.dev.yml up --build

docker-clean:
	@echo [DOCKER] Cleaning Docker resources...
	docker compose down -v
	docker compose -f docker-compose.dev.yml down -v
	docker system prune -f

# Update dependencies
update: update-client update-api

update-client:
	@echo [UPDATE] Updating client dependencies...
	cd client && npx npm-check-updates -u && npm install

update-api:
	@echo [UPDATE] Updating API dependencies...
	cd api && source .venv/bin/activate && pip install -U -r requirements.txt -r requirements-dev.txt

# Environment setup
setup: install
	@echo ""
	@echo "[SETUP] Setting up environment files..."
	@cd api && test -f .env || cp env.example .env
	@echo ""
	@echo "[SUCCESS] Setup complete! Run 'make dev' to start development servers."
	@echo ""

# Comprehensive quality check
check: lint type-check test
	@echo ""
	@echo "[SUCCESS] All quality checks passed!"
	@echo ""
