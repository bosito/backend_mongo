const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {
    try {
        const { 
            email, 
            password, 
        } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        };

        user = new User(req.body);

        //encript password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            user_id: user.id,
            name: user.name,
            //token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'por favor comunicarse con el administrador'
        });
    };
};

const loginUsuario = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        };

        //confirm password
        const validPassword = await bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña incorrecta'
            })
        };

        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            user_id: user.id,
            name: user.name,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'por favor comunicarse con el administrador'
        });
    };
};

const renovarToken = async (req = request, res = response) => {

    const { user_id, name } = req;

    const token = await generarJWT(user_id, name);

    res.status(201).json({
        ok: true,
        user_id: user_id,
        name: name,
        token: token
    });
};

module.exports = {
    createUser,
    loginUsuario,
    renovarToken
};