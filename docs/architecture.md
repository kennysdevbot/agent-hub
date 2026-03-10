# Architecture

## Overview

```
┌─────────────────────────────────────┐
│       Web Dashboard (React)         │
│  Tailwind CSS · Supabase JS Client  │
└────────────────┬────────────────────┘
                 │ REST API (PostgREST)
┌────────────────▼────────────────────┐
│      Supabase (Hosted Postgres)     │
│  Auto REST · RLS                    │
└────────────────▲────────────────────┘
                 │ Supabase JS Client
┌────────────────┴────────────────────┐
│  Agent Scripts (Leon, Jill, Chris,  │
│  Barry) — log activity, update tasks│
└─────────────────────────────────────┘
```

No backend. Frontend and agents both talk directly to Supabase.

## Tech Stack

| Layer | Tech |
|-------|------|
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS |
| State | React built-in (useState, useEffect, custom hooks) |
| Data | `@supabase/supabase-js` — direct queries |
| Database | Supabase (Postgres) |
| Build | Vite |
| Deploy | GitHub Pages (static site) |

## Data Model

### projects
| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | |
| name | TEXT | Project name |
| status | TEXT | planning, active, paused, done |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### tasks
| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | |
| project_id | UUID (FK) | → projects.id |
| title | TEXT | Short description |
| assigned_to | TEXT | Agent name (leon, jill, chris, barry) |
| status | TEXT | todo, in_progress, done |
| created_at | TIMESTAMPTZ | |

### activity_logs
| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | |
| agent | TEXT | Who did it |
| model | TEXT | Model used |
| action | TEXT | What happened |
| timestamp | TIMESTAMPTZ | When |

## Views

1. **Project List** — name, status, dates
2. **Task List** — per project: title, assigned agent, status
3. **Activity Log** — agent, model, action, timestamp — filterable

That's it.

## Security

- Anon key for dashboard (read-only via RLS)
- Service key for agents (read/write)
