const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    default: '',
  },
  cover: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  notation: {
    type: Boolean,
    default: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
  doneAt: {
    type: Date,
  },
  note: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: '',
  },
  pages: {
    type: Number,
    default: 1,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  categories: [
    {
      type: ObjectId,
      ref: 'Category',
    },
  ],
  author: {
    type: ObjectId,
    ref: 'Author',
  },
});

module.exports = model('Book', schema);
