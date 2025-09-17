# Step 09: Implement Next 2 Missing Hooks

## Current Status ✅

**Working**: `useSorting`, `useFiltering`, `usePaging` (50 tests passing)  
**Missing**: 48 hooks causing 51 import failures

## This Step: Next 2 Hooks

Focus on the **2 simplest state hooks** for quick wins:

### 1. `useSortingState`

**File**: `src/grid/useSortingState.ts`  
**Test**: `src/grid/__tests__/useSorting.state.test.ts` (already exists)  
**Legacy**: `packages/dx-grid-core/src/plugins/sorting-state/reducers.ts`

### 2. `usePagingState`

**File**: `src/grid/usePagingState.ts`  
**Test**: `src/grid/__tests__/usePaging.state.test.ts` (already exists)  
**Legacy**: `packages/dx-grid-core/src/plugins/paging-state/reducers.ts`

## Implementation Approach

**Primary**: Implement hooks to make the converted tests pass  
**Verification**: Cross-check against legacy implementation for missing edge cases  
**Pattern**: Follow the established pattern from working hooks (useSorting, useFiltering, usePaging)

Both follow the **state hook pattern**:

```typescript
// Template: src/grid/useXXXState.ts
import { useCallback, useState } from 'react'

export interface UseXXXStateOptions {
  xxx?: XXX[] // controlled
  onXXXChange?: (xxx: XXX[]) => void
  defaultXXX?: XXX[] // uncontrolled
}

export function useXXXState(options: UseXXXStateOptions = {}) {
  const { xxx: controlled, onXXXChange, defaultXXX = [] } = options

  const [uncontrolled, setUncontrolled] = useState(defaultXXX)
  const isControlled = controlled !== undefined
  const effectiveXXX = isControlled ? controlled! : uncontrolled

  const setXXX = useCallback(
    (next: XXX[]) => {
      if (!isControlled) setUncontrolled(next)
      onXXXChange?.(next)
    },
    [isControlled, onXXXChange]
  )

  return { xxx: effectiveXXX, setXXX } as const
}
```

## Specific Implementation

### useSortingState

```typescript
// src/grid/useSortingState.ts
import { useCallback, useState } from 'react'
import type { Sorting } from '../types/sorting.js'

export interface UseSortingStateOptions {
  sorting?: Sorting[]
  onSortingChange?: (sorting: Sorting[]) => void
  defaultSorting?: Sorting[]
}

export function useSortingState(options: UseSortingStateOptions = {}) {
  const { sorting: controlled, onSortingChange, defaultSorting = [] } = options

  const [uncontrolled, setUncontrolled] = useState(defaultSorting)
  const isControlled = controlled !== undefined
  const effectiveSorting = isControlled ? controlled! : uncontrolled

  const setSorting = useCallback(
    (next: Sorting[]) => {
      if (!isControlled) setUncontrolled(next)
      onSortingChange?.(next)
    },
    [isControlled, onSortingChange]
  )

  return { sorting: effectiveSorting, setSorting } as const
}
```

### usePagingState

```typescript
// src/grid/usePagingState.ts
import { useCallback, useState } from 'react'

export interface UsePagingStateOptions {
  currentPage?: number
  onCurrentPageChange?: (page: number) => void
  defaultCurrentPage?: number
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  defaultPageSize?: number
}

export function usePagingState(options: UsePagingStateOptions = {}) {
  const {
    currentPage: controlledPage,
    onCurrentPageChange,
    defaultCurrentPage = 0,
    pageSize: controlledPageSize,
    onPageSizeChange,
    defaultPageSize = 10,
  } = options

  const [uncontrolledPage, setUncontrolledPage] = useState(defaultCurrentPage)
  const [uncontrolledPageSize, setUncontrolledPageSize] = useState(defaultPageSize)

  const isPageControlled = controlledPage !== undefined
  const isPageSizeControlled = controlledPageSize !== undefined

  const effectivePage = isPageControlled ? controlledPage! : uncontrolledPage
  const effectivePageSize = isPageSizeControlled ? controlledPageSize! : uncontrolledPageSize

  const setCurrentPage = useCallback(
    (next: number) => {
      if (!isPageControlled) setUncontrolledPage(next)
      onCurrentPageChange?.(next)
    },
    [isPageControlled, onCurrentPageChange]
  )

  const setPageSize = useCallback(
    (next: number) => {
      if (!isPageSizeControlled) setUncontrolledPageSize(next)
      onPageSizeChange?.(next)
    },
    [isPageSizeControlled, onPageSizeChange]
  )

  return {
    currentPage: effectivePage,
    pageSize: effectivePageSize,
    setCurrentPage,
    setPageSize,
  } as const
}
```

## Export Updates

Add to `src/index.ts`:

```typescript
export { useSortingState } from './grid/useSortingState.js'
export { usePagingState } from './grid/usePagingState.js'
```

## Implementation Steps

1. **Implement** `useSortingState` using the provided template
2. **Run tests** to see what needs adjustment: `npx vitest run src/grid/__tests__/useSorting.state.test.ts`
3. **Cross-check** against `packages/dx-grid-core/src/plugins/sorting-state/reducers.ts` for missing edge cases
4. **Repeat** for `usePagingState`
5. **Add exports** to `src/index.ts`

## Verification

```bash
# Before: 51 import failures
pnpm test 2>&1 | grep "Failed to resolve import" | wc -l

# After implementing: Should be 49 import failures
pnpm test 2>&1 | grep "Failed to resolve import" | wc -l

# Test the specific hooks (should PASS)
npx vitest run src/grid/__tests__/useSorting.state.test.ts
npx vitest run src/grid/__tests__/usePaging.state.test.ts
```

## Success Criteria

1. ✅ Import errors reduced from 51 → 49
2. ✅ Both state hook tests pass (not just run)
3. ✅ 2 new hooks follow established patterns
4. ✅ Cross-verification with legacy shows no missing edge cases

---

**Next Step 09b**: Implement next 2 hooks (`useFilteringState`, `useSelectionState`)
