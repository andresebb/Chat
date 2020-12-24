const {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
} = require("../controllers/sockets");

const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      console.log("cliente conectado");

      // Obtener User a traves del token enviado por socket
      const userToken = socket.handshake.query["user-token"];
      const [valido, uid] = comprobarJWT(userToken);

      if (!valido) {
        console.log("Socket no identificado");
        return socket.disconnect();
      }

      await usuarioConectado(uid);

      //Emitir todos los users conectados
      this.io.emit("lista-usuarios", await getUsuarios());

      //On Disconnect

      socket.on("disconnect", async () => {
        await usuarioDesconectado(uid);
      });
    });
  }
}

module.exports = Sockets;
