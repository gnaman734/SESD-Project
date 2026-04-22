# Intelligent Invigilation Management System

## Overview

The Intelligent Invigilation Management System (IIMS) is a production-ready full-stack web application that automates and streamlines exam invigilation duty management across academic institutions. From duty assignment and arrival tracking to workload balancing and punctuality analytics — every operational action is handled intelligently and fairly.

Traditional invigilation scheduling is done manually through spreadsheets and emails, creating blind spots around fairness, accountability, and real-time visibility. IIMS fills this gap by providing a **Workload Intelligence Engine** — a core algorithmic component that continuously analyzes duty distribution, detects imbalances, and surfaces smart recommendations for administrators. This engine is decoupled from the UI layer, enforcing clean separation between business logic and presentation.

---

## Problem Statement

- **Manual scheduling burden** — Administrators manually assign invigilation duties with no automated fairness checks, leading to uneven workload distribution across instructors.
- **No punctuality accountability** — Institutions have no standardized system to detect, record, or report late arrivals for exam duties.
- **Lack of real-time visibility** — Duty statuses, arrival confirmations, and workload metrics are not available in real time, forcing admins to rely on stale data.
- **No actionable recommendations** — When creating new duties, administrators have no intelligent guidance on who to assign — decisions are entirely manual and subjective.
- **Fragmented instructor experience** — Instructors have no single place to view their upcoming duties, mark arrivals, or track their personal performance history.

---

## Scope

### In Scope
- Role-based authentication for Administrators and Instructors (Supabase Auth + JWT)
- Full duty lifecycle management: create, assign, edit, delete
- One-click arrival marking with automatic punctuality detection (30-minute buffer rule)
- Workload Intelligence Engine with overload/underutilization flagging
- Auto-suggestion system recommending the least-loaded instructor for new duties
- Real-time data sync via Supabase Realtime subscriptions
- Analytics dashboard with charts, statistics, and trend visualizations
- Instructor profiles with personal performance metrics and punctuality history
- Row Level Security (RLS) for database-level access control
- Full CRUD for instructors, exams, rooms, and duties

### Out of Scope (Milestone 1)
- Automated email/SMS notifications for duty assignments
- Calendar integrations (Google Calendar, Outlook)
- Mobile native application (web-only for now)
- Multi-institution / multi-tenant support
- AI-based conflict detection across instructor schedules
- Exportable PDF or CSV duty reports

---

## Key Features

### 1. Workload Intelligence Engine
The analytical core of the platform. Continuously computes duty distribution across all instructors and flags imbalances in real time.

| Status | Condition |
|---|---|
| **Overloaded** | Instructor duties > 120% of average |
| **Balanced** | Instructor duties within ±20% of average |
| **Underutilized** | Instructor duties < 80% of average |

The engine also drives the Auto-Suggestion feature: when creating a new duty, the system recommends the instructor with the fewest current assignments, optionally filtered by department, and displays their variance from the group average.

### 2. Duty Management
Administrators can create, edit, and delete duty assignments linking exams, rooms, and instructors. Duties support multiple assignments on the same day for the same instructor. A detailed duties view joins exam, room, and instructor data for full context at a glance.

### 3. Punctuality Detection & Tracking
Instructors mark their own arrival with a single click. The system automatically evaluates punctuality: arrival must occur at least 30 minutes before the exam reporting time. All late arrivals are logged, flagged on the admin dashboard, and factored into each instructor's personal performance profile.

### 4. Analytics Dashboard
Administrators get a real-time overview of duty distribution, punctuality trends, and workload balance — visualized through charts built with Recharts. Instructor-level statistics are aggregated via database views and cached for performance. The dashboard surfaces repeat offenders and distribution outliers instantly.

### 5. Instructor Dashboard & Profile
Each instructor has a personalized dashboard showing upcoming and past duties grouped by date. A profile page exposes personal punctuality trends, total duties completed, and performance metrics over time — giving instructors full transparency into their own record.

### 6. Real-Time Data Sync
All data updates — duty assignments, arrival markings, instructor changes — propagate instantly across all connected sessions via Supabase Realtime subscriptions. Administrators and instructors always see live state without manual refresh.

### 7. Authentication & Security
Supabase Auth handles JWT-based authentication with role metadata embedded at signup. Row Level Security policies enforce access at the database level: instructors can only view and update their own duties, while admins have full access. Credentials are managed via environment variables and never committed to source control.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Backend | Supabase (PostgreSQL + Auth + RLS + Realtime) |
| Styling | TailwindCSS |
| State Management | Zustand |
| Charts | Recharts |
| Routing | React Router v6 |
| Date Handling | date-fns |
| Deployment | Vercel / Netlify |

---

## Architecture & Design

The application follows a clean separation of concerns across three layers: **Pages** (UI/routing), **Hooks** (data-fetching and business logic), and **Utils** (pure algorithmic functions).

Key architectural decisions:

- **Workload and punctuality logic** is isolated in `utils/workload.js` and `utils/punctuality.js` — fully testable, UI-independent pure functions
- **Custom hooks** (`useDuties`, `useInstructors`, `useExamsRooms`) abstract all Supabase interactions away from components
- **Zustand** manages global auth state with minimal boilerplate
- **Database views** (`duties_detailed`, `instructor_stats`) offload aggregation to the database, keeping frontend queries simple
- **Triggers** (`update_analytics_cache`) auto-update cached statistics on every duty mutation, ensuring dashboard metrics are always fresh

---

## User Roles

| Role | Description |
|---|---|
| **Instructor** | Views personal duties, marks arrival, tracks punctuality history and performance stats |
| **Administrator** | Full system access — manages duties, instructors, exams, rooms, and views org-wide analytics |
