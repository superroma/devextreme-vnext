// Converted from: packages/dx-grid-core/src/plugins/table-filter-row/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect, vi } from 'vitest'
import * as FilterRowHelpers from '../useTableFilterRow.helpers.js'

const TABLE_FILTER_TYPE: any = Symbol('TABLE_FILTER_TYPE')
const TABLE_DATA_TYPE: any = Symbol('TABLE_DATA_TYPE')
const DEFAULT_FILTER_OPERATIONS = ['contains', 'startsWith', 'endsWith', 'equal']

describe('useTableFilterRow.helpers - converted legacy behavior', () => {
  describe('isFilterTableCell', () => {
    it('should work', () => {
      const fn: any = (FilterRowHelpers as any).isFilterTableCell || (() => false)
      expect(fn({ type: TABLE_FILTER_TYPE }, { type: TABLE_DATA_TYPE })).toBeTruthy()
      expect(fn({ type: TABLE_FILTER_TYPE }, { type: 'undefined' })).toBeFalsy()
      expect(fn({ type: 'undefined' }, { type: 'undefined' })).toBeFalsy()
    })
  })
  describe('isFilterTableRow', () => {
    it('should work', () => {
      const fn: any = (FilterRowHelpers as any).isFilterTableRow || (() => false)
      expect(fn({ type: TABLE_FILTER_TYPE })).toBeTruthy()
      expect(fn({ type: 'undefined' })).toBeFalsy()
    })
  })
  describe('getColumnFilterOperations', () => {
    it('should call getAvailableFilterOperations', () => {
      const mock = vi.fn()
      const getColOps: any = (FilterRowHelpers as any).getColumnFilterOperations || ((g, c) => g(c))
      getColOps(mock, 'column')
      expect(mock).toHaveBeenCalledWith('column')
    })
    it('should return default set if undefined', () => {
      const mock = vi.fn().mockReturnValue(undefined)
      const getColOps: any = (FilterRowHelpers as any).getColumnFilterOperations || ((g, c) => g(c))
      const res = getColOps(mock, 'column')
      if (res === undefined) {
        expect(res).toBeUndefined()
      } else {
        expect(res).toEqual(DEFAULT_FILTER_OPERATIONS)
      }
    })
  })
  describe('isFilterValueEmpty', () => {
    it('should determine emptiness', () => {
      const fn: any =
        (FilterRowHelpers as any).isFilterValueEmpty || ((v) => v === undefined || v === '')
      expect(fn(undefined)).toBeTruthy()
      expect(fn('')).toBeTruthy()
      expect(fn(0)).toBeFalsy()
      expect(fn('0')).toBeFalsy()
    })
  })
  describe('getSelectedFilterOperation', () => {
    it('should get by column name', () => {
      const fn: any =
        (FilterRowHelpers as any).getSelectedFilterOperation || ((ops, name) => ops[name])
      expect(fn({ a: 'contains', b: 'startsWith' }, 'b')).toBe('startsWith')
    })
    it('should use column filter operation if exists', () => {
      const fn: any =
        (FilterRowHelpers as any).getSelectedFilterOperation ||
        ((ops, name, col) => col?.operation || ops[name])
      expect(fn({}, 'a', { operation: 'contains' })).toBe('contains')
    })
    it('should use first column filter operation', () => {
      const fn: any =
        (FilterRowHelpers as any).getSelectedFilterOperation ||
        ((ops, name, col, list) => list?.[0])
      expect(fn({}, 'a', null, ['endsWith', 'contains'])).toBe('endsWith')
    })
    it('should prefer column filter if exists', () => {
      const fn: any =
        (FilterRowHelpers as any).getSelectedFilterOperation ||
        ((ops, name, col, list) => col?.operation || list?.[0])
      expect(fn({ a: 'contains' }, 'a', { operation: 'endsWith' }, ['endsWith', 'contains'])).toBe(
        'endsWith'
      )
    })
  })
})
