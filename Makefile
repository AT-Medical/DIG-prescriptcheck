# PrescriptCheck – Makefile
# Development automation commands

.PHONY: help install dev test test-coverage lint lint-fix build docker-build docker-up docker-down clean

# Default target: show help
help:
	@echo "PrescriptCheck Development Commands"
	@echo "===================================="
	@echo ""
	@echo "Setup:"
	@echo "  make install        Install all dependencies"
	@echo ""
	@echo "Development:"
	@echo "  make dev            Start backend in development mode"
	@echo "  make dev-frontend   Start frontend in development mode"
	@echo ""
	@echo "Testing:"
	@echo "  make test           Run all tests"
	@echo "  make test-coverage  Run tests with coverage report"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint           Run ESLint"
	@echo "  make lint-fix       Run ESLint with auto-fix"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build   Build Docker images"
	@echo "  make docker-up      Start all services with Docker Compose"
	@echo "  make docker-down    Stop all services"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean          Remove build artifacts and node_modules"
	@echo "  make audit          Run security audit"

install:
	cd backend && npm install
	cd frontend && npm install

dev:
	cd backend && npm run dev

dev-frontend:
	cd frontend && npm run dev

test:
	cd backend && npm test

test-coverage:
	cd backend && npm run test:coverage

lint:
	cd backend && npm run lint 2>/dev/null || echo "ESLint not configured in backend"

lint-fix:
	cd backend && npm run lint:fix 2>/dev/null || echo "ESLint not configured in backend"

build:
	cd frontend && npm run build

docker-build:
	docker build -t prescriptcheck/backend:latest .
	docker build -f docker/Dockerfile.prod -t prescriptcheck/prod:latest .

docker-up:
	docker compose -f docker/docker-compose.yml up -d

docker-down:
	docker compose -f docker/docker-compose.yml down

audit:
	cd backend && npm audit
	cd frontend && npm audit

clean:
	rm -rf backend/node_modules frontend/node_modules node_modules
	rm -rf backend/coverage frontend/dist
	find . -name "*.log" -not -path "*/node_modules/*" -delete
