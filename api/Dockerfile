FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 4000 4001

CMD ["npm", "run", "start-dev"]