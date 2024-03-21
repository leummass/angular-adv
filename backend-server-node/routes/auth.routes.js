/*
    route: '/api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { login } = require("../controllers/auth.controller");

const router = Router();

router.post(
    "/",
    [
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("email", "El Email es obligatorio").isEmail(),
        validarCampos,
    ],
    login
);

module.exports = router;
