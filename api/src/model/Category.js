const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  books: [
    {
      type: ObjectId,
      ref: 'Book',
    },
  ],
});

module.exports = model('Category', schema);
