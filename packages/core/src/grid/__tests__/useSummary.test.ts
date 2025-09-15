// Converted from: packages/dx-grid-core/src/plugins/integrated-summary/computeds.test.ts
// Phase: RED (Step 08) – Exact legacy test logic copied. Hook import placeholder.
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSummary } from '../useSummary.js'

const getCellValue = (row: any, columnName: string) => row[columnName]

describe('useSummary - converted legacy behavior', () => {
  describe('totalSummaryValues', () => {
    it('should culculate count summary', () => {
      const rows = [{ a: 1 }, { a: 2 }, { a: 3 }]
      const summaryItems = [{ columnName: 'a', type: 'count' }]
      const result = [3]
      const { result: hook } = renderHook(() =>
        (useSummary as any)({ rows, summaryItems, getCellValue })
      )
      expect(hook.current?.totalSummaryValues).toEqual(result)
    })

    it('should culculate sum summary', () => {
      const rows = [{ a: 1 }, { a: 2 }, { a: 3 }]
      const summaryItems = [{ columnName: 'a', type: 'sum' }]
      const result = [6]
      const { result: hook } = renderHook(() =>
        (useSummary as any)({ rows, summaryItems, getCellValue })
      )
      expect(hook.current?.totalSummaryValues).toEqual(result)
    })

    it('should culculate max summary', () => {
      const rows = [{ a: 1 }, { a: 2 }, { a: 3 }]
      const summaryItems = [{ columnName: 'a', type: 'max' }]
      const result = [3]
      const { result: hook } = renderHook(() =>
        (useSummary as any)({ rows, summaryItems, getCellValue })
      )
      expect(hook.current?.totalSummaryValues).toEqual(result)
    })

    it('should culculate min summary', () => {
      const rows = [{ a: 1 }, { a: 2 }, { a: 3 }]
      const summaryItems = [{ columnName: 'a', type: 'min' }]
      const result = [1]
      const { result: hook } = renderHook(() =>
        (useSummary as any)({ rows, summaryItems, getCellValue })
      )
      expect(hook.current?.totalSummaryValues).toEqual(result)
    })

    it('should culculate avg summary', () => {
      const rows = [{ a: 1 }, { a: 2 }, { a: 3 }]
      const summaryItems = [{ columnName: 'a', type: 'avg' }]
      const result = [2]
      const { result: hook } = renderHook(() =>
        (useSummary as any)({ rows, summaryItems, getCellValue })
      )
      expect(hook.current?.totalSummaryValues).toEqual(result)
    })

    it('should correctly handle group rows', () => {
      const rows = [
        { levelKey: 'a', group: true, collapsedRows: [{ a: 1 }, { a: 2 }, { a: 3 }] },
        { levelKey: 'a', group: true },
        { a: 4 },
        { a: 5 },
      ]
      const summaryItems = [{ columnName: 'a', type: 'count' }]
      const result = [5]
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = (row: any) => row.group
      const getCollapsedRows = (row: any) => row.collapsedRows
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getCollapsedRows,
        })
      )
      expect(hook.current?.totalSummaryValues).toEqual(result)
    })

    it('should correctly handle hierarchical rows', () => {
      const rows = [
        { levelKey: 'a', a: 1, collapsedRows: [{ a: 2 }, { a: 3 }] },
        { levelKey: 'a', a: 4 },
        { a: 5 },
      ]
      const summaryItems = [{ columnName: 'a', type: 'count' }]
      const result = [5]
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = () => false
      const getCollapsedRows = (row: any) => row.collapsedRows
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getCollapsedRows,
        })
      )
      expect(hook.current?.totalSummaryValues).toEqual(result)
    })
  })

  describe('groupSummaryValues', () => {
    it('should calculate count summary', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true, collapsedRows: [{ a: 2 }, { a: 3 }] },
        { levelKey: 'b', compoundKey: 'b|2', group: true },
        { a: 4 },
        { a: 5 },
        { levelKey: 'b', compoundKey: 'b|3', group: true },
        { a: 6 },
      ]
      const summaryItems = [{ columnName: 'a', type: 'count', showInGroupFooter: true }]
      const result = { 'b|1': [0], 'b|2': [2], 'b|3': [1] }
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = (row: any) => row.group
      const getCollapsedRows = (row: any) => row.collapsedRows
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getCollapsedRows,
        })
      )
      expect(hook.current?.groupSummaryValues).toEqual(result)
    })

    it('should correctly handle trees', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true },
        { levelKey: 'c', a: 4 },
        { a: 5 },
        { a: 6 },
        { levelKey: 'c', a: 7 },
        { a: 8 },
      ]
      const summaryItems = [{ columnName: 'a', type: 'count' }]
      const result = { 'b|1': [3] }
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = (row: any) => row.group
      const getCollapsedRows = (row: any) => row.collapsedRows
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getCollapsedRows,
        })
      )
      expect(hook.current?.groupSummaryValues).toEqual(result)
    })

    it('should calculate value summary in opened group', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true },
        { levelKey: 'c', compoundKey: 'b|c|1', group: true },
        { a: 1 },
        { a: 2 },
        { levelKey: 'c', compoundKey: 'b|c|2', group: true, collapsedRows: [{ a: 3 }, { a: 4 }] },
      ]
      const summaryItems = [{ columnName: 'a', type: 'sum', showInGroupFooter: true }]
      const result = { 'b|1': [10], 'b|c|1': [3], 'b|c|2': [7] }
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = (row: any) => row.group
      const getCollapsedRows = (row: any) => row.collapsedRows
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getCollapsedRows,
        })
      )
      expect(hook.current?.groupSummaryValues).toEqual(result)
    })

    it('should not calculate first level closed group', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true, collapsedRows: [] },
        { levelKey: 'c', compoundKey: 'b|c|1', group: true, collapsedRows: [] },
        { a: 1 },
        { a: 2 },
        { levelKey: 'c', compoundKey: 'b|c|2', group: true, collapsedRows: [{ a: 3 }, { a: 4 }] },
        { levelKey: 'b', compoundKey: 'b|2', group: true, collapsedRows: [{ a: 5 }, { a: 6 }] },
      ]
      const summaryItems = [{ columnName: 'a', type: 'sum', showInGroupFooter: true }]
      const result = { 'b|1': [10], 'b|2': [0], 'b|c|1': [3], 'b|c|2': [7] }
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = (row: any) => row.group
      const getCollapsedRows = (row: any) => row.collapsedRows
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getCollapsedRows,
        })
      )
      expect(hook.current?.groupSummaryValues).toEqual(result)
    })

    it('should not calculate collapsed rows twice when row level summary is specified', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true, collapsedRows: [] },
        { levelKey: 'c', compoundKey: 'b|c|1', group: true, collapsedRows: [] },
        { a: 1 },
        { a: 2 },
        { levelKey: 'c', compoundKey: 'b|c|2', group: true, collapsedRows: [{ a: 3 }, { a: 4 }] },
        { levelKey: 'b', compoundKey: 'b|2', group: true, collapsedRows: [{ a: 5 }, { a: 6 }] },
      ]
      const summaryItems = [
        { columnName: 'a', type: 'sum', showInGroupFooter: true },
        { columnName: 'a', type: 'sum', showInGroupFooter: false },
      ]
      const result = { 'b|1': [10, 10], 'b|2': [11, 11], 'b|c|1': [3, 3], 'b|c|2': [7, 7] }
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = (row: any) => row.group
      const getCollapsedRows = (row: any) => row.collapsedRows
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getCollapsedRows,
        })
      )
      expect(hook.current?.groupSummaryValues).toEqual(result)
    })
  })

  describe('treeSummaryValues', () => {
    it('should culculate count summary', () => {
      const rows = [
        { levelKey: 'a', a: 1 },
        { levelKey: 'a', a: 2 },
        { levelKey: 'b', a: 3 },
        { a: 4 },
        { levelKey: 'b', a: 5 },
        { levelKey: 'a', a: 6 },
        { a: 7 },
      ]
      const summaryItems = [{ columnName: 'a', type: 'count' }]
      const result = { 2: [2], 3: [1], 6: [1] } as any
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = () => false
      const getRowId = (row: any) => row.a
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getRowId,
        })
      )
      expect(hook.current?.treeSummaryValues).toEqual(result)
    })

    it('should correctly handle groups', () => {
      const rows = [
        { levelKey: 'b', compoundKey: 'b|1', group: true },
        { levelKey: 'c', a: 4 },
        { a: 5 },
        { a: 6 },
        { levelKey: 'c', a: 7 },
        { a: 8 },
      ]
      const summaryItems = [{ columnName: 'a', type: 'count' }]
      const result = { 4: [2], 7: [1] } as any
      const getRowLevelKey = (row: any) => row.levelKey
      const isGroupRow = (row: any) => row.group
      const getRowId = (row: any) => row.a
      const { result: hook } = renderHook(() =>
        (useSummary as any)({
          rows,
          summaryItems,
          getCellValue,
          getRowLevelKey,
          isGroupRow,
          getRowId,
        })
      )
      expect(hook.current?.treeSummaryValues).toEqual(result)
    })
  })
})
