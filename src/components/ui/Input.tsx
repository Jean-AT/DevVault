import React from 'react'

const inputClass = 'w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 backdrop-blur-sm transition-all'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>}
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
      {label && <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>}
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
      {label && <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>}
      <select className={`${inputClass} cursor-pointer ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
