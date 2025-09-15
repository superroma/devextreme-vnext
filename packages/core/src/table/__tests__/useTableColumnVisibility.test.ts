// Converted from: packages/dx-grid-core/src/plugins/table-column-visibility/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: packages/dx-grid-core/src/plugins/table-column-visibility/computeds.test.ts
// Parity tests for #visibleTableColumns (2 cases)
import { visibleTableColumns } from '../internal/table-column-visibility.computeds'
import { TABLE_DATA_TYPE } from '../internal/table.constants'

describe('useTableColumnVisibility - converted legacy behavior', () => {
  describe('#visibleTableColumns', () => {
    it('should return a correct array of visible table columns', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ]
      const hiddenColumnNames = ['a', 'c', 'd']

      expect(visibleTableColumns(tableColumns as any, hiddenColumnNames)).toEqual([
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ])
    })

    it('should ignore non-data columns', () => {
      const tableColumns = [
        { key: 'editCommand' },
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ]
      const hiddenColumnNames = ['a']

      expect(visibleTableColumns(tableColumns as any, hiddenColumnNames)).toEqual([
        { key: 'editCommand' },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ])
    })
  })
})
