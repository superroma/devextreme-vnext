# Test Parity Plan (Step 08)

Purpose: Track 1:1 legacy → vNext test conversion to achieve full behavioral parity for `dx-grid-core` (ADR-005). This document is the single source of truth for progress and decisions during Step 08 (conversion / RED phase).

## Parity Rules (Summary)

1. Every legacy test file → exactly one vNext test file.
2. Every legacy `it(...)` → exactly one vNext test case (same intent / data / expectations).
3. No extra tests beyond legacy scope in this step.
4. No missing tests – all mapped.
5. Structure modernized (hooks, utils) but semantics preserved.
6. Failing is acceptable (RED) as long as tests run.

## Legacy vs vNext Counts

- Legacy (dx-grid-core): EXPECTED 81, CURRENT COUNT observed: 80 (needs discrepancy resolution)
- VNext target (core+table+utils): 80 (or 81 once discrepancy clarified)

Discrepancy Action: Identify missing 1 file (Possibilities: removed recently, renamed, or `_blueprint` inclusion ambiguity). OPEN.

## Mapping Legend

Status codes:

- [ ] Pending (not created)
- [S] Skeleton (file exists with test names / bodies todo or placeholder)
- [R] Running (file executes with preserved logic; may fail assertions)
- [✓] Verified (logic ported & equivalent; GREEN phase later)

## Batch Strategy

B1 Core group: integrated-grouping, integrated-selection, integrated-summary + grouping/selection/summary state reducers & helpers.
B2 Remaining core state reducers: sorting-state, paging-state, filtering-state, editing-state, row-detail-state, search-state.
B3 Tree / virtual / exporter / custom: custom-grouping, custom-tree-data, tree-data-state, virtual-table-state, grid-exporter.
B4 Table layer: ALL `table-*` computeds + helpers + column features + selection + summary rows.
B5 Utilities + blueprint + any stragglers (column-extension, table utils, virtual table utils, group panel, column geometries, common reducers, etc.).

## Conversion Template (Hook-based) - NO FAKE IMPLEMENTATIONS!

**❌ WRONG APPROACH (what Copilot did):**

```ts
// DON'T DO THIS - creates fake implementation in test file!
const fakeGroupedRows = (rows, grouping) => {
  /* 60 lines of fake code */
}

describe('useGrouping - converted legacy behavior', () => {
  it('can group by first column', () => {
    const result = fakeGroupedRows(rows, grouping) // Uses fake!
    expect(result.map((r) => r.groupedBy)).toContain('a') // Weak assertion
  })
})
```

**✅ CORRECT APPROACH:**

```ts
// Converted from: packages/dx-grid-core/src/plugins/integrated-grouping/computeds.test.ts
// Phase: RED (Step 08) – REAL imports, EXACT expectations, tests FAIL until Step 09+
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useGrouping } from '../useGrouping.js' // REAL hook import (doesn't exist yet)

// Copy EXACT test data from legacy file
const rows = [
  { a: 1, b: 1 },
  { a: 1, b: 2 },
  { a: 2, b: 1 },
  { a: 2, b: 2 },
]
const getCellValue = (row, columnName) => row[columnName]
const firstGrouping = [{ columnName: 'a' }]
const firstGroupedRows = [
  // Copy EXACT expected result from legacy test
  { groupedBy: 'a', key: '1', value: 1 /* ... */ },
  { a: 1, b: 1 },
  { a: 1, b: 2 },
  { groupedBy: 'a', key: '2', value: 2 /* ... */ },
  { a: 2, b: 1 },
  { a: 2, b: 2 },
]

describe('useGrouping - converted legacy behavior', () => {
  describe('groupedRows functionality', () => {
    it('can group by first column', () => {
      const { result } = renderHook(() =>
        useGrouping(rows, { grouping: firstGrouping, getCellValue })
      )

      // EXACT same expectation as legacy
      expect(result.current.groupedData).toEqual(firstGroupedRows)
    })
  })
})
```

**CRITICAL RULES:**

1. Import REAL hooks that don't exist yet
2. Copy EXACT test data and expectations from legacy
3. Tests MUST FAIL because hooks don't exist
4. NEVER create fake implementations in test files
5. Use exact `.toEqual()` assertions, not weak `.toContain()`

## Open Decisions

| Topic                                     | Decision | Notes                                                                                                                        |
| ----------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Include `_blueprint` tests?               | OPEN     | 3 files: computeds/helpers/reducers. If kept, map to `grid/__tests__/blueprint.*.test.ts`.                                   |
| Stub strategy (runnable failing vs todos) | OPEN     | Preferred: create minimal stub hooks returning shape so full bodies run & fail meaningfully. Fallback: it.todo placeholders. |
| Discrepancy 80 vs 81                      | OPEN     | Need to re-check branch history / potential excluded file.                                                                   |

## Batch Progress Overview

| Batch | Scope Summary                                            | Files | Status |
| ----- | -------------------------------------------------------- | ----- | ------ |
| B1    | Grouping/Selection/Summary (integrated + state reducers) | 7+    | R      |
| B2    | Sorting/Paging/Filtering/Editing/Search/RowDetail state  | 6     | R      |
| B3    | Custom grouping/tree/exporter/virtual                    | 5     | [ ]    |
| B4    | Table plugins (computeds + helpers + column features)    | ~40   | [ ]    |
| B5    | Utilities + blueprint + leftovers                        | ~15   | [ ]    |

## Detailed Mapping Table

### Integrated & Core State

| Legacy File                                    | Target vNext                                    | Batch    | Status                         |
| ---------------------------------------------- | ----------------------------------------------- | -------- | ------------------------------ |
| plugins/integrated-sorting/computeds.test.ts   | grid/**tests**/useSorting.test.ts               | EXISTING | R                              |
| plugins/integrated-paging/computeds.test.ts    | grid/**tests**/usePaging.test.ts                | EXISTING | R (hierarchical tests missing) |
| plugins/integrated-filtering/computeds.test.ts | grid/**tests**/useFiltering.test.ts             | EXISTING | R                              |
| plugins/integrated-grouping/computeds.test.ts  | grid/**tests**/useGrouping.test.ts              | B1       | R                              |
| plugins/integrated-selection/computeds.test.ts | grid/**tests**/useSelection.test.ts             | B1       | R                              |
| plugins/integrated-summary/computeds.test.ts   | grid/**tests**/useSummary.test.ts               | B1       | R                              |
| plugins/grouping-state/reducers.test.ts        | grid/**tests**/useGrouping.state.test.ts        | B1       | R                              |
| plugins/selection-state/reducers.test.ts       | grid/**tests**/useSelection.state.test.ts       | B1       | R                              |
| plugins/summary-state/helpers.test.ts          | grid/**tests**/useSummary.state.helpers.test.ts | B1       | R                              |
| plugins/sorting-state/reducers.test.ts         | grid/**tests**/useSorting.state.test.ts         | B2       | R                              |
| plugins/paging-state/reducers.test.ts          | grid/**tests**/usePaging.state.test.ts          | B2       | R                              |
| plugins/filtering-state/reducers.test.ts       | grid/**tests**/useFiltering.state.test.ts       | B2       | R                              |
| plugins/editing-state/reducers.test.ts         | grid/**tests**/useEditing.state.test.ts         | B2       | R                              |
| plugins/row-detail-state/reducers.test.ts      | grid/**tests**/useRowDetail.state.test.ts       | B2       | R                              |
| plugins/search-state/reducers.test.ts          | grid/**tests**/useSearch.state.test.ts          | B2       | R                              |

### Custom / Tree / Virtual / Exporter

| Legacy File                                   | Target vNext                                        | Batch | Status |
| --------------------------------------------- | --------------------------------------------------- | ----- | ------ |
| plugins/custom-grouping/computeds.test.ts     | grid/**tests**/useCustomGrouping.test.ts            | B3    | [S]    |
| plugins/custom-tree-data/computeds.test.ts    | grid/**tests**/useCustomTreeData.test.ts            | B3    | [S]    |
| plugins/tree-data-state/reducers.test.ts      | grid/**tests**/useTreeData.state.test.ts            | B3    | [S]    |
| plugins/virtual-table-state/computeds.test.ts | grid/**tests**/useVirtualTableState.test.ts         | B3    | [S]    |
| plugins/virtual-table-state/helpers.test.ts   | grid/**tests**/useVirtualTableState.helpers.test.ts | B3    | [S]    |
| plugins/grid-exporter/computeds.test.ts       | grid/**tests**/useGridExporter.test.ts              | B3    | [S]    |
| plugins/grid-exporter/helpers.test.ts         | grid/**tests**/useGridExporter.helpers.test.ts      | B3    | [S]    |

### Table Layer (Representative Subset Listing; full expansion required)

| Legacy File                                         | Target vNext                                               | Batch | Status |
| --------------------------------------------------- | ---------------------------------------------------------- | ----- | ------ |
| plugins/table/computeds.test.ts                     | table/**tests**/useTable.test.ts                           | B4    | [S]    |
| plugins/table/helpers.test.ts                       | table/**tests**/useTable.helpers.test.ts                   | B4    | [S]    |
| plugins/table-header-row/computeds.test.ts          | table/**tests**/useTableHeaderRow.test.ts                  | B4    | [S]    |
| plugins/table-header-row/helpers.test.ts            | table/**tests**/useTableHeaderRow.helpers.test.ts          | B4    | [S]    |
| plugins/table-filter-row/computeds.test.ts          | table/**tests**/useTableFilterRow.test.ts                  | B4    | [S]    |
| plugins/table-filter-row/helpers.test.ts            | table/**tests**/useTableFilterRow.helpers.test.ts          | B4    | [S]    |
| plugins/table-group-row/computeds.test.ts           | table/**tests**/useTableGroupRow.test.ts                   | B4    | [S]    |
| plugins/table-group-row/helpers.test.ts             | table/**tests**/useTableGroupRow.helpers.test.ts           | B4    | [S]    |
| plugins/table-selection/computeds.test.ts           | table/**tests**/useTableSelection.test.ts                  | B4    | [S]    |
| plugins/table-selection/helpers.test.ts             | table/**tests**/useTableSelection.helpers.test.ts          | B4    | [S]    |
| plugins/table-summary-row/computeds.test.ts         | table/**tests**/useTableSummaryRow.test.ts                 | B4    | [S]    |
| plugins/table-summary-row/helpers.test.ts           | table/**tests**/useTableSummaryRow.helpers.test.ts         | B4    | [S]    |
| plugins/table-fixed-columns/computeds.test.ts       | table/**tests**/useTableFixedColumns.test.ts               | B4    | [S]    |
| plugins/table-fixed-columns/helpers.test.ts         | table/**tests**/useTableFixedColumns.helpers.test.ts       | B4    | [S]    |
| plugins/table-column-resizing/computeds.test.ts     | table/**tests**/useTableColumnResizing.test.ts             | B4    | [S]    |
| plugins/table-column-resizing/helpers.test.ts       | table/**tests**/useTableColumnResizing.helpers.test.ts     | B4    | [S]    |
| plugins/table-column-resizing/reducers.test.ts      | table/**tests**/useTableColumnResizing.state.test.ts       | B4    | [S]    |
| plugins/table-column-reordering/computeds.test.ts   | table/**tests**/useTableColumnReordering.test.ts           | B4    | [S]    |
| plugins/table-column-reordering/reducers.test.ts    | table/**tests**/useTableColumnReordering.state.test.ts     | B4    | [S]    |
| plugins/table-column-visibility/computeds.test.ts   | table/**tests**/useTableColumnVisibility.test.ts           | B4    | [S]    |
| plugins/table-column-visibility/helpers.test.ts     | table/**tests**/useTableColumnVisibility.helpers.test.ts   | B4    | [S]    |
| plugins/table-inline-cell-editing/computeds.test.ts | table/**tests**/useTableInlineCellEditing.test.ts          | B4    | [S]    |
| plugins/table-edit-row/computeds.test.ts            | table/**tests**/useTableEditRow.test.ts                    | B4    | [S]    |
| plugins/table-edit-row/helpers.test.ts              | table/**tests**/useTableEditRow.helpers.test.ts            | B4    | [S]    |
| plugins/table-edit-column/computeds.test.ts         | table/**tests**/useTableEditColumn.test.ts                 | B4    | [S]    |
| plugins/table-edit-column/helpers.test.ts           | table/**tests**/useTableEditColumn.helpers.test.ts         | B4    | [S]    |
| plugins/table-band-header/computeds.test.ts         | table/**tests**/useTableBandHeader.test.ts                 | B4    | [S]    |
| plugins/table-band-header/helpers.test.ts           | table/**tests**/useTableBandHeader.helpers.test.ts         | B4    | [S]    |
| plugins/table-keyboard-navigation/computeds.test.ts | table/**tests**/useTableKeyboardNavigation.test.ts         | B4    | [S]    |
| plugins/table-keyboard-navigation/helpers.test.ts   | table/**tests**/useTableKeyboardNavigation.helpers.test.ts | B4    | [S]    |
| plugins/table-row-detail/computeds.test.ts          | table/**tests**/useTableRowDetail.test.ts                  | B4    | [S]    |
| plugins/table-row-detail/helpers.test.ts            | table/**tests**/useTableRowDetail.helpers.test.ts          | B4    | [S]    |
| plugins/table-tree-column/helpers.test.ts           | table/**tests**/useTableTreeColumn.helpers.test.ts         | B4    | [S]    |

(Additional table plugin mappings can be appended if any missed.)

### Utilities

| Legacy File                     | Target vNext                              | Batch    | Status |
| ------------------------------- | ----------------------------------------- | -------- | ------ |
| utils/hierarchical-data.test.ts | utils/**tests**/hierarchical-data.test.ts | EXISTING | R      |
| utils/merge-sort.test.ts        | utils/**tests**/merge-sort.test.ts        | EXISTING | R      |
| utils/sorting.test.ts           | utils/**tests**/sorting.test.ts           | EXISTING | R      |
| utils/column-extension.test.ts  | utils/**tests**/column-extension.test.ts  | B5       | [S]    |
| utils/column-geometries.test.ts | utils/**tests**/column-geometries.test.ts | B5       | [S]    |
| utils/common-reducers.test.ts   | utils/**tests**/common-reducers.test.ts   | B5       | [S]    |
| utils/group-panel.test.ts       | utils/**tests**/group-panel.test.ts       | B5       | [S]    |
| utils/table.test.ts             | utils/**tests**/table.test.ts             | B5       | [S]    |
| utils/virtual-table.test.ts     | utils/**tests**/virtual-table.test.ts     | B5       | [S]    |

### Blueprint (Pending Decision)

| Legacy File                           | Target vNext                               | Batch | Status |
| ------------------------------------- | ------------------------------------------ | ----- | ------ |
| plugins/\_blueprint/computeds.test.ts | grid/**tests**/blueprint.computeds.test.ts | B5    | [S]    |
| plugins/\_blueprint/helpers.test.ts   | grid/**tests**/blueprint.helpers.test.ts   | B5    | [S]    |
| plugins/\_blueprint/reducers.test.ts  | grid/**tests**/blueprint.reducers.test.ts  | B5    | [S]    |

## Progress Counters

- Existing converted (initial + B1 + B2 + 3 utils): 6 (initial) + 6 (B1) + 6 (B2) = 18 files.
- Remaining planned (excluding discrepancy + blueprint decision): 80 - 18 = 62.
- Completion % (updated): 18 / 80 = 22.5%.

## Batch B1 Implementation Instructions

**Target Files for B1:**

1. `grid/__tests__/useGrouping.test.ts` (from integrated-grouping/computeds.test.ts)
2. `grid/__tests__/useSelection.test.ts` (from integrated-selection/computeds.test.ts)
3. `grid/__tests__/useSummary.test.ts` (from integrated-summary/computeds.test.ts)
4. `grid/__tests__/useGrouping.state.test.ts` (from grouping-state/reducers.test.ts)
5. `grid/__tests__/useSelection.state.test.ts` (from selection-state/reducers.test.ts)
6. `grid/__tests__/useSummary.state.helpers.test.ts` (from summary-state/helpers.test.ts)

**For each file:**

1. **Copy ALL test data exactly** from legacy file
2. **Import real hooks** that don't exist yet: `import { useGrouping } from '../useGrouping.js'`
3. **Convert describe/it structure** but keep same test names
4. **Use renderHook()** for all tests: `renderHook(() => useGrouping(data, options))`
5. **Keep exact expectations**: Same `.toEqual()` assertions as legacy
6. **Let tests FAIL** - that's the point! They fail because hooks don't exist

**Expected Result:**

- All B1 tests run but FAIL with "Cannot resolve module '../useGrouping.js'"
- Status changes from [S] to [R] (Running but failing)
- Clear list of exactly what hooks need to be implemented in Step 09

## Notes

- Keep test names EXACT; replicate describe/it wording where feasible. Minor wording normalization acceptable only if meaning unchanged.
- Hierarchical paging tests must be appended to `usePaging.test.ts` (flagged above).

---

End of document.
