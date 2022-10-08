const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const { generateJWT } = require('../helpers/jwt');

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
                msg: 'Mail already exists'
            });
        };

        user = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            user_id: user.id,
            name: user.name,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    };
};

const loginUser = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'The user does not exist'
            });
        };

        //confirm password
        const validPassword = await bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect'
            })
        };

        const token = await generateJWT(user.id, user.name);

        user.session = true;

        await user.save()

        res.status(201).json({
            ok: true,
            user_data: user,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    };
};

const logOutUser = async (req = request, res = response) => {
    try {
        const { user_id } = req.body;

        let user = await User.findOne({ user_id });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'The user does not exist'
            });
        };

        user.session = false;

        await user.save();

        res.status(201).json({
            ok: true,
            user_data: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const refreshToken = async (req = request, res = response) => {

    const { user_id, name } = req;

    const token = await generateJWT(user_id, name);

    res.status(201).json({
        ok: true,
        user_id: user_id,
        name: name,
        token: token
    });
};

const validateConnection = async (req = request, res = response) => {
    try {
        res.status(200).json({
            ok: true,
            msg: 'coneccion con api exitosa'
        })
    } catch (error) {
        console.log('error -->', error);
        res.status(500).json({
            ok: false,
            msg: 'por favor comunicarse con el administrador'
        });
    };
};

module.exports = {
    createUser,
    loginUser,
    logOutUser,
    refreshToken,
    validateConnection
};