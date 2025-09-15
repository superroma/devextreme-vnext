// Converted from: packages/dx-grid-core/src/plugins/integrated-selection/computeds.test.ts
// Phase: RED (Step 08) – Exact legacy test logic copied. Hook import is placeholder.
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelection } from '../useSelection.js'

const selectionNone: number[] = []
const selectionOne = [1]
const selectionTwo = [1, 2]
const selectionThree = [1, 2, 3]

describe('useSelection - converted legacy behavior', () => {
  describe('#rowsWithAvailableToSelect', () => {
    it('should work', () => {
      const rows = [{ id: 1 }, { id: 2, group: true }, { id: 3 }]
      const getRowId = (row: any) => row.id
      const { result } = renderHook(() => (useSelection as any)(rows, { getRowId }))
      expect(result.current?.rows).toEqual(rows)
      expect(result.current?.availableToSelect).toEqual([1, 2, 3])
    })

    it('should work with grouping', () => {
      const rows = [{ id: 1, group: true }, { id: 2 }]
      const getRowId = (row: any) => row.id
      const isGroupRow = (row: any) => row.group
      const { result } = renderHook(() => (useSelection as any)(rows, { getRowId, isGroupRow }))
      expect(result.current?.rows).toEqual(rows)
      expect(result.current?.availableToSelect).toEqual([2])
    })
  })

  describe('#someSelected', () => {
    it('should work with simple scenarios', () => {
      const availableToSelect: number[] = []
      const { result: r1 } = renderHook(() => (useSelection as any)([], { availableToSelect }))
      expect((r1.current?.someSelected as any)(selectionNone)).toBeFalsy()
      const { result: r2 } = renderHook(() => (useSelection as any)([], { availableToSelect: [1] }))
      expect((r2.current?.someSelected as any)(selectionNone)).toBeFalsy()
      const { result: r3 } = renderHook(() => (useSelection as any)([], { availableToSelect: [] }))
      expect((r3.current?.someSelected as any)(selectionOne)).toBeFalsy()
    })

    it('should work when all available rows consist in selection rows', () => {
      const { result: r1 } = renderHook(() => (useSelection as any)([], { availableToSelect: [1] }))
      expect((r1.current?.someSelected as any)(selectionTwo)).toBeFalsy()
      const { result: r2 } = renderHook(() =>
        (useSelection as any)([], { availableToSelect: [1, 3] })
      )
      expect((r2.current?.someSelected as any)(selectionTwo)).toBeTruthy()
    })

    it('should work when selection rows consist in available rows', () => {
      const { result: r1 } = renderHook(() =>
        (useSelection as any)([], { availableToSelect: [1, 2] })
      )
      expect((r1.current?.someSelected as any)(selectionOne)).toBeTruthy()
      const { result: r2 } = renderHook(() => (useSelection as any)([], { availableToSelect: [2] }))
      expect((r2.current?.someSelected as any)(selectionOne)).toBeFalsy()
    })
  })

  describe('#allSelected', () => {
    it('should work with simple scenarios', () => {
      const { result: r1 } = renderHook(() => (useSelection as any)([], { availableToSelect: [] }))
      expect((r1.current?.allSelected as any)(selectionNone)).toBeFalsy()
      const { result: r2 } = renderHook(() => (useSelection as any)([], { availableToSelect: [] }))
      expect((r2.current?.allSelected as any)(selectionOne)).toBeFalsy()
      const { result: r3 } = renderHook(() => (useSelection as any)([], { availableToSelect: [1] }))
      expect((r3.current?.allSelected as any)(selectionNone)).toBeFalsy()
    })

    it('should work when all available rows consist in selection rows', () => {
      const { result: r1 } = renderHook(() =>
        (useSelection as any)([], { availableToSelect: [2, 3] })
      )
      expect((r1.current?.allSelected as any)(selectionThree)).toBeTruthy()
      const { result: r2 } = renderHook(() =>
        (useSelection as any)([], { availableToSelect: [2, 3, 4] })
      )
      expect((r2.current?.allSelected as any)(selectionThree)).toBeFalsy()
    })
  })

  describe('#unwrapSelectedRows', () => {
    it('should work', () => {
      const rowsWithAvailableToSelectData = {
        rows: [{ id: 1 }, { id: 2, group: true }, { id: 3 }],
      }
      const { result } = renderHook(() =>
        (useSelection as any)(rowsWithAvailableToSelectData.rows, {})
      )
      expect(result.current?.rows).toBe(rowsWithAvailableToSelectData.rows)
    })
  })
})
