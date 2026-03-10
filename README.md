# Agent Hub

A web-based observability dashboard for Kenny's AI agent team. Track projects, tasks, agent assignments, and activity logs in one place.

## What It Does

- **Project & Task Management:** Create projects, break them into tasks, assign to agents (Leon, Jill, Chris, Barry)
- **Activity Logs:** Full audit trail — which agent, which model, timestamps, task description, outcome
- **Observability Dashboard:** Real-time view of what's running, what's done, what's blocked
- **Agent-Friendly API:** REST endpoints agents can call to update their own status, log activity, and pull assignments

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **State:** Zustand (local UI state) + RTK Query (server state / API cache)
- **Backend:** Node.js + Express (lightweight API layer)
- **Database:** SQLite (simple, file-based, good enough to start)
- **Deployment:** Docker + GitHub Actions CI/CD

## Status

🟡 **Phase 1 — Planning & Architecture**

See [docs/architecture.md](docs/architecture.md) and [docs/task-breakdown.md](docs/task-breakdown.md).

## Team

| Agent | Role | Focus |
|-------|------|-------|
| Leon | Principal Architect | Architecture, complex systems, hard problems |
| Jill | Senior Engineer | Core features, multi-file refactors |
| Chris | Mid-Level Engineer | CI/CD, deployment, standard features |
| Barry | Junior Engineer | Types, constants, boilerplate components |
