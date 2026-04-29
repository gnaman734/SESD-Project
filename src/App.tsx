import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthState, useAuthStore } from "./stores/authStore";
import { supabase } from "./supabase/client";
import { AuthService } from "./services/authService";
import { appEnv } from "./config/env";

const App = () => {
  const isReady = useAuthStore((state: AuthState) => state.isReady);
  const setSession = useAuthStore((state: AuthState) => state.setSession);
  const setUser = useAuthStore((state: AuthState) => state.setUser);
  const setReady = useAuthStore((state: AuthState) => state.setReady);
  const [startupError, setStartupError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const syncSession = async (session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]) => {
      if (!mounted) {
        return;
      }

      setSession(session ?? null);

      if (!session) {
        setUser(null);
        setStartupError(null);
        setReady(true);
        return;
      }

      try {
        const user = await AuthService.resolveUser(session);
        if (!mounted) {
          return;
        }
        setUser(user);
        setStartupError(null);
      } catch (error) {
        if (!mounted) {
          return;
        }
        setUser(AuthService.mapSessionToUser(session));
        setStartupError((error as Error).message);
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    };

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) {
        return;
      }
      if (error) {
        setStartupError(error.message);
        setReady(true);
        return;
      }
      void syncSession(data.session ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncSession(session ?? null);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [setReady, setSession, setUser]);

  if (!appEnv.isSupabaseConfigured && !appEnv.enableDemoLogin) {
    return (
      <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-6">
        <div className="max-w-xl rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-soft">
          <h1 className="text-2xl font-bold tracking-tight">Application setup required</h1>
          <p className="mt-3 text-sm text-on-surface-variant">
            Set the missing environment variables before using the production build.
          </p>
          <p className="mt-4 text-sm font-medium text-on-surface">
            Missing: {appEnv.missingSupabaseVars.join(", ")}
          </p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-6">
        <p className="text-sm text-on-surface-variant">Restoring your session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {startupError ? (
        <div className="border-b border-outline-variant/20 bg-error-container/40 px-4 py-3 text-sm text-on-surface">
          {startupError}
        </div>
      ) : null}
      <Outlet />
    </div>
  );
};

export default App;
