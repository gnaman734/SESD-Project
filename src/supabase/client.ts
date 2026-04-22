import { createClient } from "@supabase/supabase-js";

const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env;
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are not set.");
}

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
