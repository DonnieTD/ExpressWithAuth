FROM node:slim
ARG PORT
WORKDIR /app
COPY . /app
RUN npm install
CMD npm run start
EXPOSE $PORT