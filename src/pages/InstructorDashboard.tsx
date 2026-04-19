import DutyCard from "../components/DutyCard";
import InstructorShell from "../components/InstructorShell";
import { AuthState, useAuthStore } from "../stores/authStore";
import { useDuties } from "../hooks/useDuties";

const InstructorDashboard = () => {
  const user = useAuthStore((state: AuthState) => state.user);
  const { duties, loading, error, markArrival } = useDuties(user?.instructor_id ?? undefined);

  const activeDuty = duties[0];

  return (
    <InstructorShell>
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
            Instructor Overview
          </h1>
          <p className="text-on-surface-variant font-medium">
            Welcome back, {user?.full_name ?? "Instructor"}. You have {duties.length} duties scheduled.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-container-low px-6 py-4 rounded-xl text-center">
            <span className="block text-2xl font-black text-indigo-900 leading-none">
              {Math.round((user?.instructor_id ? (duties.length ? 98 : 0) : 0) || 0)}%
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Punctuality Rate
            </span>
          </div>
          <div className="bg-surface-container-low px-6 py-4 rounded-xl text-center">
            <span className="block text-2xl font-black text-indigo-900 leading-none">
              {duties.length}
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Total Duties
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-8">
          <div className="relative overflow-hidden rounded-2xl bg-indigo-900 text-white p-8 h-full shadow-soft flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            <div className="z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-widest uppercase">
                  Ongoing Session
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h3 className="text-3xl font-bold mb-2">
                {activeDuty?.exam?.title ?? "Next Duty"}
              </h3>
              <p className="text-indigo-200 text-lg mb-8 max-w-md">
                Reporting time: {activeDuty?.exam?.reporting_time ?? "--"} in room {activeDuty?.room?.room_number ?? "--"}.
              </p>
            </div>
            <div className="z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl flex flex-col items-center min-w-[80px]">
                  <span className="text-[10px] font-medium opacity-60">Venue</span>
                  <span className="font-bold">{activeDuty?.room?.room_number ?? "--"}</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl flex flex-col items-center min-w-[80px]">
                  <span className="text-[10px] font-medium opacity-60">Time</span>
                  <span className="font-bold">{activeDuty?.exam?.reporting_time ?? "--"}</span>
                </div>
              </div>
              {activeDuty?.exam?.reporting_time && (
                <button
                  className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-xl active:scale-95 transition-all flex items-center gap-2"
                  onClick={() =>
                    markArrival(
                      activeDuty.id,
                      new Date(`${activeDuty.exam?.exam_date}T${activeDuty.exam?.reporting_time}`)
                    )
                  }
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                  Mark Arrival
                </button>
              )}
            </div>
          </div>
        </section>
        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft">
            <h4 className="text-xs font-black uppercase tracking-widest text-outline mb-6">
              Duty Status Distribution
            </h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Confirmed</span>
                  <span className="text-on-surface-variant">{duties.length ? 100 : 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: duties.length ? "100%" : "0%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Pending Response</span>
                  <span className="text-on-surface-variant">{duties.length ? 0 : 100}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: duties.length ? "0%" : "100%" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-high p-8 rounded-2xl border border-white/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-on-secondary-container mb-1">
                  Upcoming This Week
                </p>
                <p className="text-3xl font-black text-indigo-950">{duties.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-900">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-on-secondary-container font-medium">
              Next duty: {activeDuty?.exam?.exam_date ?? "TBD"}
            </p>
          </div>
        </section>
        <section className="col-span-12">
          <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-soft">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-extrabold tracking-tight">Recent & Upcoming Duties</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-surface text-xs font-bold rounded-lg text-indigo-900">
                  Upcoming
                </button>
                <button className="px-4 py-2 hover:bg-surface text-xs font-bold rounded-lg text-outline">
                  Past
                </button>
              </div>
            </div>
            {loading && <p className="text-sm text-on-surface-variant">Loading duties…</p>}
            {error && <p className="text-sm text-error">{error}</p>}
            <div className="grid gap-4">
              {duties.map((duty) => (
                <DutyCard key={duty.id} duty={duty} onMarkArrival={markArrival} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </InstructorShell>
  );
};

export default InstructorDashboard;
