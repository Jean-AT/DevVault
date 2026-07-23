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

const statuses: TaskStatus[] = ['todo', 'in-progress', 'done']
function getNextStatus(current: TaskStatus): TaskStatus {
  return statuses[(statuses.indexOf(current) + 1) % statuses.length]
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
    onAdd({ title: newTitle.trim(), description: '', status: 'todo', priority: newPriority })
    setNewTitle(''); setNewPriority('medium'); setAdding(false)
  }

  const move = (arr: string[], from: number, to: number) => {
    const a = [...arr]; [a[from], a[to]] = [a[to], a[from]]; return a
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-white text-sm">Tasks ({tasks.length})</h3>
          {tasks.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-20 h-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-sky-500/60 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[10px] text-gray-500 font-medium">{doneCount}/{tasks.length}</span>
            </div>
          )}
        </div>
        <Button size="sm" onClick={() => setAdding(true)}><Plus size={14} />Add Task</Button>
      </div>

      {adding && (
        <div className="mb-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-2">
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Task title" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-sky-500/50" autoFocus onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
          <div className="flex items-center gap-2">
            <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as Priority)} className="rounded-xl bg-white/5 border border-white/10 px-2 py-1.5 text-xs text-gray-300 cursor-pointer">
              <option value="low" className="bg-gray-900">Low</option>
              <option value="medium" className="bg-gray-900">Medium</option>
              <option value="high" className="bg-gray-900">High</option>
            </select>
            <Button size="sm" onClick={handleAdd}>Add</Button>
            <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setNewTitle('') }}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-0.5">
        {sorted.map((task, i) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => onUpdate(task.id, { status: getNextStatus(task.status) })}
            onUpdate={(u) => onUpdate(task.id, u)}
            onDelete={() => onDelete(task.id)}
            onMoveUp={() => i > 0 && onReorder(move(sorted.map((t) => t.id), i, i - 1))}
            onMoveDown={() => i < sorted.length - 1 && onReorder(move(sorted.map((t) => t.id), i, i + 1))}
            isFirst={i === 0}
            isLast={i === sorted.length - 1}
          />
        ))}
      </div>

      {tasks.length === 0 && <div className="text-center py-12"><p className="text-sm text-gray-500">No tasks yet. Break your project into pieces.</p></div>}
    </div>
  )
}
