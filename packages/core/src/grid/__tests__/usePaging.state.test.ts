// Converted from: packages/dx-grid-core/src/plugins/paging-state/reducers.test.ts
// Phase: RED (Step 08) – placeholder import
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setCurrentPage } from '../usePagingState.js'

describe('usePaging.state - converted legacy behavior', () => {
  describe('#setCurrentPage', () => {
    it('should work', () => {
      const state = { currentPage: 0 } as any;
      expect((setCurrentPage as any)(state, 1))
        .toEqual({ currentPage: 1 });
    });
  });
});
