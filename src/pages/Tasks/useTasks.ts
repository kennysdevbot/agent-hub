import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Task } from '@/types'

interface UseTasksResult {
  tasks: Task[]
  loading: boolean
  error: string | null
}

export function useTasks(projectId: string): UseTasksResult {
  const [tasks, setTasks]   = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!projectId) return
    let cancelled = false

    async function fetchTasks() {
      setLoading(true)
      setError(null)

      const { data, error: sbError } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (cancelled) return

      if (sbError) {
        setError(sbError.message)
      } else {
        setTasks(data ?? [])
      }
      setLoading(false)
    }

    fetchTasks()
    return () => { cancelled = true }
  }, [projectId])

  return { tasks, loading, error }
}
