import { describe, it, expect, vi } from 'vitest'
import { NODE_CHECK, rowsToTree, treeToRows } from '../hierarchical-data.js'

describe('hierarchical-data utils', () => {
  /* eslint-disable indent */
  const rows = [
    { levelKey: 'a' },
    { levelKey: 'b' },
    { levelKey: 'c' },
    { a: 1 },
    { a: 2 },
    { levelKey: 'b' },
    { levelKey: 'c' },
    { a: 3 },
    { a: 4 },
    { a: 5 },
    { levelKey: 'a' },
    { levelKey: 'd' },
    { a: 6 },
    { levelKey: 'a' },
  ]
  /* eslint-enable indent */

  const node = (root: any, ...children: any[]) => ({ root, children, [NODE_CHECK]: true })

  const tree = [
    node(
      { levelKey: 'a' },
      node({ levelKey: 'b' }, node({ levelKey: 'c' }, { a: 1 }, { a: 2 })),
      node({ levelKey: 'b' }, node({ levelKey: 'c' }, { a: 3 }, { a: 4 }, { a: 5 }))
    ),
    node({ levelKey: 'a' }, node({ levelKey: 'd' }, { a: 6 })),
    node({ levelKey: 'a' }),
  ]

  it('converts plain rows to tree', () => {
    expect(rowsToTree(rows, (r) => (r as any).levelKey)).toEqual(tree)
  })

  it('converts tree to plain rows', () => {
    expect(treeToRows(tree as any)).toEqual(rows)
  })

  it('processes empty rows', () => {
    expect(rowsToTree([], (r) => (r as any).levelKey)).toEqual([])
  })

  it('processes empty tree', () => {
    expect(treeToRows([])).toEqual([])
  })
})
