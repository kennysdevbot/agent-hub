import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const navItems = [
  { to: '/projects', label: '📁 Projects' },
  { to: '/activity',  label: '📋 Activity Log' },
]

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-5 py-4 border-b border-gray-200">
          <h1 className="text-lg font-bold tracking-tight text-gray-900">🎯 Agent Hub</h1>
          <p className="text-xs text-gray-500 mt-0.5">Kenny's dev team</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-400">Leon · Jill · Chris · Barry</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
