const mensaje = require("../models/mensaje");
const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res) => {
  const miId = req.uid;
  const mensajeDe = req.params.id;

  const last30 = await Mensaje.find({
    $or: [
      {
        de: miId,
        para: mensajeDe,
      },
      {
        de: mensajeDe,
        para: miId,
      },
    ],
  })
    .sort({
      createdAt: "desc",
    })
    .limit(30);

  res.json({
    ok: true,
    mensajes: "Hola",
    mensajes: last30,
  });
};

module.exports = {
  obtenerChat,
};
