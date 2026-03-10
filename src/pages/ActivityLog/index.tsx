import { useState } from 'react'
import { useActivityLogs } from './useActivityLogs'
import { AGENTS, AGENT_LABELS } from '@/constants'
import type { AgentName } from '@/constants'

export default function ActivityLog() {
  const [agentFilter, setAgentFilter] = useState<string>('')
  const { logs, loading, error } = useActivityLogs({ agentFilter: agentFilter || undefined })

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activity Log</h2>
          <p className="text-sm text-gray-500 mt-1">All agent actions across projects.</p>
        </div>

        {/* Agent filter */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="agent-filter" className="text-sm text-gray-600 font-medium">
            Agent:
          </label>
          <select
            id="agent-filter"
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="">All agents</option>
            {AGENTS.map((agent) => (
              <option key={agent} value={agent}>
                {AGENT_LABELS[agent as AgentName]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Loading activity…</p>
      )}

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Error: {error}
        </div>
      )}

      {!loading && !error && logs.length === 0 && (
        <p className="text-sm text-gray-500">No activity logs found.</p>
      )}

      {!loading && !error && logs.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white capitalize">
                      {log.agent}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    {log.model}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-md">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
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
