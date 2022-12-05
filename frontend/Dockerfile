FROM node:14-alpine
ENV NODE_ENV development

WORKDIR /app

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .
COPY .env.docker .env

EXPOSE 3000

CMD [ "npm", "start" ]