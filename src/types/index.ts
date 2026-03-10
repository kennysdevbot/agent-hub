// ─── Projects ──────────────────────────────────────────────────────────────

export type ProjectStatus = 'planning' | 'active' | 'paused' | 'done'

export interface Project {
  id: string
  name: string
  status: ProjectStatus
  created_at: string
  updated_at: string
}

// ─── Tasks ─────────────────────────────────────────────────────────────────

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  project_id: string
  title: string
  assigned_to: string | null  // agent name
  status: TaskStatus
  created_at: string
}

// ─── Activity Logs ─────────────────────────────────────────────────────────

export interface ActivityLog {
  id: string
  agent: string    // e.g. "leon", "jill", "chris", "barry"
  model: string    // e.g. "claude-opus-4", "claude-sonnet-4-6"
  action: string   // description of what the agent did
  timestamp: string // ISO timestamp
}
