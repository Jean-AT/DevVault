import { useStore } from '../../store/projectStore'
import { Search, X } from 'lucide-react'
import type { ProjectStatus, Priority } from '../../types'

export function SearchFilters() {
  const filters = useStore((s) => s.filters)
  const setFilters = useStore((s) => s.setFilters)
  const allTags = useStore((s) => s.getAllTags())

  const selectBase = 'rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-2 py-1.5 text-xs text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer'

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-text-dark-secondary" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="Search projects..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-sm text-text dark:text-text-dark placeholder:text-text-secondary dark:placeholder:text-text-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {filters.search && (
          <button
            onClick={() => setFilters({ search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-text-dark-secondary hover:text-text dark:hover:text-text-dark cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as ProjectStatus | 'all' })}
          className={selectBase}
        >
          <option value="all">All Status</option>
          <option value="backlog">Backlog</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as Priority | 'all' })}
          className={selectBase}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {allTags.length > 0 && (
          <select
            value={filters.tags[0] || 'all'}
            onChange={(e) => setFilters({ tags: e.target.value === 'all' ? [] : [e.target.value] })}
            className={selectBase}
          >
            <option value="all">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}
