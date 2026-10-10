import { createClient } from "@supabase/supabase-js";

// Cliente único: todo acceso a datos pasa por aquí
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
