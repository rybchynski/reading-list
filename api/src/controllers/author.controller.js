const mainCrud = require('./main.controller');
const { Author } = require('../model');

module.exports = {
  ...mainCrud(Author),
};
