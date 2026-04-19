import InstructorShell from "../components/InstructorShell";
import { useInstructors } from "../hooks/useInstructors";
import { AuthState, useAuthStore } from "../stores/authStore";
import StatusBadge from "../components/StatusBadge";
import { Instructor } from "../types/domain";

const InstructorProfile = () => {
  const user = useAuthStore((state: AuthState) => state.user);
  const { instructors } = useInstructors();

  const profile = instructors.find(
    (instructor: Instructor) => instructor.id === user?.instructor_id
  );

  if (!profile) {
    return <p className="text-sm">No profile data available.</p>;
  }

  return (
    <InstructorShell>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-8 shadow-soft flex flex-col md:flex-row items-end gap-8">
          <div className="absolute top-0 right-0 p-8">
            <span className="text-[120px] font-black text-slate-100/50 select-none leading-none tracking-tighter">
              IIMS
            </span>
          </div>
          <div className="relative z-10">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-indigo-100" />
          </div>
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-md">
                Instructor
              </span>
              {profile.workload_status && <StatusBadge status={profile.workload_status} />}
            </div>
            <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              {profile.full_name}
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-on-surface-variant font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">school</span>
                <span className="text-sm">{profile.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">badge</span>
                <span className="text-sm">{profile.employee_code}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>
                <span className="text-sm">{profile.email}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">assignment</span>
              </div>
              <span className="text-[10px] font-bold text-on-tertiary-container uppercase tracking-widest">
                Yearly
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Total Duties</p>
            <h3 className="text-3xl font-black text-on-surface tracking-tighter">
              {profile.total_duties}
            </h3>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-700">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <span className="text-[10px] font-bold text-on-tertiary-container uppercase tracking-widest">
                Verified
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">On-Time Arrival</p>
            <h3 className="text-3xl font-black text-on-surface tracking-tighter">
              {profile.on_time_count}
            </h3>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-error-container/30 flex items-center justify-center text-error">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <span className="text-[10px] font-bold text-on-tertiary-container uppercase tracking-widest">
                Incidents
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Late Duty Start</p>
            <h3 className="text-3xl font-black text-on-surface tracking-tighter">
              {profile.late_count}
            </h3>
          </div>
          <div className="primary-gradient p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[100px] text-white">analytics</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">star</span>
                </div>
              </div>
              <p className="text-indigo-200 text-sm font-medium mb-1">Punctuality Rate</p>
              <h3 className="text-4xl font-black text-white tracking-tighter">
                {Math.round(profile.punctuality_rate * 100)}%
              </h3>
              <p className="mt-4 text-[10px] font-bold text-white/70 uppercase tracking-widest">
                Performance Tier: ELITE
              </p>
            </div>
          </div>
        </section>
      </div>
    </InstructorShell>
  );
};

export default InstructorProfile;
