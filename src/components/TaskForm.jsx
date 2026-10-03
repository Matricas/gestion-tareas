import { useState } from "react";
import { Plus } from "lucide-react";

const EMPTY = { title: "", priority: "media", category: "", due_date: "" };
const FIELD =
  "w-full rounded border border-line bg-surface px-3 py-2 text-base placeholder:text-muted hover:border-ink focus-visible:border-ink";

export default function TaskForm({ onAdd }) {
  const [values, setValues] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const change = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    const title = values.title.trim();
    if (!title) return;
    setSaving(true);
    const { error } = await onAdd({
      ...values,
      title,
      category: values.category.trim(),
    });
    setSaving(false);
    if (!error) setValues(EMPTY);
  }

  return (
    <form onSubmit={submit} className="grid gap-3 py-6 sm:grid-cols-3">
      <label className="sm:col-span-3">
        <span className="sr-only">Título de la tarea</span>
        <input
          className={`${FIELD} text-lg`}
          placeholder="¿Qué tienes que hacer?"
          value={values.title}
          onChange={change("title")}
          maxLength={200}
          required
        />
      </label>
      <label className="text-sm text-muted">
        Prioridad
        <select
          className={`${FIELD} mt-1 text-ink`}
          value={values.priority}
          onChange={change("priority")}
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </label>
      <label className="text-sm text-muted">
        Categoría
        <input
          className={`${FIELD} mt-1 text-ink`}
          placeholder="Trabajo, casa..."
          value={values.category}
          onChange={change("category")}
          maxLength={40}
        />
      </label>
      <label className="text-sm text-muted">
        Fecha límite
        <input
          type="date"
          className={`${FIELD} mt-1 text-ink`}
          value={values.due_date}
          onChange={change("due_date")}
        />
      </label>
      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center justify-center gap-2 rounded bg-ink px-4 py-2 font-bold text-surface hover:bg-ink/90 disabled:opacity-50 sm:col-span-3"
      >
        <Plus size={18} aria-hidden="true" />
        {saving ? "Guardando..." : "Agregar tarea"}
      </button>
    </form>
  );
}
