import { AlertTriangle } from "lucide-react";

// Estados de la lista: cargando, error, sin tareas, sin resultados
export default function ListState({ kind, search, onRetry }) {
  if (kind === "loading") {
    return (
      <div role="status" aria-label="Cargando tareas" className="space-y-3 py-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 rounded bg-line motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  if (kind === "error") {
    return (
      <div role="alert" className="flex flex-col items-start gap-3 rounded border border-alert bg-surface p-4">
        <p className="flex items-center gap-2 font-bold text-alert">
          <AlertTriangle size={20} aria-hidden="true" />
          No se pudieron cargar las tareas
        </p>
        <button type="button" onClick={onRetry} className="rounded bg-ink px-4 py-2 font-bold text-surface hover:bg-ink/90">
          Reintentar carga
        </button>
      </div>
    );
  }

  return (
    <p className="py-10 text-muted">
      {kind === "empty"
        ? "Aún no tienes tareas. Escribe la primera arriba y agrégala."
        : `Ninguna tarea coincide con los filtros${search ? ` («${search}»)` : ""}.`}
    </p>
  );
}
