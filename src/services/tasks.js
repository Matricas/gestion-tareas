// Persistencia local (localStorage). Las funciones son async y devuelven
// { data, error } para poder cambiarlas por Supabase sin tocar los componentes.
const KEY = "gestion-tareas:tasks";

function read() {
  return JSON.parse(localStorage.getItem(KEY) ?? "[]");
}

function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

async function run(action) {
  try {
    return { data: action(), error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export function listTasks() {
  return run(read);
}

export function createTask({ title, priority, category, due_date }) {
  return run(() => {
    const task = {
      id: crypto.randomUUID(),
      title,
      priority,
      category,
      due_date,
      is_done: false,
      created_at: new Date().toISOString(),
    };
    write([task, ...read()]);
    return task;
  });
}

export function updateTask(id, changes) {
  return run(() => {
    let updated = null;
    write(
      read().map((task) => {
        if (task.id !== id) return task;
        updated = { ...task, ...changes };
        return updated;
      }),
    );
    return updated;
  });
}

export function deleteTask(id) {
  return run(() => {
    write(read().filter((task) => task.id !== id));
    return id;
  });
}

export function deleteDoneTasks() {
  return run(() => {
    write(read().filter((task) => !task.is_done));
    return true;
  });
}
