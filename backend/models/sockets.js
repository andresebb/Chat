class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");

      socket.emit("mensaje-bienvenida", {
        msg: "bienvenido al server",
      });

      //On Disconnect

      socket.on("disconnect", () => {
        console.log("Cliente Desconectado");
      });
    });
  }
}

module.exports = Sockets;
