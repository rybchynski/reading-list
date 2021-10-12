FROM node:lts-alpine

RUN apk add --no-cache bash
RUN npm install -g @vue/cli

WORKDIR /app

VOLUME ["/app"]

RUN npm install

EXPOSE 8000

CMD ["npm", "run", "serve"]
