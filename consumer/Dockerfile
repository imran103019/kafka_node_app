FROM node:10-alpine as BASE
WORKDIR /producer_app
COPY . .
RUN npm install -g nodemon && npm install
EXPOSE 8080
CMD [ "nodemon", "index.js" ]