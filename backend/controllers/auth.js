const Usuario = require("../models/usuario");

const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Verificar si existe el email
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya existe",
      });
    }

    //Guardar usuario en base de datos
    const newUser = new Usuario(req.body);
    await newUser.save();

    res.json({
      newUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const login = async (req, res) => {
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
