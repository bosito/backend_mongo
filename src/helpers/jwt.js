const jwt = require('jsonwebtoken');

const generarJWT = (user_id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { user_id, name };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1d'
        }, (err, token) => {
            
            if (err) {
                console.log(err);
                return reject('No se pudo jenerar el token')
            };

            resolve(token)
        })

    })
};

module.exports = { generarJWT }