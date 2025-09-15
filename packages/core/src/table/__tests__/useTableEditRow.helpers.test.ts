// Converted from: packages/dx-grid-core/src/plugins/table-edit-row/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: table-edit-row/helpers.test.ts
import {
  isEditTableCell,
  isAddedTableRow,
  isEditTableRow,
} from '../internal/table-edit-row.helpers'
import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from '../internal/table-edit-row.constants'
import { TABLE_DATA_TYPE } from '../internal/table.constants'

describe('useTableEditRow.helpers - converted legacy behavior', () => {
  describe('#isEditTableCell', () => {
    it('should work', () => {
      expect(
        isEditTableCell({ type: TABLE_ADDED_TYPE } as any, { type: TABLE_DATA_TYPE } as any)
      ).toBeTruthy()
      expect(
        isEditTableCell({ type: TABLE_EDIT_TYPE } as any, { type: TABLE_DATA_TYPE } as any)
      ).toBeTruthy()
      expect(
        isEditTableCell({ type: TABLE_ADDED_TYPE } as any, { type: 'undefined' } as any)
      ).toBeFalsy()
      expect(
        isEditTableCell({ type: TABLE_EDIT_TYPE } as any, { type: 'undefined' } as any)
      ).toBeFalsy()
      expect(
        isEditTableCell({ type: 'undefined' } as any, { type: 'undefined' } as any)
      ).toBeFalsy()
    })
  })
  describe('#isAddedTableRow', () => {
    it('should work', () => {
      expect(isAddedTableRow({ type: TABLE_ADDED_TYPE } as any)).toBeTruthy()
      expect(isAddedTableRow({ type: TABLE_EDIT_TYPE } as any)).toBeFalsy()
      expect(isAddedTableRow({ type: 'undefined' } as any)).toBeFalsy()
    })
  })
  describe('#isEditTableRow', () => {
    it('should work', () => {
      expect(isEditTableRow({ type: TABLE_EDIT_TYPE } as any)).toBeTruthy()
      expect(isEditTableRow({ type: TABLE_ADDED_TYPE } as any)).toBeFalsy()
      expect(isEditTableRow({ type: 'undefined' } as any)).toBeFalsy()
    })
  })
})
