// Converted from: packages/dx-grid-core/src/plugins/table-column-visibility/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: packages/dx-grid-core/src/plugins/table-column-visibility/helpers.test.ts
// Parity: #tableDataColumnsExist (3 tests)
import { tableDataColumnsExist } from '../internal/table-column-visibility.helpers'
import { TABLE_DATA_TYPE } from '../internal/table.constants'

describe('useTableColumnVisibility.helpers - converted legacy behavior', () => {
  describe('#tableDataColumnsExist', () => {
    it('should return false when there are no table columns', () => {
      const tableColumns: any[] = []
      expect(tableDataColumnsExist(tableColumns)).toBeFalsy()
    })

    it('should return false if no data type columns are provided', () => {
      const tableColumns = [{ type: 'any', column: { name: 'a' } }]
      expect(tableDataColumnsExist(tableColumns as any)).toBeFalsy()
    })

    it('should return true when data type columns are specified', () => {
      const tableColumns = [{ type: TABLE_DATA_TYPE, column: { name: 'd' } }]
      expect(tableDataColumnsExist(tableColumns as any)).toBeTruthy()
    })
  })
})
