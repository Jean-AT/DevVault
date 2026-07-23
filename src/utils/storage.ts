import type { Project } from '../types'

const STORAGE_KEY = 'devvault_projects'
const THEME_KEY = 'devvault_theme'

export function loadProjects(): Project[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function loadTheme(): 'light' | 'dark' {
  try {
    const theme = localStorage.getItem(THEME_KEY)
    if (theme === 'dark' || theme === 'light') return theme
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme)
}
