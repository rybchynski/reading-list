FROM node:lts-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

# RUN npm ci --only=production

VOLUME ["/app"]

RUN npm install --silent && mv node_modules /node_modules

EXPOSE 8000

CMD ["nodemon", "index.js"]
