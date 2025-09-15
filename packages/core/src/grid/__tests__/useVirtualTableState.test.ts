// Converted from: packages/dx-grid-core/src/plugins/virtual-table-state/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useVirtualTableState } from '../useVirtualTableState.js'

vi.mock('../virtualTable/helpers', () => ({
  mergeRows: vi.fn(),
}))

// Recreate small test-utils inline
const createInterval = (start: number, end: number) => ({ start, end })
const createVirtualRows = (interval: { start: number; end: number }) => {
  const rows = Array.from({ length: interval.end - interval.start }, (_, i) => ({
    id: interval.start + i,
  }))
  return { skip: interval.start, rows }
}

describe('useVirtualTableState - converted legacy behavior', () => {
  describe('#virtualRowsWithCache', () => {
    it('should call mergeRows with correct parameters', () => {
      const rowsInterval = createInterval(20, 30)
      const cacheInterval = createInterval(15, 25)
      const { skip, rows } = createVirtualRows(rowsInterval)
      const cache = createVirtualRows(cacheInterval)
      const { virtualRowsWithCache } = (useVirtualTableState as any) || {}
      virtualRowsWithCache?.(skip, rows, cache)
      const { mergeRows } = require('../virtualTable/helpers')
      expect(mergeRows).toHaveBeenCalledWith(
        { start: 20, end: 30 },
        { start: 15, end: 25 },
        rows,
        cache.rows,
        20,
        15
      )
    })
  })
})
// Converted from: packages/dx-grid-core/src/plugins/virtual-table-state/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it } from 'vitest'

describe('useVirtualTableState - converted legacy behavior', () => {
  it.todo('should calculate visible boundary rows for viewport')
  it.todo('should handle scroll offset changes')
})
