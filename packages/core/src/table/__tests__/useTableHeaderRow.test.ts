// Converted from: packages/dx-grid-core/src/plugins/table-header-row/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import { useTableHeaderRow } from '../useTableHeaderRow.js'

const TABLE_HEADING_TYPE: any = Symbol('TABLE_HEADING_TYPE')
const expectedHeaderRows = [{ key: TABLE_HEADING_TYPE.toString(), type: TABLE_HEADING_TYPE }, {}]

describe('useTableHeaderRow - converted legacy behavior', () => {
  it('should work', () => {
    let hookResult: any
    try {
      hookResult = (useTableHeaderRow as any)({ headerRows: [{}] })
    } catch (e) {
      hookResult = { tableHeaderRows: undefined }
    }
    expect(hookResult.tableHeaderRows).toEqual(expectedHeaderRows)
  })
})
