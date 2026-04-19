import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthState, useAuthStore } from "./stores/authStore";
import { supabase } from "./supabase/client";
import { AuthService } from "./services/authService";

const App = () => {
  const setSession = useAuthStore((state: AuthState) => state.setSession);
  const setUser = useAuthStore((state: AuthState) => state.setUser);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      if (data.session) {
        setUser(AuthService.mapSessionToUser(data.session));
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
      setUser(session ? AuthService.mapSessionToUser(session) : null);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [setSession, setUser]);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Outlet />
    </div>
  );
};

export default App;
