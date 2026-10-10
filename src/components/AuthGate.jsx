import { useSession } from "../hooks/AuthContext";
import LoginPage from "../pages/LoginPage";

// Muestra el login si no hay sesión; las tareas solo cargan con usuario conectado
export default function AuthGate({ children }) {
  const session = useSession();
  if (session === undefined) {
    return <p role="status" className="px-4 py-16 text-center text-muted">Comprobando sesión...</p>;
  }
  return session ? children : <LoginPage />;
}
