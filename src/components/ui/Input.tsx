import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const inputClass = 'w-full rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all'

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</label>}
      <input className={`${inputClass} ${className}`} {...props} />
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</label>}
      <textarea className={`${inputClass} min-h-[80px] resize-y ${className}`} {...props} />
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</label>}
      <select className={`${inputClass} cursor-pointer ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-zinc-900">{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
