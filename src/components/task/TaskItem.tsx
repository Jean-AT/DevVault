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
      <div className="p-3 rounded-xl glass border border-purple-500/20 space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl glass-input px-3 py-2 text-sm"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (Markdown)"
          className="w-full rounded-xl glass-input px-3 py-2 text-sm min-h-[60px] resize-y"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="rounded-xl glass-input px-2 py-1.5 text-xs cursor-pointer"
        >
          <option value="low" className="bg-zinc-900">Low</option>
          <option value="medium" className="bg-zinc-900">Medium</option>
          <option value="high" className="bg-zinc-900">High</option>
        </select>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}>Save</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`group flex items-start gap-2 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all duration-200 ${task.status === 'done' ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-0.5 pt-0.5">
        {!isFirst && (
          <button onClick={onMoveUp} className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-600 hover:text-zinc-300 transition-all cursor-pointer" title="Move up">
            <GripVertical size={10} className="rotate-180" />
          </button>
        )}
        {!isLast && (
          <button onClick={onMoveDown} className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-600 hover:text-zinc-300 transition-all cursor-pointer" title="Move down">
            <GripVertical size={10} />
          </button>
        )}
      </div>

      <button onClick={onToggle} className="mt-0.5 cursor-pointer shrink-0 transition-transform hover:scale-110">
        <StatusIcon size={17} className={`transition-colors ${
          task.status === 'done' ? 'text-emerald-400' :
          task.status === 'in-progress' ? 'text-amber-400' :
          'text-zinc-500'
        }`} />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            onClick={() => setEditing(true)}
            className={`text-sm text-zinc-200 cursor-pointer hover:text-white transition-colors ${
              task.status === 'done' ? 'line-through text-zinc-500' : ''
            }`}
          >
            {task.title}
          </span>
          <Badge color={priorityColors[task.priority]}>{task.priority}</Badge>
          <Badge color={statusColors[task.status]}>{task.status.replace('-', ' ')}</Badge>
        </div>

        {task.description && (
          <div className="mt-1.5">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-purple-400 transition-colors cursor-pointer"
            >
              {expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
              {expanded ? 'Hide' : 'Details'}
            </button>
            {expanded && (
              <div className="mt-1.5 pl-3 border-l border-white/10 prose prose-invert prose-xs max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{task.description}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
        title="Delete task"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}
