FROM node:18-alpine

ENV NODE_ENV=local

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
