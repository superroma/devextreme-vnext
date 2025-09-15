// Converted from: packages/dx-grid-core/src/plugins/table-column-reordering/reducers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: packages/dx-grid-core/src/plugins/table-column-reordering/reducers.test.ts
// 1:1 parity: two original test cases (#changeColumnOrder "should work" twice)
// We keep both with same expectations even though names duplicate originally.

// Placeholder import path for future hook/state implementation
// changeColumnOrder should be implemented later; keeping failing import acceptable in RED phase
import { changeColumnOrder } from '../internal/table-column-reordering.reducers'

describe('useTableColumnReordering.state - converted legacy behavior', () => {
  describe('#changeColumnOrder', () => {
    const order = ['a', 'b', 'c'] as const
    const payload = { sourceColumnName: 'a', targetColumnName: 'b' } as const

    it('should work', () => {
      const nextOrder = changeColumnOrder(order as any, payload as any)
      expect(nextOrder).toEqual(['b', 'a', 'c'])
    })

    it('should work', () => {
      // Ensure it does not throw with an immutable-like array; mimic legacy Immutable(order)
      const immutableLike = Object.freeze([...order])
      expect(() => changeColumnOrder(immutableLike as any, payload as any)).not.toThrow()
    })
  })
})
