import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer disabled:opacity-50'

  const variants = {
    primary: 'bg-white/10 text-white hover:bg-white/15 border border-white/10',
    danger: 'bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/20',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
    outline: 'border border-white/10 text-gray-300 hover:bg-white/5',
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
