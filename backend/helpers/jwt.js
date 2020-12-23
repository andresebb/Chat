const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

//La usamos para saber el usuario que se conecta al chat
const comprobarJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    return [true, uid];
  } catch (e) {
    return [false, null];
  }
};

module.exports = {
  generarJWT,
  comprobarJWT,
};
