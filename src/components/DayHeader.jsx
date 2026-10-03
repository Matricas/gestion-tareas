import { useState } from "react";
import { formatLong } from "../lib/dates";

export default function DayHeader({ dueCount, overdueCount }) {
  const [today] = useState(() => new Date());
  return (
    <header className="flex items-end gap-4 border-b-2 border-ink pb-6">
      <p
        className="animate-rise font-display text-3xl font-extrabold tabular-nums"
        aria-hidden="true"
      >
        {dueCount}
      </p>
      <div className="pb-1">
        <h1 className="font-display text-lg font-extrabold">
          {dueCount === 1 ? "tarea para hoy" : "tareas para hoy"}
        </h1>
        <p className="text-sm capitalize text-muted">
          {formatLong(today)}
          {overdueCount > 0 && (
            <span className="font-bold normal-case text-alert">
              {" · "}
              {overdueCount} {overdueCount === 1 ? "vencida" : "vencidas"}
            </span>
          )}
        </p>
      </div>
    </header>
  );
}
