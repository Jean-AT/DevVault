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
const priorityColors = { low: 'default' as const, medium: 'warning' as const, high: 'danger' as const }

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = useStore((s) => s.projects.find((p) => p.id === id))
  const updateProject = useStore((s) => s.updateProject)
  const deleteProject = useStore((s) => s.deleteProject)
  const addTask = useStore((s) => s.addTask)
  const updateTask = useStore((s) => s.updateTask)
  const deleteTask = useStore((s) => s.deleteTask)
  const reorderTasks = useStore((s) => s.reorderTasks)
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!project) return (
    <div className="text-center py-24">
      <p className="text-zinc-500">Project not found.</p>
      <Link to="/" className="text-violet-400 text-sm mt-2 inline-block">Back to projects</Link>
    </div>
  )

  const s = statusConfig[project.status]
  const SIcon = s.icon

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-400 transition-colors">
        <ArrowLeft size={14} />Back to projects
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-white tracking-tight">{project.title}</h1>
            <Badge color={s.color}><SIcon size={10} className="mr-1" />{s.label}</Badge>
            <Badge color={priorityColors[project.priority]}>{project.priority}</Badge>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <Calendar size={11} />
            Created {new Date(project.createdAt).toLocaleDateString()}
            {project.updatedAt !== project.createdAt && <span> · Updated {new Date(project.updatedAt).toLocaleDateString()}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}><Edit size={13} />Edit</Button>
          <Button variant="danger" size="sm" onClick={() => setConfirmDelete(true)}><Trash2 size={13} />Delete</Button>
        </div>
      </div>

      {project.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{project.tags.map((t) => <Badge key={t}>{t}</Badge>)}</div>}

      {project.description && (
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.description}</ReactMarkdown>
          </div>
        </div>
      )}

      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <TaskList
          tasks={project.tasks}
          onAdd={(d) => addTask(project.id, d)}
          onUpdate={(tid, u) => updateTask(project.id, tid, u)}
          onDelete={(tid) => deleteTask(project.id, tid)}
          onReorder={(ids) => reorderTasks(project.id, ids)}
        />
      </div>

      <Modal isOpen={editing} onClose={() => setEditing(false)} title="Edit Project">
        <ProjectForm project={project} onSave={(d) => { updateProject(project.id, d); setEditing(false) }} onClose={() => setEditing(false)} />
      </Modal>

      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete Project">
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">Are you sure you want to delete <strong className="text-white">{project.title}</strong>?</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { deleteProject(project.id); navigate('/') }}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
