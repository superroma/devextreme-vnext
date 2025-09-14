// Ported hierarchical data utilities from legacy implementation
import type { Row } from '../types/grid.js'
import type { GetRowLevelKeyFn } from '../types/filtering.js'

export const NODE_CHECK: unique symbol = Symbol('node')

export interface TreeNodeBase {
  [NODE_CHECK]: true
  root: Row
  children: TreeNode[]
}
export type TreeNode = Row | TreeNodeBase

export function rowsToTree(rows: Row[], getRowLevelKey: GetRowLevelKeyFn): TreeNode[] {
  if (!rows.length) return rows
  const levels: any[] = [{ children: [] as TreeNode[] }]
  rows.forEach((row) => {
    const levelKey = getRowLevelKey(row)
    if (levelKey) {
      const levelIndex = levels.slice(1).findIndex((l) => getRowLevelKey(l.root) === levelKey) + 1
      if (levelIndex > 0) {
        levels.splice(levelIndex, levels.length - levelIndex)
      }
      const node: TreeNodeBase = { [NODE_CHECK]: true, root: row, children: [] }
      levels[levels.length - 1].children.push(node)
      levels.push(node)
    } else {
      levels[levels.length - 1].children.push(row)
    }
  })
  return levels[0].children
}

export function treeToRows(tree: TreeNode[], acc: Row[] = []): Row[] {
  if (!tree.length) return tree as Row[]
  return tree.reduce((rows, node) => {
    if ((node as any)[NODE_CHECK]) {
      const n = node as TreeNodeBase
      rows.push(n.root)
      treeToRows(n.children, rows)
    } else {
      rows.push(node as Row)
    }
    return rows
  }, acc)
}
