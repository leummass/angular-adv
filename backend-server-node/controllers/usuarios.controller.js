const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;
    // const usuarios = await Usuario.find({}, "nombre email role password")
    //     .skip(desde)
    //     .limit(5);

    // const total = await Usuario.countDocuments();
    //Colección de promesas (múltiples funciones con await)
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, "nombre email role password img").skip(desde).limit(5),
        Usuario.countDocuments(),
    ]);

    res.json({
        ok: true,
        usuarios,
        total,
    });
};

const crearUsuario = async (req, res = response) => {
    const { email, password, nombre } = req.body;

    try {
        //verifica si el email ya está registrado, tiene que ser único
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado",
            });
        }

        //información del usuario obtenida del json
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guarda usuario en la BD
        await usuario.save();
        const token = await generarJWT(usuario.id);
        //respuesta al guardar el usuario
        res.json({
            ok: true,
            usuario,
            token,
        });
    } catch (error) {
        //falla al guardar usuario
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const actualizarUsuario = async (req, res = response) => {
    //TODO: validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id",
            });
        }

        //Actualizar
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "No se puede cambiar el usuario de un usuario de google",
                });
            }
        }

        if (!usuarioDB.google) {
            campos.email = email;
        } else if(usuarioDB.email !== email) {
            
        }
    
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            uid,
            campos,
            { new: true }
        );

        res.json({
            ok: true,
            usuario: usuarioActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
};

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id",
            });
        }

        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: "Usuario eliminado",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Algo falló, hable con el administrador",
        });
    }
};

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
};
