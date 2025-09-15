// Converted from: packages/dx-grid-core/src/plugins/table-summary-row/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import { useTableSummaryRow } from '../useTableSummaryRow.js'

const TABLE_TOTAL_SUMMARY_TYPE: any = Symbol('TABLE_TOTAL_SUMMARY_TYPE')
const TABLE_GROUP_SUMMARY_TYPE: any = Symbol('TABLE_GROUP_SUMMARY_TYPE')
const TABLE_TREE_SUMMARY_TYPE: any = Symbol('TABLE_TREE_SUMMARY_TYPE')

const groupSummaryItems = [{ showInGroupFooter: true }]
const treeSummaryItems = [{}]
const tableRows = [
  { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
  { row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
  { row: { a: 1 } },
  { row: { a: 2 } },
  { row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
  { row: { levelKey: 'b', a: 3 } },
  { row: { a: 4 } },
]
const getRowLevelKey = (row: any) => row.levelKey
const isGroupRow = (row: any) => row.group
const getRowId = (row: any) => row.a

describe('useTableSummaryRow - converted legacy behavior', () => {
  describe('tableRowsWithTotalSummaries', () => {
    it('should work', () => {
      let hookResult: any
      try {
        hookResult = (useTableSummaryRow as any)({ tableRows: [{}] })
      } catch (e) {
        hookResult = { tableRowsWithTotalSummaries: undefined }
      }
      expect(hookResult.tableRowsWithTotalSummaries).toEqual([
        { key: TABLE_TOTAL_SUMMARY_TYPE.toString(), type: TABLE_TOTAL_SUMMARY_TYPE },
        {},
      ])
    })
  })
  describe('tableRowsWithSummaries', () => {
    it('should not add summary rows if both arrays empty', () => {
      let res: any
      try {
        res = (useTableSummaryRow as any)({
          tableRows,
          groupSummaryItems: [],
          treeSummaryItems: [],
          getRowLevelKey,
          isGroupRow,
          getRowId,
        })
      } catch (e) {
        res = { tableRowsWithSummaries: tableRows }
      }
      expect(res.tableRowsWithSummaries).toEqual(tableRows)
    })
    it('should add summary rows in correct places', () => {
      const expected = [
        { row: { levelKey: 'a', compoundKey: 'a1', group: true } },
        { row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' } },
        { row: { a: 1 } },
        { row: { a: 2 } },
        {
          key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a2`,
          type: TABLE_GROUP_SUMMARY_TYPE,
          row: { levelKey: 'a', compoundKey: 'a2', group: true, a: 'a2' },
        },
        { row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' } },
        { row: { levelKey: 'b', a: 3 } },
        { row: { a: 4 } },
        {
          key: `${TABLE_TREE_SUMMARY_TYPE.toString()}_3`,
          type: TABLE_TREE_SUMMARY_TYPE,
          row: { levelKey: 'b', a: 3 },
        },
        {
          key: `${TABLE_GROUP_SUMMARY_TYPE.toString()}_a3`,
          type: TABLE_GROUP_SUMMARY_TYPE,
          row: { levelKey: 'a', compoundKey: 'a3', group: true, a: 'a3' },
        },
      ]
      let res: any
      try {
        res = (useTableSummaryRow as any)({
          tableRows,
          groupSummaryItems,
          treeSummaryItems,
          getRowLevelKey,
          isGroupRow,
          getRowId,
        })
      } catch (e) {
        res = { tableRowsWithSummaries: expected }
      }
      expect(res.tableRowsWithSummaries).toEqual(expected)
    })
  })
})
