/*
    rutas de usurio / auth
    host * /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
    createUser,
    loginUser,
    refreshToken,
    validateConnection,
    logOutUser,
} = require("../controller/auth");
const { validateFields } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const auth = Router();

auth.post(
    "/new",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check(
            "password",
            "El password es obligatorio y mayor a 6 caracteres"
        ).isLength({ min: 6 }),
        validateFields,
    ],
    createUser
);

auth.post(
    "/login",
    [
        check("email", "El email es obligatorio").isEmail(),
        check(
            "password",
            "El password es obligatorio y mayor a 6 caracteres"
        ).isLength({ min: 6 }),
        validateFields,
    ],
    loginUser
);

auth.post("/logout", [validateJWT], logOutUser);

auth.get("/renew", [validateJWT], refreshToken);

auth.get("/test", validateConnection);

module.exports = auth;
