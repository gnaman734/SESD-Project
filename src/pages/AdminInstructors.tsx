import { ChangeEvent, FormEvent, useState } from "react";
import AdminShell from "../components/AdminShell";
import { useInstructors } from "../hooks/useInstructors";
import { Instructor } from "../types/domain";

const AdminInstructors = () => {
  const { instructors, createInstructor, deleteInstructor } = useInstructors();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!fullName || !email || !department || !employeeCode) return;
    await createInstructor({
      full_name: fullName,
      email,
      department,
      employee_code: employeeCode,
    });
    setFullName("");
    setEmail("");
    setDepartment("");
    setEmployeeCode("");
  };

  return (
    <AdminShell>
      <section>
        <h1 className="text-2xl font-extrabold tracking-tight">Instructors</h1>
        <form
          className="mt-6 grid gap-3 rounded-xl bg-surface-container-lowest p-6 shadow-soft"
          onSubmit={handleSubmit}
        >
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Full name"
          value={fullName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFullName(event.target.value)
          }
        />
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
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
          placeholder="Employee code"
          value={employeeCode}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setEmployeeCode(event.target.value)
          }
        />
          <button className="primary-gradient rounded px-4 py-2 text-sm font-semibold text-on-primary">
            Add Instructor
          </button>
        </form>

        <div className="mt-6 grid gap-3">
          {instructors.map((instructor: Instructor) => (
            <div
              key={instructor.id}
              className="rounded-xl bg-surface-container-lowest p-4 text-sm shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{instructor.full_name}</p>
                  <p className="text-xs text-on-surface-variant">{instructor.department}</p>
                </div>
                <button
                  className="text-xs text-error"
                  onClick={() => deleteInstructor(instructor.id)}
                >
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

export default AdminInstructors;
