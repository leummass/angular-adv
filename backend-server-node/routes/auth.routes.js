/*
    route: '/api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { login, googleSignIn, renewToken } = require("../controllers/auth.controller");
const { validarJWT } = require("../middlewares/validar-jwt");

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

router.post(
    "/google",
    [
        check("token", "El token de Google es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    googleSignIn
);

router.get(
    "/renew",
    validarJWT,
    renewToken
)

module.exports = router;
