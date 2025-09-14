import React from 'react'
import { useGridContext } from '../context.js'
import type { Sorting } from '@devextreme-vnext/core'

export interface TableHeaderRowProps {
  showSortingControls?: boolean
  className?: string
}

function computeNextSorting(current: Sorting[], columnName: string): Sorting[] {
  const existing = current.find((s) => s.columnName === columnName)
  if (!existing) return [...current, { columnName, direction: 'asc' }]
  if (existing.direction === 'asc')
    return current.map((s) => (s.columnName === columnName ? { ...s, direction: 'desc' } : s))
  // if desc -> remove
  return current.filter((s) => s.columnName !== columnName)
}

export function TableHeaderRow({ showSortingControls = false, className }: TableHeaderRowProps) {
  const { columns, sorting, setSorting, registerHeaderRow } = useGridContext()

  React.useEffect(
    () =>
      registerHeaderRow(() => (
        <tr className={className} data-testid="dx-grid-header-row">
          {columns.map((col) => {
            const sort = sorting.find((s) => s.columnName === col.name)
            const indicator = sort ? (sort.direction === 'asc' ? '▲' : '▼') : ''
            const handleClick = () => {
              if (!showSortingControls) return
              setSorting(computeNextSorting(sorting, col.name))
            }
            return (
              <th
                key={col.name}
                onClick={handleClick}
                style={showSortingControls ? { cursor: 'pointer', userSelect: 'none' } : undefined}
              >
                {col.title || col.name} {indicator}
              </th>
            )
          })}
        </tr>
      )),
    [columns, sorting, setSorting, showSortingControls, className, registerHeaderRow]
  )

  return null
}
