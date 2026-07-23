export type Priority = 'low' | 'medium' | 'high'
export type ProjectStatus = 'backlog' | 'in-progress' | 'done'
export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  order: number
  createdAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  priority: Priority
  tags: string[]
  tasks: Task[]
  createdAt: string
  updatedAt: string
}

export interface FilterState {
  search: string
  status: ProjectStatus | 'all'
  priority: Priority | 'all'
  tags: string[]
}
