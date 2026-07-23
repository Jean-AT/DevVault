interface BadgeProps {
  children: React.ReactNode
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
}

const colors = {
  default: 'bg-zinc-800 text-zinc-300',
  primary: 'bg-violet-900/50 text-violet-400',
  success: 'bg-emerald-900/50 text-emerald-400',
  warning: 'bg-amber-900/50 text-amber-400',
  danger: 'bg-red-900/50 text-red-400',
}

export function Badge({ children, color = 'default', size = 'sm' }: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colors[color]} ${sizeClass}`}>
      {children}
    </span>
  )
}
