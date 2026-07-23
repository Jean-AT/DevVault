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
      className="block p-4 rounded-2xl glass glass-hover transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-2.5">
        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1 text-[15px]">
          {project.title}
        </h3>
        <Badge color={status.color}>
          <StatusIcon size={10} className="mr-1" />
          {status.label}
        </Badge>
      </div>

      {project.description && (
        <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
          {project.description.replace(/[#*`]/g, '').slice(0, 120)}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge color={priorityColors[project.priority]}>
          {project.priority}
        </Badge>
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
        {project.tags.length > 3 && (
          <Badge>+{project.tags.length - 3}</Badge>
        )}
      </div>

      {totalTasks > 0 && (
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 font-medium tabular-nums">
            {doneTasks}/{totalTasks}
          </span>
        </div>
      )}

      <div className="flex items-center gap-1 mt-3 text-[10px] text-zinc-500">
        <Calendar size={10} />
        {new Date(project.updatedAt).toLocaleDateString()}
      </div>
    </Link>
  )
}
