import { createContext, useContext, useMemo, useState } from "react";
import { publicRequest } from "../utils/makeRequest";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("trustbazar_admin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("trustbazar_admin_token") || null;
  });

  const isAuthenticated = Boolean(token && admin);

  const saveAuth = (authData) => {
    localStorage.setItem("trustbazar_admin_token", authData.token);
    localStorage.setItem("trustbazar_admin", JSON.stringify(authData.admin));

    setToken(authData.token);
    setAdmin(authData.admin);
  };

  const login = async ({ identifier, password }) => {
    const res = await publicRequest.post("/auth/login", {
      identifier,
      password,
    });

    if (res.data?.success) {
      saveAuth({
        token: res.data.token,
        admin: res.data.admin,
      });
    }

    return res.data;
  };

  const signup = async ({ email, username, password, confirmPassword }) => {
    const res = await publicRequest.post("/auth/signup", {
      email,
      username,
      password,
      confirmPassword,
    });

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("trustbazar_admin_token");
    localStorage.removeItem("trustbazar_admin");

    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      admin,
      token,
      isAuthenticated,
      login,
      signup,
      logout,
    }),
    [admin, token, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
