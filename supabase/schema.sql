-- IIMS schema (Supabase / PostgreSQL)

-- Extensions
create extension if not exists "uuid-ossp";

-- Enums
create type user_role as enum ('admin', 'instructor');
create type duty_status as enum ('pending', 'confirmed', 'completed', 'absent');
create type punctuality_status as enum ('pending', 'on_time', 'late', 'absent');
create type workload_status as enum ('overloaded', 'balanced', 'underutilized');
create type audit_action as enum ('CREATE', 'UPDATE', 'DELETE');

-- Tables
create table if not exists instructors (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text unique not null,
  department text not null,
  employee_code text unique not null,
  total_duties int not null default 0,
  on_time_count int not null default 0,
  late_count int not null default 0,
  punctuality_rate numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key,
  email text unique not null,
  full_name text not null,
  role user_role not null default 'instructor',
  instructor_id uuid references instructors (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists exams (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  course_code text not null,
  department text not null,
  exam_date date not null,
  start_time time not null,
  end_time time not null,
  reporting_time time not null,
  duration_minutes int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists rooms (
  id uuid primary key default uuid_generate_v4(),
  room_number text not null,
  building text not null,
  capacity int not null,
  floor text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists duties (
  id uuid primary key default uuid_generate_v4(),
  exam_id uuid not null references exams (id) on delete cascade,
  room_id uuid not null references rooms (id) on delete cascade,
  instructor_id uuid not null references instructors (id) on delete cascade,
  assigned_by uuid references users (id),
  status duty_status not null default 'pending',
  arrival_time timestamptz,
  punctuality_status punctuality_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists analytics_cache (
  id uuid primary key default uuid_generate_v4(),
  instructor_id uuid unique not null references instructors (id) on delete cascade,
  total_duties int not null default 0,
  on_time_count int not null default 0,
  late_count int not null default 0,
  punctuality_rate numeric not null default 0,
  duty_variance numeric not null default 0,
  workload_status workload_status not null default 'balanced',
  last_updated timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references users (id),
  action audit_action not null,
  entity_type text not null,
  entity_id uuid not null,
  before_state jsonb,
  after_state jsonb,
  created_at timestamptz not null default now()
);

-- Views
create or replace view duties_detailed as
select
  d.*, 
  row_to_json(e.*) as exam,
  row_to_json(r.*) as room,
  row_to_json(i.*) as instructor
from duties d
join exams e on e.id = d.exam_id
join rooms r on r.id = d.room_id
join instructors i on i.id = d.instructor_id;

create or replace view instructor_stats as
select
  i.id as instructor_id,
  i.full_name,
  i.department,
  i.total_duties,
  i.on_time_count,
  i.late_count,
  i.punctuality_rate,
  ac.duty_variance,
  ac.workload_status
from instructors i
left join analytics_cache ac on ac.instructor_id = i.id;

-- Triggers
create or replace function update_instructor_stats()
returns trigger as $$
declare
  target_instructor uuid;
begin
  target_instructor := coalesce(new.instructor_id, old.instructor_id);
  update instructors
  set
    total_duties = (select count(*) from duties where instructor_id = target_instructor),
    on_time_count = (select count(*) from duties where instructor_id = target_instructor and punctuality_status = 'on_time'),
    late_count = (select count(*) from duties where instructor_id = target_instructor and punctuality_status = 'late'),
    punctuality_rate = case
      when (select count(*) from duties where instructor_id = target_instructor) = 0 then 0
      else (select count(*) from duties where instructor_id = target_instructor and punctuality_status = 'on_time')::numeric
        / (select count(*) from duties where instructor_id = target_instructor)
    end,
    updated_at = now()
  where id = target_instructor;
  return coalesce(new, old);
end;
$$ language plpgsql;

create trigger duties_after_change
after insert or update or delete on duties
for each row execute function update_instructor_stats();

create or replace function update_analytics_cache()
returns trigger as $$
declare
  target_instructor uuid;
  avg_duties numeric;
  total_duties_val int;
  variance_val numeric;
  status_val workload_status;
begin
  target_instructor := coalesce(new.instructor_id, old.instructor_id);
  avg_duties := coalesce((select avg(total_duties) from instructors), 0);
  total_duties_val := (select total_duties from instructors where id = target_instructor);
  if avg_duties = 0 then
    variance_val := 0;
  else
    variance_val := total_duties_val / avg_duties;
  end if;

  if variance_val >= 1.2 then
    status_val := 'overloaded';
  elsif variance_val <= 0.8 then
    status_val := 'underutilized';
  else
    status_val := 'balanced';
  end if;

  insert into analytics_cache (instructor_id, total_duties, on_time_count, late_count, punctuality_rate, duty_variance, workload_status, last_updated)
  values (
    target_instructor,
    (select total_duties from instructors where id = target_instructor),
    (select on_time_count from instructors where id = target_instructor),
    (select late_count from instructors where id = target_instructor),
    (select punctuality_rate from instructors where id = target_instructor),
    variance_val,
    status_val,
    now()
  )
  on conflict (instructor_id) do update set
    total_duties = excluded.total_duties,
    on_time_count = excluded.on_time_count,
    late_count = excluded.late_count,
    punctuality_rate = excluded.punctuality_rate,
    duty_variance = excluded.duty_variance,
    workload_status = excluded.workload_status,
    last_updated = now();
  return coalesce(new, old);
end;
$$ language plpgsql;

create trigger duties_after_cache
after insert or update or delete on duties
for each row execute function update_analytics_cache();

create or replace function audit_log_trigger()
returns trigger as $$
declare
  action_val audit_action;
begin
  if tg_op = 'INSERT' then
    action_val := 'CREATE';
  elsif tg_op = 'UPDATE' then
    action_val := 'UPDATE';
  else
    action_val := 'DELETE';
  end if;

  insert into audit_logs (actor_id, action, entity_type, entity_id, before_state, after_state)
  values (
    null,
    action_val,
    tg_table_name,
    coalesce(new.id, old.id),
    to_jsonb(old),
    to_jsonb(new)
  );
  return coalesce(new, old);
end;
$$ language plpgsql;

create trigger audit_duties
after insert or update or delete on duties
for each row execute function audit_log_trigger();

-- RLS
alter table users enable row level security;
alter table instructors enable row level security;
alter table duties enable row level security;
alter table analytics_cache enable row level security;

create policy "Admins full access" on users
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Users read own profile" on users
  for select using (id::text = auth.uid()::text);

create policy "Users insert own profile" on users
  for insert with check (id::text = auth.uid()::text);

create policy "Admins full access" on instructors
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Instructors read own profile" on instructors
  for select using (id::text = (auth.jwt() ->> 'instructor_id'));

create policy "Instructors insert own profile" on instructors
  for insert with check (auth.jwt() ->> 'role' = 'instructor');

create policy "Admins full access" on duties
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Instructors read own duties" on duties
  for select using (instructor_id::text = (auth.jwt() ->> 'instructor_id'));

create policy "Instructors update own duties" on duties
  for update using (instructor_id::text = (auth.jwt() ->> 'instructor_id'));

create policy "Admins full access" on analytics_cache
  for all using (auth.jwt() ->> 'role' = 'admin');

create policy "Instructors read own cache" on analytics_cache
  for select using (instructor_id::text = (auth.jwt() ->> 'instructor_id'));
