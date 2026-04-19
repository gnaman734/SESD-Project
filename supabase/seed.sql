-- Seed data for IIMS (optional)

insert into instructors (full_name, email, department, employee_code)
values
  ('Dr. Aditi Rao', 'aditi.rao@example.edu', 'Computer Science', 'EMP-1001'),
  ('Prof. Vikram Shah', 'vikram.shah@example.edu', 'Mathematics', 'EMP-1002'),
  ('Dr. Meera Iyer', 'meera.iyer@example.edu', 'Physics', 'EMP-1003');

insert into exams (title, course_code, department, exam_date, start_time, end_time, reporting_time, duration_minutes)
values
  ('Data Structures Final', 'CS201', 'Computer Science', current_date + interval '7 days', '10:00', '12:00', '09:30', 120),
  ('Linear Algebra Midterm', 'MA202', 'Mathematics', current_date + interval '10 days', '14:00', '16:00', '13:30', 120);

insert into rooms (room_number, building, capacity, floor)
values
  ('A-101', 'Main Block', 60, '1'),
  ('B-204', 'Science Wing', 80, '2');

insert into duties (exam_id, room_id, instructor_id, status, punctuality_status)
select e.id, r.id, i.id, 'pending', 'pending'
from exams e, rooms r, instructors i
where e.title = 'Data Structures Final'
  and r.room_number = 'A-101'
  and i.full_name = 'Dr. Aditi Rao'
limit 1;
