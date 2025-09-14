import { useCallback, useEffect, useMemo, useState } from 'react'
import { paginateData, calculatePagingInfo } from '../utils/paging.js'
import type { PagingInfo } from '../types/paging.js'

interface UsePagingOptions {
  currentPage?: number // controlled
  onCurrentPageChange?: (page: number) => void
  defaultCurrentPage?: number // uncontrolled initial
  pageSize?: number // controlled
  onPageSizeChange?: (size: number) => void
  defaultPageSize?: number // uncontrolled initial
}

export function usePaging<T>(
  data: T[],
  options: UsePagingOptions = {}
): {
  paginatedData: T[]
  currentPage: number
  pageSize: number
  totalCount: number
  pagingInfo: PagingInfo
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
} {
  const {
    currentPage: controlledPage,
    onCurrentPageChange,
    defaultCurrentPage = 0,
    pageSize: controlledPageSize,
    onPageSizeChange,
    defaultPageSize = 10, // chosen default; adjust if spec changes
  } = options

  // Uncontrolled state
  const [uncontrolledPage, setUncontrolledPage] = useState<number>(defaultCurrentPage)
  const [uncontrolledPageSize, setUncontrolledPageSize] = useState<number>(defaultPageSize)

  const isPageControlled = controlledPage !== undefined
  const isPageSizeControlled = controlledPageSize !== undefined

  const effectivePage = isPageControlled ? controlledPage! : uncontrolledPage
  const effectivePageSize = isPageSizeControlled ? controlledPageSize! : uncontrolledPageSize

  const totalCount = data.length

  // Compute paging info (clamps page internally). We still need clamped page for pagination slice.
  const pagingInfo = useMemo(() => {
    return calculatePagingInfo(totalCount, effectivePage, effectivePageSize)
  }, [totalCount, effectivePage, effectivePageSize])

  const clampedPage = useMemo(() => {
    // Re-derive clamped page from pagingInfo (startIndex / pageSize) to avoid duplication
    if (effectivePageSize <= 0) return 0
    const totalPages = pagingInfo.totalPages
    return Math.min(Math.max(effectivePage, 0), Math.max(totalPages - 1, 0))
  }, [effectivePage, effectivePageSize, pagingInfo.totalPages])

  // Auto-adjust current page if out-of-range (uncontrolled only). Mimics legacy currentPage computed.
  useEffect(() => {
    if (!isPageControlled && clampedPage !== effectivePage) {
      setUncontrolledPage(clampedPage)
      // Also inform consumer if callback provided (legacy defers via setTimeout; immediate here acceptable)
      onCurrentPageChange?.(clampedPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampedPage, effectivePage, isPageControlled])

  const paginatedData = useMemo(() => {
    if (effectivePageSize <= 0) return data // preserve reference for no-pagination case
    // If page got clamped different from effectivePage we should base on clampedPage
    return paginateData(data, clampedPage, effectivePageSize)
  }, [data, clampedPage, effectivePageSize])

  const setCurrentPage = useCallback(
    (next: number) => {
      const normalized = Number.isFinite(next) ? Math.max(next, 0) : 0
      if (!isPageControlled) {
        setUncontrolledPage(normalized)
      }
      onCurrentPageChange?.(normalized)
    },
    [isPageControlled, onCurrentPageChange]
  )

  const setPageSize = useCallback(
    (next: number) => {
      const size = Number.isFinite(next) ? Math.max(next, 0) : 0
      if (!isPageSizeControlled) {
        setUncontrolledPageSize(size)
      }
      onPageSizeChange?.(size)
      // After pageSize change we may need to clamp page; effect above will handle uncontrolled
    },
    [isPageSizeControlled, onPageSizeChange]
  )

  const goToNextPage = useCallback(() => {
    if (pagingInfo.hasNextPage) setCurrentPage(clampedPage + 1)
  }, [pagingInfo.hasNextPage, clampedPage, setCurrentPage])
  const goToPreviousPage = useCallback(() => {
    if (pagingInfo.hasPreviousPage) setCurrentPage(clampedPage - 1)
  }, [pagingInfo.hasPreviousPage, clampedPage, setCurrentPage])
  const goToFirstPage = useCallback(() => setCurrentPage(0), [setCurrentPage])
  const goToLastPage = useCallback(() => {
    if (effectivePageSize <= 0) return
    const last = Math.max(pagingInfo.totalPages - 1, 0)
    setCurrentPage(last)
  }, [pagingInfo.totalPages, setCurrentPage, effectivePageSize])

  return {
    paginatedData,
    currentPage: clampedPage, // expose clamped
    pageSize: effectivePageSize,
    totalCount,
    pagingInfo: {
      ...pagingInfo,
      // Ensure consistency if clamped adjusted
      hasNextPage: clampedPage < pagingInfo.totalPages - 1 && pagingInfo.totalPages > 0,
      hasPreviousPage: clampedPage > 0,
    },
    setCurrentPage,
    setPageSize,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  } as const
}
