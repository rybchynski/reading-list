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
});

module.exports = model('Category', schema);
