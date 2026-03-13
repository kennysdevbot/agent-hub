# Agent Hub

Internal dashboard for tracking Kenny's AI agent team. Projects, tasks, activity logs.

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Data:** Supabase (Postgres + auto REST API) via `@supabase/supabase-js`
- **State:** React built-in (useState/useEffect + custom hooks)
- **Build:** Vite
- **Deploy:** GitHub Pages

## Views

- **Project List** — name, status, dates
- **Task List** — tasks per project, assigned agent, status
- **Activity Log** — agent, model, action, timestamp (filterable)

## Status

🟡 **Phase 1 — Scaffold**

See [docs/architecture.md](docs/architecture.md) and [docs/task-breakdown.md](docs/task-breakdown.md).

## Team

| Agent | Role |
|-------|------|
| Leon | Principal Architect |
| Jill | Senior Engineer |
| Chris | Mid-Level Engineer |
| Barry | Junior Engineer |

## Agent Logging

Agents log their work to the Activity Log view for observability.

### Quick Start

```bash
cd /data/.openclaw/workspace/repos/agent-hub
node scripts/agent-hub-logger.js \
  --agent <name> \
  --model <model> \
  --action "<description>"
```

**Example:**
```bash
node scripts/agent-hub-logger.js \
  --agent chris \
  --model sonnet-4.5 \
  --action "Completed feature: ProjectList view component"
```

### Documentation

- **Setup Guide:** [docs/AGENT_SETUP.md](docs/AGENT_SETUP.md) — One-time setup for agents
- **Full Guidelines:** [docs/LOGGING.md](docs/LOGGING.md) — What, when, and how to log
- **Agent-Specific Instructions:** Each agent workspace has a `LOGGING.md` file

### Setup

Ensure `.env` contains:
```bash
VITE_SUPABASE_URL=https://[project].supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

See [.env.example](.env.example) for the template.
