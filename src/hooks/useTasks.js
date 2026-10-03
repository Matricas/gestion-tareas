import { useCallback, useEffect, useState } from "react";
import * as tasksService from "../services/tasks";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchTasks = useCallback(async () => {
    const { data, error } = await tasksService.listTasks();
    setTasks(data ?? []);
    setLoadError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  function retry() {
    setLoading(true);
    fetchTasks();
  }

  // Ejecuta la acción; si falla, muestra el error y no toca la lista
  async function mutate(action, apply) {
    const { data, error } = await action();
    setActionError(error ? "No se pudo guardar el cambio. Inténtalo de nuevo." : null);
    if (!error) setTasks((current) => apply(current, data));
    return { error };
  }

  const addTask = (values) =>
    mutate(
      () => tasksService.createTask(values),
      (current, created) => [created, ...current],
    );

  const updateTask = (id, changes) =>
    mutate(
      () => tasksService.updateTask(id, changes),
      (current, updated) => current.map((t) => (t.id === id ? updated : t)),
    );

  const removeTask = (id) =>
    mutate(
      () => tasksService.deleteTask(id),
      (current) => current.filter((t) => t.id !== id),
    );

  const clearDone = () =>
    mutate(
      () => tasksService.deleteDoneTasks(),
      (current) => current.filter((t) => !t.is_done),
    );

  return {
    tasks,
    loading,
    loadError,
    actionError,
    retry,
    addTask,
    updateTask,
    removeTask,
    clearDone,
  };
}
