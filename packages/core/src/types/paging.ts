export interface PagingState {
  currentPage: number
  pageSize: number
  totalCount?: number
}

export interface PagingInfo {
  totalPages: number
  startIndex: number
  endIndex: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
