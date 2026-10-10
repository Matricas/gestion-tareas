-- Tabla de tareas: cada fila pertenece a un usuario de Supabase Auth.
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  priority text not null default 'media' check (priority in ('alta', 'media', 'baja')),
  category text check (char_length(category) <= 40),
  due_date date,
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);

-- Índice para listar rápido las tareas de cada usuario.
create index tasks_user_id_created_at_idx on public.tasks (user_id, created_at desc);

-- Seguridad: nadie ve ni toca filas ajenas.
alter table public.tasks enable row level security;

create policy "tasks_select_own" on public.tasks
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "tasks_insert_own" on public.tasks
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "tasks_update_own" on public.tasks
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "tasks_delete_own" on public.tasks
  for delete to authenticated
  using ((select auth.uid()) = user_id);
