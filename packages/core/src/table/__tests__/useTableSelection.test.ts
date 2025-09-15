// Converted from: packages/dx-grid-core/src/plugins/table-selection/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import { useTableSelection } from '../useTableSelection.js'

const TABLE_SELECT_TYPE: any = Symbol('TABLE_SELECT_TYPE')

describe('useTableSelection - converted legacy behavior', () => {
  describe('tableColumnsWithSelection', () => {
    it('should work with showSelectionColumn', () => {
      let hookResult: any
      try {
        hookResult = (useTableSelection as any)({
          tableColumns: [{}],
          showSelectionColumn: true,
          selectionColumnWidth: 123,
        })
      } catch (e) {
        hookResult = { tableColumnsWithSelection: undefined }
      }
      expect(hookResult.tableColumnsWithSelection).toEqual([
        { key: TABLE_SELECT_TYPE.toString(), type: TABLE_SELECT_TYPE, width: 123 },
        {},
      ])
    })
    it('should work without showSelectionColumn', () => {
      let hookResult: any
      try {
        hookResult = (useTableSelection as any)({
          tableColumns: [{ key: '' }],
          showSelectionColumn: false,
          selectionColumnWidth: 123,
        })
      } catch (e) {
        hookResult = { tableColumnsWithSelection: undefined }
      }
      expect(hookResult.tableColumnsWithSelection).toEqual([{ key: '' }])
    })
  })
})
