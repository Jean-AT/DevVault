import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-purple-600/80 text-white hover:bg-purple-500/90 shadow-lg shadow-purple-500/20',
    danger: 'bg-red-500/80 text-white hover:bg-red-400/90 shadow-lg shadow-red-500/20',
    ghost: 'text-zinc-400 hover:text-white hover:bg-white/5',
    outline: 'border border-white/10 text-zinc-300 hover:bg-white/5 hover:border-white/20',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
