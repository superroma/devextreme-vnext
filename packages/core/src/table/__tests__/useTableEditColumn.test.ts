// Converted from: packages/dx-grid-core/src/plugins/table-edit-column/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: packages/dx-grid-core/src/plugins/table-edit-column/computeds.test.ts
// Parity: tableColumnsWithEditing (3 tests)
import { tableColumnsWithEditing } from '../internal/table-edit-column.computeds'
import { TABLE_EDIT_COMMAND_TYPE } from '../internal/table-edit-column.constants'

describe('useTableEditColumn - converted legacy behavior', () => {
  describe('#tableColumnsWithEditing', () => {
    const columns = [{ original: { id: 1 } }, { original: { id: 2 } }]

    it('should work', () => {
      expect(tableColumnsWithEditing(columns as any, 100)).toEqual([
        { key: String(TABLE_EDIT_COMMAND_TYPE), type: TABLE_EDIT_COMMAND_TYPE, width: 100 },
        { original: { id: 1 } },
        { original: { id: 2 } },
      ])
    })

    it('should convert string to numb if possible', () => {
      expect(tableColumnsWithEditing(columns as any, '100' as any)).toEqual([
        { key: String(TABLE_EDIT_COMMAND_TYPE), type: TABLE_EDIT_COMMAND_TYPE, width: 100 },
        { original: { id: 1 } },
        { original: { id: 2 } },
      ])
    })

    it('should provide non-convertable string', () => {
      expect(tableColumnsWithEditing(columns as any, '200px' as any)).toEqual([
        { key: String(TABLE_EDIT_COMMAND_TYPE), type: TABLE_EDIT_COMMAND_TYPE, width: '200px' },
        { original: { id: 1 } },
        { original: { id: 2 } },
      ])
    })
  })
})
