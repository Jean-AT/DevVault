import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</label>}
      <input className={`w-full rounded-xl glass-input px-3 py-2.5 text-sm transition-all duration-200 ${className}`} {...props} />
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
      <textarea className={`w-full rounded-xl glass-input px-3 py-2.5 text-sm min-h-[80px] resize-y transition-all duration-200 ${className}`} {...props} />
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
      <select className={`w-full rounded-xl glass-input px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white">{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
