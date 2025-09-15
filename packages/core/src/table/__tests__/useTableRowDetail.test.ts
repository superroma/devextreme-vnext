// Converted from: packages/dx-grid-core/src/plugins/table-row-detail/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: table-row-detail/computeds.test.ts
import {
  tableRowsWithExpandedDetail,
  tableColumnsWithDetail,
  tableDetailCellColSpanGetter,
} from '../internal/table-row-detail.computeds'
import { TABLE_DATA_TYPE } from '../internal/table.constants'
import { TABLE_DETAIL_TYPE } from '../internal/table-row-detail.constants'

describe('useTableRowDetail - converted legacy behavior', () => {
  describe('#tableRowsWithExpandedDetail', () => {
    it('can expand one row', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
      ]
      const expandedDetailRowIds = [2]
      const rowsWithDetails = tableRowsWithExpandedDetail(
        tableRows as any,
        expandedDetailRowIds as any,
        100
      )
      expect(rowsWithDetails).toEqual([
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
        {
          key: `${String(TABLE_DETAIL_TYPE)}_2`,
          type: TABLE_DETAIL_TYPE,
          rowId: 2,
          row: 'row2',
          height: 100,
        },
      ])
    })
    it("can't expand not data", () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: 'undefined', rowId: 2, row: 'row2' },
      ]
      const expandedDetailRowIds = [2]
      const rowsWithDetails = tableRowsWithExpandedDetail(
        tableRows as any,
        expandedDetailRowIds as any,
        100
      )
      expect(rowsWithDetails).toEqual([
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: 'undefined', rowId: 2, row: 'row2' },
      ])
    })
    it('can expand several rows', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        { type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
      ]
      const expandedDetailRowIds = [1, 2]
      const rowsWithDetails = tableRowsWithExpandedDetail(
        tableRows as any,
        expandedDetailRowIds as any,
        100
      )
      expect(rowsWithDetails).toEqual([
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        {
          key: `${String(TABLE_DETAIL_TYPE)}_1`,
          type: TABLE_DETAIL_TYPE,
          rowId: 1,
          row: 'row1',
          height: 100,
        },
        { type: TABLE_DATA_TYPE, rowId: 2, row: 'row2' },
        {
          key: `${String(TABLE_DETAIL_TYPE)}_2`,
          type: TABLE_DETAIL_TYPE,
          rowId: 2,
          row: 'row2',
          height: 100,
        },
      ])
    })
  })
  describe('#tableColumnsWithDetail', () => {
    it('should work', () => {
      expect(tableColumnsWithDetail([{}] as any, 50)).toEqual([
        { key: String(TABLE_DETAIL_TYPE), type: TABLE_DETAIL_TYPE, width: 50 },
        {},
      ])
    })
  })
  describe('#tableGroupCellColSpanGetter', () => {
    const parentGetCellColSpan = () => 'original'
    it('should return correct colspan', () => {
      const getCellColSpanGetter = tableDetailCellColSpanGetter(parentGetCellColSpan as any)
      const tableColumn = { type: 'undefined' }
      expect(
        getCellColSpanGetter({
          tableColumn,
          tableRow: { type: TABLE_DETAIL_TYPE },
          tableColumns: [tableColumn, {}, {}],
        })
      ).toBe(3)
      expect(
        getCellColSpanGetter({
          tableColumn,
          tableRow: { type: TABLE_DETAIL_TYPE },
          tableColumns: [{}, tableColumn, {}],
        })
      ).toBe('original')
      expect(
        getCellColSpanGetter({
          tableRow: { type: 'undefined' },
          tableColumn: { type: 'undefined' },
          tableColumns: [{}, tableColumn, {}],
        })
      ).toBe('original')
    })
  })
})
