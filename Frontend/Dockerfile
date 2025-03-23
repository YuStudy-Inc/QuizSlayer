FROM node:18-bullseye

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "serve", "-s", "dist", "-l", "80"]