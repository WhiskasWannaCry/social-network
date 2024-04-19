# Используем образ Node.js
FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY backend /app/backend
COPY frontend /app/frontend

RUN cd backend && npm install

RUN cd frontend && npm install

EXPOSE 3001 8000 9000

CMD ["npm", "run", "start-backend-frontend"]