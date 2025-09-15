// Converted from: packages/dx-grid-core/src/plugins/tree-data-state/reducers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { toggleRowExpanded } from '../useTreeDataState.js'

vi.mock('../../utils/toggle', () => ({
  toggle: vi.fn((prev, ids, state) => ({ prev, ids, state })),
}));

describe('useTreeData.state - converted legacy behavior', () => {
  describe('#toggleRowExpanded', () => {
    it('uses common toggle reducer', () => {
      const result = (toggleRowExpanded as any)([], { rowId: 1, state: false });
      // We expect eventual call to underlying toggle with parameters ([], [1], false)
      expect(result).toEqual({ prev: [], ids: [1], state: false });
    });
  });
});
// Converted from: packages/dx-grid-core/src/plugins/tree-data-state/reducers.test.ts
// Phase: RED (Step 08)
import { describe, it } from 'vitest'

describe('useTreeData.state - converted legacy behavior', () => {
  it.todo('should expand tree node')
  it.todo('should collapse tree node')
  it.todo('should toggle tree node')
})
