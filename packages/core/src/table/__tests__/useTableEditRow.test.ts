// Converted from: packages/dx-grid-core/src/plugins/table-edit-row/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: packages/dx-grid-core/src/plugins/table-edit-row/computeds.test.ts
// Parity: tableRowsWithEditing (2 tests)
import { tableRowsWithEditing } from '../internal/table-edit-row.computeds'
import { TABLE_DATA_TYPE } from '../internal/table.constants'
import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from '../internal/table-edit-row.constants'

describe('useTableEditRow - converted legacy behavior', () => {
  const tableRows = [
    { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
    { key: `${String(TABLE_DATA_TYPE)}_2`, type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
    { type: 'undefined', rowId: 2, row: 'row2' },
  ]
  const editingRowIds = [2]

  describe('#tableRowsWithEditing', () => {
    it('should work', () => {
      const addedRows = [{ id: 3 }, { id: 4 }]
      expect(
        tableRowsWithEditing(tableRows as any, editingRowIds as any, addedRows as any, 100)
      ).toEqual([
        {
          key: `${String(TABLE_ADDED_TYPE)}_1`,
          type: TABLE_ADDED_TYPE,
          rowId: 1,
          row: { id: 4 },
          height: 100,
        },
        {
          key: `${String(TABLE_ADDED_TYPE)}_0`,
          type: TABLE_ADDED_TYPE,
          rowId: 0,
          row: { id: 3 },
          height: 100,
        },
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        {
          key: `${String(TABLE_DATA_TYPE)}_2`,
          type: TABLE_EDIT_TYPE,
          rowId: 2,
          row: 'row2',
          height: 100,
        },
        { type: 'undefined', rowId: 2, row: 'row2' },
      ])
    })

    it('should work with immutable properties', () => {
      const addedRows = Object.freeze([{ id: 3 }, { id: 4 }])
      expect(() =>
        tableRowsWithEditing(tableRows as any, editingRowIds as any, addedRows as any, 100)
      ).not.toThrow()
    })
  })
})
