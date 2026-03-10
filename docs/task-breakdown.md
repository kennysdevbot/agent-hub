# Task Breakdown — Agent Hub

## Phase 2: Foundation (Barry)

| # | Task | Agent | Priority |
|---|------|-------|----------|
| 2.1 | Define TypeScript types/interfaces for all data models (Agent, Project, Task, ActivityLog) | Barry | High |
| 2.2 | Create constants file (statuses, priorities, roles, API routes) | Barry | High |
| 2.3 | Scaffold Vite + React + TS project with Tailwind | Barry | High |
| 2.4 | Create base layout components (Sidebar, Header, PageContainer) | Barry | Medium |
| 2.5 | Create reusable UI primitives (Button, Badge, Card, Table) | Barry | Medium |

## Phase 3: Backend API (Jill)

| # | Task | Agent | Priority |
|---|------|-------|----------|
| 3.1 | Set up Express server with SQLite (better-sqlite3) | Jill | High |
| 3.2 | Create DB schema + migration script | Jill | High |
| 3.3 | Implement CRUD routes for projects | Jill | High |
| 3.4 | Implement CRUD routes for tasks (nested under projects) | Jill | High |
| 3.5 | Implement agents endpoint (list, update status) | Jill | Medium |
| 3.6 | Implement activity log endpoint (create, list with filters) | Jill | High |
| 3.7 | Implement dashboard stats aggregation endpoint | Jill | Medium |
| 3.8 | Seed script with agent data (Leon, Jill, Chris, Barry) | Jill | Low |

## Phase 4: Frontend Core (Jill)

| # | Task | Agent | Priority |
|---|------|-------|----------|
| 4.1 | Set up RTK Query API slice with base endpoints | Jill | High |
| 4.2 | Set up Zustand store for UI state (filters, selected project) | Jill | High |
| 4.3 | Build Overview Dashboard (agent cards, project summary, activity feed) | Jill | High |
| 4.4 | Build Project Detail view with task board | Jill | High |
| 4.5 | Build Activity Log view (filterable table) | Jill | Medium |
| 4.6 | Build Agent View (per-agent workload + history) | Jill | Medium |

## Phase 5: CI/CD & Deployment (Chris)

| # | Task | Agent | Priority |
|---|------|-------|----------|
| 5.1 | Set up GitHub Actions: lint + type-check on PR | Chris | High |
| 5.2 | Set up GitHub Actions: build + test on push to main | Chris | High |
| 5.3 | Dockerfile for full-stack (Express serves React build) | Chris | High |
| 5.4 | Docker Compose config for local dev | Chris | Medium |
| 5.5 | Deployment config (target TBD — likely Kenny's server) | Chris | Medium |

## Phase 6: Polish & Agent Integration (Jill + Chris)

| # | Task | Agent | Priority |
|---|------|-------|----------|
| 6.1 | CLI wrapper for agents to log activity / update tasks | Jill | Medium |
| 6.2 | WebSocket or polling for real-time dashboard updates | Chris | Low |
| 6.3 | Error handling, loading states, empty states | Jill | Medium |
| 6.4 | Responsive design pass | Chris | Low |

## Execution Order

1. **Barry** kicks off Phase 2 (types, constants, scaffold, base components)
2. **Jill** starts Phase 3 (backend) as soon as types are ready from 2.1
3. **Jill** moves to Phase 4 (frontend core) once backend routes are up
4. **Chris** starts Phase 5 (CI/CD) in parallel with Phase 3
5. **Jill + Chris** collaborate on Phase 6 (polish)

## Dependencies

- Phase 3 depends on: 2.1 (types), 2.2 (constants)
- Phase 4 depends on: 2.3-2.5 (scaffold + components), 3.x (API)
- Phase 5 depends on: 2.3 (needs a project to build)
- Phase 6 depends on: 3.x + 4.x complete
