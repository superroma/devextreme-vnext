import React from 'react'
import { useGridContext } from '../context.js'

export interface TableProps {
  className?: string
  tableProps?: React.TableHTMLAttributes<HTMLTableElement>
}

export function Table(props: TableProps) {
  const { processedRows, columns, headerRowRenderers } = useGridContext()
  const { className, tableProps } = props

  return (
    <table className={className} {...tableProps} data-testid="dx-grid-table">
      {headerRowRenderers.length > 0 && (
        <thead>
          {headerRowRenderers.map((r, i) => (
            <React.Fragment key={i}>{r()}</React.Fragment>
          ))}
        </thead>
      )}
      <tbody>
        {processedRows.map((row: any, rowIndex: number) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={col.name}>
                {col.getCellValue ? col.getCellValue(row, col.name) : row[col.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
