# Step 10: Implement Next 5 State Hooks

## Current Status ✅

**Completed in Step 09**: `useSortingState`, `usePagingState`  
**Missing**: 46 hooks causing 49 import failures (7 state hooks remaining)

## This Step: Complete All Remaining State Hooks

Implement the final **5 state hooks** to complete the foundation:

### 1. `useFilteringState`

**File**: `src/grid/useFilteringState.ts`  
**Test**: `src/grid/__tests__/useFiltering.state.test.ts`  
**Legacy**: `packages/dx-grid-core/src/plugins/filtering-state/reducers.ts`

### 2. `useEditingState` ⚠️ **Complex**

**File**: `src/grid/useEditingState.ts`  
**Test**: `src/grid/__tests__/useEditing.state.test.ts`  
**Legacy**: `packages/dx-grid-core/src/plugins/editing-state/reducers.ts`  
**Note**: Handles 4 sub-states (editingRowIds, addedRows, rowChanges, editingCells)

### 3. `useGroupingState`

**File**: `src/grid/useGroupingState.ts`  
**Test**: `src/grid/__tests__/useGrouping.state.test.ts`  
**Legacy**: `packages/dx-grid-core/src/plugins/grouping-state/reducers.ts`

### 4. `useSelectionState`

**File**: `src/grid/useSelectionState.ts`  
**Test**: `src/grid/__tests__/useSelection.state.test.ts`  
**Legacy**: `packages/dx-grid-core/src/plugins/selection-state/reducers.ts`

### 5. `useRowDetailState`

**File**: `src/grid/useRowDetailState.ts`  
**Test**: `src/grid/__tests__/useRowDetail.state.test.ts`  
**Legacy**: `packages/dx-grid-core/src/plugins/row-detail-state/reducers.ts`

## Implementation Approach

**Primary**: Implement hooks to make the converted tests pass  
**Verification**: Cross-check against legacy implementation for missing edge cases  
**Pattern**: Follow established pattern from `useSortingState` and `usePagingState`

## Implementation Steps

1. **Start simple**: `useFilteringState`, `useSelectionState`, `useRowDetailState` (standard pattern)
2. **Handle complex**: `useGroupingState` (2 sub-states), `useEditingState` (4 sub-states)
3. **Run tests** for each: `npx vitest run src/grid/__tests__/useXXX.state.test.ts`
4. **Cross-check** against legacy reducers for missing edge cases
5. **Add exports** to `src/index.ts`

## Export Updates

Add to `src/index.ts`:

```typescript
export { useFilteringState } from './grid/useFilteringState.js'
export { useEditingState } from './grid/useEditingState.js'
export { useGroupingState } from './grid/useGroupingState.js'
export { useSelectionState } from './grid/useSelectionState.js'
export { useRowDetailState } from './grid/useRowDetailState.js'
```

## Verification

```bash
# Before: 49 import failures
pnpm test 2>&1 | grep "Failed to resolve import" | wc -l

# After: Should be 44 import failures
pnpm test 2>&1 | grep "Failed to resolve import" | wc -l

# Test each hook (should PASS)
npx vitest run src/grid/__tests__/useFiltering.state.test.ts
npx vitest run src/grid/__tests__/useEditing.state.test.ts
npx vitest run src/grid/__tests__/useGrouping.state.test.ts
npx vitest run src/grid/__tests__/useSelection.state.test.ts
npx vitest run src/grid/__tests__/useRowDetail.state.test.ts
```

## Success Criteria

1. ✅ Import errors reduced from 49 → 44 (5 fewer)
2. ✅ All 5 state hook tests pass
3. ✅ **All state hooks completed** (9/9) - major milestone!
4. ✅ Foundation ready for business logic hooks

---

**Next Step 11**: Implement business logic hooks (`useGrouping`, `useSelection`, `useSummary`)
