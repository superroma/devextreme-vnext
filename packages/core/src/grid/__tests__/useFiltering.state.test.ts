// Converted from: packages/dx-grid-core/src/plugins/filtering-state/reducers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { changeColumnFilter } from '../useFilteringState.js'

describe('useFiltering.state - converted legacy behavior', () => {
  describe('#changeColumnFilter', () => {
    it('should work', () => {
      const state = { filters: [] } as any
      const payload = { columnName: 'test', config: { operation: 'contains', value: 'a' } } as any
      expect((changeColumnFilter as any)(state, payload)).toEqual({ filters: [payload] })
    })

    it('should change filter', () => {
      const state = {
        filters: [{ columnName: 'test', config: { operation: 'contains', value: 'a' } }],
      } as any
      const payload = { columnName: 'test', config: { operation: 'contains', value: 'b' } } as any
      expect((changeColumnFilter as any)(state, payload)).toEqual({ filters: [payload] })
    })

    it('should work with immutable properties', () => {
      const state = {
        filters: [{ columnName: 'test', config: { operation: 'contains', value: 'a' } }],
      } as any // immutable in legacy, plain here
      const payload = { columnName: 'test', config: { operation: 'contains', value: 'b' } } as any
      expect(() => (changeColumnFilter as any)(state, payload)).not.toThrow()
    })

    it('should add new filter if keepOther filters', () => {
      const state = {
        filters: [{ columnName: 'test', config: { operation: 'contains', value: 'a' } }],
      } as any
      const payload = {
        columnName: 'test2',
        config: { operation: 'contains', value: 'b' },
        keepOther: true,
      } as any
      expect((changeColumnFilter as any)(state, payload)).toEqual({
        filters: [
          { columnName: 'test', config: { operation: 'contains', value: 'a' } },
          { columnName: 'test2', config: { operation: 'contains', value: 'b' }, keepOther: true },
        ],
      })
    })

    it('should remove filter if config is not specified', () => {
      const state = {
        filters: [{ columnName: 'test', config: { operation: 'contains', value: 'a' } }],
      } as any
      const payload = { columnName: 'test' } as any
      expect((changeColumnFilter as any)(state, payload)).toEqual({ filters: [] })
    })

    it('should not modify state if removing unknown column filter', () => {
      const state = {
        filters: [{ columnName: 'test', config: { operation: 'contains', value: 'a' } }],
      } as any
      const payload = { columnName: 'test2' } as any
      expect((changeColumnFilter as any)(state, payload)).toEqual({
        filters: [{ columnName: 'test', config: { operation: 'contains', value: 'a' } }],
      })
    })
  })
})
