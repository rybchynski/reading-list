const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: {
    type: String,
    required: 'true',
    default: '',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{ type: String, default: 'owner' }],
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: { type: String },
});

module.exports = model('User', schema);
