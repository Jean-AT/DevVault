import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { X, Plus } from 'lucide-react'
import type { Project, Priority, ProjectStatus } from '../../types'
import { Button } from '../ui/Button'
import { Input, Textarea, Select } from '../ui/Input'
import { Badge } from '../ui/Badge'

interface ProjectFormProps {
  project?: Project
  onSave: (data: Omit<Project, 'id' | 'tasks' | 'createdAt' | 'updatedAt'>) => void
  onClose: () => void
}

export function ProjectForm({ project, onSave, onClose }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '')
  const [description, setDescription] = useState(project?.description || '')
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'backlog')
  const [priority, setPriority] = useState<Priority>(project?.priority || 'medium')
  const [tags, setTags] = useState<string[]>(project?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title: title.trim(), description, status, priority, tags })
  }

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
      <Input
        label="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My awesome project idea"
        autoFocus
        required
      />

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Description</label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
        {showPreview ? (
          <div className="w-full rounded-xl glass px-4 py-3 min-h-[120px] prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description || '*No description yet...*'}
            </ReactMarkdown>
          </div>
        ) : (
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project idea (Markdown supported)"
            className="min-h-[120px]"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          options={[
            { value: 'backlog', label: 'Backlog' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />
        <Select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
        />
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
            placeholder="Add a tag"
            className="flex-1 rounded-xl glass-input px-3 py-2 text-sm transition-all"
          />
          <Button type="button" size="sm" onClick={addTag}>
            <Plus size={14} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag}>
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-400 transition-colors cursor-pointer">
                <X size={10} />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        <Button type="submit">{project ? 'Update' : 'Create'} Project</Button>
      </div>
    </form>
  )
}
