import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Vault, Home, Settings } from 'lucide-react'
import { useStore } from '../../store/projectStore'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const theme = useStore((s) => s.theme)
  const setTheme = useStore((s) => s.setTheme)

  const links = [
    { to: '/', label: 'Projects', icon: Home },
    { to: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border dark:border-border-dark bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg">
            <Vault size={24} />
            <span>DevVault</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-light text-primary dark:bg-primary/20'
                      : 'text-text-secondary dark:text-text-dark-secondary hover:bg-surface-hover dark:hover:bg-surface-dark-hover'
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-dark-hover text-text-secondary dark:text-text-dark-secondary cursor-pointer"
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-dark-hover text-text-secondary dark:text-text-dark-secondary cursor-pointer"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
          <nav className="px-4 py-2 flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-light text-primary dark:bg-primary/20'
                      : 'text-text-secondary dark:text-text-dark-secondary hover:bg-surface-hover dark:hover:bg-surface-dark-hover'
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
