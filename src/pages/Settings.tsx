import { useRef, useState } from 'react'
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react'
import { useStore } from '../store/projectStore'
import { exportData, importData } from '../utils/export'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'

export function Settings() {
  const projects = useStore((s) => s.projects)
  const importProjects = useStore((s) => s.importProjects)
  const clearAll = useStore((s) => s.clearAll)
  const fileRef = useRef<HTMLInputElement>(null)
  const [confirmClear, setConfirmClear] = useState(false)
  const [importError, setImportError] = useState('')

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportError('')
    try { importProjects(await importData(file)) } catch { setImportError('Invalid file.') }
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-xs text-zinc-500 mt-1">Manage your data.</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Data</h2>
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-white">Export</p><p className="text-xs text-zinc-500">{projects.length} project{projects.length !== 1 ? 's' : ''} as JSON</p></div>
            <Button variant="outline" size="sm" onClick={() => exportData(projects)}><Download size={13} />Export</Button>
          </div>
          <div className="border-t border-zinc-800" />
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-white">Import</p><p className="text-xs text-zinc-500">From a DevVault JSON file</p></div>
            <div>
              <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}><Upload size={13} />Import</Button>
            </div>
          </div>
          {importError && <p className="text-xs text-red-400">{importError}</p>}
          <div className="border-t border-zinc-800" />
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-red-400">Clear All</p><p className="text-xs text-zinc-500">Delete everything</p></div>
            <Button variant="danger" size="sm" onClick={() => setConfirmClear(true)}><Trash2 size={13} />Clear</Button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">About</h2>
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
          <p className="text-sm font-medium text-white">DevVault v0.1.0</p>
          <p className="text-xs text-zinc-500">Local-first dev idea bank & task breakdown.</p>
        </div>
      </section>

      <Modal isOpen={confirmClear} onClose={() => setConfirmClear(false)} title="Clear All Data">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">Delete everything?</p>
              <p className="text-xs text-zinc-400 mt-0.5">All {projects.length} project{projects.length !== 1 ? 's' : ''} will be permanently removed.</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmClear(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { clearAll(); setConfirmClear(false) }}>Delete Everything</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
