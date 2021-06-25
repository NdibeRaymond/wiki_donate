FROM node:13.12.0-alpine as build
RUN apk update && apk add bash
WORKDIR /home
ENV PATH /home/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install --silent
COPY . ./
EXPOSE 3000