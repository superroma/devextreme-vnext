// Converted from: packages/dx-grid-core/src/plugins/table-group-row/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import * as GroupRowHelpers from '../useTableGroupRow.helpers.js'

const TABLE_GROUP_TYPE: any = Symbol('TABLE_GROUP_TYPE')
const TABLE_STUB_TYPE: any = Symbol('TABLE_STUB_TYPE')
const TABLE_DATA_TYPE: any = Symbol('TABLE_DATA_TYPE')
const TABLE_FLEX_TYPE: any = Symbol('TABLE_FLEX_TYPE')

describe('useTableGroupRow.helpers - converted legacy behavior', () => {
  describe('isGroupTableCell', () => {
    it('should work', () => {
      const fn: any = (GroupRowHelpers as any).isGroupTableCell || (() => false)
      expect(
        fn(
          { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
          { type: TABLE_GROUP_TYPE, column: { name: 'a' } }
        )
      ).toBeTruthy()
      expect(
        fn(
          { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
          { type: TABLE_GROUP_TYPE, column: { name: 'a' } }
        )
      ).toBeFalsy()
    })
  })
  describe('isGroupIndentTableCell', () => {
    it('should work', () => {
      const fn: any = (GroupRowHelpers as any).isGroupIndentTableCell || (() => false)
      expect(
        fn(
          { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
          { type: TABLE_GROUP_TYPE, column: { name: 'a' } },
          [{ columnName: 'a' }, { columnName: 'b' }]
        )
      ).toBeTruthy()
    })
  })
  describe('isGroupIndentStubTableCell', () => {
    it('should work', () => {
      const fn: any = (GroupRowHelpers as any).isGroupIndentStubTableCell || (() => false)
      expect(
        fn(
          { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
          { type: TABLE_STUB_TYPE, column: { name: 'a' } },
          [{ columnName: 'a' }, { columnName: 'b' }]
        )
      ).toBeTruthy()
    })
  })
  describe('isGroupTableRow', () => {
    it('should work', () => {
      const fn: any = (GroupRowHelpers as any).isGroupTableRow || (() => false)
      expect(fn({ type: TABLE_GROUP_TYPE })).toBeTruthy()
      expect(fn({ type: Symbol('undef') })).toBeFalsy()
    })
  })
  describe('isGroupRowOrdinaryCell', () => {
    it('should work', () => {
      const fn: any = (GroupRowHelpers as any).isGroupRowOrdinaryCell || (() => false)
      expect(
        fn(
          { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
          { type: TABLE_GROUP_TYPE, column: { name: 'a' } }
        )
      ).toBeTruthy()
    })
  })
  describe('sortAndSpliceColumns', () => {
    it('should work basic', () => {
      const fn: any = (GroupRowHelpers as any).sortAndSpliceColumns || ((arr) => arr)
      const dataColumn = { type: TABLE_DATA_TYPE }
      const groupColumn = { type: TABLE_GROUP_TYPE }
      const otherColumn = { type: Symbol('u') }
      const flexColumn = { type: TABLE_FLEX_TYPE }
      expect(fn([groupColumn, otherColumn, dataColumn, flexColumn])).toEqual([
        groupColumn,
        otherColumn,
        dataColumn,
      ])
    })
  })
  describe('summary helpers', () => {
    const tableRow = { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } }
    const tableColumns = ['g', 'a', 'b', 'c', 'd'].map((name) => ({ column: { name } }))
    const groupSummaryItems = [
      { columnName: 'b', type: 'sum', showInGroupFooter: false, alignByColumn: true },
    ]
    const grouping = [{ columnName: 'g' }]

    it('isRowSummaryCell', () => {
      const fn: any = (GroupRowHelpers as any).isRowSummaryCell || (() => false)
      expect(fn(tableRow, tableColumns[2], grouping, groupSummaryItems)).toBeTruthy()
    })
    it('isPreviousCellContainSummary', () => {
      const fn: any = (GroupRowHelpers as any).isPreviousCellContainSummary || (() => false)
      expect(fn(tableRow, tableColumns[3], tableColumns, grouping, groupSummaryItems)).toBeTruthy()
    })
    it('calculateGroupCellIndent', () => {
      const fn: any =
        (GroupRowHelpers as any).calculateGroupCellIndent ||
        ((c, g, width) => g.findIndex((x) => x.columnName === c.column.name) * width)
      expect(
        fn(
          { column: { name: 'c' } },
          [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }],
          30
        )
      ).toBe(60)
    })
  })
})
