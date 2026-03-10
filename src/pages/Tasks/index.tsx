import { useParams, Link } from 'react-router-dom'
import { useTasks } from './useTasks'
import { TASK_STATUS_LABELS, TASK_STATUS_COLORS, AGENT_LABELS } from '@/constants'
import type { AgentName } from '@/constants'
import { cn } from '@/lib/utils'
import type { TaskStatus } from '@/types'

export default function Tasks() {
  const { projectId } = useParams<{ projectId: string }>()
  const { tasks, loading, error } = useTasks(projectId ?? '')

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/projects"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Projects
        </Link>
        <span className="text-gray-300">/</span>
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Loading tasks…</p>
      )}

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Error: {error}
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p className="text-sm text-gray-500">No tasks found for this project.</p>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {task.assigned_to
                      ? (AGENT_LABELS[task.assigned_to as AgentName] ?? task.assigned_to)
                      : <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        TASK_STATUS_COLORS[task.status as TaskStatus],
                      )}
                    >
                      {TASK_STATUS_LABELS[task.status as TaskStatus] ?? task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
