FROM node:20.11.1-alpine3.18

ARG NODE_ENV="development"

RUN mkdir -p ./client

WORKDIR /client

COPY package*.json ./

COPY . .

EXPOSE 3000

RUN npm install

RUN chown -R node:node /client/node_modules

CMD npm start