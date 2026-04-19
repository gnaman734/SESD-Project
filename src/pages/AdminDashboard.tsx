import { useEffect } from "react";
import AdminShell from "../components/AdminShell";
import DutyDistributionChart from "../components/DutyDistributionChart";
import StatusBadge from "../components/StatusBadge";
import { useDuties } from "../hooks/useDuties";
import { useExamsRooms } from "../hooks/useExamsRooms";
import { useInstructors } from "../hooks/useInstructors";
import { RealtimeService } from "../services/realtimeService";
import { Instructor } from "../types/domain";

const AdminDashboard = () => {
  const { duties, fetchDuties } = useDuties();
  const { instructors } = useInstructors();
  const { exams } = useExamsRooms();

  useEffect(() => {
    const channel = RealtimeService.subscribeToDuties(() => fetchDuties());
    return () => {
      channel.unsubscribe();
    };
  }, [fetchDuties]);

  return (
    <AdminShell>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="md:col-span-3 lg:col-span-1 flex flex-col justify-center space-y-2">
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
            Institutional Overview
          </h2>
          <p className="text-on-surface-variant text-sm max-w-xs">
            Monitoring operational flow and academic compliance for the current cycle.
          </p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-soft flex flex-col justify-between group hover:bg-primary transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary-fixed rounded-lg group-hover:bg-primary-container">
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary">
                assignment
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant group-hover:text-primary-fixed-dim uppercase">
              Live
            </span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-black text-primary group-hover:text-on-primary tracking-tighter">
              {duties.length}
            </p>
            <p className="text-xs font-medium text-on-surface-variant group-hover:text-primary-fixed-dim">
              Total Duties Assigned
            </p>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-soft flex flex-col justify-between group hover:bg-primary transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-fixed rounded-lg group-hover:bg-primary-container">
              <span className="material-symbols-outlined text-secondary group-hover:text-on-primary">
                group
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant group-hover:text-primary-fixed-dim uppercase">
              Active
            </span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-black text-primary group-hover:text-on-primary tracking-tighter">
              {instructors.length}
            </p>
            <p className="text-xs font-medium text-on-surface-variant group-hover:text-primary-fixed-dim">
              Active Instructors
            </p>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-soft flex flex-col justify-between group hover:bg-primary transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-tertiary-fixed rounded-lg group-hover:bg-primary-container">
              <span className="material-symbols-outlined text-tertiary group-hover:text-on-primary">
                calendar_today
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant group-hover:text-primary-fixed-dim uppercase">
              Exams
            </span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-black text-primary group-hover:text-on-primary tracking-tighter">
              {exams.length}
            </p>
            <p className="text-xs font-medium text-on-surface-variant group-hover:text-primary-fixed-dim">
              Exams Scheduled
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-soft">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold text-on-surface tracking-tight">
                  Workload Distribution
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Instructor utilization across departments
                </p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-on-surface-variant uppercase">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> High
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-on-surface-variant uppercase">
                  <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span> Low
                </span>
              </div>
            </div>
            <DutyDistributionChart instructors={instructors} />
          </section>
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-soft">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-on-surface tracking-tight">Instructor Status</h3>
              <span className="text-xs font-bold text-primary">View All Staff</span>
            </div>
            <div className="space-y-4">
              {instructors.slice(0, 5).map((instructor: Instructor) => (
                <div
                  key={instructor.id}
                  className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl transition-colors hover:bg-surface-container"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100" />
                    <div>
                      <p className="text-sm font-bold text-on-surface leading-tight">
                        {instructor.full_name}
                      </p>
                      <p className="text-[10px] text-on-surface-variant font-medium">
                        {instructor.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs font-bold text-on-surface">{instructor.total_duties} duties</p>
                      <p className="text-[10px] text-on-surface-variant">Active Load</p>
                    </div>
                    {instructor.workload_status && (
                      <StatusBadge status={instructor.workload_status} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="space-y-8">
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-soft h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-on-surface tracking-tight">Recent Duties</h3>
              <span className="material-symbols-outlined text-on-surface-variant">more_horiz</span>
            </div>
            <div className="space-y-6">
              {duties.slice(0, 4).map((duty) => (
                <div key={duty.id} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary ring-4 ring-primary-fixed"></div>
                    <div className="w-px h-full bg-outline-variant/30 my-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-on-surface">
                        {duty.exam?.title ?? "Exam duty"}
                      </p>
                      <StatusBadge status={duty.punctuality_status} />
                    </div>
                    <p className="text-[11px] text-on-surface-variant mb-2">
                      {duty.instructor?.full_name ?? "Instructor"} • {duty.room?.room_number ?? "Room"}
                    </p>
                    <p className="text-[10px] font-medium text-outline">Just now</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminDashboard;
