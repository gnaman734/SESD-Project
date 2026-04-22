# SESD-Project

## Project Overview
This repository contains the SESD-Project, which includes various diagrams and documentation for software engineering and system design. The project aims to provide a comprehensive understanding of the system's architecture, use cases, and workflows.

This workspace now includes a runnable front-end scaffold for the Intelligent Invigilation Management System (IIMS), plus a Supabase schema for the backend.

## Repository Contents

- **Classdiagram.md**: Contains the class diagram for the project, illustrating the relationships between classes.
- **ERDiagram.md**: Includes the entity-relationship diagram, showcasing the database structure.
- **Sequencediagram.md**: Details the sequence of interactions in the system.
- **Usecasediagram.md**: Describes the use cases and their interactions.
- **idea.md**: A document outlining the initial ideas and concepts for the project.
- **document/**: Organized submission-ready documentation files:
  - `addIdea.md`
  - `Sequence Diagram.md`
  - `Class Diagram.md`
  - `Use Case Diagram.md`
  - `ER Diagram.md`
- **LICENSE**: The license file for the project.
- **src/**: React + TypeScript front-end scaffold.
- **supabase/schema.sql**: Database schema, triggers, and RLS policies.

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
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ENABLE_DEMO_LOGIN` (`false` for production)
3. Start the dev server: `npm run dev`

### Production build
1. Run `npm run build`
2. Deploy the generated `dist/` folder.
3. For Vercel, keep `vercel.json` in the repo so SPA routes rewrite to `index.html`.

### Sign up
Use the Sign up link on the login screen to create instructor or admin accounts. Instructor sign-up will also create a linked instructor profile.

### Apply the database schema
Run the SQL in [supabase/schema.sql](supabase/schema.sql) inside your Supabase SQL editor.

### Optional seed data
Run [supabase/seed.sql](supabase/seed.sql) after the schema to load sample instructors, exams, rooms, and a duty.

### Tests
Run the utility tests with `npm run test`.

## License
This project is licensed under the terms of the LICENSE file included in the repository.
