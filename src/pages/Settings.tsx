import { useRef, useState } from 'react'
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react'
import { useStore } from '../store/projectStore'
import { exportData, importData } from '../utils/export'
import { Button } from '../components/ui/Button'
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
      setImportError('Invalid file. Please select a valid DevVault JSON export.')
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{title}</h2>
      <div className="p-5 rounded-2xl glass space-y-0">
        {children}
      </div>
    </section>
  )

  const Row = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 not-first:border-t not-first:border-white/5">
      {children}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Manage your data and preferences.
        </p>
      </div>

      <Section title="Appearance">
        <Row>
          <div>
            <p className="text-sm font-medium text-white">Dark Mode</p>
            <p className="text-xs text-zinc-500">Toggle between light and dark theme</p>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 cursor-pointer ${
              theme === 'dark' ? 'bg-purple-600' : 'bg-zinc-700'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </Row>
      </Section>

      <Section title="Data">
        <Row>
          <div>
            <p className="text-sm font-medium text-white">Export Data</p>
            <p className="text-xs text-zinc-500">
              Download all {projects.length} project{projects.length !== 1 ? 's' : ''} as JSON
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => exportData(projects)}>
            <Download size={13} />
            Export
          </Button>
        </Row>

        <Row>
          <div>
            <p className="text-sm font-medium text-white">Import Data</p>
            <p className="text-xs text-zinc-500">Import from a DevVault JSON file</p>
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
              <Upload size={13} />
              Import
            </Button>
          </div>
        </Row>
        {importError && (
          <p className="text-xs text-red-400 -mt-1">{importError}</p>
        )}

        <Row>
          <div>
            <p className="text-sm font-medium text-red-400">Clear All Data</p>
            <p className="text-xs text-zinc-500">Delete everything permanently</p>
          </div>
          <Button variant="danger" size="sm" onClick={() => setConfirmClear(true)}>
            <Trash2 size={13} />
            Clear All
          </Button>
        </Row>
      </Section>

      <Section title="About">
        <Row>
          <div>
            <p className="text-sm font-medium text-white">DevVault v0.1.0</p>
            <p className="text-xs text-zinc-500">
              Local-first dev idea bank & task breakdown.
            </p>
          </div>
        </Row>
      </Section>

      <Modal isOpen={confirmClear} onClose={() => setConfirmClear(false)} title="Clear All Data">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">This will delete everything</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                All {projects.length} project{projects.length !== 1 ? 's' : ''} and their tasks will be permanently removed.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmClear(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { clearAll(); setConfirmClear(false) }}>
              Delete Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
