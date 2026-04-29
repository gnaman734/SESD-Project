# SESD-Project

## Project Overview
This repository contains the SESD project for the Intelligent Invigilation Management System (IIMS). It includes a React + TypeScript front end, a Supabase schema for the backend, and submission-ready documentation in the `document/` folder.

## Repository Contents

- `document/`: submission-ready diagrams and supporting notes.
- `src/`: React application source.
- `supabase/schema.sql`: database schema, triggers, and RLS policies.
- `supabase/seed.sql`: optional sample data for local testing.
- `idea.md`: project notes.

## How to Use
1. Clone the repository:
   ```bash
   git clone https://github.com/gnaman734/SESD-Project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SESD-Project
   ```
3. Open the relevant files to explore the diagrams and documentation.

### Run the front-end
1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Set `VITE_ENABLE_DEMO_LOGIN=false` for production deployments.
5. Start the dev server with `npm run dev`.

### Production build
1. Run `npm run build`.
2. Deploy the generated `dist/` folder.
3. For Vercel, keep `vercel.json` so SPA routes rewrite to `index.html`.
4. Do not enable demo login in production.
5. Run `npm run check` before every release to execute typecheck, tests, and build in sequence.

### CI
- GitHub Actions workflow: `.github/workflows/ci.yml`
- Runs on each push to `main` and on pull requests.
- Validates `npm ci`, `npm run typecheck`, `npm run test:run`, and `npm run build`.

### Sign up
Use the Sign up link on the login screen to create instructor or admin accounts. Instructor sign-up creates both the auth user and the linked instructor profile.

### Apply the database schema
Run the SQL in [supabase/schema.sql](supabase/schema.sql) inside your Supabase SQL editor.

### Optional seed data
Run [supabase/seed.sql](supabase/seed.sql) after the schema to load sample instructors, exams, rooms, and a duty.

### Tests
Run the utility tests with `npm test -- --run`.

## License
This project is licensed under the terms of the LICENSE file included in the repository.
