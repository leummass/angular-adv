const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //Verificar email
        const usuarioBD = await Usuario.findOne({ email });

        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: "Contraseña/Email no válidos",
            });
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioBD.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña/Email no válidos",
            });
        }

        //Generar TOKEN JWT
        const token = await generarJWT(usuarioBD.id);

        res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const googleSignIn = async (req, res = response) => {
    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioBD = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioBD) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: "@@@",
                img: picture,
                google: true,
            });
        } else {
            usuario = usuarioBD;
            usuario.google = true;
        }
        //guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email,
            name,
            picture,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Token incorrecto, reintentelo",
        });
    }
};

const renewToken = async(req, res = response) => {

    const uid = req.uid; 
    // generar el token de nuevo
    const token = await generarJWT(uid);
    res.json({
        ok: true,
        token,
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
};
