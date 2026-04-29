const parseBoolean = (value?: string): boolean =>
  value?.trim().toLowerCase() === "true";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "";
const isProduction = import.meta.env.PROD;
const allowDemoLogin = parseBoolean(import.meta.env.VITE_ENABLE_DEMO_LOGIN);
const enableDemoLogin = isProduction ? false : allowDemoLogin;

const missingSupabaseVars = [
  !supabaseUrl ? "VITE_SUPABASE_URL" : null,
  !supabaseAnonKey ? "VITE_SUPABASE_ANON_KEY" : null,
].filter((value): value is string => Boolean(value));

export const appEnv = {
  supabaseUrl,
  supabaseAnonKey,
  isProduction,
  enableDemoLogin,
  demoLoginExplicitlyEnabledInProduction: isProduction && allowDemoLogin,
  isSupabaseConfigured: missingSupabaseVars.length === 0,
  missingSupabaseVars,
  supabaseConfigurationMessage:
    "Supabase environment variables are not set. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before using authenticated features.",
};
