import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import Projects from '@/pages/Projects'
import Tasks from '@/pages/Tasks'
import ActivityLog from '@/pages/ActivityLog'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId/tasks" element={<Tasks />} />
        <Route path="/activity" element={<ActivityLog />} />
      </Routes>
    </Layout>
  )
}
