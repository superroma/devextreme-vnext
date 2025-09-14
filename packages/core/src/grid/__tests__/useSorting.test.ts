import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSorting } from '../../index.js' // exported hook
import type { Sorting, SortingColumnExtension } from '../../types/sorting.js'

// Shared test data from legacy
const baseRows = [
  { a: 2, b: 2 },
  { a: 1, b: 1 },
  { a: 2, b: 1 },
  { a: 1, b: 2 },
]
const getCellValue = (row: any, columnName: string) => row[columnName]

describe('useSorting - converted legacy behavior', () => {
  describe('plain rows', () => {
    it('does not mutate grid rows if no sorting specified (returns same reference)', () => {
      const { result } = renderHook(() => useSorting(baseRows, { sorting: [] }))
      expect(result.current.sortedData).toBe(baseRows) // identical reference
    })

    it('should work with immutable-like array (readonly input)', () => {
      const immutableSorting: ReadonlyArray<Sorting> = [{ columnName: 'a', direction: 'asc' }]
      const { result } = renderHook(() =>
        useSorting(baseRows, { sorting: immutableSorting as Sorting[] })
      )
      expect(result.current.sortedData[0].a).toBe(1)
    })

    it('can sort ascending by one column', () => {
      const { result } = renderHook(() =>
        useSorting(baseRows, {
          sorting: [{ columnName: 'a', direction: 'asc' }],
        })
      )
      expect(result.current.sortedData).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 2 },
        { a: 2, b: 1 },
      ])
    })

    it('can sort descending by one column', () => {
      const { result } = renderHook(() =>
        useSorting(baseRows, {
          sorting: [{ columnName: 'a', direction: 'desc' }],
        })
      )
      expect(result.current.sortedData).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ])
    })

    it('can sort by several columns ascending', () => {
      const { result } = renderHook(() =>
        useSorting(baseRows, {
          sorting: [
            { columnName: 'a', direction: 'asc' },
            { columnName: 'b', direction: 'asc' },
          ],
        })
      )
      expect(result.current.sortedData).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 2, b: 2 },
      ])
    })

    it('can sort by several columns with mixed directions', () => {
      const { result } = renderHook(() =>
        useSorting(baseRows, {
          sorting: [
            { columnName: 'a', direction: 'asc' },
            { columnName: 'b', direction: 'desc' },
          ],
        })
      )
      expect(result.current.sortedData).toEqual([
        { a: 1, b: 2 },
        { a: 1, b: 1 },
        { a: 2, b: 2 },
        { a: 2, b: 1 },
      ])
    })

    it('can sort using custom compare (reverse logic)', () => {
      // We'll supply via columnExtensions; custom compare will invert ordering when direction desc
      const { result } = renderHook(() =>
        useSorting(baseRows, {
          sorting: [{ columnName: 'a', direction: 'desc' }],
          columnExtensions: [
            {
              columnName: 'a',
              compare: (a: any, b: any) => {
                if (a === b) return 0
                return a < b ? 1 : -1 // reversed
              },
            },
          ],
        })
      )
      // Expected from legacy custom reversed compare test
      expect(result.current.sortedData).toEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 2 },
        { a: 2, b: 1 },
      ])
    })

    it('should use default compare if custom compare returns nothing (no extension)', () => {
      const { result } = renderHook(() =>
        useSorting(baseRows, {
          sorting: [{ columnName: 'a', direction: 'desc' }],
        })
      )
      expect(result.current.sortedData).toEqual([
        { a: 2, b: 2 },
        { a: 2, b: 1 },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ])
    })

    it('should correctly sort column with undefined values', () => {
      const spacedRows = [{ a: 1 }, { a: 2, b: 1 }, { a: 3, b: 2 }, { a: 4 }]
      const { result } = renderHook(() =>
        useSorting(spacedRows, {
          sorting: [{ columnName: 'b', direction: 'asc' }],
        })
      )
      expect(result.current.sortedData).toEqual([
        { a: 2, b: 1 },
        { a: 3, b: 2 },
        { a: 1 },
        { a: 4 },
      ])
    })

    it('should correctly sort column with null values', () => {
      const spacedRows = [
        { a: 1, b: null },
        { a: 2, b: 1 },
        { a: 3, b: 2 },
        { a: 4, b: null },
      ]
      const { result } = renderHook(() =>
        useSorting(spacedRows, {
          sorting: [{ columnName: 'b', direction: 'asc' }],
        })
      )
      expect(result.current.sortedData).toEqual([
        { a: 2, b: 1 },
        { a: 3, b: 2 },
        { a: 1, b: null },
        { a: 4, b: null },
      ])
    })

    it('should correctly sort column with null and undefined values', () => {
      const spacedRows = [
        { a: 1, b: null },
        { a: 2, b: 1 },
        { a: 3, b: undefined },
        { a: 4, b: 0 },
        { a: 5, b: 2 },
        { a: 6, b: null },
      ]
      const { result } = renderHook(() =>
        useSorting(spacedRows, {
          sorting: [{ columnName: 'b', direction: 'asc' }],
        })
      )
      expect(result.current.sortedData).toEqual([
        { a: 4, b: 0 },
        { a: 2, b: 1 },
        { a: 5, b: 2 },
        { a: 1, b: null },
        { a: 6, b: null },
        { a: 3, b: undefined },
      ])
    })

    it('should keep stable order for duplicate keys (stability)', () => {
      const rows = [
        { id: 1, a: 1 },
        { id: 2, a: 1 },
        { id: 3, a: 1 },
      ]
      const { result } = renderHook(() =>
        useSorting(rows, { sorting: [{ columnName: 'a', direction: 'asc' }] })
      )
      expect(result.current.sortedData.map((r: any) => r.id)).toEqual([1, 2, 3])
    })
  })
})

describe('useSorting - hook API', () => {
  it('supports uncontrolled mode with defaultSorting', () => {
    const { result } = renderHook(() =>
      useSorting(baseRows, {
        defaultSorting: [{ columnName: 'a', direction: 'asc' }],
      })
    )
    expect(result.current.sorting).toEqual([{ columnName: 'a', direction: 'asc' }])
    expect(result.current.sortedData[0].a).toBe(1)
  })

  it('supports controlled mode via sorting prop', () => {
    const sorting: Sorting[] = [{ columnName: 'a', direction: 'desc' }]
    const { result, rerender } = renderHook(
      (p: { sorting: Sorting[] }) => useSorting(baseRows, { sorting: p.sorting }),
      { initialProps: { sorting } }
    )
    expect(result.current.sortedData[0].a).toBe(2)
    // Change external sorting
    rerender({ sorting: [{ columnName: 'a', direction: 'asc' }] })
    expect(result.current.sortedData[0].a).toBe(1)
  })

  it('calls onSortingChange in uncontrolled mode when setSorting is used', () => {
    const cb = vi.fn()
    const { result } = renderHook(() =>
      useSorting(baseRows, { defaultSorting: [], onSortingChange: cb })
    )
    act(() => {
      result.current.setSorting([{ columnName: 'a', direction: 'asc' }])
    })
    expect(cb).toHaveBeenCalledWith([{ columnName: 'a', direction: 'asc' }])
    expect(result.current.sorting).toEqual([{ columnName: 'a', direction: 'asc' }])
  })

  it('in controlled mode setSorting only triggers callback (no internal state)', () => {
    const cb = vi.fn()
    const sorting: Sorting[] = [{ columnName: 'a', direction: 'asc' }]
    const { result } = renderHook(
      (p: { sorting: Sorting[] }) =>
        useSorting(baseRows, { sorting: p.sorting, onSortingChange: cb }),
      { initialProps: { sorting } }
    )
    act(() => {
      result.current.setSorting([{ columnName: 'a', direction: 'desc' }])
    })
    // Still asc because controlled prop not changed
    expect(result.current.sorting).toEqual([{ columnName: 'a', direction: 'asc' }])
    expect(cb).toHaveBeenCalledWith([{ columnName: 'a', direction: 'desc' }])
  })

  it('applies columnExtensions custom comparer', () => {
    const rows = [{ a: 'b' }, { a: 'a' }, { a: 'c' }]
    const extensions: SortingColumnExtension[] = [
      {
        columnName: 'a',
        compare: (x: string, y: string) => {
          // Force descending alphabetical when direction asc
          if (x === y) return 0
          return x < y ? 1 : -1
        },
      },
    ]
    const { result } = renderHook(() =>
      useSorting(rows, {
        sorting: [{ columnName: 'a', direction: 'asc' }],
        columnExtensions: extensions,
      })
    )
    expect(result.current.sortedData.map((r: any) => r.a)).toEqual(['c', 'b', 'a'])
  })
})

// Advanced grouped & hierarchical tests deferred until grouping utilities exist in vNext
describe('useSorting - advanced (deferred)', () => {
  it.todo('should sort grouped rows (pending grouping implementation)')
  it.todo('should sort hierarchical rows (pending tree utilities)')
})
