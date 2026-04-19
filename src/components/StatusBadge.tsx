import { WorkloadStatus, PunctualityStatus } from "../types/domain";

const colorMap: Record<string, string> = {
  [WorkloadStatus.OVERLOADED]: "bg-error-container text-error",
  [WorkloadStatus.BALANCED]: "bg-surface-container-highest text-primary",
  [WorkloadStatus.UNDERUTILIZED]: "bg-secondary-container text-on-secondary-container",
  [PunctualityStatus.ON_TIME]: "bg-surface-container-highest text-primary",
  [PunctualityStatus.LATE]: "bg-error-container text-error",
  [PunctualityStatus.PENDING]: "bg-surface-container-high text-on-surface-variant",
  [PunctualityStatus.ABSENT]: "bg-error-container text-error",
};

type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const colors = colorMap[status] ?? "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${colors}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
};

export default StatusBadge;
