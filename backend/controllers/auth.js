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
      ok: true,
      msg: "User Created Success",
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
  try {
    const { email, password } = req.body;

    //Verificar si existe el email
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Los datos no son correctos",
      });
    }

    //Validar el password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "los datos no son correctos",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuarioDB.id, usuarioDB.nombre);

    res.json({
      ok: true,
      msg: "Login Success",
      usuario: usuarioDB,
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
