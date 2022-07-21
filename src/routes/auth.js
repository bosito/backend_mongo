/*
    rutas de usurio / auth
    host * /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')
const {
    createUser,
    loginUsuario,
    renovarToken
} = require('../controller/auth');
const { validarCampos } = require('../middlewares/valudar-campos')

const auth = Router();

auth.post(
    '/new',
    [
        check("name", "El nomre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio y mayor a 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ],
    createUser
);

auth.post('/login',
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio y mayor a 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

auth.get(
    '/renew',
    renovarToken
);

module.exports = auth;