import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthState, useAuthStore } from "../stores/authStore";
import { UserRole } from "../types/domain";
import { appEnv } from "../config/env";

const LoginPage = () => {
  const login = useAuthStore((state: AuthState) => state.login);
  const setUser = useAuthStore((state: AuthState) => state.setUser);
  const role = useAuthStore((state: AuthState) => state.role);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const demoLoginEnabled = appEnv.enableDemoLogin;
  const passwordLoginEnabled = appEnv.isSupabaseConfigured;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!passwordLoginEnabled) {
      setError(appEnv.supabaseConfigurationMessage);
      return;
    }
    try {
      setError(null);
      await login(email, password);
      const currentRole = useAuthStore.getState().role ?? role;
      if (currentRole === UserRole.ADMIN) {
        navigate("/admin");
      } else {
        navigate("/instructor");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDemoLogin = (demoRole: UserRole) => {
    setError(null);
    const createdAt = new Date().toISOString();
    if (demoRole === UserRole.ADMIN) {
      setUser({
        id: "demo-admin",
        email: "admin.demo@iims.local",
        full_name: "Demo Admin",
        role: UserRole.ADMIN,
        instructor_id: null,
        created_at: createdAt,
      });
      navigate("/admin");
      return;
    }

    setUser({
      id: "demo-instructor",
      email: "instructor.demo@iims.local",
      full_name: "Demo Instructor",
      role: UserRole.INSTRUCTOR,
      instructor_id: null,
      created_at: createdAt,
    });
    navigate("/instructor");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <header className="bg-indigo-50/80 backdrop-blur-xl shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-8 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-indigo-900">IIMS Registrar</span>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-indigo-900">help_outline</span>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center pt-16 px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-surface-container-high rounded-full blur-[120px] opacity-40" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-secondary-container rounded-full blur-[120px] opacity-30" />
        </div>
        <div className="relative w-full max-w-md">
          <div className="glass-card bg-surface-container-lowest/90 rounded-xl p-10 shadow-soft">
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-container rounded-full mb-6">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_balance
                </span>
              </div>
              <h1 className="text-2xl font-bold text-on-surface tracking-tight mb-2">Institutional Clarity</h1>
              <p className="text-on-surface-variant text-sm font-medium tracking-wide">
                Enter your credentials to access the Registrar Portal
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">
                    mail
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none rounded-lg text-on-surface placeholder-outline focus:ring-2 focus:ring-primary-fixed-dim transition-all text-sm font-medium"
                    id="email"
                    name="email"
                    placeholder="name@institution.edu"
                    required
                    type="email"
                    value={email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setEmail(event.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none rounded-lg text-on-surface placeholder-outline focus:ring-2 focus:ring-primary-fixed-dim transition-all text-sm font-medium"
                    id="password"
                    name="password"
                    placeholder="••••••••••••"
                    required
                    type="password"
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                    }
                  />
                </div>
              </div>
              {error && <p className="text-xs text-error">{error}</p>}
              {!passwordLoginEnabled ? (
                <p className="text-xs text-on-surface-variant">
                  Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to enable password login.
                </p>
              ) : null}
              <button
                className="primary-gradient w-full py-4 px-6 rounded-lg text-on-primary font-bold tracking-tight shadow-lg active:scale-[0.98] transition-transform duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!passwordLoginEnabled}
                type="submit"
              >
                Login to Dashboard
              </button>
              {demoLoginEnabled ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    className="w-full py-3 px-4 rounded-lg border border-outline-variant/30 text-on-surface text-sm font-semibold hover:bg-surface-container transition-colors"
                    onClick={() => handleDemoLogin(UserRole.INSTRUCTOR)}
                    type="button"
                  >
                    Demo as Instructor
                  </button>
                  <button
                    className="w-full py-3 px-4 rounded-lg border border-outline-variant/30 text-on-surface text-sm font-semibold hover:bg-surface-container transition-colors"
                    onClick={() => handleDemoLogin(UserRole.ADMIN)}
                    type="button"
                  >
                    Demo as Admin
                  </button>
                </div>
              ) : null}
            </form>
            <div className="mt-10 pt-8 border-t border-outline-variant/15 text-center">
              <p className="text-sm text-on-surface-variant font-medium">
                Don&apos;t have an account?
                <Link className="text-primary font-bold ml-1 hover:underline" to="/signup">
                  Request access
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
