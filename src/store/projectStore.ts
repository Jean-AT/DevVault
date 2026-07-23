import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { Project, Task, TaskStatus, FilterState } from '../types'
import { loadProjects, saveProjects, loadTheme, saveTheme } from '../utils/storage'

interface AppState {
  projects: Project[]
  theme: 'light' | 'dark'
  filters: FilterState

  setTheme: (theme: 'light' | 'dark') => void
  setFilters: (filters: Partial<FilterState>) => void

  addProject: (project: Omit<Project, 'id' | 'tasks' | 'createdAt' | 'updatedAt'>) => Project
  updateProject: (id: string, updates: Partial<Omit<Project, 'id' | 'tasks' | 'createdAt'>>) => void
  deleteProject: (id: string) => void

  addTask: (projectId: string, task: Omit<Task, 'id' | 'createdAt' | 'order'>) => void
  updateTask: (projectId: string, taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  deleteTask: (projectId: string, taskId: string) => void
  reorderTasks: (projectId: string, taskIds: string[]) => void
  toggleTaskStatus: (projectId: string, taskId: string) => void

  importProjects: (projects: Project[]) => void
  clearAll: () => void

  getFilteredProjects: () => Project[]
  getProject: (id: string) => Project | undefined
  getAllTags: () => string[]
}

const taskStatuses: TaskStatus[] = ['todo', 'in-progress', 'done']

export const useStore = create<AppState>((set, get) => ({
  projects: loadProjects(),
  theme: loadTheme(),
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
    tags: [],
  },

  setTheme: (theme) => {
    saveTheme(theme)
    set({ theme })
  },

  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters } })),

  addProject: (projectData) => {
    const now = new Date().toISOString()
    const project: Project = {
      ...projectData,
      id: uuidv4(),
      tasks: [],
      createdAt: now,
      updatedAt: now,
    }
    set((s) => {
      const projects = [...s.projects, project]
      saveProjects(projects)
      return { projects }
    })
    return project
  },

  updateProject: (id, updates) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    )
    saveProjects(projects)
    return { projects }
  }),

  deleteProject: (id) => set((s) => {
    const projects = s.projects.filter((p) => p.id !== id)
    saveProjects(projects)
    return { projects }
  }),

  addTask: (projectId, taskData) => set((s) => {
    const projects = s.projects.map((p) => {
      if (p.id !== projectId) return p
      const maxOrder = p.tasks.reduce((max, t) => Math.max(max, t.order), -1)
      const task: Task = {
        ...taskData,
        id: uuidv4(),
        order: maxOrder + 1,
        createdAt: new Date().toISOString(),
      }
      return { ...p, tasks: [...p.tasks, task], updatedAt: new Date().toISOString() }
    })
    saveProjects(projects)
    return { projects }
  }),

  updateTask: (projectId, taskId, updates) => set((s) => {
    const projects = s.projects.map((p) => {
      if (p.id !== projectId) return p
      return {
        ...p,
        tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
        updatedAt: new Date().toISOString(),
      }
    })
    saveProjects(projects)
    return { projects }
  }),

  deleteTask: (projectId, taskId) => set((s) => {
    const projects = s.projects.map((p) => {
      if (p.id !== projectId) return p
      return {
        ...p,
        tasks: p.tasks.filter((t) => t.id !== taskId),
        updatedAt: new Date().toISOString(),
      }
    })
    saveProjects(projects)
    return { projects }
  }),

  reorderTasks: (projectId, taskIds) => set((s) => {
    const projects = s.projects.map((p) => {
      if (p.id !== projectId) return p
      const taskMap = new Map(p.tasks.map((t) => [t.id, t]))
      const tasks = taskIds
        .map((id, i) => {
          const task = taskMap.get(id)
          return task ? { ...task, order: i } : null
        })
        .filter(Boolean) as Task[]
      return { ...p, tasks, updatedAt: new Date().toISOString() }
    })
    saveProjects(projects)
    return { projects }
  }),

  toggleTaskStatus: (projectId, taskId) => {
    const state = get()
    const project = state.projects.find((p) => p.id === projectId)
    const task = project?.tasks.find((t) => t.id === taskId)
    if (!task) return
    const currentIndex = taskStatuses.indexOf(task.status)
    const nextStatus = taskStatuses[(currentIndex + 1) % taskStatuses.length]
    state.updateTask(projectId, taskId, { status: nextStatus })
  },

  importProjects: (projects) => set((s) => {
    const merged = [...s.projects, ...projects]
    saveProjects(merged)
    return { projects: merged }
  }),

  clearAll: () => {
    saveProjects([])
    set({ projects: [] })
  },

  getFilteredProjects: () => {
    const { projects, filters } = get()
    return projects.filter((p) => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const inTitle = p.title.toLowerCase().includes(q)
        const inDesc = p.description.toLowerCase().includes(q)
        const inTasks = p.tasks.some((t) => t.title.toLowerCase().includes(q))
        if (!inTitle && !inDesc && !inTasks) return false
      }
      if (filters.status !== 'all' && p.status !== filters.status) return false
      if (filters.priority !== 'all' && p.priority !== filters.priority) return false
      if (filters.tags.length > 0 && !filters.tags.some((t) => p.tags.includes(t))) return false
      return true
    })
  },

  getProject: (id) => get().projects.find((p) => p.id === id),

  getAllTags: () => {
    const tags = new Set<string>()
    get().projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  },
}))
