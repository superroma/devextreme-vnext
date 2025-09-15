// Converted from: packages/dx-grid-core/src/plugins/sorting-state/reducers.test.ts
// Phase: RED (Step 08) – Exact legacy expectations. Placeholder import for future reducer.
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { changeColumnSorting } from '../useSortingState.js'

describe('useSorting.state - converted legacy behavior', () => {
  describe('#changeColumnSorting', () => {
    it('can initiate sorting', () => {
      const state = { sorting: [] } as any
      const payload = { columnName: 'test' } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [{ columnName: 'test', direction: 'asc' }],
      })
    })

    it('can initiate sorting with direction', () => {
      const state = { sorting: [] } as any
      const payload = { columnName: 'test', direction: 'desc' } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [{ columnName: 'test', direction: 'desc' }],
      })
    })

    it('can toggle sorting', () => {
      const state = { sorting: [{ columnName: 'test', direction: 'asc' }] } as any
      const payload = { columnName: 'test' } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [{ columnName: 'test', direction: 'desc' }],
      })
    })

    it('should reset sorting if no keepOther is specified', () => {
      const state = { sorting: [{ columnName: 'test', direction: 'asc' }] } as any
      const payload = { columnName: 'test2' } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [{ columnName: 'test2', direction: 'asc' }],
      })
    })

    it('can initiate multi-column sorting by keepOther option', () => {
      const state = { sorting: [{ columnName: 'test', direction: 'asc' }] } as any
      const payload = { columnName: 'test2', keepOther: true } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      })
    })

    it('should work with immutable properties', () => {
      const state = { sorting: [{ columnName: 'test', direction: 'asc' }] } as any
      expect(() =>
        (changeColumnSorting as any)(state, { columnName: 'test2', keepOther: true })
      ).not.toThrow()
      expect(() =>
        (changeColumnSorting as any)(state, { columnName: 'test2', keepOther: ['test'] })
      ).not.toThrow()
    })

    it('can initiate multi-column sorting by keepOther option with array', () => {
      const state = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test1', direction: 'asc' },
        ],
      } as any
      const payload = { columnName: 'test2', keepOther: ['test'] } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      })
    })

    it('can toggle multi-column sorting', () => {
      const state = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      } as any
      const payload = { columnName: 'test', keepOther: true } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [
          { columnName: 'test', direction: 'desc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      })
    })

    it('should cancel sorting by column if directions is set to null', () => {
      const state = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      } as any
      const payload = { columnName: 'test2', keepOther: true, direction: null } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [{ columnName: 'test', direction: 'asc' }],
      })
    })

    it('should clear sorting if direction is null and keepOther is not specified', () => {
      const state = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test2', direction: 'asc' },
        ],
      } as any
      const payload = { columnName: 'test2', direction: null } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({ sorting: [] })
    })

    it('should set correct sorting if sortIndex is specified', () => {
      const state = {
        sorting: [
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test1', direction: 'asc' },
        ],
      } as any
      const payload = { columnName: 'test2', keepOther: true, sortIndex: 0 } as any
      expect((changeColumnSorting as any)(state, payload)).toEqual({
        sorting: [
          { columnName: 'test2', direction: 'asc' },
          { columnName: 'test', direction: 'asc' },
          { columnName: 'test1', direction: 'asc' },
        ],
      })
    })
  })
})
