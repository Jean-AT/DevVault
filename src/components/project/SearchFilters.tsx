import { useStore } from '../../store/projectStore'
import { Search, X } from 'lucide-react'
import type { ProjectStatus, Priority } from '../../types'

export function SearchFilters() {
  const filters = useStore((s) => s.filters)
  const setFilters = useStore((s) => s.setFilters)
  const allTags = useStore((s) => s.getAllTags())

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="Search projects..."
          className="w-full pl-9 pr-8 py-2.5 rounded-xl glass-input text-sm transition-all"
        />
        {filters.search && (
          <button
            onClick={() => setFilters({ search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as ProjectStatus | 'all' })}
          className="rounded-xl glass-input px-3 py-2.5 text-xs cursor-pointer transition-all"
        >
          <option value="all" className="bg-zinc-900">All Status</option>
          <option value="backlog" className="bg-zinc-900">Backlog</option>
          <option value="in-progress" className="bg-zinc-900">In Progress</option>
          <option value="done" className="bg-zinc-900">Done</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as Priority | 'all' })}
          className="rounded-xl glass-input px-3 py-2.5 text-xs cursor-pointer transition-all"
        >
          <option value="all" className="bg-zinc-900">All Priority</option>
          <option value="low" className="bg-zinc-900">Low</option>
          <option value="medium" className="bg-zinc-900">Medium</option>
          <option value="high" className="bg-zinc-900">High</option>
        </select>

        {allTags.length > 0 && (
          <select
            value={filters.tags[0] || 'all'}
            onChange={(e) => setFilters({ tags: e.target.value === 'all' ? [] : [e.target.value] })}
            className="rounded-xl glass-input px-3 py-2.5 text-xs cursor-pointer transition-all"
          >
            <option value="all" className="bg-zinc-900">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag} className="bg-zinc-900">{tag}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}
