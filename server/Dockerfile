FROM node:slim

ARG PORT

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run start
EXPOSE $PORT