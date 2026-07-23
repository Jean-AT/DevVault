import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Edit, Trash2, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react'
import { useStore } from '../store/projectStore'
import { ProjectForm } from '../components/project/ProjectForm'
import { TaskList } from '../components/task/TaskList'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const statusConfig = {
  backlog: { label: 'Backlog', color: 'default' as const, icon: Circle },
  'in-progress': { label: 'In Progress', color: 'warning' as const, icon: Clock },
  done: { label: 'Done', color: 'success' as const, icon: CheckCircle2 },
}

const priorityColors = {
  low: 'default' as const,
  medium: 'warning' as const,
  high: 'danger' as const,
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = useStore((s) => s.getProject(id || ''))
  const updateProject = useStore((s) => s.updateProject)
  const deleteProject = useStore((s) => s.deleteProject)
  const addTask = useStore((s) => s.addTask)
  const updateTask = useStore((s) => s.updateTask)
  const deleteTask = useStore((s) => s.deleteTask)
  const reorderTasks = useStore((s) => s.reorderTasks)
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary dark:text-text-dark-secondary">Project not found.</p>
        <Link to="/" className="text-primary hover:underline mt-2 inline-block">Back to projects</Link>
      </div>
    )
  }

  const status = statusConfig[project.status]
  const StatusIcon = status.icon

  const handleUpdate = (data: Parameters<typeof updateProject>[1]) => {
    updateProject(project.id, data)
    setEditing(false)
  }

  const handleDelete = () => {
    deleteProject(project.id)
    navigate('/')
  }

  const handleAddTask = (taskData: Parameters<typeof addTask>[1]) => {
    addTask(project.id, taskData)
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-text-secondary dark:text-text-dark-secondary hover:text-primary transition-colors">
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-text dark:text-text-dark">{project.title}</h1>
            <Badge color={status.color}>
              <StatusIcon size={12} className="mr-1" />
              {status.label}
            </Badge>
            <Badge color={priorityColors[project.priority]}>{project.priority}</Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-text-secondary dark:text-text-dark-secondary">
            <Calendar size={12} />
            Created {new Date(project.createdAt).toLocaleDateString()}
            {project.updatedAt !== project.createdAt && (
              <span> · Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Edit size={14} />
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => setConfirmDelete(true)}>
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      </div>

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}

      {project.description && (
        <div className="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.description}</ReactMarkdown>
          </div>
        </div>
      )}

      <div className="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
        <TaskList
          tasks={project.tasks}
          onAdd={handleAddTask}
          onUpdate={(taskId, updates) => updateTask(project.id, taskId, updates)}
          onDelete={(taskId) => deleteTask(project.id, taskId)}
          onReorder={(taskIds) => reorderTasks(project.id, taskIds)}
        />
      </div>

      <Modal isOpen={editing} onClose={() => setEditing(false)} title="Edit Project">
        <ProjectForm project={project} onSave={handleUpdate} onClose={() => setEditing(false)} />
      </Modal>

      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete Project">
        <p className="text-sm text-text-secondary dark:text-text-dark-secondary mb-4">
          Are you sure you want to delete <strong>{project.title}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
