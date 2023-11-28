FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

RUN apk add tzdata && ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

EXPOSE 5000

COPY . .

CMD npm run build && npm run start:prod