const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    //Verificar si existe el email
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya existe",
      });
    }

    const usuario = new Usuario(req.body);

    //Encriptar contrasena
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.nombre);

    //Guardar usuario en base de datos
    await usuario.save();

    res.json({
      usuario,
      token,
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
