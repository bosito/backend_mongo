const { Schema, model } = require('mongoose');

const user_schema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    type_user: {
        type: Number,
        default: 0
    }
});

module.exports = model('user', user_schema);
