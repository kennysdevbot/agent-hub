# Architecture

## System Overview

```
┌─────────────────────────────────────────────┐
│              Web Dashboard (React)           │
│  Tailwind CSS · Zustand · RTK Query         │
└──────────────────┬──────────────────────────┘
                   │ REST API
┌──────────────────▼──────────────────────────┐
│           API Server (Express)               │
│  Routes: /projects /tasks /agents /activity  │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│            SQLite Database                   │
└─────────────────────────────────────────────┘
```

Agents interact via the REST API (or a thin CLI wrapper). Kenny views everything through the web dashboard.

## Tech Stack

| Layer | Tech | Why |
|-------|------|-----|
| UI Framework | React 18 + TypeScript | Type-safe, component-driven |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Server State | RTK Query | Caching, auto-refetch, devtools |
| Local UI State | Zustand | Lightweight, no boilerplate |
| Backend | Node.js + Express | Simple, JS ecosystem |
| Database | SQLite (via better-sqlite3) | Zero-config, file-based, fast reads |
| Build | Vite | Fast dev server, clean builds |

## Data Model

### agents
| Column | Type | Notes |
|--------|------|-------|
| id | TEXT (PK) | e.g. "leon", "jill", "chris", "barry" |
| name | TEXT | Display name |
| role | TEXT | "principal", "senior", "mid", "junior" |
| model | TEXT | e.g. "claude-opus-4", "claude-sonnet-4" |
| status | TEXT | "idle", "working", "offline" |

### projects
| Column | Type | Notes |
|--------|------|-------|
| id | TEXT (PK) | UUID |
| name | TEXT | Project name |
| description | TEXT | What it is |
| status | TEXT | "planning", "active", "paused", "done" |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### tasks
| Column | Type | Notes |
|--------|------|-------|
| id | TEXT (PK) | UUID |
| project_id | TEXT (FK) | → projects.id |
| title | TEXT | Short description |
| description | TEXT | Details |
| assigned_to | TEXT (FK) | → agents.id |
| status | TEXT | "todo", "in_progress", "review", "done", "blocked" |
| priority | TEXT | "low", "medium", "high", "critical" |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### activity_logs
| Column | Type | Notes |
|--------|------|-------|
| id | TEXT (PK) | UUID |
| agent_id | TEXT (FK) | → agents.id |
| task_id | TEXT (FK) | → tasks.id (nullable) |
| model | TEXT | Model used for this action |
| action | TEXT | What happened |
| outcome | TEXT | "success", "failure", "partial" |
| details | TEXT | Free-form description |
| timestamp | TEXT | ISO timestamp |

## API Endpoints

```
GET/POST       /api/projects
GET/PATCH/DEL  /api/projects/:id
GET/POST       /api/projects/:id/tasks
GET/PATCH/DEL  /api/tasks/:id
GET            /api/agents
PATCH          /api/agents/:id
GET/POST       /api/activity
GET            /api/dashboard/stats
```

## Dashboard Views

1. **Overview** — active projects, agent status cards, recent activity feed
2. **Project Detail** — task board (kanban-style), progress stats
3. **Activity Log** — filterable table: by agent, by project, by date range
4. **Agent View** — per-agent workload, history, current task

## Key Decisions

- **SQLite over Postgres:** This is a single-user tool. SQLite is simpler, no server needed, easy to backup (it's one file).
- **Zustand + RTK Query:** Zustand for ephemeral UI state (filters, modals). RTK Query for everything server-side (auto-caching, invalidation).
- **Agent API first:** The API should be clean enough that agents can POST activity logs and update task status without any wrapper. CLI wrapper is optional later.
