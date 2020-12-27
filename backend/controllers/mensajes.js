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
  }).sort({
    createdAt: "asc",
  });

  const mis30 = last30.slice(-30);

  res.json({
    ok: true,
    mensajes: "Hola",
    mensajes: mis30,
  });
};

module.exports = {
  obtenerChat,
};
