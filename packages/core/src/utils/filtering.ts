import type {
  Filter,
  FilterExpression,
  FilterPredicate,
  GetColumnPredicateFn,
  GetRowLevelKeyFn,
  GetCollapsedRowsFn,
} from '../types/filtering.js'
import type { Row, GetCellValueFn } from '../types/grid.js'
import { NODE_CHECK, rowsToTree, treeToRows } from './hierarchical-data.js'

// Operations (case-insensitive string based & comparison) – mirroring legacy behavior
const toLowerCase = (value: any) => String(value).toLowerCase()

const operationPredicates: Record<string, FilterPredicate> = {
  contains: (value, filter) => toLowerCase(value).includes(toLowerCase(filter.value)),
  notContains: (value, filter) => !toLowerCase(value).includes(toLowerCase(filter.value)),
  startsWith: (value, filter) => toLowerCase(value).startsWith(toLowerCase(filter.value)),
  endsWith: (value, filter) => toLowerCase(value).endsWith(toLowerCase(filter.value)),
  equal: (value, filter) => String(value) === String(filter.value),
  notEqual: (value, filter) => String(value) !== String(filter.value),
  greaterThan: (value, filter) => value > filter.value!,
  greaterThanOrEqual: (value, filter) => value >= filter.value!,
  lessThan: (value, filter) => value < filter.value!,
  lessThanOrEqual: (value, filter) => value <= filter.value!,
}

export const defaultFilterPredicate: FilterPredicate = (value, filter) => {
  const op = filter.operation || 'contains'
  const predicate = operationPredicates[op]
  if (!predicate) throw new Error(`Unknown filter operation: ${op}`)
  return predicate(value, filter)
}

type CompiledPredicate = (row: Row, isNode?: boolean) => boolean

const operators = {
  or: (predicates: CompiledPredicate[]) => (row: Row) =>
    predicates.reduce((acc, p) => acc || p(row), false),
  and: (predicates: CompiledPredicate[]) => (row: Row) =>
    predicates.reduce((acc, p) => acc && p(row), true),
}

function buildPredicate(
  filterExpression: FilterExpression | Filter,
  getCellValue: GetCellValueFn,
  getColumnPredicate?: GetColumnPredicateFn
): CompiledPredicate {
  const getSimplePredicate = (filter: Filter): CompiledPredicate => {
    const custom = getColumnPredicate && getColumnPredicate(filter.columnName)
    const predicate = custom || defaultFilterPredicate
    return (row: Row) => predicate(getCellValue(row, filter.columnName), filter, row)
  }
  const getOperatorPredicate = (expr: any): CompiledPredicate | undefined => {
    if (expr && expr.operator) {
      const build = operators[expr.operator as 'and' | 'or']
      return build && build(expr.filters.map(getPredicate))
    }
  }
  const getPredicate = (expr: any): CompiledPredicate =>
    getOperatorPredicate(expr) || getSimplePredicate(expr)
  return getPredicate(filterExpression)
}

function filterHierarchical(
  rows: Row[],
  predicate: CompiledPredicate,
  getRowLevelKey?: GetRowLevelKeyFn,
  getCollapsedRows?: GetCollapsedRowsFn
) {
  if (!getRowLevelKey) return { rows: rows.filter((r) => predicate(r)) }
  const tree = rowsToTree(rows, getRowLevelKey)
  const collapsedRowsMeta: any[] = []

  const filterTree = (treeNodes: any[]): any[] =>
    treeNodes.reduce((acc: any[], node: any) => {
      if (node[NODE_CHECK]) {
        const filteredChildren = filterTree(node.children)
        if (filteredChildren.length) {
          acc.push({ ...node, children: filteredChildren })
          return acc
        }
        const keep = predicate(node.root, true)
        if (keep) acc.push(node.root)
        return acc
      }
      if (predicate(node)) acc.push(node)
      return acc
    }, [])

  const filteredTree = filterTree(tree)
  return { rows: treeToRows(filteredTree), collapsedRowsMeta: new Map(collapsedRowsMeta) }
}

export function filteredRows(
  rows: Row[],
  filterExpression: FilterExpression | Filter | null,
  getCellValue: GetCellValueFn,
  getColumnPredicate?: GetColumnPredicateFn,
  getRowLevelKey?: GetRowLevelKeyFn,
  getCollapsedRows?: GetCollapsedRowsFn
): { rows: Row[]; collapsedRowsMeta?: Map<any, any> } {
  if (
    !rows.length ||
    !filterExpression ||
    !Object.keys(filterExpression).length ||
    (typeof (filterExpression as any).operator === 'string' &&
      (filterExpression as any).filters?.length === 0)
  ) {
    return { rows }
  }
  const predicate = buildPredicate(filterExpression, getCellValue, getColumnPredicate)
  return filterHierarchical(rows, predicate, getRowLevelKey, getCollapsedRows)
}

export function createFilterPredicate(
  filterExpression: FilterExpression | Filter,
  getCellValue: GetCellValueFn,
  getColumnPredicate?: GetColumnPredicateFn
) {
  return buildPredicate(filterExpression, getCellValue, getColumnPredicate)
}
