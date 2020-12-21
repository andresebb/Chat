import React, { createContext, useState, useCallback } from "react";
import { fetchSinToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    const resp = await fetchSinToken("login", { email, password }, "POST");

    console.log(resp);
  };

  const register = (nombre, email, password) => {
    //
  };

  const verificarToken = useCallback(() => {
    //
  }, []);

  const logout = () => {
    //
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
