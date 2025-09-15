// Converted from: packages/dx-grid-core/src/plugins/search-state/reducers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { changeSearchValue } from '../useSearchState.js'

describe('useSearch.state - converted legacy behavior', () => {
  describe('#changeSearchValue', () => {
    it('should work', () => {
      const state = { value: '' } as any;
      expect((changeSearchValue as any)(state, 'abc'))
        .toEqual({ value: 'abc' });
    });
  });
});
