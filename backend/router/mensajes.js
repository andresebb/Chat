const { Router } = require("express");
const { obtenerChat } = require("../controllers/mensajes");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Crear Mensaje

router.get("/:id", validarJWT, obtenerChat);

module.exports = router;
