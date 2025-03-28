FROM node:20.10.0 AS base

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

RUN npm install

COPY . .

ENV 1010

CMD ["node", "index.js"]
