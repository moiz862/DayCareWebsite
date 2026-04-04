import { useState, useEffect, useCallback } from "react";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const login = useCallback((password: string) => {
    const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || "adminlittlestars";
    if (password === expectedPassword) {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
