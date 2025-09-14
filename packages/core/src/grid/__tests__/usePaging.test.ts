import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePaging } from '../../index.js'

const mockData = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

// NOTE: Hook not implemented yet (RED phase).

describe('usePaging - basic functionality', () => {
  it('should paginate data correctly with default page size', () => {
    const { result } = renderHook(() => usePaging(mockData))
    expect(result.current.paginatedData.length).toBeGreaterThan(0)
    expect(result.current.currentPage).toBe(0)
  })

  it('should handle different page sizes', () => {
    const { result } = renderHook(() => usePaging(mockData, { pageSize: 25 }))
    expect(result.current.paginatedData).toHaveLength(25)
  })

  it('should return correct page info (totalPages, hasNext, hasPrev)', () => {
    const { result } = renderHook(() => usePaging(mockData, { pageSize: 20 }))
    expect(result.current.pagingInfo.totalPages).toBe(5)
    expect(result.current.pagingInfo.hasNextPage).toBe(true)
    expect(result.current.pagingInfo.hasPreviousPage).toBe(false)
  })

  it('should handle empty data array', () => {
    const { result } = renderHook(() => usePaging([], { pageSize: 10 }))
    expect(result.current.paginatedData).toEqual([])
    expect(result.current.pagingInfo.totalPages).toBe(0) // we may allow 0 total pages when no data
  })
})

describe('usePaging - navigation', () => {
  it('should navigate to next page', () => {
    const { result } = renderHook(() => usePaging(mockData, { pageSize: 10 }))
    act(() => result.current.goToNextPage())
    expect(result.current.currentPage).toBe(1)
  })

  it('should navigate to previous page', () => {
    const { result } = renderHook(() =>
      usePaging(mockData, { pageSize: 10, defaultCurrentPage: 2 })
    )
    act(() => result.current.goToPreviousPage())
    expect(result.current.currentPage).toBe(1)
  })

  it('should navigate to specific page', () => {
    const { result } = renderHook(() => usePaging(mockData, { pageSize: 10 }))
    act(() => result.current.setCurrentPage(3))
    expect(result.current.currentPage).toBe(3)
  })

  it('should not go beyond available pages', () => {
    const { result } = renderHook(() => usePaging(mockData, { pageSize: 50 }))
    act(() => result.current.setCurrentPage(5))
    expect(result.current.currentPage).toBeLessThan(5)
  })

  it('should not go below page 0', () => {
    const { result } = renderHook(() => usePaging(mockData, { pageSize: 50 }))
    act(() => result.current.setCurrentPage(-5))
    expect(result.current.currentPage).toBe(0)
  })
})

describe('usePaging - hook API', () => {
  it('supports controlled mode with currentPage prop', () => {
    const change = vi.fn()
    const { result, rerender } = renderHook(
      (p: { page: number }) =>
        usePaging(mockData, { currentPage: p.page, onCurrentPageChange: change, pageSize: 10 }),
      { initialProps: { page: 0 } }
    )
    act(() => result.current.setCurrentPage(2))
    expect(result.current.currentPage).toBe(0) // still controlled external
    expect(change).toHaveBeenCalledWith(2)
    rerender({ page: 2 })
    expect(result.current.currentPage).toBe(2)
  })

  it('supports uncontrolled mode with defaultCurrentPage', () => {
    const { result } = renderHook(() =>
      usePaging(mockData, { defaultCurrentPage: 1, pageSize: 10 })
    )
    expect(result.current.currentPage).toBe(1)
    act(() => result.current.setCurrentPage(2))
    expect(result.current.currentPage).toBe(2)
  })

  it('calls onCurrentPageChange callback', () => {
    const cb = vi.fn()
    const { result } = renderHook(() =>
      usePaging(mockData, { pageSize: 10, onCurrentPageChange: cb })
    )
    act(() => result.current.setCurrentPage(1))
    expect(cb).toHaveBeenCalledWith(1)
  })

  it('calls onPageSizeChange callback', () => {
    const cb = vi.fn()
    const { result } = renderHook(() =>
      usePaging(mockData, { defaultPageSize: 20, onPageSizeChange: cb })
    )
    act(() => result.current.setPageSize(50))
    expect(cb).toHaveBeenCalledWith(50)
  })

  it('handles pageSize changes correctly', () => {
    const { result } = renderHook(() =>
      usePaging(mockData, { defaultCurrentPage: 5, defaultPageSize: 10 })
    )
    // currently page 5
    act(() => result.current.setPageSize(50))
    // after enlarging pageSize to 50, total pages = 2 -> currentPage should clamp to 1
    expect(result.current.currentPage).toBe(1)
  })
})

describe('usePaging - edge cases', () => {
  it('should handle data length changes', () => {
    const { result, rerender } = renderHook(
      (p: { data: any[] }) => usePaging(p.data, { pageSize: 10, defaultCurrentPage: 9 }),
      { initialProps: { data: mockData } }
    )
    // go to near end page
    act(() => result.current.setCurrentPage(9))
    expect(result.current.currentPage).toBe(9)
    // shrink data to 30 items -> total pages = 3
    const smaller = mockData.slice(0, 30)
    rerender({ data: smaller })
    expect(result.current.currentPage).toBe(2) // clamped
  })

  it('should adjust currentPage when data shrinks', () => {
    const { result, rerender } = renderHook(
      (p: { size: number }) =>
        usePaging(mockData.slice(0, p.size), { pageSize: 10, defaultCurrentPage: 5 }),
      { initialProps: { size: 100 } }
    )
    act(() => result.current.setCurrentPage(5))
    expect(result.current.currentPage).toBe(5)
    rerender({ size: 20 }) // total pages becomes 2
    expect(result.current.currentPage).toBe(1)
  })

  it('should handle zero page size gracefully', () => {
    const { result } = renderHook(() => usePaging(mockData, { pageSize: 0 }))
    expect(result.current.paginatedData).toBe(mockData)
    expect(result.current.pagingInfo.totalPages).toBe(1)
  })

  it('should handle negative page numbers', () => {
    const { result } = renderHook(() => usePaging(mockData, { pageSize: 10 }))
    act(() => result.current.setCurrentPage(-10))
    expect(result.current.currentPage).toBe(0)
  })
})
