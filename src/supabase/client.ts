import { createClient } from "@supabase/supabase-js";
import { appEnv } from "../config/env";

const fallbackSupabaseUrl = "https://placeholder.supabase.co";
const fallbackSupabaseAnonKey = "placeholder-anon-key";

if (import.meta.env.DEV && !appEnv.isSupabaseConfigured) {
  console.warn(
    appEnv.supabaseConfigurationMessage
  );
}

export const assertSupabaseConfigured = () => {
  if (!appEnv.isSupabaseConfigured) {
    throw new Error(appEnv.supabaseConfigurationMessage);
  }
};

export const supabase = createClient(
  appEnv.supabaseUrl || fallbackSupabaseUrl,
  appEnv.supabaseAnonKey || fallbackSupabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
