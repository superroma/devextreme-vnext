// Converted from: packages/dx-grid-core/src/plugins/row-detail-state/reducers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { toggleDetailRowExpanded } from '../useRowDetailState.js'

vi.mock('../../utils/toggle', () => ({
  toggle: vi.fn(() => [1]),
}));

describe('useRowDetail.state - converted legacy behavior', () => {
  describe('#toggleDetailRowExpanded', () => {
    it('should work', () => {
      const state = { expandedDetailRowIds: [] } as any;
      expect((toggleDetailRowExpanded as any)(state, { rowIds: [1] }))
        .toEqual({ expandedDetailRowIds: [1] });
    });
  });
});
