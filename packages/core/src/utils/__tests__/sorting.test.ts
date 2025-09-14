import { describe, it, expect } from 'vitest'
import { defaultCompare, createCompare, sortedRows } from '../../utils/sorting.js'
import type { Sorting } from '../../types/sorting.js'

describe('defaultCompare', () => {
  it('handles null/undefined ordering', () => {
    const values = [3, null, undefined, 1]
    const sorted = values.slice().sort(defaultCompare)
    expect(sorted).toEqual([1, 3, null, undefined])
  })
  it('compares numbers', () => {
    expect(defaultCompare(1, 2)).toBe(-1)
    expect(defaultCompare(2, 1)).toBe(1)
    expect(defaultCompare(2, 2)).toBe(0)
  })
  it('compares strings', () => {
    expect(defaultCompare('a', 'b')).toBe(-1)
    expect(defaultCompare('b', 'a')).toBe(1)
  })
})

describe('createCompare', () => {
  const rows = [
    { a: 2, b: 2 },
    { a: 1, b: 3 },
    { a: 1, b: 1 },
  ]
  const getCell = (r: any, c: string) => r[c]

  it('creates multi-column comparer', () => {
    const sorting: Sorting[] = [
      { columnName: 'a', direction: 'asc' },
      { columnName: 'b', direction: 'asc' },
    ]
    const cmp = createCompare(sorting, undefined, getCell)
    const result = rows.slice().sort(cmp)
    expect(result.map((r) => `${r.a}-${r.b}`)).toEqual(['1-1', '1-3', '2-2'])
  })

  it('handles custom column comparer', () => {
    const sorting: Sorting[] = [{ columnName: 'a', direction: 'asc' }]
    const cmp = createCompare(sorting, (name) => (a: any, b: any) => b - a, getCell) // reversed numeric
    const result = rows.slice().sort(cmp)
    expect(result[0].a).toBe(2)
  })

  it('respects sort direction', () => {
    const sorting: Sorting[] = [{ columnName: 'a', direction: 'desc' }]
    const cmp = createCompare(sorting, undefined, getCell)
    const result = rows.slice().sort(cmp)
    expect(result.map((r) => r.a)).toEqual([2, 1, 1])
  })
})

describe('sortedRows', () => {
  const rows = [
    { id: 1, a: 2, b: 2 },
    { id: 2, a: 1, b: 3 },
    { id: 3, a: 1, b: 1 },
  ]
  const getCell = (r: any, c: string) => r[c]

  it('sorts rows by single column', () => {
    const sorted = sortedRows(rows, [{ columnName: 'a', direction: 'asc' }], getCell)
    expect(sorted.map((r) => r.id)).toEqual([2, 3, 1])
  })
  it('sorts rows by multiple columns', () => {
    const sorted = sortedRows(
      rows,
      [
        { columnName: 'a', direction: 'asc' },
        { columnName: 'b', direction: 'asc' },
      ],
      getCell
    )
    expect(sorted.map((r) => r.id)).toEqual([3, 2, 1])
  })
  it('uses custom getCellValue', () => {
    const sorted = sortedRows(rows, [{ columnName: 'virtual', direction: 'asc' }], (row, col) => {
      if (col === 'virtual') return row.a + row.b
      return (row as any)[col]
    })
    expect(sorted.map((r) => r.id)).toEqual([3, 1, 2]) // sums: 3,4,5
  })
})
