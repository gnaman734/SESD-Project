import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AuthState, useAuthStore } from "../stores/authStore";

type InstructorShellProps = {
  children: ReactNode;
};

const InstructorShell = ({ children }: InstructorShellProps) => {
  const user = useAuthStore((state: AuthState) => state.user);

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen">
      <header className="bg-indigo-50/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm flex justify-between items-center w-full px-8 py-3">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-indigo-900">IIMS Registrar</span>
          <div className="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-1.5 gap-2">
            <span className="material-symbols-outlined text-outline text-sm">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm text-on-surface-variant w-64 placeholder:text-outline-variant"
              placeholder="Search duties or venues..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <button className="text-slate-500 hover:text-indigo-600 transition-colors active:scale-95 duration-200">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-slate-500 hover:text-indigo-600 transition-colors active:scale-95 duration-200">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
          </div>
          <div className="h-8 w-8 rounded-full bg-indigo-200" />
        </div>
      </header>
      <div className="flex">
        <aside className="bg-surface-container-high h-screen w-64 fixed left-0 top-0 pt-20">
          <div className="px-8 mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center text-white">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shield
                </span>
              </div>
              <div>
                <h2 className="font-black text-indigo-900 uppercase tracking-widest text-xs">IIMS</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Instructor</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-col h-full py-2 overflow-y-auto font-sans text-sm tracking-wide">
            <Link
              className="text-slate-500 hover:text-indigo-700 px-8 py-3 transition-all flex items-center gap-3"
              to="/instructor"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </Link>
            <Link
              className="text-slate-500 hover:text-indigo-700 px-8 py-3 transition-all flex items-center gap-3"
              to="/instructor/profile"
            >
              <span className="material-symbols-outlined">account_circle</span>
              <span>Profile</span>
            </Link>
          </nav>
          <div className="mt-auto px-8 pb-8 space-y-4">
            <div className="text-xs font-semibold text-slate-500">
              {user?.full_name ?? "Instructor"}
            </div>
          </div>
        </aside>
        <main className="ml-64 flex-1 min-h-screen p-12">{children}</main>
      </div>
    </div>
  );
};

export default InstructorShell;
