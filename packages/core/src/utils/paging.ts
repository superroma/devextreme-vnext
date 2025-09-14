import type { PagingInfo } from '../types/paging.js'

export function paginateData<T>(data: T[], currentPage: number, pageSize: number): T[] {
  if (pageSize <= 0) return data
  const startIndex = currentPage * pageSize
  return data.slice(startIndex, startIndex + pageSize)
}

export function calculatePagingInfo(
  totalCount: number,
  currentPage: number,
  pageSize: number
): PagingInfo {
  if (pageSize <= 0) {
    return {
      totalPages: 1,
      startIndex: 0,
      endIndex: totalCount,
      hasNextPage: false,
      hasPreviousPage: false,
    }
  }
  const totalPages = Math.ceil(totalCount / pageSize)
  const clampedPage = Math.min(Math.max(currentPage, 0), Math.max(totalPages - 1, 0))
  const startIndex = clampedPage * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalCount)
  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: clampedPage < totalPages - 1,
    hasPreviousPage: clampedPage > 0,
  }
}
