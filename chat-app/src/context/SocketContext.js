import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:8080"
  );

  const { auth } = useContext(AuthContext);

  //Conectar socket si user esta logeado
  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);

  //Desconectar socket si user no esta logeado
  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  //Escuchar los usuarios conectados
  useEffect(() => {
    socket?.on("lista-usuarios", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
