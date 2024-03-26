const { response } = require("express");

const Medico = require("../models/medico");
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

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    const { hospital, nombre } = req.body;
    try {
        const medicoBD = await Medico.findById(id);
        if (!medicoBD) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontró médico con ese id",
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(
            id,
            cambiosMedico,
            { new: true }
        );

        res.json({
            ok:true,
            msg:'Médico actualizado',
            medicoActualizado,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: "Hable con el administrador",
        });
    }
    
};

const borrarMedico = async(req, res = response) => {
    const id = req.params.id;
    try {
        const medicoBD = await Medico.findById(id);

        if(!medicoBD){
            return res.status(404).json({
                ok: false,
                msg: "No se encontró médico con ese id",
            });
        }
        await Medico.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "Médico eliminado",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
    
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
};
