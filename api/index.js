require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const cookieParser = require('cookie-parser');
const { routes } = require('./src/routes');
const errorMiddleware = require('./src/middlewares/error.middleware');

const {
  MDB,
  ADMIN_MDB,
  MONGO_ROOT_USER,
  MONGO_ROOT_PASSWORD,
  MDB_HOST,
  MDB_PORT,
  APP_PORT,
} = process.env;

// connect to db.
mongoose.connect(
  `mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@${MDB_HOST}:${MDB_PORT}/${MDB}?authSource=${ADMIN_MDB}&w=1`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
);

// init the app.
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// declare routes.
routes.forEach((item) => {
  app.use(`/v1/${item}`, require(`./src/routes/${item}`));
});
app.use(errorMiddleware);

http.createServer({}, app).listen(APP_PORT);
console.log(`Server is running at ${APP_PORT}`);
