import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { ActivityLog } from '@/types'

interface UseActivityLogsOptions {
  agentFilter?: string
}

interface UseActivityLogsResult {
  logs: ActivityLog[]
  loading: boolean
  error: string | null
}

export function useActivityLogs({ agentFilter }: UseActivityLogsOptions = {}): UseActivityLogsResult {
  const [logs, setLogs]       = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchLogs() {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('activity_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(200)

      if (agentFilter) {
        query = query.eq('agent', agentFilter)
      }

      const { data, error: sbError } = await query

      if (cancelled) return

      if (sbError) {
        setError(sbError.message)
      } else {
        setLogs(data ?? [])
      }
      setLoading(false)
    }

    fetchLogs()
    return () => { cancelled = true }
  }, [agentFilter])

  return { logs, loading, error }
}
