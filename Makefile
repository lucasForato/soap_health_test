install-frontend:
	@ if [ ! -d "frontend/node_modules" ]; then cd frontend && npm install -y && cd ..; fi

install-backend:
	@ if [ ! -d "backend/node_modules" ]; then cd backend && npm install -y && cd ..; fi

install: install-frontend install-backend

frontend: install-frontend
	@ cd frontend && npm run start

backend: install-backend
	@ cd backend && npm run start:dev

compose:
	@ docker compose up --build

run: install compose

