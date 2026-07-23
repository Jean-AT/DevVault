interface BadgeProps {
  children: React.ReactNode
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
}

const colors = {
  default: 'bg-white/5 text-gray-400 border-white/5',
  primary: 'bg-sky-500/10 text-sky-400 border-sky-500/15',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  danger: 'bg-red-500/10 text-red-400 border-red-500/15',
}

export function Badge({ children, color = 'default', size = 'sm' }: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${colors[color]} ${sizeClass}`}>
      {children}
    </span>
  )
}
