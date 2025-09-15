// Converted from: packages/dx-grid-core/src/plugins/table-row-detail/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: table-row-detail/helpers.test.ts
import {
  isDetailRowExpanded,
  isDetailToggleTableCell,
  isDetailTableRow,
  isDetailTableCell,
} from '../internal/table-row-detail.helpers'
import { TABLE_DETAIL_TYPE } from '../internal/table-row-detail.constants'
import { TABLE_DATA_TYPE } from '../internal/table.constants'

describe('useTableRowDetail.helpers - converted legacy behavior', () => {
  describe('#isDetailRowExpanded', () => {
    it('should work', () => {
      const expandedDetailRowIds = [1]
      expect(isDetailRowExpanded(expandedDetailRowIds as any, 1)).toBeTruthy()
      expect(isDetailRowExpanded(expandedDetailRowIds as any, 2)).toBeFalsy()
    })
  })
  describe('#isDetailToggleTableCell', () => {
    it('should work', () => {
      expect(
        isDetailToggleTableCell(
          { type: TABLE_DATA_TYPE } as any,
          { type: TABLE_DETAIL_TYPE } as any
        )
      ).toBeTruthy()
      expect(
        isDetailToggleTableCell({ type: 'undefined' } as any, { type: TABLE_DETAIL_TYPE } as any)
      ).toBeFalsy()
      expect(
        isDetailToggleTableCell({ type: 'undefined' } as any, { type: 'undefined' } as any)
      ).toBeFalsy()
    })
  })
  describe('#isDetailTableRow', () => {
    it('should work', () => {
      expect(isDetailTableRow({ type: TABLE_DETAIL_TYPE } as any)).toBeTruthy()
      expect(isDetailTableRow({ type: 'undefined' } as any)).toBeFalsy()
    })
  })
  describe('#isDetailTableCell', () => {
    it('should work', () => {
      const column = { type: 'undefined' }
      expect(isDetailTableCell(column as any, [column] as any)).toBeTruthy()
      expect(isDetailTableCell(column as any, [{ type: 'undefined' }, column] as any)).toBeFalsy()
    })
  })
})
