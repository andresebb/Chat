import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:8080"
  );

  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

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
    socket?.on("lista-usuarios", (usuarios) => {
      dispatch({
        type: types.usuariosCargados,
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  //Escuchar los mensaje uno a uno
  useEffect(() => {
    socket?.on("mensaje-personal", (mensaje) => {
      dispatch({
        type: types.nuevoMensaje,
        payload: mensaje,
      });
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
