// Filtering types (ported from legacy with simplification for vNext hooks)
import type { Row, GetCellValueFn } from './grid.js'

export interface Filter {
  columnName: string
  operation?: FilterOperation
  value?: any
}

export interface FilterExpression {
  operator: 'and' | 'or'
  filters: Array<FilterExpression | Filter>
}

export type FilterOperation = string // contains | notContains | startsWith | endsWith | equal | notEqual | > etc.

export interface FilteringColumnExtension {
  columnName: string
  predicate?: (value: any, filter: Filter, row: Row) => boolean
}

export type FilterPredicate = (value: any, filter: Filter, row?: Row) => boolean

export type GetColumnPredicateFn = (columnName: string) => FilterPredicate | undefined

export type GetRowLevelKeyFn = (row: Row) => string | undefined
export type GetCollapsedRowsFn = (row: Row) => Row[] | undefined
