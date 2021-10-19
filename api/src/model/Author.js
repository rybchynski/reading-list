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
    bio: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
});

module.exports = model('Author', schema);
