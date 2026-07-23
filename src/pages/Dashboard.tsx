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
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={15} />
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
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-5">
            <FolderOpen size={28} className="text-zinc-600" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1.5">No projects yet</h3>
          <p className="text-sm text-zinc-500 mb-5 text-center max-w-sm">
            Add your first project idea. Break it into tasks and track your progress.
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus size={15} />
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
