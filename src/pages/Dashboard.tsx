import { useState } from 'react'
import { Plus, FolderOpen } from 'lucide-react'
import { useStore } from '../store/projectStore'
import { ProjectCard } from '../components/project/ProjectCard'
import { ProjectForm } from '../components/project/ProjectForm'
import { SearchFilters } from '../components/project/SearchFilters'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'

export function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const projects = useStore((s) => s.getFilteredProjects())
  const addProject = useStore((s) => s.addProject)

  const handleCreate = (data: Parameters<typeof addProject>[0]) => {
    addProject(data)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text dark:text-text-dark">Projects</h1>
          <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={16} />
          New Project
        </Button>
      </div>

      <SearchFilters />

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FolderOpen size={48} className="text-text-secondary dark:text-text-dark-secondary mb-4" />
          <h3 className="text-lg font-medium text-text dark:text-text-dark mb-2">No projects yet</h3>
          <p className="text-sm text-text-secondary dark:text-text-dark-secondary mb-4 max-w-md">
            Start by adding your first project idea. Break it down into tasks and track your progress.
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus size={16} />
            Create your first project
          </Button>
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="New Project">
        <ProjectForm onSave={handleCreate} onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  )
}
