import { useRef } from 'react'
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react'
import { useStore } from '../store/projectStore'
import { exportData, importData } from '../utils/export'
import { Button } from '../components/ui/Button'
import { useState } from 'react'
import { Modal } from '../components/ui/Modal'

export function Settings() {
  const theme = useStore((s) => s.theme)
  const setTheme = useStore((s) => s.setTheme)
  const projects = useStore((s) => s.projects)
  const importProjects = useStore((s) => s.importProjects)
  const clearAll = useStore((s) => s.clearAll)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [confirmClear, setConfirmClear] = useState(false)
  const [importError, setImportError] = useState('')

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportError('')
    try {
      const data = await importData(file)
      importProjects(data)
    } catch {
      setImportError('Invalid file format. Please select a valid DevVault JSON export.')
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text dark:text-text-dark">Settings</h1>
        <p className="text-sm text-text-secondary dark:text-text-dark-secondary mt-1">
          Manage your data and preferences.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text dark:text-text-dark">Appearance</h2>
        <div className="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text dark:text-text-dark">Dark Mode</p>
              <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                Toggle between light and dark theme
              </p>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                theme === 'dark' ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text dark:text-text-dark">Data</h2>

        <div className="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text dark:text-text-dark">Export Data</p>
              <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                Download all {projects.length} project{projects.length !== 1 ? 's' : ''} as JSON
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => exportData(projects)}>
              <Download size={14} />
              Export
            </Button>
          </div>

          <div className="border-t border-border dark:border-border-dark" />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text dark:text-text-dark">Import Data</p>
              <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                Import projects from a DevVault JSON file
              </p>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Upload size={14} />
                Import
              </Button>
            </div>
          </div>
          {importError && (
            <p className="text-sm text-danger">{importError}</p>
          )}

          <div className="border-t border-border dark:border-border-dark" />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-danger">Clear All Data</p>
              <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                Delete all projects and tasks permanently
              </p>
            </div>
            <Button variant="danger" size="sm" onClick={() => setConfirmClear(true)}>
              <Trash2 size={14} />
              Clear All
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text dark:text-text-dark">About</h2>
        <div className="p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
          <p className="font-medium text-text dark:text-text-dark">DevVault v0.1.0</p>
          <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
            A local-first app where devs dump project ideas and break them into implementable tasks.
          </p>
        </div>
      </section>

      <Modal isOpen={confirmClear} onClose={() => setConfirmClear(false)} title="Clear All Data">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-danger mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-text dark:text-text-dark">This will delete everything</p>
              <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                All {projects.length} project{projects.length !== 1 ? 's' : ''} and their tasks will be permanently removed.
                Export your data first if you want to keep a backup.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmClear(false)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => { clearAll(); setConfirmClear(false) }}
            >
              Delete Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
