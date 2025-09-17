import { useCallback, useState } from 'react'

export function setCurrentPage(state: { currentPage: number }, page: number) {
  return { currentPage: page }
}
export function setPageSize(state: { pageSize: number }, size: number) {
  return { pageSize: size }
}

export interface UsePagingStateOptions {
  currentPage?: number
  onCurrentPageChange?: (page: number) => void
  defaultCurrentPage?: number
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  defaultPageSize?: number
}

export function usePagingState(options: UsePagingStateOptions = {}) {
  const {
    currentPage: controlledPage,
    onCurrentPageChange,
    defaultCurrentPage = 0,
    pageSize: controlledPageSize,
    onPageSizeChange,
    defaultPageSize = 10,
  } = options

  const [uncontrolledPage, setUncontrolledPage] = useState<number>(defaultCurrentPage)
  const [uncontrolledPageSize, setUncontrolledPageSize] = useState<number>(defaultPageSize)

  const isPageControlled = controlledPage !== undefined
  const isPageSizeControlled = controlledPageSize !== undefined

  const effectivePage = isPageControlled ? controlledPage! : uncontrolledPage
  const effectivePageSize = isPageSizeControlled ? controlledPageSize! : uncontrolledPageSize

  const setCurrentPageState = useCallback(
    (next: number) => {
      if (!isPageControlled) setUncontrolledPage(next)
      onCurrentPageChange?.(next)
    },
    [isPageControlled, onCurrentPageChange]
  )

  const setPageSizeState = useCallback(
    (next: number) => {
      if (!isPageSizeControlled) setUncontrolledPageSize(next)
      onPageSizeChange?.(next)
    },
    [isPageSizeControlled, onPageSizeChange]
  )

  return {
    currentPage: effectivePage,
    pageSize: effectivePageSize,
    setCurrentPage: setCurrentPageState,
    setPageSize: setPageSizeState,
  } as const
}
