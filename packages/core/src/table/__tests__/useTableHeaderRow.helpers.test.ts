// Converted from: packages/dx-grid-core/src/plugins/table-header-row/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import * as HeaderRowHelpers from '../useTableHeaderRow.helpers.js'

const TABLE_HEADING_TYPE: any = Symbol('TABLE_HEADING_TYPE')
const TABLE_DATA_TYPE: any = Symbol('TABLE_DATA_TYPE')

describe('useTableHeaderRow.helpers - converted legacy behavior', () => {
  describe('isHeadingTableCell', () => {
    it('should work', () => {
      const fn: any = (HeaderRowHelpers as any).isHeadingTableCell || (() => undefined)
      expect(fn({ type: TABLE_HEADING_TYPE }, { type: TABLE_DATA_TYPE })).toBeTruthy()
      expect(fn({ type: TABLE_HEADING_TYPE }, { type: 'undefined' })).toBeFalsy()
      expect(fn({ type: 'undefined' }, { type: 'undefined' })).toBeFalsy()
    })
  })
  describe('isHeadingTableRow', () => {
    it('should work', () => {
      const fn: any = (HeaderRowHelpers as any).isHeadingTableRow || (() => undefined)
      expect(fn({ type: TABLE_HEADING_TYPE })).toBeTruthy()
      expect(fn({ type: 'undefined' })).toBeFalsy()
    })
  })
  describe('splitHeaderColumnChains', () => {
    it('should work', () => {
      const split: any = (HeaderRowHelpers as any).splitHeaderColumnChains || (() => [])
      const columns = [{ key: 'a0' }, { key: 'a1' }, { key: 'b0' }, { key: 'b1' }]
      const existing = [[{ columns, start: 0 }]]
      const shouldSplitChain = (currentChain, column) =>
        !currentChain || column.key.indexOf('b') > -1
      const extendChainProps = () => ({ extended: true })
      const chains = split(existing, columns, shouldSplitChain, extendChainProps)
      expect(chains[0]).toHaveLength(3)
    })
  })
  describe('getNextColumnName', () => {
    it('should work', () => {
      const getNext: any = (HeaderRowHelpers as any).getNextColumnName || (() => undefined)
      const tableColumns = [
        { key: 'a', column: { name: 'a' } },
        { key: 'b', column: { name: 'b' } },
        { key: 'c', column: { name: 'c' } },
      ]
      expect(getNext(tableColumns, 'a')).toBe('b')
      expect(getNext(tableColumns, 'b')).toBe('c')
      expect(getNext(tableColumns, 'c')).toBeUndefined()
    })
    it('should return undefined for no data columns', () => {
      const getNext: any = (HeaderRowHelpers as any).getNextColumnName || (() => undefined)
      const tableColumns = [
        { key: 'a', column: { name: 'a' } },
        { key: 'b' },
        { key: 'd', column: { name: 'c' } },
        { key: 'e', column: { name: 'd' } },
        { key: 'f' },
      ]
      expect(getNext(tableColumns, 'a')).toBeUndefined()
      expect(getNext(tableColumns, 'b')).toBeUndefined()
      expect(getNext(tableColumns, 'c')).toBe('d')
      expect(getNext(tableColumns, 'd')).toBeUndefined()
      expect(getNext(tableColumns, 'e')).toBeUndefined()
    })
  })
})
