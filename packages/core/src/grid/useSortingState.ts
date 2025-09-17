import { useCallback, useState } from 'react'
import type { Sorting } from '../types/sorting.js'

export function changeColumnSorting(
  state: { sorting: Sorting[] },
  payload: {
    columnName: string
    direction?: 'asc' | 'desc' | null
    keepOther?: boolean | string[]
    sortIndex?: number
  }
): { sorting: Sorting[] } {
  const { sorting } = state
  const { columnName, direction, keepOther, sortIndex } = payload

  let nextSorting: Sorting[] = []
  if (keepOther === true) {
    nextSorting = sorting
  }
  if (Array.isArray(keepOther)) {
    nextSorting = sorting.filter((s) => keepOther.indexOf(s.columnName) > -1)
  }

  const columnSortingIndex = sorting.findIndex((s) => s.columnName === columnName)
  const columnSorting = sorting[columnSortingIndex]
  const newColumnSorting: Sorting = {
    columnName,
    direction:
      (direction as any) || (!columnSorting || columnSorting.direction === 'desc' ? 'asc' : 'desc'),
  }

  if (columnSortingIndex > -1) {
    nextSorting = [...nextSorting]
    nextSorting.splice(columnSortingIndex, 1)
  }

  if (direction !== null) {
    const newIndexFallback = columnSortingIndex > -1 ? columnSortingIndex : nextSorting.length
    const newIndex = sortIndex !== undefined ? sortIndex : newIndexFallback
    nextSorting = [...nextSorting]
    nextSorting.splice(newIndex, 0, newColumnSorting)
  }

  return { sorting: nextSorting }
}

export interface UseSortingStateOptions {
  sorting?: Sorting[]
  onSortingChange?: (sorting: Sorting[]) => void
  defaultSorting?: Sorting[]
}

export function useSortingState(options: UseSortingStateOptions = {}) {
  const { sorting: controlled, onSortingChange, defaultSorting = [] } = options

  const [uncontrolled, setUncontrolled] = useState<Sorting[]>(defaultSorting)
  const isControlled = controlled !== undefined
  const effectiveSorting = isControlled ? controlled! : uncontrolled

  const setSorting = useCallback(
    (next: Sorting[]) => {
      if (!isControlled) setUncontrolled(next)
      onSortingChange?.(next)
    },
    [isControlled, onSortingChange]
  )

  return { sorting: effectiveSorting, setSorting } as const
}
