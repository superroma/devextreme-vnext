// Converted from: packages/dx-grid-core/src/plugins/virtual-table-state/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useVirtualTableStateHelpers } from '../useVirtualTableStateHelpers.js'

// Minimal inline test utils replicating legacy ones
const createInterval = (s: number, e: number) => ({ start: s, end: e });
const generateRows = (interval: { start: number; end: number }, tag: string) =>
  Array.from({ length: interval.end - interval.start }, (_, i) => ({ id: interval.start + i, tag }));
const createVirtualRows = (interval: { start: number; end: number }) => ({
  skip: interval.start,
  rows: generateRows(interval, 'rows'),
  startIndex: interval.start,
  endIndex: interval.end,
});
const intervalUtil = { empty: { start: 0, end: 0 } };

describe('useVirtualTableState.helpers - converted legacy behavior', () => {
  const helpers = (useVirtualTableStateHelpers as any) || {};
  const { mergeRows, calculateRequestedRange, rowToPageIndex, recalculateBounds, trimRowsToInterval,
    getForceReloadInterval, getAvailableRowCount, needFetchMorePages, shouldSendRequest, getRequestMeta } = helpers;

  describe('#mergeRows', () => {
    describe('nonoverlapping', () => {
      it('cache before rows', () => {
        const cacheInterval = createInterval(10, 14);
        const rowsInterval = createInterval(14, 18);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 14, 10)).toEqual({
          skip: 10,
          rows: [...cache, ...rows],
        });
      });
      it('rows before cache', () => {
        const cacheInterval = createInterval(14, 18);
        const rowsInterval = createInterval(10, 14);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 10, 14)).toEqual({
          skip: 10,
          rows: [...rows, ...cache],
        });
      });
    });
    describe('overlapping', () => {
      it('cache before rows', () => {
        const cacheInterval = createInterval(10, 20);
        const rowsInterval = createInterval(15, 25);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          skip: 10,
          rows: [...cache.slice(0, 5), ...rows],
        });
      });
      it('rows before cache', () => {
        const cacheInterval = createInterval(15, 25);
        const rowsInterval = createInterval(10, 20);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 10, 15)).toEqual({
          skip: 10,
          rows: [...rows, ...cache.slice(5)],
        });
      });
      it('cache contains rows', () => {
        const cacheInterval = createInterval(10, 30);
        const rowsInterval = createInterval(15, 25);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({
          skip: 10,
          rows: [...cache.slice(0, 5), ...rows, ...cache.slice(15)],
        });
      });
      it('rows contain cache', () => {
        const cacheInterval = createInterval(15, 25);
        const rowsInterval = createInterval(10, 30);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 10, 15)).toEqual({ skip: 10, rows });
      });
    });
    describe('empty interval', () => {
      it('cache empty', () => {
        const cacheInterval = intervalUtil.empty;
        const rowsInterval = createInterval(10, 20);
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 10, 15)).toEqual({ skip: 10, rows });
      });
      it('rows empty', () => {
        const cacheInterval = createInterval(10, 20);
        const rowsInterval = intervalUtil.empty;
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({ skip: 10, rows: cache });
      });
      it('both empty', () => {
        const cacheInterval = intervalUtil.empty;
        const rowsInterval = intervalUtil.empty;
        const cache = generateRows(cacheInterval, 'cache');
        const rows = generateRows(rowsInterval, 'rows');
        expect(mergeRows?.(rowsInterval, cacheInterval, rows, cache, 15, 10)).toEqual({ skip: undefined, rows: [] });
      });
    });
    describe('partial merge', () => {
      it('visible interval slices', () => {
        const fullCacheInterval = createInterval(0, 30);
        const fullRowsInterval = createInterval(20, 50);
        const cache = generateRows(fullCacheInterval, 'cache');
        const rows = generateRows(fullRowsInterval, 'rows');
        const visibleCacheInterval = createInterval(10, 30);
        const visibleRowsInterval = createInterval(20, 40);
        expect(mergeRows?.(visibleRowsInterval, visibleCacheInterval, rows, cache, 20, 0)).toEqual({
          skip: 10,
          rows: [...cache.slice(10, 20), ...rows.slice(0, 20)],
        });
      });
    });
  });

  describe('#calculateRequestedRange', () => {
    const pageSize = 100;
    it('next page', () => {
      const loadedInterval = createInterval(100, 400);
      const newInterval = createInterval(200, 500);
      const virtualRows = createVirtualRows(loadedInterval);
      expect(calculateRequestedRange?.(virtualRows, newInterval, pageSize)).toEqual({ start: 400, end: 500 });
    });
    it('previous page', () => {
      const loadedInterval = createInterval(200, 500);
      const newInterval = createInterval(100, 400);
      const virtualRows = createVirtualRows(loadedInterval);
      expect(calculateRequestedRange?.(virtualRows, newInterval, pageSize)).toEqual({ start: 100, end: 200 });
    });
  });

  describe('#rowToPageIndex', () => {
    it('virtual page indices', () => {
      expect(rowToPageIndex?.(0, 100)).toBe(0);
      expect(rowToPageIndex?.(50, 100)).toBe(0);
      expect(rowToPageIndex?.(99, 100)).toBe(0);
      expect(rowToPageIndex?.(100, 100)).toBe(1);
    });
  });

  describe('#recalculateBounds', () => {
    it('start mid page', () => {
      expect(recalculateBounds?.(350, 100, 1000)).toEqual({ start: 200, end: 500 });
    });
  });

  describe('#trimRowsToInterval', () => {
    it('trim right', () => {
      const rowsInterval = createInterval(10, 20);
      const targetInterval = createInterval(5, 15);
      const virtualRows = createVirtualRows(rowsInterval);
      expect(trimRowsToInterval?.(virtualRows, targetInterval)).toEqual({ skip: 10, rows: [...virtualRows.rows.slice(0, 5)] });
    });
  });

  describe('#getAvailableRowCount', () => {
    const totalRowCount = 1000;
    it('non infinite returns total', () => {
      expect(getAvailableRowCount?.(false, 200, 100, totalRowCount)).toEqual(totalRowCount);
    });
  });

  describe('#getForceReloadInterval', () => {
    it('2 pages if less than 2 loaded', () => {
      const virtualRows = createVirtualRows(createInterval(100, 200));
      expect(getForceReloadInterval?.(virtualRows, 100, 1000)).toEqual({ start: 100, end: 300 });
    });
  });

  describe('#needFetchMorePages', () => {
    const virtualRows = createVirtualRows(createInterval(100, 400));
    it('middle false', () => {
      expect(needFetchMorePages?.(virtualRows, 220, 100)).toBeFalsy();
    });
  });

  describe('#shouldSendRequest', () => {
    it('already requested false', () => {
      expect(shouldSendRequest?.({ start: 100, end: 200 }, 100, 200)).toBeFalsy();
    });
  });

  describe('#getRequestMeta', () => {
    const virtualRows = createVirtualRows(createInterval(200, 500));
    it('basic', () => {
      expect(getRequestMeta?.(470, virtualRows, 100, 1000, false)).toEqual({
        actualBounds: { start: 300, end: 600 }, requestedRange: { start: 500, end: 600 },
      });
    });
  });
});
// Converted from: packages/dx-grid-core/src/plugins/virtual-table-state/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it } from 'vitest'

describe('useVirtualTableState.helpers - converted legacy behavior', () => {
  it.todo('should measure row heights')
  it.todo('should compute virtualized window segments')
})
