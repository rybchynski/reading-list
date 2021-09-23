const mainCrud = require('./main.controller');
const { Book } = require('../model');

module.exports = {
  ...mainCrud(Book),
};
