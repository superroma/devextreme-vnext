import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFiltering } from '../useFiltering.js'
import { filteredRows } from '../../utils/filtering.js'
import type { FilterExpression } from '../../types/filtering.js'

// NOTE: Implementation not yet added – tests should fail (RED) until hook & utils exist.

describe('useFiltering - basic', () => {
  const rows = [
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 1 },
    { a: 2, b: 2 },
  ]

  it('returns original data when no filters', () => {
    const { result } = renderHook(() => useFiltering(rows))
    expect(result.current.filteredData).toBe(rows) // reference equality
  })

  it('filters by one field', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, { filters: [{ columnName: 'a', value: 1 }] })
    )
    expect(result.current.filteredData).toEqual([
      { a: 1, b: 1 },
      { a: 1, b: 2 },
    ])
  })

  it('filters by several fields (AND)', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, {
        filters: [
          { columnName: 'a', value: 1 },
          { columnName: 'b', value: 2 },
        ],
      })
    )
    expect(result.current.filteredData).toEqual([{ a: 1, b: 2 }])
  })

  it('supports OR via manual expression utility (advanced)', () => {
    const expression: FilterExpression = {
      operator: 'or',
      filters: [
        { columnName: 'a', value: 1 },
        { columnName: 'b', value: 1 },
      ],
    }
    const data = filteredRows(rows, expression, (r, c) => (r as any)[c])
    expect(data.rows).toEqual([
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
    ])
  })
})

describe('useFiltering - operations & predicates', () => {
  const rows = [
    { s: 'Alpha', n: 1 },
    { s: 'alphabet', n: 2 },
    { s: 'Beta', n: 3 },
    { s: 'gamma', n: 10 },
    { s: null as any, n: 11 },
    { s: undefined as any, n: 12 },
  ]

  it('contains (default) is case-insensitive', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, { filters: [{ columnName: 's', value: 'alp' }] })
    )
    expect(result.current.filteredData.map((r) => r.s)).toEqual(['Alpha', 'alphabet'])
  })

  it('startsWith', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, { filters: [{ columnName: 's', value: 'al', operation: 'startsWith' }] })
    )
    expect(result.current.filteredData.map((r) => r.s)).toEqual(['Alpha', 'alphabet'])
  })

  it('endsWith', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, { filters: [{ columnName: 's', value: 'ha', operation: 'endsWith' }] })
    )
    expect(result.current.filteredData.map((r) => r.s)).toEqual(['Alpha'])
  })

  it('equal coerces types', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, { filters: [{ columnName: 'n', value: '3', operation: 'equal' }] })
    )
    expect(result.current.filteredData).toEqual([{ s: 'Beta', n: 3 }])
  })

  it('greaterThan', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, { filters: [{ columnName: 'n', value: 3, operation: 'greaterThan' }] })
    )
    expect(result.current.filteredData.map((r) => r.n)).toEqual([10, 11, 12])
  })

  it('handles null/undefined gracefully (contains)', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, { filters: [{ columnName: 's', value: 'a' }] })
    )
    // null / undefined should not crash and not match
    expect(result.current.filteredData.some((r) => r.s == null)).toBe(false)
  })

  it('custom predicate via columnExtensions', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, {
        filters: [{ columnName: 'n', value: 5 }],
        columnExtensions: [
          {
            columnName: 'n',
            predicate: (value, filter) => value >= filter.value && value % 2 === 0,
          },
        ],
      })
    )
    expect(result.current.filteredData.map((r) => r.n)).toEqual([10, 12])
  })
})

describe('useFiltering - hook API', () => {
  const rows = [
    { id: 1, v: 'foo' },
    { id: 2, v: 'bar' },
    { id: 3, v: 'foobar' },
  ]

  it('supports uncontrolled defaultFilters', () => {
    const { result } = renderHook(() =>
      useFiltering(rows, { defaultFilters: [{ columnName: 'v', value: 'foo' }] })
    )
    expect(result.current.filteredData.map((r) => r.id)).toEqual([1, 3])
    act(() => {
      result.current.setFilters([{ columnName: 'v', value: 'bar' }])
    })
    // after state update filtered set should reflect new uncontrolled filters
    // 'bar' contains match should include id 2 and id 3 ('foobar'), legacy contains is substring
    expect(result.current.filteredData.map((r) => r.id)).toEqual([2, 3])
  })

  it('supports controlled filters prop & onFiltersChange', () => {
    let external = [{ columnName: 'v', value: 'foo' }]
    const changes: any[] = []
    const { result, rerender } = renderHook(() =>
      useFiltering(rows, {
        filters: external,
        onFiltersChange: (f) => changes.push(f),
      })
    )
    expect(result.current.filteredData.map((r) => r.id)).toEqual([1, 3])
    // attempt to change from inside should trigger callback only
    result.current.setFilters([{ columnName: 'v', value: 'bar' }])
    expect(changes).toHaveLength(1)
    expect(changes[0][0].value).toBe('bar')
    // apply controlled update
    external = [{ columnName: 'v', value: 'bar' }]
    rerender()
    expect(result.current.filteredData.map((r) => r.id)).toEqual([2, 3])
  })
})

describe('filteredRows - nested expression edge cases', () => {
  const rows = [
    { a: 'x', b: 1, c: 'keep' },
    { a: 'y', b: 2, c: 'drop' },
    { a: 'x', b: 3, c: 'keep' },
  ]

  it('complex nested AND/OR', () => {
    const expression: FilterExpression = {
      operator: 'or',
      filters: [
        {
          operator: 'and',
          filters: [
            { columnName: 'a', value: 'x' },
            { columnName: 'b', value: 1, operation: 'equal' },
          ],
        },
        {
          operator: 'and',
          filters: [
            { columnName: 'a', value: 'x' },
            { columnName: 'b', value: 3, operation: 'equal' },
          ],
        },
      ],
    }
    const result = filteredRows(rows, expression, (r, c) => (r as any)[c])
    expect(result.rows.map((r) => r.b)).toEqual([1, 3])
  })

  it('empty filter array returns all rows (ref preservation)', () => {
    const expr: FilterExpression = { operator: 'and', filters: [] }
    const result = filteredRows(rows, expr, (r, c) => (r as any)[c])
    expect(result.rows).toBe(rows)
  })
})
