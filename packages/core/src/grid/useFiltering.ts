import { useCallback, useMemo, useState } from 'react'
import { filteredRows } from '../utils/filtering.js'
import type { Row } from '../types/grid.js'
import type { Filter, FilteringColumnExtension, FilterExpression } from '../types/filtering.js'

interface UseFilteringOptions<T> {
  filters?: Filter[] // controlled
  defaultFilters?: Filter[] // uncontrolled initial
  onFiltersChange?: (filters: Filter[]) => void
  columnExtensions?: FilteringColumnExtension[]
  // future: filterExpression?: FilterExpression
}

function buildAndExpression(filters: Filter[]): FilterExpression | null {
  if (!filters.length) return null
  if (filters.length === 1) return filters[0] as any
  return { operator: 'and', filters } as FilterExpression
}

export function useFiltering<T extends Row>(data: T[], options: UseFilteringOptions<T> = {}) {
  const {
    filters: controlledFilters,
    defaultFilters = [],
    onFiltersChange,
    columnExtensions = [],
  } = options

  const [uncontrolled, setUncontrolled] = useState<Filter[]>(defaultFilters)
  const isControlled = controlledFilters !== undefined
  const effectiveFilters = isControlled ? controlledFilters! : uncontrolled

  const getColumnPredicate = useCallback(
    (name: string) => columnExtensions.find((c) => c.columnName === name)?.predicate,
    [columnExtensions]
  )

  const getCellValue = useCallback(
    (row: any, columnName: string) => (row == null ? undefined : row[columnName]),
    []
  )

  const filteredData = useMemo(() => {
    const expression = buildAndExpression(effectiveFilters)
    if (!expression) return data // preserve reference
    return filteredRows(data, expression, getCellValue, getColumnPredicate).rows as T[]
  }, [data, effectiveFilters, getCellValue, getColumnPredicate])

  const setFilters = useCallback(
    (next: Filter[]) => {
      if (!isControlled) setUncontrolled(next)
      onFiltersChange?.(next)
    },
    [isControlled, onFiltersChange]
  )

  return { filteredData, filters: effectiveFilters, setFilters } as const
}
