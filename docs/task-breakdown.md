# Task Breakdown — Agent Hub

## Phase 1: Scaffold (Barry)

| # | Task | Agent |
|---|------|-------|
| 1.1 | Define TypeScript types (Project, Task, ActivityLog) | Barry |
| 1.2 | Create constants (statuses, agent names) | Barry |
| 1.3 | Scaffold Vite + React + TS project with Tailwind | Barry |

## Phase 2: Views + Supabase Integration (Jill)

| # | Task | Agent |
|---|------|-------|
| 2.1 | Set up Supabase client + custom hooks for data fetching | Jill |
| 2.2 | Build Project List view (name, status, dates) | Jill |
| 2.3 | Build Task List view per project (title, agent, status) | Jill |
| 2.4 | Build Activity Log view (filterable by agent/model) | Jill |

## Phase 3: CI/CD + Deploy (Chris)

| # | Task | Agent |
|---|------|-------|
| 3.1 | GitHub Actions: lint + type-check on PR | Chris |
| 3.2 | GitHub Actions: build + deploy to GitHub Pages on push to main | Chris |

## Execution Order

1. Barry does Phase 1 (types, constants, scaffold)
2. Jill does Phase 2 once scaffold is ready
3. Chris does Phase 3 in parallel with Phase 2

## Dependencies

- Phase 2 depends on Phase 1 (needs scaffold + types)
- Phase 3 depends on 1.3 (needs a project to build)
