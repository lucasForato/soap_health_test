install-frontend:
	@ if [ ! -d "frontend/node_modules" ]; then cd frontend && npm install -y && cd ..; fi

install-backend:
	@ if [ ! -d "backend/node_modules" ]; then cd backend && npm install -y && cd ..; fi

install: install-frontend install-backend

compose:
	@ docker compose up --build

run: install compose