// Converted from: packages/dx-grid-core/src/plugins/table-tree-column/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: table-tree-column/helpers.test.ts
import { isTreeTableCell } from '../internal/table-tree-column.helpers'
import { TABLE_DATA_TYPE } from '../internal/table.constants'

describe('useTableTreeColumn.helpers - converted legacy behavior', () => {
  describe('#isTreeTableCell', () => {
    it('should work', () => {
      expect(
        isTreeTableCell(
          { type: TABLE_DATA_TYPE } as any,
          { type: TABLE_DATA_TYPE, column: { name: 'a' } } as any,
          'a'
        )
      ).toBeTruthy()
      expect(
        isTreeTableCell(
          { type: TABLE_DATA_TYPE } as any,
          { type: TABLE_DATA_TYPE, column: { name: 'a' } } as any,
          'b'
        )
      ).toBeFalsy()
      expect(
        isTreeTableCell(
          { type: TABLE_DATA_TYPE } as any,
          { type: 'undefined', column: { name: 'a' } } as any
        )
      ).toBeFalsy()
      expect(
        isTreeTableCell(
          { type: 'undefined' } as any,
          { type: TABLE_DATA_TYPE, column: { name: 'a' } } as any
        )
      ).toBeFalsy()
    })
  })
})
