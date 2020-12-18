const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth");

const router = Router();

// Crear Usuario
router.post("/new", crearUsuario);

//Login Usuario
router.post("/", login);

//Revalidar Token
router.get("/renew", renewToken);

module.exports = router;
