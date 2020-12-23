const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");

      // Obtener User a traves del token enviado por socket
      const userToken = socket.handshake.query["user-token"];
      const [valido, uid] = comprobarJWT(userToken);

      if (!valido) {
        console.log("Socket no identificado");
        return socket.disconnect();
      }

      console.log("Cliente Conectado", uid);

      //On Disconnect

      socket.on("disconnect", () => {
        console.log("Cliente Desconectado");
      });
    });
  }
}

module.exports = Sockets;
