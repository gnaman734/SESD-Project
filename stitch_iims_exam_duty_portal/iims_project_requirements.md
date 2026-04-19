Master prompt (frontend build + backend integration):
Build the IIMS frontend (React 18 + Vite + TypeScript + Tailwind). Use Supabase JS v2 for all data/auth. The frontend must integrate with the existing Supabase schema (tables, views, and RLS). Implement role‑based routing and two dashboards.
Backend integration requirements:
- Supabase project URL + anon key read from VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
- Auth: email/password login; signup for Instructor and Admin. Signup must:
  1) create Supabase auth user with user_metadata: full_name, role.
  2) insert into users table (id = auth uid, role, email, full_name).
  3) if Instructor, create instructors row and link via instructor_id in users.
- RLS: instructors can only read/update their own duties and analytics_cache. Admin has full access.
- Use views: duties_detailed, instructor_stats for UI lists.
- Tables used: users, instructors, exams, rooms, duties, analytics_cache.
Frontend pages:
- Login page (email/password).
- Signup page with role selection; if instructor, collect department + employee code.
- Admin dashboard: workload distribution chart + list of recent duties + workload badges.
- Admin CRUD: duties, instructors, exams, rooms.
- Instructor dashboard: upcoming/past duties, mark arrival.
- Instructor profile: stats (total duties, on‑time, late, punctuality rate).
- NotFound page.
Core behaviors:
- Mark Arrival: updates duties.arrival_time + punctuality_status computed as arrival <= reporting_time - 30 minutes; status set to confirmed.
- Workload status uses thresholds: overloaded > 1.2× avg, underutilized < 0.8× avg; show badge colors.
- Realtime: subscribe to duties changes for admin dashboard.
Data flow details:
- Use hooks/services for data access; no direct Supabase calls inside components.
- Services: DutyService, InstructorService, ExamService, RoomService, AnalyticsService.
- Hooks: useDuties, useInstructors, useExamsRooms.
- Auth store (Zustand) holds session, user, role; hydrate session on app load.
UI details:
- Clean, modern layout; cards for duties; table/list for admin CRUD; small badges for statuses.
- Ensure empty states and errors are shown.
Deliverables:
- Working frontend with routes:
  / (login), /signup, /admin, /admin/duties, /admin/instructors, /admin/exams, /admin/rooms, /instructor, /instructor/profile.
- Environment variables configured.
- No backend changes required beyond using the existing schema/RLS.