import { Link } from 'react-router-dom'
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react'
import type { Project } from '../../types'
import { Badge } from '../ui/Badge'

interface ProjectCardProps {
  project: Project
}

const statusConfig = {
  backlog: { label: 'Backlog', color: 'default' as const, icon: Circle },
  'in-progress': { label: 'In Progress', color: 'warning' as const, icon: Clock },
  done: { label: 'Done', color: 'success' as const, icon: CheckCircle2 },
}

const priorityColors = {
  low: 'default',
  medium: 'warning',
  high: 'danger',
} as const

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status]
  const StatusIcon = status.icon
  const doneTasks = project.tasks.filter((t) => t.status === 'done').length
  const totalTasks = project.tasks.length
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  return (
    <Link
      to={`/project/${project.id}`}
      className="block p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-text dark:text-text-dark group-hover:text-primary transition-colors line-clamp-1">
          {project.title}
        </h3>
        <Badge color={status.color} size="sm">
          <StatusIcon size={12} className="mr-1" />
          {status.label}
        </Badge>
      </div>

      {project.description && (
        <p className="text-sm text-text-secondary dark:text-text-dark-secondary line-clamp-2 mb-3">
          {project.description.replace(/[#*`]/g, '').slice(0, 120)}
        </p>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        <Badge color={priorityColors[project.priority]} size="sm">
          {project.priority}
        </Badge>
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} size="sm">{tag}</Badge>
        ))}
        {project.tags.length > 3 && (
          <Badge size="sm">+{project.tags.length - 3}</Badge>
        )}
      </div>

      {totalTasks > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-text-secondary dark:text-text-dark-secondary whitespace-nowrap">
            {doneTasks}/{totalTasks}
          </span>
        </div>
      )}

      <div className="flex items-center gap-1 mt-3 text-xs text-text-secondary dark:text-text-dark-secondary">
        <Calendar size={12} />
        {new Date(project.updatedAt).toLocaleDateString()}
      </div>
    </Link>
  )
}
