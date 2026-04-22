import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthState, useAuthStore } from "../stores/authStore";

type AdminShellProps = {
  children: ReactNode;
};

const AdminShell = ({ children }: AdminShellProps) => {
  const user = useAuthStore((state: AuthState) => state.user);
  const logout = useAuthStore((state: AuthState) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex">
      <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-surface-container-high z-50">
        <div className="flex flex-col h-full py-8">
          <div className="px-8 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <div>
                <h1 className="font-black text-indigo-900 uppercase tracking-widest text-sm">
                  IIMS Admin
                </h1>
                <p className="text-[10px] text-slate-500 font-medium">Institutional Clarity</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            <Link
              className="flex items-center gap-4 text-slate-500 hover:text-indigo-700 px-8 py-3 transition-all hover:bg-surface-container-low"
              to="/admin"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-sans text-sm tracking-wide">Dashboard</span>
            </Link>
            <Link
              className="flex items-center gap-4 text-slate-500 hover:text-indigo-700 px-8 py-3 transition-all hover:bg-surface-container-low"
              to="/admin/duties"
            >
              <span className="material-symbols-outlined">assignment_ind</span>
              <span className="font-sans text-sm tracking-wide">Duties</span>
            </Link>
            <Link
              className="flex items-center gap-4 text-slate-500 hover:text-indigo-700 px-8 py-3 transition-all hover:bg-surface-container-low"
              to="/admin/instructors"
            >
              <span className="material-symbols-outlined">group</span>
              <span className="font-sans text-sm tracking-wide">Instructors</span>
            </Link>
            <Link
              className="flex items-center gap-4 text-slate-500 hover:text-indigo-700 px-8 py-3 transition-all hover:bg-surface-container-low"
              to="/admin/exams"
            >
              <span className="material-symbols-outlined">description</span>
              <span className="font-sans text-sm tracking-wide">Exams</span>
            </Link>
            <Link
              className="flex items-center gap-4 text-slate-500 hover:text-indigo-700 px-8 py-3 transition-all hover:bg-surface-container-low"
              to="/admin/rooms"
            >
              <span className="material-symbols-outlined">meeting_room</span>
              <span className="font-sans text-sm tracking-wide">Rooms</span>
            </Link>
          </nav>
          <div className="pt-6 border-t border-outline-variant/20 flex flex-col">
            <button className="flex items-center gap-4 text-slate-500 hover:text-indigo-700 px-8 py-3 transition-all hover:bg-surface-container-low">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-sans text-sm tracking-wide">Settings</span>
            </button>
            <button
              className="flex items-center gap-4 text-slate-500 hover:text-error px-8 py-3 transition-all hover:bg-surface-container-low"
              onClick={handleLogout}
              type="button"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-sans text-sm tracking-wide">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 ml-64 overflow-y-auto min-h-screen">
        <header className="sticky top-0 z-40 bg-indigo-50/80 backdrop-blur-xl shadow-sm">
          <div className="flex justify-between items-center w-full px-8 py-3">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold tracking-tighter text-indigo-900">
                IIMS Registrar
              </span>
              <div className="relative group hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  search
                </span>
                <input
                  className="bg-white/50 border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Search institutional records..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <button className="relative text-slate-500 hover:text-indigo-600 transition-colors active:scale-95 duration-200">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-indigo-50"></span>
                </button>
                <button className="text-slate-500 hover:text-indigo-600 transition-colors active:scale-95 duration-200">
                  <span className="material-symbols-outlined">help_outline</span>
                </button>
              </div>
              <div className="flex items-center gap-3 pl-6 border-l border-indigo-100">
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-900 leading-none">
                    {user?.full_name ?? "Admin"}
                  </p>
                  <p className="text-[10px] text-slate-500">Chief Registrar</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-200" />
              </div>
            </div>
          </div>
        </header>
        <div className="p-8 space-y-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminShell;
