# Step 08: Convert All Legacy Tests to Establish True Parity

## Task

Convert ALL 81 legacy test files from dx-grid-core to vnext structure to establish complete test coverage and true 1:1 parity as per ADR-005.

## Problem

Current state shows massive test gap:

- **Legacy**: 81 test files in dx-grid-core
- **vNext**: 7 test files in core package
- **Status.md is wrong**: Claims "test over-specification" but we have under-specification
- **Missing functionality**: No hierarchical paging, many grid features untested

## Solution: Systematic Test Conversion

### Phase 1: Convert All Tests (Red State OK)

Convert all 81 test files from legacy to vnext structure. **Don't worry about making them pass** - just convert the structure and test cases exactly.

### Conversion Rules (ADR-005 Compliance)

1. **Strict 1:1 Mapping**: Every legacy test → exactly one vnext test
2. **Preserve Test Logic**: Keep same expectations, same data, same scenarios
3. **Update Only Structure**: Change from legacy computeds to modern hooks
4. **No Extra Tests**: Don't add tests beyond legacy scope
5. **No Missing Tests**: Convert every single test case

### File Mapping Pattern

```
Legacy: packages/dx-grid-core/src/plugins/integrated-sorting/computeds.test.ts
VNext:  packages/core/src/grid/__tests__/useSorting.test.ts ✅ (already done)

Legacy: packages/dx-grid-core/src/plugins/integrated-paging/computeds.test.ts
VNext:  packages/core/src/grid/__tests__/usePaging.test.ts ✅ (partial - missing hierarchical)

Legacy: packages/dx-grid-core/src/plugins/integrated-filtering/computeds.test.ts
VNext:  packages/core/src/grid/__tests__/useFiltering.test.ts ✅ (already done)
```

### All 81 Files to Convert

**High Priority (Core Grid Functionality):**

1. `plugins/integrated-paging/computeds.test.ts` → `grid/__tests__/usePaging.test.ts` (ADD hierarchical tests)
2. `plugins/integrated-grouping/computeds.test.ts` → `grid/__tests__/useGrouping.test.ts` (NEW)
3. `plugins/integrated-selection/computeds.test.ts` → `grid/__tests__/useSelection.test.ts` (NEW)
4. `plugins/integrated-summary/computeds.test.ts` → `grid/__tests__/useSummary.test.ts` (NEW)

**State Management:** 5. `plugins/sorting-state/reducers.test.ts` → `grid/__tests__/useSorting.state.test.ts` (NEW) 6. `plugins/paging-state/reducers.test.ts` → `grid/__tests__/usePaging.state.test.ts` (NEW) 7. `plugins/filtering-state/reducers.test.ts` → `grid/__tests__/useFiltering.state.test.ts` (NEW) 8. `plugins/grouping-state/reducers.test.ts` → `grid/__tests__/useGrouping.state.test.ts` (NEW) 9. `plugins/selection-state/reducers.test.ts` → `grid/__tests__/useSelection.state.test.ts` (NEW) 10. `plugins/editing-state/reducers.test.ts` → `grid/__tests__/useEditing.state.test.ts` (NEW)

**Table Plugins (40+ files):**

- All `plugins/table-*/computeds.test.ts` → `table/__tests__/useTable*.test.ts`
- All `plugins/table-*/helpers.test.ts` → `table/__tests__/useTable*.helpers.test.ts`

**Utilities (already started):**

- `utils/hierarchical-data.test.ts` ✅ (done)
- `utils/merge-sort.test.ts` ✅ (done)
- `utils/sorting.test.ts` ✅ (done)
- Plus 5 more utility test files

### Conversion Template

For each legacy test file, follow this pattern:

```typescript
// Legacy: computeds.test.ts
import { someComputed } from './computeds'

describe('SomePlugin computeds', () => {
  describe('#someComputed', () => {
    it('should do something', () => {
      const result = someComputed(input)
      expect(result).toEqual(expected)
    })
  })
})

// VNext: useSomeFeature.test.ts
import { renderHook } from '@testing-library/react'
import { useSomeFeature } from '../useSomeFeature.js'

describe('useSomeFeature - converted legacy behavior', () => {
  describe('core functionality', () => {
    it('should do something', () => {
      const { result } = renderHook(() => useSomeFeature(input, options))
      expect(result.current.processedData).toEqual(expected)
    })
  })
})
```

### File Organization

```
packages/core/src/
├── grid/__tests__/           # Core grid hooks
│   ├── useSorting.test.ts    ✅
│   ├── usePaging.test.ts     ✅ (needs hierarchical)
│   ├── useFiltering.test.ts  ✅
│   ├── useGrouping.test.ts   (NEW)
│   ├── useSelection.test.ts  (NEW)
│   └── ...
├── table/__tests__/          # Table-related hooks (NEW directory)
│   ├── useTableHeaderRow.test.ts
│   ├── useTableFilterRow.test.ts
│   └── ...
└── utils/__tests__/          # Utilities
    ├── sorting.test.ts       ✅
    ├── hierarchical-data.test.ts ✅
    └── ...
```

## Success Criteria

1. **All 81 test files converted** to vnext structure
2. **Tests can run** (even if failing) - no setup errors
3. **Clear failure list** showing exactly what needs implementation
4. **True parity established** - we know the complete scope
5. **Ready for systematic implementation** - Phase 2

## Commands for Verification

```bash
# Count legacy tests
find packages/dx-grid-core/src -name "*.test.ts" | wc -l  # Should be 81

# Count vnext tests (after conversion)
find packages/core/src -name "*.test.ts" | wc -l         # Should be 81

# Run all tests to see failure list
pnpm test
```

## Next Phase

After all tests converted:

- **Step 09**: Implement missing hooks systematically
- **Step 10**: Make tests green one by one
- **Step 11**: Verify complete feature parity

---

**This establishes the foundation for true legacy parity! 🎯**
