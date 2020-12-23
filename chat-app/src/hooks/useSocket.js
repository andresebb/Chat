import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  // const socket = useMemo(
  //   () => io.connect(serverPath, { transports: ["websocket"] }),
  //   [serverPath]
  // );

  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  //Usamos useCallback porque sino siempre se ejecutaria en el useEffect
  const conectarSocket = useCallback(() => {
    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
    });
    setSocket(socketTemp);
  }, [serverPath]);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  useEffect(() => {
    socket?.on("mensaje-bienvenida", (data) => console.log(data));
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};
