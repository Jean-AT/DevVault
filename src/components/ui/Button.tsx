import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer disabled:opacity-50'

  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-500',
    danger: 'bg-red-600 text-white hover:bg-red-500',
    ghost: 'text-zinc-400 hover:text-white hover:bg-zinc-800',
    outline: 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800',
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
