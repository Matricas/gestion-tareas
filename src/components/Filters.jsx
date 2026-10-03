import { Search } from "lucide-react";

const STATUSES = [
  { key: "pending", label: "Pendientes" },
  { key: "done", label: "Hechas" },
  { key: "all", label: "Todas" },
];

const chip = (active) =>
  `whitespace-nowrap rounded px-3 py-1.5 text-sm font-bold ${
    active ? "bg-ink text-surface" : "text-ink hover:bg-surface"
  }`;

export default function Filters({
  search,
  onSearch,
  status,
  onStatus,
  categories,
  category,
  onCategory,
}) {
  return (
    <aside className="flex flex-col gap-4 py-6 md:sticky md:top-6 md:self-start">
      <label className="relative block">
        <span className="sr-only">Buscar tareas</span>
        <Search
          size={18}
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar tareas"
          className="w-full rounded border border-line bg-surface py-2 pl-10 pr-3 placeholder:text-muted hover:border-ink"
        />
      </label>

      <div role="group" aria-label="Estado" className="flex gap-1 overflow-x-auto md:flex-col">
        {STATUSES.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={status === s.key}
            onClick={() => onStatus(s.key)}
            className={`${chip(status === s.key)} md:text-left`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {categories.length > 0 && (
        <div role="group" aria-label="Categoría">
          <p className="mb-1 text-sm text-muted">Categorías</p>
          <div className="flex gap-1 overflow-x-auto md:flex-col">
            {["", ...categories].map((c) => (
              <button
                key={c || "all"}
                type="button"
                aria-pressed={category === c}
                onClick={() => onCategory(c)}
                className={`${chip(category === c)} md:text-left`}
              >
                {c || "Todas"}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
