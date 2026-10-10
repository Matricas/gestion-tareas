import { useMemo, useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "./services/auth";
import useTasks from "./hooks/useTasks";
import { groupTasks } from "./lib/groupTasks";
import DayHeader from "./components/DayHeader";
import TaskForm from "./components/TaskForm";
import TaskGroup from "./components/TaskGroup";
import Filters from "./components/Filters";
import ListState from "./components/ListState";

export default function App() {
  const { tasks, loading, loadError, actionError, retry, addTask, updateTask, removeTask, clearDone } =
    useTasks();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending");
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () => [...new Set(tasks.map((t) => t.category).filter(Boolean))].sort(),
    [tasks],
  );

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const visible = tasks.filter(
      (t) =>
        (status === "all" || t.is_done === (status === "done")) &&
        (!category || t.category === category) &&
        (!q || `${t.title} ${t.category ?? ""}`.toLowerCase().includes(q)),
    );
    return groupTasks(visible);
  }, [tasks, search, status, category]);

  const allGroups = useMemo(() => groupTasks(tasks), [tasks]);
  const count = (key) => allGroups.find((g) => g.key === key)?.tasks.length ?? 0;
  const hasDone = tasks.some((t) => t.is_done);

  let state = null;
  if (loading) state = "loading";
  else if (loadError) state = "error";
  else if (tasks.length === 0) state = "empty";
  else if (groups.length === 0) state = "noResults";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
      <p className="mb-4 text-right">
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-bold text-muted hover:text-ink"
        >
          <LogOut size={16} aria-hidden="true" />
          Cerrar sesión
        </button>
      </p>
      <DayHeader dueCount={count("today") + count("overdue")} overdueCount={count("overdue")} />
      <div className="grid md:grid-cols-[200px_1fr] md:gap-12">
        <Filters
          search={search}
          onSearch={setSearch}
          status={status}
          onStatus={setStatus}
          categories={categories}
          category={category}
          onCategory={setCategory}
        />
        <main>
          <TaskForm onAdd={addTask} />
          {actionError && (
            <p role="alert" className="mb-4 rounded border border-alert bg-surface p-3 text-alert">
              {actionError}
            </p>
          )}
          {state ? (
            <ListState kind={state} search={search} onRetry={retry} />
          ) : (
            groups.map((group) => (
              <TaskGroup
                key={group.key}
                group={group}
                onToggle={(t) => updateTask(t.id, { is_done: !t.is_done })}
                onRename={(id, title) => updateTask(id, { title })}
                onDelete={removeTask}
              />
            ))
          )}
          {hasDone && (
            <button
              type="button"
              onClick={clearDone}
              className="rounded border border-line px-3 py-2 text-sm font-bold text-muted hover:border-ink hover:text-ink"
            >
              Borrar tareas hechas
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
