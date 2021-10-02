const mainCrud = require('./main.controller');
const { Book } = require('../model');

const relations = {
  getAll: ['categories', 'authors'],
  get: ['category', 'author'],
};

module.exports = {
  ...mainCrud(Book, relations),
};
