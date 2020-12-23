const jwt = require("jsonwebtoken");

const validarJWT = async (req, res, next) => {
  try {
    // Verficamos que venga un token
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la peticion",
      });
    }

    //Verificamos que el token haya sido firmado con la llave correspondiente y luego sacamos el id
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    next();
  } catch (e) {
    return res.status(401).json({
      ok: false,
      msg: "Token no es valido o  mal id de usuario",
    });
  }
};

module.exports = {
  validarJWT,
};
