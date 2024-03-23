const { response } = require("express");

const Medico = require("../models/medico");
const { generarJWT } = require("../helpers/jwt");
const Hospital = require("../models/hospital");

const getMedicos = async (req, res = response) => {
    //populate nos permite obtener datos adicionales del **ID** al que se está haciendo referencia
    const medicos = await Medico.find()
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
    res.json({
        ok: true,
        medicos,
    });
};

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const { hospital } = req.body;

    const hospitalBD = Hospital.findById(hospital);

    if (!hospitalBD) {
        return res.status(404).json({
            ok: false,
            msg: "No se encontró hospital",
        });
    }

    const medico = new Medico({
        usuario: uid,
        ...req.body,
    });

    try {
        const medicoBD = await medico.save();

        res.json({
            ok: true,
            medico: medicoBD,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: "actualizarMedico",
    });
};

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: "borrarMedico",
    });
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
};
