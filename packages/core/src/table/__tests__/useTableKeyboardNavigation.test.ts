// Converted from: packages/dx-grid-core/src/plugins/table-keyboard-navigation/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import { useTableKeyboardNavigation } from '../useTableKeyboardNavigation.js'

// Legacy test: packages/dx-grid-core/src/plugins/table-keyboard-navigation/computeds.test.ts
// Original focused function: getFocusing(tableBodyRows, focusing)

describe('useTableKeyboardNavigation - converted legacy behavior', () => {
  it('getFocusing: should return correct id', () => {
    const tableBodyRows = [
      { key: 'test_row_1', rowId: 1 },
      { key: 'test_row_2', rowId: 2 },
      { key: 'test_row_3', rowId: 3 },
    ] as any

    let hookResult: any
    try {
      hookResult = (useTableKeyboardNavigation as any)({ tableBodyRows })
    } catch (e) {
      hookResult = { getFocusing: () => [] }
    }
    const getFocusing = hookResult.getFocusing || (() => [])
    expect(getFocusing(tableBodyRows, { rowKey: 'test_row_2' })).toEqual([2])
    expect(getFocusing(tableBodyRows)).toEqual([])
    expect(getFocusing(tableBodyRows, { rowKey: 'header' })).toEqual([])
  })
})
