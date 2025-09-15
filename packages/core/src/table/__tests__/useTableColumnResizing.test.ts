// Converted from: packages/dx-grid-core/src/plugins/table-column-resizing/computeds.test.ts
// Phase: RED (Step 08) – exact legacy parity
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  tableColumnsWithWidths,
  tableColumnsWithDraftWidths,
} from '../internal/tableColumnResizing.computeds.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TABLE_DATA_TYPE } from '../useTable.constants.js'

// Local fallback for TABLE_DATA_TYPE if constant module not yet implemented
// @ts-ignore
const _TABLE_DATA_TYPE = TABLE_DATA_TYPE || Symbol('data')

describe('TableColumnResizing Plugin computeds (useTableColumnResizing placeholder)', () => {
  const tableColumns = [
    { type: _TABLE_DATA_TYPE, column: { name: 'a' } },
    { type: _TABLE_DATA_TYPE, column: { name: 'b' } },
    { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
  ]
  const resizingMode = 'widget'

  describe('#tableColumnsWithWidths', () => {
    it('should work', () => {
      expect(
        tableColumnsWithWidths!(
          tableColumns as any,
          [
            { columnName: 'a', width: 10 },
            { columnName: 'b', width: 20 },
            { columnName: 'c', width: 15 },
          ],
          resizingMode
        )
      ).toEqual([
        { type: _TABLE_DATA_TYPE, width: 10, column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, width: 20, column: { name: 'b' } },
        { type: _TABLE_DATA_TYPE, width: 15, column: { name: 'c' } },
      ])
    })

    it('should work with non-number types', () => {
      expect(
        tableColumnsWithWidths!(
          tableColumns as any,
          [
            { columnName: 'a', width: '10px' },
            { columnName: 'b', width: 20 },
            { columnName: 'c', width: '15' },
          ],
          resizingMode
        )
      ).toEqual([
        { type: _TABLE_DATA_TYPE, width: '10px', column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, width: 20, column: { name: 'b' } },
        { type: _TABLE_DATA_TYPE, width: 15, column: { name: 'c' } },
      ])
    })

    it('should throw error if width for column is not specified', () => {
      expect(() =>
        tableColumnsWithWidths!(
          tableColumns as any,
          [
            { columnName: 'a', width: 10 },
            { columnName: 'c', width: 15 },
          ],
          resizingMode
        )
      ).toThrow(/columnWidths.*TableColumnResizing/)
    })

    it('should throw error if width for column specified like invalid type', () => {
      expect(() =>
        tableColumnsWithWidths!(
          tableColumns as any,
          [
            { columnName: 'a', width: '10pix' },
            { columnName: 'b', width: 15 },
            { columnName: 'c', width: 15 },
          ],
          resizingMode
        )
      ).toThrow(/columnWidths.*TableColumnResizing/)
    })

    it('should throw error if width for column specified like invalid value', () => {
      expect(() =>
        tableColumnsWithWidths!(
          tableColumns as any,
          [
            { columnName: 'a', width: '-10' },
            { columnName: 'b', width: 15 },
            { columnName: 'c', width: 15 },
          ],
          resizingMode
        )
      ).toThrow(/columnWidths.*TableColumnResizing/)
    })

    it('should throw error if resizing mode is wrong', () => {
      expect(() =>
        tableColumnsWithWidths!(
          tableColumns as any,
          [
            { columnName: 'a', width: 'auto' },
            { columnName: 'b', width: 15 },
            { columnName: 'c', width: 15 },
          ],
          resizingMode
        )
      ).toThrow(/columnWidths.*TableColumnResizing/)
    })

    it('should throw error if resizing mode is invalid', () => {
      expect(() =>
        tableColumnsWithWidths!(
          tableColumns as any,
          [
            { columnName: 'a', width: 'auto' },
            { columnName: 'b', width: 15 },
            { columnName: 'c', width: 15 },
          ],
          'nextResizing'
        )
      ).toThrow(/columnWidths.*TableColumnResizing/)
    })

    it('should throw error if column width defined less than 0', () => {
      expect(() =>
        tableColumnsWithWidths!(
          tableColumns as any,
          [
            { columnName: 'a', width: -10 },
            { columnName: 'b', width: 15 },
            { columnName: 'c', width: 15 },
          ],
          'nextColumn'
        )
      ).toThrow(/columnWidths.*TableColumnResizing/)
    })
  })

  describe('#tableColumnsWithDraftWidths', () => {
    it('should work', () => {
      expect(
        tableColumnsWithDraftWidths!(tableColumns as any, [{ columnName: 'a', width: 15 }])
      ).toEqual([
        { type: _TABLE_DATA_TYPE, width: 15, column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
      ])
    })
  })
})
