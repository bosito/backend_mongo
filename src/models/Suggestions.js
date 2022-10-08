const { Schema, model } = require('mongoose');

const suggestions_schema = Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        require: true
    },
    direction: {
        type: String,
        default: ''
    },
    comentario: {
        type: String,
        default: ''
    }
});

module.exports = model('suggestions', suggestions_schema);
