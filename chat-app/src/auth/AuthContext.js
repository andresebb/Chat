import React, { createContext, useState, useCallback, useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const AuthContext = createContext();

//Checking es para ver si le mostamos la pantalla de carga o no, si es true se la mostramos
const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchSinToken("login", { email, password }, "POST");

    if (resp.ok === true) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
    }

    return resp.ok;
  };

  const register = async (nombre, email, password) => {
    const resp = await fetchSinToken(
      "login/new",
      { nombre, email, password },
      "POST"
    );

    if (resp.ok === true) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      console.log("Success");
    }

    return {
      ok: resp.ok,
      msg: resp.msg,
    };
  };

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const resp = await fetchConToken("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });

    dispatch({
      type: types.borrarData,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        register,
        verificarToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
