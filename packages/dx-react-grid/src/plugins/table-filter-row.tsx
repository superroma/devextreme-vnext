import React from 'react'
import { useGridContext } from '../context.js'

export interface TableFilterRowProps {
  className?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export function TableFilterRow({ className, inputProps }: TableFilterRowProps) {
  const { columns, filters, setFilters, registerHeaderRow } = useGridContext()

  const getValue = (columnName: string) =>
    filters.find((f) => f.columnName === columnName)?.value ?? ''
  const setValue = (columnName: string, value: string) => {
    const existing = filters.find((f) => f.columnName === columnName)
    let next
    if (!value) {
      next = existing ? filters.filter((f) => f.columnName !== columnName) : filters
    } else if (existing) {
      next = filters.map((f) =>
        f.columnName === columnName ? { ...f, value, operation: 'contains' } : f
      )
    } else {
      next = [...filters, { columnName, value, operation: 'contains' }]
    }
    setFilters(next as any)
  }

  React.useEffect(
    () =>
      registerHeaderRow(() => (
        <tr className={className} data-testid="dx-grid-filter-row">
          {columns.map((col) => (
            <th key={col.name}>
              <input
                aria-label={`filter-${col.name}`}
                value={getValue(col.name)}
                onChange={(e) => setValue(col.name, e.target.value)}
                {...inputProps}
              />
            </th>
          ))}
        </tr>
      )),
    [columns, filters]
  )

  return null
}
