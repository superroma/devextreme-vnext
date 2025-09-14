import React from 'react'
import type { Column } from '@devextreme-vnext/core'
import type { Sorting } from '@devextreme-vnext/core'
import type { Filter } from '@devextreme-vnext/core'
import type { PagingInfo } from '@devextreme-vnext/core'

export interface GridContextValue<T = any> {
  rows: T[]
  columns: Column[]
  processedRows: T[]
  sorting: Sorting[]
  setSorting: (s: Sorting[]) => void
  filters: Filter[]
  setFilters: (f: Filter[]) => void
  currentPage: number
  pageSize: number
  setCurrentPage: (p: number) => void
  setPageSize: (s: number) => void
  pagingInfo: PagingInfo
  totalCount: number
  // header row registration (simple accumulation approach)
  registerHeaderRow: (renderer: () => React.ReactNode) => () => void
  headerRowRenderers: Array<() => React.ReactNode>
}

export const GridContext = React.createContext<GridContextValue | null>(null)

export function useGridContext<T = any>(): GridContextValue<T> {
  const ctx = React.useContext(GridContext)
  if (!ctx) throw new Error('GridContext not found. Make sure components are nested inside <Grid>.')
  return ctx as GridContextValue<T>
}
