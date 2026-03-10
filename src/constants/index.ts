import type { ProjectStatus, TaskStatus } from '@/types'

// ─── Agents ────────────────────────────────────────────────────────────────

export const AGENTS = ['leon', 'jill', 'chris', 'barry', 'albert'] as const
export type AgentName = (typeof AGENTS)[number]

export const AGENT_LABELS: Record<AgentName, string> = {
  leon:   'Leon (Opus)',
  jill:   'Jill (Sonnet)',
  chris:  'Chris (Sonnet)',
  barry:  'Barry (Haiku)',
  albert: 'Albert (Orchestrator)',
}

// ─── Project Statuses ──────────────────────────────────────────────────────

export const PROJECT_STATUSES: ProjectStatus[] = ['planning', 'active', 'paused', 'done']

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'Planning',
  active:   'Active',
  paused:   'Paused',
  done:     'Done',
}

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  planning: 'bg-purple-100 text-purple-800',
  active:   'bg-green-100 text-green-800',
  paused:   'bg-yellow-100 text-yellow-800',
  done:     'bg-blue-100 text-blue-800',
}

// ─── Task Statuses ─────────────────────────────────────────────────────────

export const TASK_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done']

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo:        'To Do',
  in_progress: 'In Progress',
  done:        'Done',
}

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  todo:        'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-800',
  done:        'bg-green-100 text-green-800',
}
