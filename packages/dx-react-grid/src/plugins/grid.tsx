import React from 'react'
import { useSorting, useFiltering, usePaging } from '@devextreme-vnext/core'
import type { Column, Sorting as SortingType, Filter } from '@devextreme-vnext/core'
import { GridContext } from '../context.js'

export interface GridProps<T = any> {
  rows: T[]
  columns: Column[]
  sorting?: SortingType[]
  onSortingChange?: (sorting: SortingType[]) => void
  filters?: Filter[]
  onFiltersChange?: (filters: Filter[]) => void
  currentPage?: number
  onCurrentPageChange?: (page: number) => void
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  children: React.ReactNode
}

export function Grid<T = any>(props: GridProps<T>) {
  const {
    rows,
    columns,
    sorting,
    onSortingChange,
    filters,
    onFiltersChange,
    currentPage,
    onCurrentPageChange,
    pageSize,
    onPageSizeChange,
    children,
  } = props

  // Filtering -> Sorting -> Paging pipeline
  const filtering = useFiltering(rows, { filters, onFiltersChange })
  const sortingHook = useSorting(filtering.filteredData, { sorting, onSortingChange })
  const paging = usePaging(sortingHook.sortedData, {
    currentPage,
    onCurrentPageChange,
    pageSize,
    onPageSizeChange,
  })

  const headerRowRenderersRef = React.useRef<Array<() => React.ReactNode>>([])
  const [headerVersion, setHeaderVersion] = React.useState(0)

  const registerHeaderRow = React.useCallback((renderer: () => React.ReactNode) => {
    headerRowRenderersRef.current.push(renderer)
    setHeaderVersion((v) => v + 1)
    return () => {
      headerRowRenderersRef.current = headerRowRenderersRef.current.filter((r) => r !== renderer)
      setHeaderVersion((v) => v + 1)
    }
  }, [])

  const ctxValue = React.useMemo(
    () => ({
      rows,
      columns,
      processedRows: paging.paginatedData,
      sorting: sortingHook.sorting,
      setSorting: sortingHook.setSorting,
      filters: filtering.filters,
      setFilters: filtering.setFilters,
      currentPage: paging.currentPage,
      pageSize: paging.pageSize,
      setCurrentPage: paging.setCurrentPage,
      setPageSize: paging.setPageSize,
      pagingInfo: paging.pagingInfo,
      totalCount: paging.totalCount,
      registerHeaderRow,
      headerRowRenderers: headerRowRenderersRef.current,
      // version to allow consumers to re-render when header rows change
      headerVersion,
    }),
    [
      rows,
      columns,
      paging,
      sortingHook.sorting,
      sortingHook.setSorting,
      filtering.filters,
      filtering.setFilters,
      registerHeaderRow,
      headerVersion,
    ]
  )

  return <GridContext.Provider value={ctxValue}>{children}</GridContext.Provider>
}
