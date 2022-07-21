const { request, response } = require('express');

const validarJWT = (req = request, res = response, next) => {
    // x-token: ABC123
};

module.exports = { validarJWT };