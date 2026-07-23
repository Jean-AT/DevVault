import { useMemo } from 'react'
import { useStore, getAllTags } from '../../store/projectStore'
import { Search, X } from 'lucide-react'
import { CustomSelect } from '../ui/CustomSelect'
import type { ProjectStatus, Priority } from '../../types'

export function SearchFilters() {
  const filters = useStore((s) => s.filters)
  const setFilters = useStore((s) => s.setFilters)
  const projects = useStore((s) => s.projects)
  const allTags = useMemo(() => getAllTags(projects), [projects])

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="Search projects..."
          className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-sky-500/50 backdrop-blur-sm transition-all"
        />
        {filters.search && (
          <button onClick={() => setFilters({ search: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer transition-colors">
            <X size={13} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <CustomSelect
          value={filters.status}
          onChange={(v) => setFilters({ status: v as ProjectStatus | 'all' })}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'backlog', label: 'Backlog' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
          className="w-32"
        />
        <CustomSelect
          value={filters.priority}
          onChange={(v) => setFilters({ priority: v as Priority | 'all' })}
          options={[
            { value: 'all', label: 'All Priority' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          className="w-32"
        />
        {allTags.length > 0 && (
          <CustomSelect
            value={filters.tags[0] || 'all'}
            onChange={(v) => setFilters({ tags: v === 'all' ? [] : [v] })}
            options={[
              { value: 'all', label: 'All Tags' },
              ...allTags.map((tag) => ({ value: tag, label: tag })),
            ]}
            className="w-32"
          />
        )}
      </div>
    </div>
  )
}
