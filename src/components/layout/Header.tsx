import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Vault, Home, Settings } from 'lucide-react'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const links = [
    { to: '/', label: 'Projects', icon: Home },
    { to: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white">
              <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Vault size={16} className="text-gray-300" />
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
                      active
                        ? 'bg-white/10 text-white backdrop-blur-sm border border-white/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
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
              className="sm:hidden p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 sm:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute top-14 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="px-4 py-3 space-y-1">
              {links.map((link) => {
                const Icon = link.icon
                const active = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
