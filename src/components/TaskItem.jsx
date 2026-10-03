import { useState } from "react";
import { CalendarDays, Check, Pencil, Tag, Trash2 } from "lucide-react";
import { formatShort } from "../lib/dates";

const PRIORITY = {
  alta: { label: "Alta", style: "bg-signal text-ink" },
  media: { label: "Media", style: "border border-ink text-ink" },
  baja: { label: "Baja", style: "border border-line text-muted" },
};

const ICON_BUTTON =
  "rounded p-2 text-muted hover:bg-fog hover:text-ink";

export default function TaskItem({ task, overdue, onToggle, onRename, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [confirming, setConfirming] = useState(false);
  const priority = PRIORITY[task.priority];

  function saveTitle(e) {
    e.preventDefault();
    const title = draft.trim();
    if (title && title !== task.title) onRename(task.id, title);
    else setDraft(task.title);
    setEditing(false);
  }

  return (
    <li className="flex items-start gap-3 border-b border-line py-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={task.is_done}
        aria-label={`Marcar «${task.title}» como ${task.is_done ? "pendiente" : "hecha"}`}
        onClick={() => onToggle(task)}
        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded border-2 border-ink ${
          task.is_done ? "bg-ink text-surface" : "bg-surface hover:bg-signal"
        }`}
      >
        {task.is_done && <Check size={16} strokeWidth={3} aria-hidden="true" />}
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <form onSubmit={saveTitle} className="flex gap-2">
            <input
              autoFocus
              aria-label="Editar título"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={200}
              className="min-w-0 flex-1 rounded border border-ink bg-surface px-2 py-1"
            />
            <button type="submit" className="rounded bg-ink px-3 py-1 text-sm font-bold text-surface">
              Guardar cambios
            </button>
          </form>
        ) : (
          <p className={`break-words ${task.is_done ? "text-muted line-through" : ""}`}>
            {task.title}
          </p>
        )}
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className={`rounded px-2 text-sm font-bold ${priority.style}`}>
            {priority.label}
          </span>
          {task.category && (
            <span className="inline-flex items-center gap-1">
              <Tag size={14} aria-hidden="true" />
              {task.category}
            </span>
          )}
          {task.due_date && (
            <span className={`inline-flex items-center gap-1 ${overdue ? "font-bold text-alert" : ""}`}>
              <CalendarDays size={14} aria-hidden="true" />
              {formatShort(task.due_date)}
            </span>
          )}
        </p>
      </div>

      <div className="flex shrink-0 items-center">
        {confirming ? (
          <>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded bg-alert px-3 py-1 text-sm font-bold text-surface"
            >
              Eliminar tarea
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="px-3 py-1 text-sm text-muted hover:text-ink">
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button type="button" aria-label="Editar tarea" onClick={() => setEditing(true)} className={ICON_BUTTON}>
              <Pencil size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Eliminar tarea" onClick={() => setConfirming(true)} className={ICON_BUTTON}>
              <Trash2 size={18} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
