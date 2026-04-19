import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import AdminShell from "../components/AdminShell";
import { useDuties } from "../hooks/useDuties";
import { useExamsRooms } from "../hooks/useExamsRooms";
import { useInstructors } from "../hooks/useInstructors";
import { AuthState, useAuthStore } from "../stores/authStore";
import {
  DutyStatus,
  Exam,
  Instructor,
  PunctualityStatus,
  Room,
} from "../types/domain";

const AdminDuties = () => {
  const { duties, createDuty, deleteDuty } = useDuties();
  const { exams, rooms } = useExamsRooms();
  const { instructors } = useInstructors();
  const user = useAuthStore((state: AuthState) => state.user);
  const [examId, setExamId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [notes, setNotes] = useState("");

  const canSubmit = examId && roomId && instructorId;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    await createDuty({
      exam_id: examId,
      room_id: roomId,
      instructor_id: instructorId,
      assigned_by: user?.id,
      status: DutyStatus.PENDING,
      punctuality_status: PunctualityStatus.PENDING,
      notes,
    });
    setNotes("");
  };

  const examOptions = useMemo(
    () =>
      exams.map((exam: Exam) => ({
        value: exam.id,
        label: `${exam.title} (${exam.exam_date})`,
      })),
    [exams]
  );

  return (
    <AdminShell>
      <section>
        <h1 className="text-2xl font-extrabold tracking-tight">Duty Assignments</h1>
        <form
          className="mt-6 grid gap-3 rounded-xl bg-surface-container-lowest p-6 shadow-soft"
          onSubmit={handleSubmit}
        >
        <select
          className="rounded border px-3 py-2 text-sm"
          value={examId}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setExamId(event.target.value)
          }
        >
          <option value="">Select exam</option>
          {examOptions.map((option: { value: string; label: string }) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          className="rounded border px-3 py-2 text-sm"
          value={roomId}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setRoomId(event.target.value)
          }
        >
          <option value="">Select room</option>
          {rooms.map((room: Room) => (
            <option key={room.id} value={room.id}>
              {room.room_number} · {room.building}
            </option>
          ))}
        </select>
        <select
          className="rounded border px-3 py-2 text-sm"
          value={instructorId}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setInstructorId(event.target.value)
          }
        >
          <option value="">Select instructor</option>
          {instructors.map((instructor: Instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.full_name}
            </option>
          ))}
        </select>
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Notes"
          value={notes}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setNotes(event.target.value)
          }
        />
          <button
            className="primary-gradient rounded px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-60"
            disabled={!canSubmit}
          >
            Create Duty
          </button>
        </form>

        <div className="mt-6 grid gap-3">
          {duties.map((duty) => (
            <div
              key={duty.id}
              className="rounded-xl bg-surface-container-lowest p-4 text-sm shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{duty.exam?.title ?? "Duty"}</p>
                  <p className="text-xs text-on-surface-variant">
                    {duty.instructor?.full_name ?? "Instructor"} · {duty.room?.room_number ?? "Room"}
                  </p>
                </div>
                <button className="text-xs text-error" onClick={() => deleteDuty(duty.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
};

export default AdminDuties;
