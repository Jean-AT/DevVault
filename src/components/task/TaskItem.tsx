import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { GripVertical, Trash2, ChevronDown, ChevronRight, Circle, Clock, CheckCircle2 } from 'lucide-react'
import type { Task, Priority } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface TaskItemProps {
  task: Task
  onToggle: () => void
  onUpdate: (updates: Partial<Task>) => void
  onDelete: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  isFirst?: boolean
  isLast?: boolean
}

const statusIcons = {
  todo: Circle,
  'in-progress': Clock,
  done: CheckCircle2,
}

const statusColors = {
  todo: 'default' as const,
  'in-progress': 'warning' as const,
  done: 'success' as const,
}

const priorityColors = {
  low: 'default' as const,
  medium: 'warning' as const,
  high: 'danger' as const,
}

export function TaskItem({ task, onToggle, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)

  const StatusIcon = statusIcons[task.status]

  const handleSave = () => {
    onUpdate({ title, description, priority })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3 py-1.5 text-sm text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (Markdown)"
          className="w-full rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3 py-1.5 text-sm text-text dark:text-text-dark placeholder:text-text-secondary min-h-[60px] focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-2 py-1 text-xs text-text dark:text-text-dark focus:outline-none"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}>Save</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`group flex items-start gap-2 p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-dark-hover transition-colors ${task.status === 'done' ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-1 pt-0.5">
        {!isFirst && (
          <button onClick={onMoveUp} className="opacity-0 group-hover:opacity-100 p-0.5 text-text-secondary dark:text-text-dark-secondary hover:text-text dark:hover:text-text-dark cursor-pointer" title="Move up">
            <GripVertical size={12} className="rotate-180" />
          </button>
        )}
        {!isLast && (
          <button onClick={onMoveDown} className="opacity-0 group-hover:opacity-100 p-0.5 text-text-secondary dark:text-text-dark-secondary hover:text-text dark:hover:text-text-dark cursor-pointer" title="Move down">
            <GripVertical size={12} />
          </button>
        )}
      </div>

      <button onClick={onToggle} className="mt-0.5 cursor-pointer shrink-0">
        <StatusIcon size={18} className={`transition-colors ${
          task.status === 'done' ? 'text-success' :
          task.status === 'in-progress' ? 'text-warning' :
          'text-text-secondary dark:text-text-dark-secondary'
        }`} />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            onClick={() => setEditing(true)}
            className={`text-sm font-medium text-text dark:text-text-dark cursor-pointer hover:text-primary transition-colors ${
              task.status === 'done' ? 'line-through' : ''
            }`}
          >
            {task.title}
          </span>
          <Badge color={priorityColors[task.priority]} size="sm">{task.priority}</Badge>
          <Badge color={statusColors[task.status]} size="sm">{task.status.replace('-', ' ')}</Badge>
        </div>

        {task.description && (
          <div className="mt-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-text-secondary dark:text-text-dark-secondary hover:text-primary cursor-pointer"
            >
              {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              {expanded ? 'Hide details' : 'Show details'}
            </button>
            {expanded && (
              <div className="mt-1 pl-4 border-l-2 border-border dark:border-border-dark prose prose-xs dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{task.description}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 rounded text-text-secondary dark:text-text-dark-secondary hover:text-danger hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
        title="Delete task"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
