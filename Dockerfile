FROM node:14.15-alpine

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4203

CMD ["npm", "run", "start"]