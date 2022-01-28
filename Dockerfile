FROM node:17-alpine

ENV APP_PATH /usr/src/app
ENV PATH $APP_PATH/node_modules/.bin/:$PATH

WORKDIR $APP_PATH

COPY . .

RUN npm install

CMD npm start

EXPOSE 3000
