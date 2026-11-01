import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Helpful warning during development when env vars are missing
  // (will not break production builds if you provide env vars correctly)
  // eslint-disable-next-line no-console
  console.warn(
    "VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Supabase client may not work."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

export default supabase;
