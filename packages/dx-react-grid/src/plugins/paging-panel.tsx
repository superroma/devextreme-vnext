import React from 'react'
import { useGridContext } from '../context.js'

export interface PagingPanelProps {
  pageSizeOptions?: number[]
  className?: string
}

export function PagingPanel({ pageSizeOptions = [5, 10, 25, 50], className }: PagingPanelProps) {
  const { currentPage, setCurrentPage, pagingInfo, pageSize, setPageSize, totalCount } =
    useGridContext()
  const { totalPages, hasNextPage, hasPreviousPage } = pagingInfo

  return (
    <div
      className={className}
      data-testid="dx-grid-paging-panel"
      style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}
    >
      <button onClick={() => setCurrentPage(0)} disabled={!hasPreviousPage}>
        First
      </button>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={!hasPreviousPage}>
        Prev
      </button>
      <span>
        Page {totalPages ? currentPage + 1 : 0} of {totalPages}
      </span>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!hasNextPage}>
        Next
      </button>
      <button onClick={() => setCurrentPage(totalPages - 1)} disabled={!hasNextPage}>
        Last
      </button>
      <span>| Rows: {totalCount}</span>
      <label style={{ marginLeft: 8 }}>
        Page Size:
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
            setCurrentPage(0)
          }}
          style={{ marginLeft: 4 }}
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
