export enum UserRole {
  ADMIN = "admin",
  INSTRUCTOR = "instructor",
}

export enum DutyStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  ABSENT = "absent",
}

export enum PunctualityStatus {
  PENDING = "pending",
  ON_TIME = "on_time",
  LATE = "late",
  ABSENT = "absent",
}

export enum WorkloadStatus {
  OVERLOADED = "overloaded",
  BALANCED = "balanced",
  UNDERUTILIZED = "underutilized",
}

export enum AuditAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type User = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  instructor_id?: string | null;
  created_at: string;
};

export type Instructor = {
  id: string;
  full_name: string;
  email: string;
  department: string;
  employee_code: string;
  total_duties: number;
  on_time_count: number;
  late_count: number;
  punctuality_rate: number;
  created_at: string;
  updated_at: string;
  workload_status?: WorkloadStatus;
  duty_variance?: number;
};

export type Exam = {
  id: string;
  title: string;
  course_code: string;
  department: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  reporting_time: string;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
};

export type Room = {
  id: string;
  room_number: string;
  building: string;
  capacity: number;
  floor: string;
  is_active: boolean;
  created_at: string;
};

export type Duty = {
  id: string;
  exam_id: string;
  room_id: string;
  instructor_id: string;
  assigned_by: string;
  status: DutyStatus;
  arrival_time?: string | null;
  punctuality_status: PunctualityStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
};

export type DutyDetailed = Duty & {
  exam?: Exam;
  room?: Room;
  instructor?: Instructor;
};

export type AnalyticsCache = {
  id: string;
  instructor_id: string;
  total_duties: number;
  on_time_count: number;
  late_count: number;
  punctuality_rate: number;
  duty_variance: number;
  workload_status: WorkloadStatus;
  last_updated: string;
};

export type AuditLog = {
  id: string;
  actor_id: string;
  action: AuditAction;
  entity_type: string;
  entity_id: string;
  before_state?: Record<string, unknown> | null;
  after_state?: Record<string, unknown> | null;
  created_at: string;
};
