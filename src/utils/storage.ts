import type { Project } from '../types'

const STORAGE_KEY = 'devvault_projects'
const THEME_KEY = 'devvault_theme'

export function loadProjects(): Project[] {
  try {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch {}
}

export function loadTheme(): 'light' | 'dark' {
  try {
    if (typeof window === 'undefined') return 'light'
    const theme = localStorage.getItem(THEME_KEY)
    if (theme === 'dark' || theme === 'light') return theme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {}
}
