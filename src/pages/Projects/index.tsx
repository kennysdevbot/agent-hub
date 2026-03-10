import { Link } from 'react-router-dom'
import { useProjects } from './useProjects'
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '@/constants'
import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/types'

export default function Projects() {
  const { projects, loading, error } = useProjects()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <p className="text-sm text-gray-500 mt-1">All active and past projects.</p>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Loading projects…</p>
      )}

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Error: {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-sm text-gray-500">No projects found.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tasks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{project.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        PROJECT_STATUS_COLORS[project.status as ProjectStatus],
                      )}
                    >
                      {PROJECT_STATUS_LABELS[project.status as ProjectStatus] ?? project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/projects/${project.id}/tasks`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      View tasks →
                    </Link>
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
