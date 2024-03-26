/*
    route: '/api/hospitales'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
    getHospitales,
    actualizarHospital,
    crearHospital,
    borrarHospital,
} = require("../controllers/hospitales.controller");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getHospitales);

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
        validarCampos,
    ],
    crearHospital
    //los middlewares se definen antes de la función del controlador, si es más de uno se utilizan corchetes
);

router.put(
    "/:id",
    [
        validarJWT,
        check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
        validarCampos,
    ],
    actualizarHospital
);

router.delete("/:id", validarJWT, borrarHospital);

module.exports = router;
