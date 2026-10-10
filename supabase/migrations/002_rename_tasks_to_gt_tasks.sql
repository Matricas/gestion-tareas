-- Prefijo gt_ para las tablas del proyecto. RLS y políticas se mantienen al renombrar.
alter table public.tasks rename to gt_tasks;

alter index public.tasks_user_id_created_at_idx rename to gt_tasks_user_id_created_at_idx;

alter policy "tasks_select_own" on public.gt_tasks rename to "gt_tasks_select_own";
alter policy "tasks_insert_own" on public.gt_tasks rename to "gt_tasks_insert_own";
alter policy "tasks_update_own" on public.gt_tasks rename to "gt_tasks_update_own";
alter policy "tasks_delete_own" on public.gt_tasks rename to "gt_tasks_delete_own";
