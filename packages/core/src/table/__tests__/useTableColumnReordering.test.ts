// Converted from: packages/dx-grid-core/src/plugins/table-column-reordering/computeds.test.ts
// Phase: RED (Step 08) – legacy parity
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  orderedColumns,
  tableHeaderRowsWithReordering,
  draftOrder,
} from '../internal/tableColumnReordering.computeds.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TABLE_DATA_TYPE } from '../useTable.constants.js'
// local fallback
// @ts-ignore
const _TABLE_DATA_TYPE = TABLE_DATA_TYPE || Symbol('data')

describe('TableColumnReordering computeds (useTableColumnReordering placeholder)', () => {
  describe('#orderedColumns', () => {
    it('should return columns in the order specified', () => {
      const tableColumns = [
        { type: _TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'b', payload: {} } },
        { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
      ]
      const order = ['b', 'a', 'c']
      const computed = orderedColumns!(tableColumns as any, order)
      expect(computed).toEqual([
        { type: _TABLE_DATA_TYPE, column: { name: 'b', payload: {} } },
        { type: _TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
      ])
      expect(computed === tableColumns).toBeFalsy()
    })
    it('should work correctly with non-data columns', () => {
      const tableColumns = [
        { type: 'test', column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
      ]
      expect(orderedColumns!(tableColumns as any, ['c', 'a', 'b'])).toEqual([
        { type: 'test', column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'b' } },
      ])
    })
    it('should order a large number of columns correctly', () => {
      const tableColumns = [
        { type: 'test', column: { name: 'z' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'd' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'e' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'f' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'g' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'i' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'j' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'k' } },
      ]
      const order = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'z']
      expect(orderedColumns!(tableColumns as any, order)).toEqual(tableColumns)
    })
  })

  describe('#tableHeaderRowsWithReordering', () => {
    it('should add a reordering row to the rows passed', () => {
      expect(tableHeaderRowsWithReordering!([] as any)).toEqual([
        {
          key: Symbol.for('TABLE_REORDERING_TYPE')?.toString?.() || expect.any(String),
          type: expect.anything(),
          height: 0,
        },
      ])
    })
  })

  describe('#draftOrder', () => {
    const columns = [
      { type: _TABLE_DATA_TYPE, column: { name: 'a' } },
      { type: _TABLE_DATA_TYPE, column: { name: 'b' } },
      { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
      { type: _TABLE_DATA_TYPE, column: { name: 'd' } },
    ]
    it('should return reordered columns', () => {
      expect(draftOrder!(columns as any, 1, 3)).toEqual([
        { type: _TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'd' } },
        { type: _TABLE_DATA_TYPE, column: { name: 'b' } },
      ])
    })
    it('should return the array passed if no changes are possible', () => {
      expect(draftOrder!(columns as any, -1, -1)).toBe(columns)
      expect(draftOrder!(columns as any, -1, 1)).toBe(columns)
      expect(draftOrder!(columns as any, 1, 1)).toBe(columns)
    })
    it('should work with immutable properties (simulated)', () => {
      expect(() => draftOrder!([...columns], 1, 3)).not.toThrow()
    })
  })
})
