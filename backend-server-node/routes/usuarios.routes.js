/*
    route: '/api/usuarios
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
} = require("../controllers/usuarios.controller");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(), //Verifican que no sean vacíos / sean un email válido
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("email", "El Email es obligatorio").isEmail(),
        validarCampos,
    ],
    crearUsuario
    //los middlewares se definen antes de la función del controlador, si es más de uno se utilizan corchetes
);

router.put(
    "/:id",
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El Email es obligatorio").isEmail(),
        check("role", "El rol es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete("/:id", validarJWT, borrarUsuario);

module.exports = router;
