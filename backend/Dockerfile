FROM node:18-alpine

ENV NODE_ENV=local

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]