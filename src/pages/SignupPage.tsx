import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import { UserRole } from "../types/domain";
import { appEnv } from "../config/env";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.INSTRUCTOR);
  const [department, setDepartment] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!appEnv.isSupabaseConfigured) {
      setError(appEnv.supabaseConfigurationMessage);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!acceptedTerms) {
      setError("Please accept the terms to continue.");
      return;
    }
    try {
      setError(null);
      await AuthService.signUp({
        email,
        password,
        fullName,
        role,
        department: role === UserRole.INSTRUCTOR ? department : undefined,
        employeeCode: role === UserRole.INSTRUCTOR ? employeeCode : undefined,
      });
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-surface-container-highest/30 blur-[120px]" />
      </div>
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-semibold text-xs tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm">security</span>
              Institutional Integrity
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter leading-tight text-on-background">
              Join the Digital <br />
              <span className="text-primary-container">Registrar Network</span>
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
              Access high-precision invigilation tools and administrative clarity designed for modern academic excellence.
            </p>
          </div>
          <div className="space-y-6 border-l-2 border-primary/10 pl-6">
            <div>
              <p className="font-bold text-on-surface">Role-Based Orchestration</p>
              <p className="text-sm text-on-surface-variant">
                Automated task delivery tailored to your institutional designation.
              </p>
            </div>
            <div>
              <p className="font-bold text-on-surface">Seamless Integration</p>
              <p className="text-sm text-on-surface-variant">
                Connect with department schedules and room allocations in real-time.
              </p>
            </div>
          </div>
          <div className="pt-8">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-outline">
              IIMS Registrar System © 2024
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <div className="glass-card w-full max-w-[540px] p-10 rounded-xl shadow-soft border border-outline-variant/10">
            <header className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">Create your account</h2>
              <p className="text-on-surface-variant text-sm mt-1">Select your role to get started with IIMS.</p>
            </header>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-outline">Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-surface-container-low cursor-pointer hover:bg-surface-container-high transition-all">
                    <input
                      className="sr-only peer"
                      name="role"
                      type="radio"
                      value={UserRole.ADMIN}
                      checked={role === UserRole.ADMIN}
                      onChange={() => setRole(UserRole.ADMIN)}
                    />
                    <span className="material-symbols-outlined text-outline peer-checked:text-primary mb-2 transition-colors">
                      admin_panel_settings
                    </span>
                    <span className="text-sm font-semibold text-on-surface">Administrator</span>
                  </label>
                  <label className="relative flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-surface-container-low cursor-pointer hover:bg-surface-container-high transition-all">
                    <input
                      className="sr-only peer"
                      name="role"
                      type="radio"
                      value={UserRole.INSTRUCTOR}
                      checked={role === UserRole.INSTRUCTOR}
                      onChange={() => setRole(UserRole.INSTRUCTOR)}
                    />
                    <span className="material-symbols-outlined text-outline peer-checked:text-primary mb-2 transition-colors">
                      school
                    </span>
                    <span className="text-sm font-semibold text-on-surface">Instructor</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">Full Name</label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-outline/60"
                    placeholder="Dr. John Doe"
                    type="text"
                    value={fullName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setFullName(event.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">Email Address</label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-outline/60"
                    placeholder="john.doe@iims.edu"
                    type="email"
                    value={email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setEmail(event.target.value)
                    }
                  />
                </div>
              </div>
              {role === UserRole.INSTRUCTOR && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-on-surface-variant ml-1">Department</label>
                    <input
                      className="w-full bg-white border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                      placeholder="Computer Science"
                      value={department}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setDepartment(event.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-on-surface-variant ml-1">Employee Code</label>
                    <input
                      className="w-full bg-white border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60"
                      placeholder="IIMS-EMP-000"
                      value={employeeCode}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setEmployeeCode(event.target.value)
                      }
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">Password</label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant ml-1">Confirm Password</label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    placeholder="••••••••"
                    type="password"
                    value={confirmPassword}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 px-1 pt-2">
                <input
                  className="mt-1 rounded border-outline-variant text-primary focus:ring-primary/20"
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setAcceptedTerms(event.target.checked)
                  }
                />
                <label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="terms">
                  I agree to the <span className="text-primary font-semibold">Institutional Terms of Service</span> and
                  acknowledge the <span className="text-primary font-semibold">Privacy Policy</span>.
                </label>
              </div>
              {error && <p className="text-xs text-error">{error}</p>}
              {!appEnv.isSupabaseConfigured ? (
                <p className="text-xs text-on-surface-variant">
                  Account creation is disabled until Supabase environment variables are configured.
                </p>
              ) : null}
              <div className="space-y-4 pt-4">
                <button
                  className="primary-gradient w-full py-4 rounded-lg text-on-primary font-bold text-sm shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!appEnv.isSupabaseConfigured}
                  type="submit"
                >
                  Create Account
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <div className="text-center">
                  <p className="text-sm text-on-surface-variant">
                    Already have an account?
                    <Link className="text-primary font-bold hover:underline ml-1" to="/">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 p-8 hidden xl:block opacity-20 pointer-events-none">
        <div className="flex flex-col items-end gap-2">
          <div className="w-48 h-1 bg-primary-container"></div>
          <div className="w-32 h-1 bg-primary"></div>
          <div className="w-64 h-1 bg-outline-variant"></div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
