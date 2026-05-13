"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "@/utils/api";
import { getCookie, deleteCookie } from "cookies-next";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const isAuthenticated = getCookie("isAuthenticated");
    
    // console.log(isAuthenticated)
    if (!isAuthenticated) {
      setUser(null);
      setLoading(false);
      return;
    }

    authAPI.user()
      .then(res => setUser(res.data))
      .catch(() => {
        setUser(null);
        deleteCookie("isAuthenticated", { path: "/" });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
