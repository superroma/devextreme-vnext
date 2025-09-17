import { useCallback, useState } from 'react'
import type { Filter } from '../types/filtering.js'

export function changeColumnFilter(
  state: { filters: any[] },
  payload: { columnName: string; config?: any; keepOther?: boolean }
): { filters: any[] } {
  const { filters } = state
  const { columnName, config, keepOther } = payload
  let base: any[] = []
  if (keepOther) base = filters
  const idx = filters.findIndex((f) => f.columnName === columnName)
  const next = [...base]
  if (config) {
    const filter = { columnName, config, ...(keepOther ? { keepOther: true } : {}) }
    if (idx > -1) {
      // replace existing in original position if keeping others; otherwise end
      if (keepOther) {
        const origPos = base === filters ? idx : next.length
        if (origPos < next.length) next[origPos] = filter
        else next.push(filter)
      } else {
        next.push(filter)
      }
    } else {
      next.push(filter)
    }
    if (keepOther) return { filters: next }
    return { filters: [filter] }
  }
  // No config means remove
  if (idx > -1) {
    const copy = filters.slice()
    copy.splice(idx, 1)
    return { filters: copy }
  }
  return { filters }
}

export interface UseFilteringStateOptions {
  filters?: Filter[]
  onFiltersChange?: (filters: Filter[]) => void
  defaultFilters?: Filter[]
}

export function useFilteringState(options: UseFilteringStateOptions = {}) {
  const { filters: controlled, onFiltersChange, defaultFilters = [] } = options
  const [uncontrolled, setUncontrolled] = useState<Filter[]>(defaultFilters)
  const isControlled = controlled !== undefined
  const effective = isControlled ? controlled! : uncontrolled
  const setFilters = useCallback(
    (next: Filter[]) => {
      if (!isControlled) setUncontrolled(next)
      onFiltersChange?.(next)
    },
    [isControlled, onFiltersChange]
  )
  return { filters: effective, setFilters } as const
}
