import { useState } from "react";
import { LogIn } from "lucide-react";
import { signIn, signUp } from "../services/auth";

const FIELD =
  "mt-1 w-full rounded border border-line bg-surface px-3 py-2 text-base text-ink hover:border-ink focus-visible:border-ink";

export default function LoginPage() {
  const [mode, setMode] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);

  const isSignUp = mode === "signUp";

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setMessage(null);
    const { data, error } = await (isSignUp ? signUp : signIn)(email, password);
    setSending(false);
    if (error) {
      setMessage({ type: "error", text: isSignUp ? "No se pudo crear la cuenta. Revisa el correo o usa una contraseña de 6+ caracteres." : "Correo o contraseña incorrectos." });
    } else if (isSignUp && !data.session) {
      setMessage({ type: "info", text: "Te enviamos un correo. Confírmalo y luego entra con tu contraseña." });
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="border-b-2 border-ink pb-4 font-display text-xl font-extrabold">
        {isSignUp ? "Crea tu cuenta" : "Entra a tus tareas"}
      </h1>
      <form onSubmit={submit} className="grid gap-4 py-6">
        <label className="text-sm text-muted">
          Correo
          <input type="email" autoComplete="email" required className={FIELD} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="text-sm text-muted">
          Contraseña
          <input
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            minLength={6}
            required
            className={FIELD}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {message && (
          <p role={message.type === "error" ? "alert" : "status"} className={`rounded border bg-surface p-3 text-sm ${message.type === "error" ? "border-alert text-alert" : "border-line text-ink"}`}>
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded bg-ink px-4 py-2 font-bold text-surface hover:bg-ink/90 disabled:opacity-50"
        >
          <LogIn size={18} aria-hidden="true" />
          {sending ? "Enviando..." : isSignUp ? "Crear cuenta" : "Entrar"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          setMode(isSignUp ? "signIn" : "signUp");
          setMessage(null);
        }}
        className="text-sm font-bold text-muted underline hover:text-ink"
      >
        {isSignUp ? "Ya tengo cuenta, quiero entrar" : "No tengo cuenta, quiero crear una"}
      </button>
    </div>
  );
}
