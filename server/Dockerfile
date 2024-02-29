FROM node:20.11.1-alpine3.18

RUN mkdir server

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 5000

CMD mpm start-dev
