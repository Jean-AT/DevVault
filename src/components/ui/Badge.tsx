interface BadgeProps {
  children: React.ReactNode
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
}

const colors = {
  default: 'bg-white/8 text-zinc-400 border-white/5',
  primary: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  danger: 'bg-red-500/15 text-red-400 border-red-500/20',
}

export function Badge({ children, color = 'default', size = 'sm' }: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${colors[color]} ${sizeClass}`}>
      {children}
    </span>
  )
}
