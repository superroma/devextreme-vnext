// Converted from: packages/dx-grid-core/src/plugins/grouping-state/reducers.test.ts
// Phase: RED (Step 08) – Exact legacy tests copied referencing future reducer exports.
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  changeColumnGrouping,
  draftColumnGrouping,
  cancelColumnGroupingDraft,
  toggleExpandedGroups,
} from '../useGroupingState.js'

describe('useGrouping.state - converted legacy behavior', () => {
  describe('#changeColumnGrouping', () => {
    it('can group by column', () => {
      const state = { grouping: [] } as any
      const payload = { columnName: 'test' }
      // Legacy expectation
      expect((changeColumnGrouping as any)(state, payload)).toEqual({
        grouping: [{ columnName: 'test' }],
      })
    })

    it('can group by column with immutable properties', () => {
      const state = { grouping: [{ columnName: 'test' }], expandedGroups: [] } as any
      const payload = { columnName: 'test' }
      expect(() => (changeColumnGrouping as any)(state, payload)).not.toThrow()
    })

    it('can ungroup by column', () => {
      const state = { grouping: [{ columnName: 'test' }], expandedGroups: ['a'] } as any
      const payload = { columnName: 'test' }
      expect((changeColumnGrouping as any)(state, payload)).toEqual({
        grouping: [],
        expandedGroups: [],
      })
    })

    it('can group by several columns', () => {
      const state = { grouping: [{ columnName: 'column1' }] } as any
      const payload = { columnName: 'column2' }
      expect((changeColumnGrouping as any)(state, payload)).toEqual({
        grouping: [{ columnName: 'column1' }, { columnName: 'column2' }],
      })
    })

    it('can group by column with a group index', () => {
      const state = { grouping: [{ columnName: 'column1' }], expandedGroups: ['a'] } as any
      const payload = { columnName: 'column2', groupIndex: 0 }
      expect((changeColumnGrouping as any)(state, payload)).toEqual({
        grouping: [{ columnName: 'column2' }, { columnName: 'column1' }],
        expandedGroups: [],
      })
    })
  })

  describe('#toggleExpandedGroups', () => {
    it('should add an opened group', () => {
      const state = { expandedGroups: ['a', 'b'] } as any
      const payload = { groupKey: 'c' }
      expect((toggleExpandedGroups as any)(state, payload)).toEqual({
        expandedGroups: ['a', 'b', 'c'],
      })
    })

    it('should work with immutable properties', () => {
      const state = { expandedGroups: ['a', 'b'] } as any
      const payload = { groupKey: 'c' }
      expect(() => (toggleExpandedGroups as any)(state, payload)).not.toThrow()
    })

    it('should remove a closed group', () => {
      const state = { expandedGroups: ['a', 'b', 'c'] } as any
      const payload = { groupKey: 'c' }
      expect((toggleExpandedGroups as any)(state, payload)).toEqual({ expandedGroups: ['a', 'b'] })
    })
  })

  describe('#draftColumnGrouping', () => {
    it('can start grouping change', () => {
      const state = { grouping: [{ columnName: 'column1' }], draftGrouping: null } as any
      const payload = { columnName: 'test', groupIndex: 0 }
      expect((draftColumnGrouping as any)(state, payload)).toEqual({
        draftGrouping: [{ columnName: 'test' }, { columnName: 'column1' }],
      })
    })
  })

  describe('#cancelColumnGroupingDraft', () => {
    it('can cancel grouping change', () => {
      const state = { draftGrouping: { columnName: 'test', groupIndex: 2 } } as any
      const payload = null
      expect((cancelColumnGroupingDraft as any)(state, payload)).toEqual({ draftGrouping: null })
    })
  })
})
