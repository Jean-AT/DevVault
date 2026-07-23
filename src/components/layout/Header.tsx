import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Vault, Home, Settings } from 'lucide-react'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Projects', icon: Home },
    { to: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 text-violet-400 font-bold text-lg">
            <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Vault size={18} />
            </div>
            DevVault
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    active ? 'bg-violet-500/15 text-violet-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Icon size={15} />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-zinc-800 bg-zinc-900">
          <nav className="px-4 py-2 flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    active ? 'bg-violet-500/15 text-violet-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
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
