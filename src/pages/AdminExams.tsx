import { ChangeEvent, FormEvent, useState } from "react";
import AdminShell from "../components/AdminShell";
import { useExamsRooms } from "../hooks/useExamsRooms";
import { Exam } from "../types/domain";

const AdminExams = () => {
  const { exams, createExam, deleteExam } = useExamsRooms();
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [department, setDepartment] = useState("");
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reportingTime, setReportingTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title || !courseCode || !department || !examDate) return;
    await createExam({
      title,
      course_code: courseCode,
      department,
      exam_date: examDate,
      start_time: startTime,
      end_time: endTime,
      reporting_time: reportingTime,
      duration_minutes: Number(durationMinutes || 0),
    });
    setTitle("");
    setCourseCode("");
    setDepartment("");
    setExamDate("");
    setStartTime("");
    setEndTime("");
    setReportingTime("");
    setDurationMinutes("");
  };

  return (
    <AdminShell>
      <section>
        <h1 className="text-2xl font-extrabold tracking-tight">Exams</h1>
        <form
          className="mt-6 grid gap-3 rounded-xl bg-surface-container-lowest p-6 shadow-soft"
          onSubmit={handleSubmit}
        >
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Title"
          value={title}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
        />
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Course code"
          value={courseCode}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCourseCode(event.target.value)
          }
        />
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Department"
          value={department}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDepartment(event.target.value)
          }
        />
        <input
          className="rounded border px-3 py-2 text-sm"
          type="date"
          value={examDate}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setExamDate(event.target.value)
          }
        />
        <div className="grid grid-cols-3 gap-2">
          <input
            className="rounded border px-3 py-2 text-sm"
            type="time"
            value={startTime}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setStartTime(event.target.value)
            }
          />
          <input
            className="rounded border px-3 py-2 text-sm"
            type="time"
            value={endTime}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEndTime(event.target.value)
            }
          />
          <input
            className="rounded border px-3 py-2 text-sm"
            type="time"
            value={reportingTime}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setReportingTime(event.target.value)
            }
          />
        </div>
        <input
          className="rounded border px-3 py-2 text-sm"
          type="number"
          placeholder="Duration minutes"
          value={durationMinutes}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDurationMinutes(event.target.value)
          }
        />
          <button className="primary-gradient rounded px-4 py-2 text-sm font-semibold text-on-primary">
            Add Exam
          </button>
        </form>

        <div className="mt-6 grid gap-3">
          {exams.map((exam: Exam) => (
            <div
              key={exam.id}
              className="rounded-xl bg-surface-container-lowest p-4 text-sm shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{exam.title}</p>
                  <p className="text-xs text-on-surface-variant">{exam.exam_date}</p>
                </div>
                <button className="text-xs text-error" onClick={() => deleteExam(exam.id)}>
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

export default AdminExams;
