const mainCrud = require('./main.controller');
const { Book } = require('../model');

const relations = {
  getAll: ['categories', 'author'],
  get: ['categories', 'author'],
};

module.exports = {
  ...mainCrud(Book, relations),
};
