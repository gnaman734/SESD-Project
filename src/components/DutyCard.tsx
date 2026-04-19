import { DutyDetailed, DutyStatus } from "../types/domain";
import StatusBadge from "./StatusBadge";

type DutyCardProps = {
  duty: DutyDetailed;
  onMarkArrival?: (dutyId: string, reportingTime: Date) => void;
};

const DutyCard = ({ duty, onMarkArrival }: DutyCardProps) => {
  const canMarkArrival = duty.status === DutyStatus.PENDING && !!onMarkArrival;
  const reportingTime = duty.exam?.reporting_time
    ? new Date(`${duty.exam.exam_date}T${duty.exam.reporting_time}`)
    : null;

  return (
    <div className="rounded-xl bg-surface-container-lowest p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-on-surface">{duty.exam?.title ?? "Duty"}</h3>
          <p className="text-xs text-on-surface-variant">
            Room {duty.room?.room_number ?? "-"} · {duty.exam?.exam_date ?? ""}
          </p>
        </div>
        <StatusBadge status={duty.punctuality_status} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant">
        <span>Status: {duty.status}</span>
        {canMarkArrival && reportingTime && (
          <button
            className="primary-gradient rounded px-3 py-1 text-on-primary"
            onClick={() => onMarkArrival?.(duty.id, reportingTime)}
          >
            Mark Arrival
          </button>
        )}
      </div>
    </div>
  );
};

export default DutyCard;
