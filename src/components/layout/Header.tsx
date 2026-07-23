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
    <header className="sticky top-0 z-40 glass-strong border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 text-purple-400 font-bold text-lg">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Vault size={18} />
            </div>
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-purple-500/15 text-purple-400'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={15} />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-white/5 glass-strong">
          <nav className="px-4 py-2 flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-purple-500/15 text-purple-400'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
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
