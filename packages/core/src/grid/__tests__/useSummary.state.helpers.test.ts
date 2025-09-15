// Converted from: packages/dx-grid-core/src/plugins/summary-state/helpers.test.ts
// Phase: RED (Step 08) – Exact legacy logic referencing future prepareGroupSummaryItems export.
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { prepareGroupSummaryItems } from '../useSummaryState.js'

describe('#prepareSummaryGroupItems (converted)', () => {
  it('should set showInGroupFooter if it is undefined', () => {
    const item = { columnName: 'a', type: 'sum' } as any
    const items = [
      { ...item },
      { ...item, showInGroupFooter: true },
      { ...item, showInGroupFooter: false },
      { ...item, showInGroupFooter: false, alignByColumn: true },
    ]
    expect((prepareGroupSummaryItems as any)(items)).toEqual([
      { ...item, showInGroupFooter: true },
      { ...item, showInGroupFooter: true },
      { ...item, showInGroupFooter: false },
      { ...item, showInGroupFooter: false, alignByColumn: true },
    ])
  })
})
