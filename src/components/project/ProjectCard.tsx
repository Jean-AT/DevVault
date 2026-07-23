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
      className="block p-5 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-white group-hover:text-sky-400 transition-colors line-clamp-1 text-[15px]">
          {project.title}
        </h3>
        <Badge color={status.color}>
          <StatusIcon size={10} className="mr-1" />
          {status.label}
        </Badge>
      </div>

      {project.description && (
        <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {project.description.replace(/[#*`]/g, '').slice(0, 120)}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge color={priorityColors[project.priority]}>{project.priority}</Badge>
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
        {project.tags.length > 3 && <Badge>+{project.tags.length - 3}</Badge>}
      </div>

      {totalTasks > 0 && (
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-sky-500/60 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">{doneTasks}/{totalTasks}</span>
        </div>
      )}

      <div className="flex items-center gap-1 mt-3 text-[10px] text-gray-500">
        <Calendar size={10} />
        {new Date(project.updatedAt).toLocaleDateString()}
      </div>
    </Link>
  )
}
