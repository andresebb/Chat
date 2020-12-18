const { Router } = require("express");

const router = Router();

// Crear Nuevos Usuario
router.post("/new", (req, res) => {
  res.json({
    ok: true,
    msg: "New User",
  });
});

//Login
router.post("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Login success",
  });
});

//Revalidar Token

router.get("/renew", (req, res) => {
  res.json({
    ok: true,
    msg: "Token Validated",
  });
});

module.exports = router;
