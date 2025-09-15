// Converted from: packages/dx-grid-core/src/plugins/table-inline-cell-editing/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: packages/dx-grid-core/src/plugins/table-inline-cell-editing/computeds.test.ts
// Parity: rowsWithEditingCells (2 tests) + columnsWithEditingCells (1 test)
import {
  rowsWithEditingCells,
  columnsWithEditingCells,
} from '../internal/table-inline-cell-editing.computeds'
import { TABLE_DATA_TYPE } from '../internal/table.constants'

describe('useTableInlineCellEditing - converted legacy behavior', () => {
  const editingCells = [{ rowId: 0, columnName: 'b' }]

  describe('#rowsWithEditingCells', () => {
    it('should work with rows which type is TABLE_DATA_TYPE', () => {
      const rows = [
        { rowId: 0, type: TABLE_DATA_TYPE },
        { rowId: 1, type: TABLE_DATA_TYPE },
      ]
      expect(rowsWithEditingCells(rows as any, [])).toEqual(rows)
      expect(rowsWithEditingCells(rows as any, editingCells as any)).toEqual([
        { rowId: 0, type: TABLE_DATA_TYPE, hasEditCell: true },
        { rowId: 1, type: TABLE_DATA_TYPE },
      ])
    })

    it('should ignore rows which type is not TABLE_DATA_TYPE', () => {
      const rows = [{ rowId: 0 }, { rowId: 1 }]
      expect(rowsWithEditingCells(rows as any, [])).toEqual(rows)
      expect(rowsWithEditingCells(rows as any, editingCells as any)).toEqual(rows)
    })
  })

  describe('#columnsWithEditingCells', () => {
    it('should work', () => {
      const columns = [{ column: { name: 'a' } }, { column: { name: 'b' } }]
      expect(columnsWithEditingCells(columns as any, [])).toEqual(columns)
      expect(columnsWithEditingCells(columns as any, editingCells as any)).toEqual([
        { column: { name: 'a' } },
        { column: { name: 'b' }, hasEditCell: true },
      ])
    })
  })
})
