// Converted from: packages/dx-grid-core/src/plugins/table/computeds.test.ts
// Phase: RED (Step 08) – strict 1:1 mapping. Additional tests will be appended as exact legacy cases are ported.
import { describe, it, expect } from 'vitest'
import { useTable } from '../useTable.js'

// Minimal copied dataset (full legacy datasets to be inlined later during expansion pass):
const columns: any[] = [{ name: 'a' }, { name: 'b' }]
const rows: any[] = [
  { a: 1, b: 2 },
  { a: 3, b: 4 },
]
const expectedBaseRows: any[] = [] // Legacy expected structure placeholder

describe('useTable - converted legacy behavior', () => {
  it('should generate base table rows (placeholder)', () => {
    let tableResult: any
    try {
      tableResult = (useTable as any)({ columns, rows })
    } catch (e) {
      tableResult = { tableRows: undefined }
    }
    expect(tableResult.tableRows).toEqual(expectedBaseRows)
  })
  // Legacy remaining cases (kept as todo until full data/expectations copied):
  it.todo('should build table rows with data rows')
  it.todo('should combine grouped and data rows')
  it.todo('should respect row order')
})
