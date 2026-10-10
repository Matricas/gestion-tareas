import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // undefined = todavía comprobando, null = sin sesión
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    authService.getSession().then(({ data, error }) => {
      setSession(error ? null : data.session);
    });
    return authService.onAuthChange(setSession);
  }, []);

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

export function useSession() {
  return useContext(AuthContext);
}
