import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types'

interface UseProjectsResult {
  projects: Project[]
  loading: boolean
  error: string | null
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchProjects() {
      setLoading(true)
      setError(null)

      const { data, error: sbError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (cancelled) return

      if (sbError) {
        setError(sbError.message)
      } else {
        setProjects(data ?? [])
      }
      setLoading(false)
    }

    fetchProjects()
    return () => { cancelled = true }
  }, [])

  return { projects, loading, error }
}
