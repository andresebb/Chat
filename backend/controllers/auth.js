const { validationResult } = require("express-validator");

const crearUsuario = async (req, res) => {
  res.json({
    ok: true,
    msg: "New User",
  });
};

const login = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      erros: errores.mapped(),
    });
  }

  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "Login success",
    email,
    password,
  });
};

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: "Token Validated",
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
