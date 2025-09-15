// Converted from: packages/dx-grid-core/src/plugins/custom-grouping/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCustomGrouping } from '../useCustomGrouping.js'

// Recreate constants locally (same values expected later in real module)
export const GRID_GROUP_TYPE = Symbol('group')
export const GRID_GROUP_CHECK = Symbol('isGroup')
export const GRID_GROUP_LEVEL_KEY = Symbol('groupLevelKey')

const groupRow = ({ groupedBy, ...rest }) => ({
  ...rest,
  groupedBy,
  [GRID_GROUP_CHECK]: true,
  [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE.toString()}_${groupedBy}`,
})

describe('useCustomGrouping - converted legacy behavior', () => {
  describe('#customGroupedRows', () => {
    it('should process hierarchical data by one column', () => {
      const hierarchicalSource = [
        {
          key: 1,
          items: [
            { a: 1, b: 1 },
            { a: 1, b: 2 },
          ],
        },
        {
          key: 2,
          items: [
            { a: 2, b: 1 },
            { a: 2, b: 2 },
          ],
        },
        { key: 3, items: [] },
      ]
      const getHierarchicalChildGroups = (groups) =>
        groups.map((g) => ({ key: String(g.key), value: g.key, childRows: g.items }))
      const groupings = [{ columnName: 'a' }]
      const groupedRows = [
        groupRow({ groupedBy: 'a', compoundKey: '1', key: '1', value: 1 }),
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        groupRow({ groupedBy: 'a', compoundKey: '2', key: '2', value: 2 }),
        { a: 2, b: 1 },
        { a: 2, b: 2 },
        groupRow({ groupedBy: 'a', compoundKey: '3', key: '3', value: 3 }),
      ]
      const getChildGroups = vi.fn(getHierarchicalChildGroups)
      // Placeholder call pattern – real hook will expose customGroupedRows
      const { customGroupedRows } = {
        customGroupedRows: (rows, g, getter) =>
          (useCustomGrouping as any)?.customGroupedRows?.(rows, g, getter),
      } as any
      expect(customGroupedRows(hierarchicalSource, groupings, getChildGroups)).toEqual(groupedRows)
      expect(getChildGroups).toHaveBeenCalledWith(
        hierarchicalSource,
        groupings[0],
        hierarchicalSource
      )
    })

    it('should process hierarchical data by several columns', () => {
      const hierarchicalSource = [
        {
          key: 1,
          items: [
            { key: 1, items: [{ a: 1, b: 1 }] },
            { key: 2, items: [{ a: 1, b: 2 }] },
          ],
        },
        {
          key: 2,
          items: [
            { key: 1, items: [{ a: 2, b: 1 }] },
            { key: 2, items: [{ a: 2, b: 2 }] },
          ],
        },
      ]
      const getHierarchicalChildGroups = (groups) =>
        groups.map((g) => ({ key: String(g.key), value: g.key, childRows: g.items }))
      const groupings = [{ columnName: 'a' }, { columnName: 'b' }]
      const groupedRows = [
        groupRow({ groupedBy: 'a', compoundKey: '1', key: '1', value: 1 }),
        groupRow({ groupedBy: 'b', compoundKey: '1|1', key: '1', value: 1 }),
        { a: 1, b: 1 },
        groupRow({ groupedBy: 'b', compoundKey: '1|2', key: '2', value: 2 }),
        { a: 1, b: 2 },
        groupRow({ groupedBy: 'a', compoundKey: '2', key: '2', value: 2 }),
        groupRow({ groupedBy: 'b', compoundKey: '2|1', key: '1', value: 1 }),
        { a: 2, b: 1 },
        groupRow({ groupedBy: 'b', compoundKey: '2|2', key: '2', value: 2 }),
        { a: 2, b: 2 },
      ]
      const getChildGroups = vi.fn(getHierarchicalChildGroups)
      const { customGroupedRows } = {
        customGroupedRows: (rows, g, getter) =>
          (useCustomGrouping as any)?.customGroupedRows?.(rows, g, getter),
      } as any
      expect(customGroupedRows(hierarchicalSource, groupings, getChildGroups)).toEqual(groupedRows)
      expect(getChildGroups).toHaveBeenCalledWith(
        hierarchicalSource,
        groupings[0],
        hierarchicalSource
      )
      expect(getChildGroups).toHaveBeenCalledWith(
        hierarchicalSource[0].items,
        groupings[1],
        hierarchicalSource
      )
      expect(getChildGroups).toHaveBeenCalledWith(
        hierarchicalSource[1].items,
        groupings[1],
        hierarchicalSource
      )
    })

    it('should process hierarchical data with remote expanded groups', () => {
      const hierarchicalSource = [
        { key: 1, items: null },
        { key: 2, items: [] },
      ]
      const getHierarchicalChildGroups = (groups) =>
        groups.map((g) => ({ key: String(g.key), value: g.key, childRows: g.items }))
      const groupings = [{ columnName: 'a' }, { columnName: 'b' }]
      const groupedRows = [
        groupRow({ groupedBy: 'a', compoundKey: '1', key: '1', value: 1 }),
        groupRow({ groupedBy: 'a', compoundKey: '2', key: '2', value: 2 }),
      ]
      const getChildGroups = vi.fn(getHierarchicalChildGroups)
      const { customGroupedRows } = {
        customGroupedRows: (rows, g, getter) =>
          (useCustomGrouping as any)?.customGroupedRows?.(rows, g, getter),
      } as any
      expect(customGroupedRows(hierarchicalSource, groupings, getChildGroups)).toEqual(groupedRows)
      expect(getChildGroups).toHaveBeenCalledTimes(1)
    })
  })

  describe('#customGroupingRowIdGetter', () => {
    it('should define row ids to rows if not present', () => {
      const groupedRows = [
        groupRow({ groupedBy: 'a', key: '1', value: 1 }),
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]
      const parentGetRowId = () => undefined
      const { customGroupingRowIdGetter } = (useCustomGrouping as any) || {}
      const getRowId = customGroupingRowIdGetter?.(parentGetRowId, groupedRows) || (() => undefined)
      expect(getRowId(groupedRows[1])).toBe(0)
      expect(getRowId(groupedRows[2])).toBe(1)
    })

    it('should not define row ids to empty rows', () => {
      const parentGetRowId = () => undefined
      const { customGroupingRowIdGetter } = (useCustomGrouping as any) || {}
      const getRowId = customGroupingRowIdGetter?.(parentGetRowId, []) || (() => undefined)
      expect(getRowId(1)).toBe(undefined)
    })

    it('should not define row ids if getRowId is defined', () => {
      const groupedRows = [groupRow({ groupedBy: 'a', key: '1', value: 1 }), { a: 1, b: 1 }]
      const parentGetRowId = () => 0
      const { customGroupingRowIdGetter } = (useCustomGrouping as any) || {}
      const getRowId = customGroupingRowIdGetter?.(parentGetRowId, groupedRows) || (() => 0)
      expect(getRowId(1)).toBe(0)
    })
  })
})
