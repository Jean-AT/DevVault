import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface CustomSelectProps {
  label?: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  className?: string
}

export function CustomSelect({ label, value, options, onChange, className = '' }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-gray-100 backdrop-blur-sm transition-all hover:bg-white/[0.07] hover:border-white/[0.15] cursor-pointer focus:outline-none focus:border-sky-500/50"
        >
          <span className={!selected ? 'text-gray-500' : ''}>
            {selected?.label || 'Select...'}
          </span>
          <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute z-50 mt-1.5 w-full rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 py-1.5 overflow-hidden animate-in">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer ${
                  opt.value === value
                    ? 'text-sky-400 bg-sky-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
