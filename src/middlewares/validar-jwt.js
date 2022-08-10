const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    };

    try {

        const payload = jwt.verify(token,process.env.SECRET_JWT_SEED);

        req.name = payload.name;
        req.user_id = payload.user_id;
        next();
    } catch (error) {
        //console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    };

    
};

module.exports = { validarJWT };