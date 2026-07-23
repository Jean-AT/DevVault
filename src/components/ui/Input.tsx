import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', ...props }: InputProps) {
  const base = 'w-full rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3 py-2 text-sm text-text dark:text-text-dark placeholder:text-text-secondary dark:placeholder:text-text-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors'

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-text dark:text-text-dark">{label}</label>}
      <input className={`${base} ${className}`} {...props} />
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  const base = 'w-full rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3 py-2 text-sm text-text dark:text-text-dark placeholder:text-text-secondary dark:placeholder:text-text-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y min-h-[80px]'

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-text dark:text-text-dark">{label}</label>}
      <textarea className={`${base} ${className}`} {...props} />
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  const base = 'w-full rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3 py-2 text-sm text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors cursor-pointer'

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-text dark:text-text-dark">{label}</label>}
      <select className={`${base} ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
