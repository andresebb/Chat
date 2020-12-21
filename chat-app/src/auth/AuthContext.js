import React, { createContext, useState, useCallback } from "react";

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

  const login = (email, password) => {
    //
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
