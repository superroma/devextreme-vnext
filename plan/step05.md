# Step 05: Implement usePaging Hook (TDD)

## Task

Implement the `usePaging` hook for Grid pagination functionality following the established TDD pattern.

## Approach: Test-First Development

1. **RED**: Write comprehensive test cases for pagination logic
2. **GREEN**: Implement hook to make all tests pass
3. **REFACTOR**: Optimize and clean up

## Part 1: Create Foundation Types

### File: `packages/core/src/types/paging.ts`

```typescript
export interface PagingState {
  currentPage: number
  pageSize: number
  totalCount?: number
}

export interface PagingInfo {
  totalPages: number
  startIndex: number
  endIndex: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
```

## Part 2: Write Comprehensive Tests

### File: `packages/core/src/grid/__tests__/usePaging.test.ts`

#### Test Categories:

1. **Basic Paging Logic**

   ```typescript
   describe('usePaging - basic functionality', () => {
     it('should paginate data correctly with default page size')
     it('should handle different page sizes')
     it('should return correct page info (totalPages, hasNext, hasPrev)')
     it('should handle empty data array')
   })
   ```

2. **Page Navigation**

   ```typescript
   describe('usePaging - navigation', () => {
     it('should navigate to next page')
     it('should navigate to previous page')
     it('should navigate to specific page')
     it('should not go beyond available pages')
     it('should not go below page 0')
   })
   ```

3. **Controlled/Uncontrolled Modes**

   ```typescript
   describe('usePaging - hook API', () => {
     it('supports controlled mode with currentPage prop')
     it('supports uncontrolled mode with defaultCurrentPage')
     it('calls onCurrentPageChange callback')
     it('calls onPageSizeChange callback')
     it('handles pageSize changes correctly')
   })
   ```

4. **Edge Cases**
   ```typescript
   describe('usePaging - edge cases', () => {
     it('should handle data length changes')
     it('should adjust currentPage when data shrinks')
     it('should handle zero page size gracefully')
     it('should handle negative page numbers')
   })
   ```

### Test Data:

```typescript
const mockData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}))
```

## Part 3: Implement Core Paging Utilities

### File: `packages/core/src/utils/paging.ts`

```typescript
export function paginateData<T>(data: T[], currentPage: number, pageSize: number): T[] {
  if (pageSize <= 0) return data
  const startIndex = currentPage * pageSize
  return data.slice(startIndex, startIndex + pageSize)
}

export function calculatePagingInfo(
  totalCount: number,
  currentPage: number,
  pageSize: number
): PagingInfo {
  const totalPages = Math.ceil(totalCount / pageSize)
  const startIndex = currentPage * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalCount)

  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages - 1,
    hasPreviousPage: currentPage > 0,
  }
}
```

## Part 4: Implement usePaging Hook

### File: `packages/core/src/grid/usePaging.ts`

Hook signature:

```typescript
interface UsePagingOptions {
  currentPage?: number // Controlled
  onCurrentPageChange?: (page: number) => void
  defaultCurrentPage?: number // Uncontrolled
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  defaultPageSize?: number
}

function usePaging<T>(
  data: T[],
  options?: UsePagingOptions
): {
  paginatedData: T[]
  currentPage: number
  pageSize: number
  totalCount: number
  pagingInfo: PagingInfo
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
}
```

#### Implementation Requirements:

- Use `paginateData` and `calculatePagingInfo` utilities
- Support controlled/uncontrolled modes for both currentPage and pageSize
- Provide convenient navigation methods
- Handle edge cases (empty data, invalid pages)
- Optimize with `useMemo` for performance
- Auto-adjust currentPage when data changes

## Part 5: Export and Integration

### Update `packages/core/src/index.ts`:

```typescript
// Add paging exports
export * from './types/paging.js'
export * from './utils/paging.js'
export { usePaging } from './grid/usePaging.js'
```

## Success Criteria

1. **All test cases pass** with comprehensive coverage
2. **Controlled/uncontrolled modes** work correctly
3. **Navigation methods** work as expected
4. **Edge cases handled** gracefully
5. **Performance optimized** with memoization
6. **TypeScript strict** with proper types

## Critical Behaviors to Implement

- **Zero-based page indexing** (page 0, 1, 2, ...)
- **Auto page adjustment** when data shrinks
- **Boundary checking** (no negative pages, no beyond-data pages)
- **Efficient slicing** of large datasets
- **Stable references** when data/page unchanged

## Testing Commands

```bash
# Run paging tests
pnpm test packages/core/src/grid/__tests__/usePaging.test.ts

# Run all tests
pnpm test

# Type check
pnpm typecheck
```

## Pattern Reference

Follow the same patterns established in:

- `packages/core/src/grid/useSorting.ts` - Controlled/uncontrolled modes
- `packages/core/src/grid/useFiltering.ts` - Data processing with memoization
