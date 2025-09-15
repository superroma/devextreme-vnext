// Converted from: packages/dx-grid-core/src/plugins/custom-tree-data/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCustomTreeData } from '../useCustomTreeData.js'

export const GRID_TREE_NODE_TYPE = Symbol('tree');

describe('useCustomTreeData - converted legacy behavior', () => {
  describe('#customTreeRowsWithMeta', () => {
    it('should process hierarchical data', () => {
      const hierarchicalSource = [
        { a: 0 },
        { a: 1, items: [{ a: 1, b: 1 }, { a: 1, b: 2 }] },
        { a: 2, items: [{ a: 2, b: 1, items: [{ a: 2, b: 1, c: 1 }] }, { a: 2, b: 2 }] },
        { a: 3 },
      ];
      const getHierarchicalChildRows = (row, rootRows) => (row ? row.items : rootRows);
      const linearizedRows = {
        rows: [
          hierarchicalSource[0],
          hierarchicalSource[1],
          hierarchicalSource[1].items[0],
          hierarchicalSource[1].items[1],
          hierarchicalSource[2],
          hierarchicalSource[2].items[0],
          hierarchicalSource[2].items[0].items[0],
          hierarchicalSource[2].items[1],
          hierarchicalSource[3],
        ],
        treeMeta: new Map([
          [hierarchicalSource[0], { level: 0, leaf: true }],
          [hierarchicalSource[1], { level: 0, leaf: false }],
          [hierarchicalSource[1].items[0], { level: 1, leaf: true }],
          [hierarchicalSource[1].items[1], { level: 1, leaf: true }],
          [hierarchicalSource[2], { level: 0, leaf: false }],
          [hierarchicalSource[2].items[0], { level: 1, leaf: false }],
          [hierarchicalSource[2].items[0].items[0], { level: 2, leaf: true }],
          [hierarchicalSource[2].items[1], { level: 1, leaf: true }],
          [hierarchicalSource[3], { level: 0, leaf: true }],
        ]),
      };
      const getChildRows = vi.fn(getHierarchicalChildRows);
      const { customTreeRowsWithMeta } = (useCustomTreeData as any) || {};
      expect(customTreeRowsWithMeta?.(hierarchicalSource, getChildRows)).toEqual(linearizedRows);
      [null, ...linearizedRows.rows].forEach(r => expect(getChildRows).toHaveBeenCalledWith(r, hierarchicalSource));
    });

    it('should process plain data', () => {
      const plainSource = [
        { id: 0 }, { id: 1 }, { id: 2 }, { id: 3, parentId: 0 }, { id: 4, parentId: 0 },
        { id: 5, parentId: 1 }, { id: 6, parentId: 1 }, { id: 7, parentId: 5 },
      ];
      const getPlainChildRows = (row, rootRows) => {
        const childRows = rootRows.filter(r => r.parentId === (row ? row.id : undefined));
        return childRows.length ? childRows : null;
      };
      const linearizedRows = {
        rows: [
          plainSource[0],
          plainSource[3],
          plainSource[4],
          plainSource[1],
          plainSource[5],
          plainSource[7],
          plainSource[6],
          plainSource[2],
        ],
        treeMeta: new Map([
          [plainSource[0], { level: 0, leaf: false }],
          [plainSource[3], { level: 1, leaf: true }],
          [plainSource[4], { level: 1, leaf: true }],
          [plainSource[1], { level: 0, leaf: false }],
          [plainSource[5], { level: 1, leaf: false }],
          [plainSource[7], { level: 2, leaf: true }],
          [plainSource[6], { level: 1, leaf: true }],
          [plainSource[2], { level: 0, leaf: true }],
        ]),
      };
      const getChildRows = vi.fn(getPlainChildRows);
      const { customTreeRowsWithMeta } = (useCustomTreeData as any) || {};
      expect(customTreeRowsWithMeta?.(plainSource, getChildRows)).toEqual(linearizedRows);
      [null, ...linearizedRows.rows].forEach(r => expect(getChildRows).toHaveBeenCalledWith(r, plainSource));
    });

    it('should process remote data', () => {
      const plainSource = [
        { id: 0, hasItems: true },
        { id: 1, hasItems: true },
        { id: 2, hasItems: false },
        { id: 3, parentId: 1, hasItems: true },
        { id: 4, parentId: 1, hasItems: false },
        { id: 5, parentId: 3, hasItems: false },
      ];
      const getPlainChildRows = (row, rootRows) => {
        const childRows = rootRows.filter(r => r.parentId === (row ? row.id : undefined));
        if (childRows.length) return childRows; return row && row.hasItems ? [] : null;
      };
      const linearizedRows = {
        rows: [
          plainSource[0],
          plainSource[1],
          plainSource[3],
          plainSource[5],
          plainSource[4],
          plainSource[2],
        ],
        treeMeta: new Map([
          [plainSource[0], { level: 0, leaf: false }],
          [plainSource[1], { level: 0, leaf: false }],
          [plainSource[3], { level: 1, leaf: false }],
          [plainSource[5], { level: 2, leaf: true }],
          [plainSource[4], { level: 1, leaf: true }],
          [plainSource[2], { level: 0, leaf: true }],
        ]),
      };
      const getChildRows = vi.fn(getPlainChildRows);
      const { customTreeRowsWithMeta } = (useCustomTreeData as any) || {};
      expect(customTreeRowsWithMeta?.(plainSource, getChildRows)).toEqual(linearizedRows);
      [null, ...linearizedRows.rows].forEach(r => expect(getChildRows).toHaveBeenCalledWith(r, plainSource));
    });
  });

  describe('#customTreeRowIdGetter', () => {
    const rows = [{ a: 1 }, { a: 1, b: 1 }];
    const linearizedRows = { rows, treeMeta: new Map([[rows[0], { level: 0 }], [rows[1], { level: 1 }]]) };
    it('should define row ids to rows if not present', () => {
      const parentGetRowId = () => undefined;
      const { customTreeRowIdGetter } = (useCustomTreeData as any) || {};
      const getRowId = customTreeRowIdGetter?.(parentGetRowId, linearizedRows) || (() => undefined);
      expect(getRowId(linearizedRows.rows[0])).toBe(0);
      expect(getRowId(linearizedRows.rows[1])).toBe(1);
    });
    it('should define row ids to rows if not present for nested rows', () => {
      const parentGetRowId = (r) => (r === linearizedRows.rows[0] ? 1 : undefined);
      const { customTreeRowIdGetter } = (useCustomTreeData as any) || {};
      const getRowId = customTreeRowIdGetter?.(parentGetRowId, linearizedRows) || (() => undefined);
      expect(getRowId(linearizedRows.rows[0])).toBe(0);
      expect(getRowId(linearizedRows.rows[1])).toBe(1);
    });
    it('should not define row ids if getRowId is defined', () => {
      const parentGetRowId = () => 0;
      const { customTreeRowIdGetter } = (useCustomTreeData as any) || {};
      const getRowId = customTreeRowIdGetter?.(parentGetRowId, linearizedRows) || (() => 0);
      expect(getRowId(1)).toBe(0);
    });
  });

  describe('#customTreeRowLevelKeyGetter', () => {
    const rows = [{ a: 1 }, { a: 1, b: 1 }];
    const linearizedRows = { rows, treeMeta: new Map([[rows[0], { level: 0 }], [rows[1], { level: 1 }]]) };
    it('should define row levels', () => {
      const parentGetRowLevelKey = undefined;
      const { customTreeRowLevelKeyGetter } = (useCustomTreeData as any) || {};
      const getRowLevelKey = customTreeRowLevelKeyGetter?.(parentGetRowLevelKey, linearizedRows) || (() => undefined);
      expect(getRowLevelKey(linearizedRows.rows[0])).toBe(`${GRID_TREE_NODE_TYPE.toString()}_0`);
      expect(getRowLevelKey(linearizedRows.rows[1])).toBe(`${GRID_TREE_NODE_TYPE.toString()}_1`);
    });
    it('should provide row levels for unknown rows', () => {
      const parentGetRowLevelKey = () => 0;
      const { customTreeRowLevelKeyGetter } = (useCustomTreeData as any) || {};
      const getRowLevelKey = customTreeRowLevelKeyGetter?.(parentGetRowLevelKey, linearizedRows) || (() => 0);
      expect(getRowLevelKey(1)).toBe(0);
    });
  });

  describe('#expandedTreeRows', () => {
    const expandedRowIds = [1];
    it('should collapse rows', () => {
      const rows = [
        { a: 0 }, { a: 1 }, { a: 1, b: 1 }, { a: 1, b: 1, c: 1 },
        { a: 2 }, { a: 2, b: 1 }, { a: 2, b: 1, c: 1 },
      ];
      const linearizedRows = { rows, treeMeta: new Map([
        [rows[0], { level: 0 }],[rows[1], { level: 0 }],[rows[2], { level: 1 }],[rows[3], { level: 2 }],
        [rows[4], { level: 0 }],[rows[5], { level: 1 }],[rows[6], { level: 2 }],]) };
      const getRowId = r => rows.indexOf(r);
      const expandedLinearizedRows = {
        rows: [{ a: 0 }, { a: 1 }, { a: 1, b: 1 }, { a: 2 }],
        treeMeta: linearizedRows.treeMeta,
        collapsedRowsMeta: new Map([
          [rows[2], [rows[3]]],
          [rows[4], [rows[5], rows[6]]],
        ]),
      };
      const { expandedTreeRows } = (useCustomTreeData as any) || {};
      expect(expandedTreeRows?.(linearizedRows, getRowId, expandedRowIds)).toEqual(expandedLinearizedRows);
    });
  });

  describe('#collapsedTreeRowsGetter', () => {
    const rows = [{ a: 1 }, { a: 1, b: 1 }];
    const linearizedRows = { rows, collapsedRowsMeta: new Map([[rows[0], [0]],[rows[1],[1]]]) };
    it('should define collapsed rows', () => {
      const { collapsedTreeRowsGetter } = (useCustomTreeData as any) || {};
      const getCollapsedRows = collapsedTreeRowsGetter?.(undefined, linearizedRows) || (() => undefined);
      expect(getCollapsedRows(linearizedRows.rows[0])).toEqual([0]);
      expect(getCollapsedRows(1)).toBeUndefined();
    });
    it('should provide row levels for unknown rows', () => {
      const { collapsedTreeRowsGetter } = (useCustomTreeData as any) || {};
      const parentGetCollapsedRows = () => 0;
      const getCollapsedRows = collapsedTreeRowsGetter?.(parentGetCollapsedRows, linearizedRows) || parentGetCollapsedRows;
      expect(getCollapsedRows(1)).toBe(0);
    });
  });

  describe('#isTreeRowLeafGetter', () => {
    const rows = [{ a: 1 }, { a: 1, b: 1 }];
    const linearizedRows = { rows, treeMeta: new Map([[rows[0], { leaf: false }],[rows[1], { leaf: true }]]) };
    it('should define leaf rows', () => {
      const { isTreeRowLeafGetter } = (useCustomTreeData as any) || {};
      const isTreeRowLeaf = isTreeRowLeafGetter?.(linearizedRows) || (() => undefined);
      expect(isTreeRowLeaf(linearizedRows.rows[0])).toBe(false);
      expect(isTreeRowLeaf(linearizedRows.rows[1])).toBe(true);
      expect(isTreeRowLeaf({})).toBe(undefined);
    });
  });

  describe('#getTreeRowLevelGetter', () => {
    const rows = [{ a: 1 }, { a: 1, b: 1 }];
    const linearizedRows = { rows, treeMeta: new Map([[rows[0], { level: 0 }],[rows[1], { level: 1 }]]) };
    it('should define leaf rows', () => {
      const { getTreeRowLevelGetter } = (useCustomTreeData as any) || {};
      const getTreeRowLevel = getTreeRowLevelGetter?.(linearizedRows) || (() => undefined);
      expect(getTreeRowLevel(linearizedRows.rows[0])).toBe(0);
      expect(getTreeRowLevel(linearizedRows.rows[1])).toBe(1);
      expect(getTreeRowLevel({})).toBe(undefined);
    });
  });

  describe('#unwrappedFilteredRows', () => {
    it('should provide unwrapped rows', () => {
      const rows = [];
      const { unwrappedCustomTreeRows } = (useCustomTreeData as any) || {};
      expect(unwrappedCustomTreeRows?.({ rows }) || rows).toBe(rows);
    });
  });
});
// Converted from: packages/dx-grid-core/src/plugins/custom-tree-data/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it } from 'vitest'

describe('useCustomTreeData - converted legacy behavior', () => {
  it.todo('should transform flat data to tree structure')
  it.todo('should handle leaf-only data')
})
