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
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", getUsuarios);

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
        check("nombre", "El nombre es obligatorio").not().isEmpty(), 
        check("email", "El Email es obligatorio").isEmail(),
		check("role", "El rol es obligatorio").not().isEmpty(), 
    ],
    actualizarUsuario
);

module.exports = router;
