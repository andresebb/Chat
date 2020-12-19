const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Crear Usuario
router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").isString().not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

//Login Usuario,
//Validamos que el email y el password ajuro sean enviados con express-validator.
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

//Revalidar Token
router.get("/renew", renewToken);

module.exports = router;
