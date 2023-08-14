FROM node:fermium-alpine3.14

ENV PORT 8081

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./usr/src/app/
RUN npm install --silent

COPY . /usr/src/app

RUN npm run build
EXPOSE 8081

CMD ["npm", "start"]
