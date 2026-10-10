import { supabase } from "../lib/supabase";

// Las políticas RLS ya limitan cada consulta a las tareas del usuario conectado
const COLUMNS = "id, title, priority, category, due_date, is_done, created_at";

// La base guarda null en vez de texto vacío
const clean = ({ category, due_date, ...rest }) => ({
  ...rest,
  ...(category !== undefined && { category: category || null }),
  ...(due_date !== undefined && { due_date: due_date || null }),
});

export function listTasks() {
  return supabase.from("gt_tasks").select(COLUMNS).order("created_at", { ascending: false });
}

export function createTask({ title, priority, category, due_date }) {
  return supabase
    .from("gt_tasks")
    .insert(clean({ title, priority, category, due_date }))
    .select(COLUMNS)
    .single();
}

export function updateTask(id, changes) {
  return supabase.from("gt_tasks").update(clean(changes)).eq("id", id).select(COLUMNS).single();
}

export function deleteTask(id) {
  return supabase.from("gt_tasks").delete().eq("id", id);
}

export function deleteDoneTasks() {
  return supabase.from("gt_tasks").delete().eq("is_done", true);
}
