install-frontend:
	cd frontend && npm install -y && cd ..

install-backend:
	cd backend && npm install -y && cd ..

install: install-frontend install-backend