import { toISODate } from "./dates";

export const GROUPS = [
  { key: "overdue", label: "Vencidas" },
  { key: "today", label: "Hoy" },
  { key: "week", label: "Esta semana" },
  { key: "later", label: "Más adelante" },
  { key: "none", label: "Sin fecha" },
  { key: "done", label: "Hechas" },
];

const PRIORITY_RANK = { alta: 0, media: 1, baja: 2 };

function groupKey(task, today, weekEnd) {
  if (task.is_done) return "done";
  if (!task.due_date) return "none";
  if (task.due_date < today) return "overdue";
  if (task.due_date === today) return "today";
  return task.due_date <= weekEnd ? "week" : "later";
}

function byUrgency(a, b) {
  return (
    PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] ||
    (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999") ||
    b.created_at.localeCompare(a.created_at)
  );
}

// Devuelve los grupos con tareas, en el orden de GROUPS
export function groupTasks(tasks, now = new Date()) {
  const today = toISODate(now);
  const weekEndDate = new Date(now);
  weekEndDate.setDate(weekEndDate.getDate() + 7);
  const weekEnd = toISODate(weekEndDate);

  const buckets = Object.fromEntries(GROUPS.map((g) => [g.key, []]));
  tasks.forEach((task) => buckets[groupKey(task, today, weekEnd)].push(task));

  return GROUPS.filter((g) => buckets[g.key].length > 0).map((g) => ({
    ...g,
    tasks: buckets[g.key].sort(byUrgency),
  }));
}
