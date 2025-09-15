// Converted from: packages/dx-grid-core/src/plugins/table-filter-row/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import { useTableFilterRow } from '../useTableFilterRow.js'

const TABLE_FILTER_TYPE: any = Symbol('TABLE_FILTER_TYPE')
const expectedFilterRows = [
  {},
  { key: TABLE_FILTER_TYPE.toString(), type: TABLE_FILTER_TYPE, height: 100 },
]

describe('useTableFilterRow - converted legacy behavior', () => {
  it('should work', () => {
    let hookResult: any
    try {
      hookResult = (useTableFilterRow as any)({ headerRows: [{}], filterRowHeight: 100 })
    } catch (e) {
      hookResult = { tableHeaderRows: undefined }
    }
    expect(hookResult.tableHeaderRows).toEqual(expectedFilterRows)
  })
})
