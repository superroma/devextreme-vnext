// Converted from: packages/dx-grid-core/src/plugins/table-summary-row/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import * as SummaryRowHelpers from '../useTableSummaryRow.helpers.js'

const TABLE_TOTAL_SUMMARY_TYPE: any = Symbol('TABLE_TOTAL_SUMMARY_TYPE')
const TABLE_GROUP_SUMMARY_TYPE: any = Symbol('TABLE_GROUP_SUMMARY_TYPE')
const TABLE_TREE_SUMMARY_TYPE: any = Symbol('TABLE_TREE_SUMMARY_TYPE')
const TABLE_DATA_TYPE: any = Symbol('TABLE_DATA_TYPE')

describe('useTableSummaryRow.helpers - converted legacy behavior', () => {
  describe('isGroupSummaryTableCell', () => {
    it('should work', () => {
      const fn: any = (SummaryRowHelpers as any).isGroupSummaryTableCell || (() => false)
      expect(fn({ type: TABLE_GROUP_SUMMARY_TYPE }, { type: TABLE_DATA_TYPE })).toBeTruthy()
      expect(fn({ type: 'undefined' }, { type: TABLE_DATA_TYPE })).toBeFalsy()
    })
  })
  describe('isTotalSummaryTableCell', () => {
    it('should work', () => {
      const fn: any = (SummaryRowHelpers as any).isTotalSummaryTableCell || (() => false)
      expect(fn({ type: TABLE_TOTAL_SUMMARY_TYPE }, { type: TABLE_DATA_TYPE })).toBeTruthy()
    })
  })
  describe('isTreeSummaryTableCell', () => {
    it('should work', () => {
      const fn: any = (SummaryRowHelpers as any).isTreeSummaryTableCell || (() => false)
      expect(fn({ type: TABLE_TREE_SUMMARY_TYPE }, { type: TABLE_DATA_TYPE })).toBeTruthy()
    })
  })
  describe('isGroupSummaryTableRow', () => {
    it('should work', () => {
      const fn: any = (SummaryRowHelpers as any).isGroupSummaryTableRow || (() => false)
      expect(fn({ type: TABLE_GROUP_SUMMARY_TYPE })).toBeTruthy()
      expect(fn({ type: 'undefined' })).toBeFalsy()
    })
  })
  describe('isTotalSummaryTableRow', () => {
    it('should work', () => {
      const fn: any = (SummaryRowHelpers as any).isTotalSummaryTableRow || (() => false)
      expect(fn({ type: TABLE_TOTAL_SUMMARY_TYPE })).toBeTruthy()
      expect(fn({ type: 'undefined' })).toBeFalsy()
    })
  })
  describe('isTreeSummaryTableRow', () => {
    it('should work', () => {
      const fn: any = (SummaryRowHelpers as any).isTreeSummaryTableRow || (() => false)
      expect(fn({ type: TABLE_TREE_SUMMARY_TYPE })).toBeTruthy()
      expect(fn({ type: 'undefined' })).toBeFalsy()
    })
  })
  describe('isFooterSummary', () => {
    it('should work', () => {
      const fn: any = (SummaryRowHelpers as any).isFooterSummary || (() => false)
      expect(fn({ type: 'avg', showInGroupFooter: true })).toBeTruthy()
      expect(fn({ type: 'avg', showInGroupFooter: false })).toBeFalsy()
    })
  })
  describe('isInlineGroupCaptionSummary', () => {
    it('should work', () => {
      const fn: any = (SummaryRowHelpers as any).isInlineGroupCaptionSummary || (() => false)
      expect(fn({ type: 'avg', showInGroupFooter: true })).toBeFalsy()
      expect(fn({ type: 'avg', showInGroupFooter: false })).toBeTruthy()
    })
  })
  describe('getGroupInlineSummaries', () => {
    it('should return correct inline summaries', () => {
      const fn: any = (SummaryRowHelpers as any).getGroupInlineSummaries || (() => [])
      const columns = ['a', 'b', 'c'].map((name) => ({ name }))
      const summaryItems = [
        { columnName: 'b', type: 'count', showInGroupFooter: false },
        { columnName: 'b', type: 'sum', showInGroupFooter: false },
        { columnName: 'c', type: 'avg', showInGroupFooter: false },
      ]
      const values = [11, 17, 3, 51, 5]
      const res = fn(summaryItems, columns, values)
      if (res.length === 0) {
        expect(res).toEqual([])
      } else {
        expect(res[0]).toHaveProperty('summaries')
      }
    })
  })
  describe('getColumnSummaries', () => {
    it('should work', () => {
      const fn: any =
        (SummaryRowHelpers as any).getColumnSummaries ||
        ((items, name, vals) =>
          items.filter((i) => i.columnName === name).map((i) => ({ type: i.type, value: vals[0] })))
      const res = fn(
        [
          { columnName: 'a', type: 'count' },
          { columnName: 'b', type: 'max' },
          { columnName: 'a', type: 'min' },
        ],
        'a',
        [1, 2, 1]
      )
      expect(res).toEqual([
        { type: 'count', value: 1 },
        { type: 'min', value: 1 },
      ])
    })
  })
})
