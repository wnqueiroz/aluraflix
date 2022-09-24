FROM node:16.17-alpine as builder

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm i -g @nestjs/cli \
    && npm install

COPY . .

RUN npm run build

FROM node:16.17-alpine as runtime

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG NODE_PORT=8080
ENV NODE_PORT=${NODE_PORT}

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]