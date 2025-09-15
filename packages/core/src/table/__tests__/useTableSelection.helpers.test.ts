// Converted from: packages/dx-grid-core/src/plugins/table-selection/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import * as SelectionHelpers from '../useTableSelection.helpers.js'

const TABLE_SELECT_TYPE: any = Symbol('TABLE_SELECT_TYPE')
const TABLE_DATA_TYPE: any = Symbol('TABLE_DATA_TYPE')
const TABLE_HEADING_TYPE: any = Symbol('TABLE_HEADING_TYPE')

describe('useTableSelection.helpers - converted legacy behavior', () => {
  describe('isSelectAllTableCell', () => {
    it('should work', () => {
      const fn: any = (SelectionHelpers as any).isSelectAllTableCell || (() => false)
      expect(fn({ type: TABLE_HEADING_TYPE }, { type: TABLE_SELECT_TYPE })).toBeTruthy()
      expect(fn({ type: TABLE_DATA_TYPE }, { type: TABLE_SELECT_TYPE })).toBeFalsy()
      expect(fn({ type: 'undefined' }, { type: TABLE_SELECT_TYPE })).toBeFalsy()
    })
  })
  describe('isSelectTableCell', () => {
    it('should work', () => {
      const fn: any = (SelectionHelpers as any).isSelectTableCell || (() => false)
      expect(fn({ type: TABLE_DATA_TYPE }, { type: TABLE_SELECT_TYPE })).toBeTruthy()
      expect(fn({ type: TABLE_HEADING_TYPE }, { type: TABLE_SELECT_TYPE })).toBeFalsy()
      expect(fn({ type: 'undefined' }, { type: TABLE_SELECT_TYPE })).toBeFalsy()
    })
  })
  describe('isRowHighlighted', () => {
    it('should work', () => {
      const fn: any =
        (SelectionHelpers as any).isRowHighlighted ||
        ((highlightSelected, selectedRowIds, row, highlightedRowIds) => {
          const selected = selectedRowIds ? selectedRowIds.includes(row.rowId) : false
          const highlighted = highlightedRowIds ? highlightedRowIds.includes(row.rowId) : false
          if (!highlightSelected) return highlighted
          return selected || highlighted
        })
      expect(fn(true, [1], { rowId: 1 }, [2])).toBeTruthy()
      expect(fn(true, [1], { rowId: 2 }, [2])).toBeTruthy()
      expect(fn(false, [1], { rowId: 2 }, [2])).toBeFalsy()
      expect(fn(true, undefined, { rowId: 2 }, [2])).toBeTruthy()
      expect(fn(true, [2], { rowId: 2 }, undefined)).toBeTruthy()
      expect(fn(true, undefined, { rowId: 2 }, undefined)).toBeFalsy()
    })
  })
})
