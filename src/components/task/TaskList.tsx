import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Task, Priority, TaskStatus } from '../../types'
import { TaskItem } from './TaskItem'
import { Button } from '../ui/Button'

interface TaskListProps {
  tasks: Task[]
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'order'>) => void
  onUpdate: (taskId: string, updates: Partial<Task>) => void
  onDelete: (taskId: string) => void
  onReorder: (taskIds: string[]) => void
}

export function TaskList({ tasks, onAdd, onUpdate, onDelete, onReorder }: TaskListProps) {
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState<Priority>('medium')

  const sorted = [...tasks].sort((a, b) => a.order - b.order)
  const doneCount = tasks.filter((t) => t.status === 'done').length
  const progress = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0

  const handleAdd = () => {
    if (!newTitle.trim()) return
    onAdd({
      title: newTitle.trim(),
      description: '',
      status: 'todo' as TaskStatus,
      priority: newPriority,
    })
    setNewTitle('')
    setNewPriority('medium')
    setAdding(false)
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const ids = sorted.map((t) => t.id)
    ;[ids[index - 1], ids[index]] = [ids[index], ids[index - 1]]
    onReorder(ids)
  }

  const handleMoveDown = (index: number) => {
    if (index === sorted.length - 1) return
    const ids = sorted.map((t) => t.id)
    ;[ids[index], ids[index + 1]] = [ids[index + 1], ids[index]]
    onReorder(ids)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-text dark:text-text-dark">
            Tasks ({tasks.length})
          </h3>
          {tasks.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs text-text-secondary dark:text-text-dark-secondary">
                {doneCount}/{tasks.length}
              </span>
            </div>
          )}
        </div>
        <Button size="sm" onClick={() => setAdding(true)}>
          <Plus size={14} />
          Add Task
        </Button>
      </div>

      {adding && (
        <div className="mb-3 p-3 rounded-lg border border-primary/30 bg-primary/5 space-y-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task title"
            className="w-full rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3 py-1.5 text-sm text-text dark:text-text-dark placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }}
          />
          <div className="flex items-center gap-2">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as Priority)}
              className="rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-2 py-1 text-xs text-text dark:text-text-dark focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Button size="sm" onClick={handleAdd}>Add</Button>
            <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setNewTitle('') }}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {sorted.map((task, i) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => onUpdate(task.id, { status: getNextStatus(task.status) })}
            onUpdate={(updates) => onUpdate(task.id, updates)}
            onDelete={() => onDelete(task.id)}
            onMoveUp={() => handleMoveUp(i)}
            onMoveDown={() => handleMoveDown(i)}
            isFirst={i === 0}
            isLast={i === sorted.length - 1}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-text-secondary dark:text-text-dark-secondary">
          <p className="text-sm">No tasks yet. Break your project into implementable pieces.</p>
        </div>
      )}
    </div>
  )
}

const statuses: TaskStatus[] = ['todo', 'in-progress', 'done']

function getNextStatus(current: TaskStatus): TaskStatus {
  const idx = statuses.indexOf(current)
  return statuses[(idx + 1) % statuses.length]
}
