# Step 04: Convert Legacy Tests + Implement useFiltering Hook (TDD)

## Task

Convert ALL legacy filtering tests to modern format first, then implement the `useFiltering` hook to make them pass. Follow the same successful TDD approach as useSorting.

## Approach: Legacy Test Conversion First

1. **RED**: Convert existing legacy tests to `useFiltering` hook format
2. **GREEN**: Implement hook to make all tests PASS
3. **REFACTOR**: Optimize and clean up

## Legacy Test Sources to Convert

- `../devextreme-reactive/packages/dx-grid-core/src/plugins/integrated-filtering/computeds.test.ts` (~294 lines)
- `../devextreme-reactive/packages/dx-react-grid/src/plugins/integrated-filtering.test.tsx`

## Part 1: Create Foundation Types

### File: `packages/core/src/types/filtering.ts`

Convert types from legacy `filtering.types.ts`:

```typescript
export interface Filter {
  columnName: string
  operation?: FilterOperation
  value?: any
}

export interface FilterExpression {
  operator: 'and' | 'or'
  filters: Array<FilterExpression | Filter>
}

export type FilterOperation = string // 'contains' | 'startsWith' | 'equal' | etc.

export interface FilteringColumnExtension {
  columnName: string
  predicate?: (value: any, filter: Filter, row: any) => boolean
}
```

## Part 2: Convert Legacy Tests

### File: `packages/core/src/grid/__tests__/useFiltering.test.ts`

#### Test Categories to Convert (from computeds.test.ts):

1. **Basic Filtering Tests** (lines 19-80)
   - No filtering when filterExpression is null
   - Single field filtering
   - Multiple field filtering with AND/OR operators
   - Complex nested filter expressions

2. **Filter Operations Tests** (lines 81-150)
   - Built-in operations: contains, startsWith, endsWith
   - Comparison operations: equal, greaterThan, lessThan
   - Case sensitivity handling
   - Null/undefined value filtering

3. **Custom Predicate Tests** (lines 151-200)
   - Custom filter predicates via columnExtensions
   - Predicate function parameters (value, filter, row)
   - Fallback to default predicates

4. **Edge Cases** (lines 201-294)
   - Empty filter arrays
   - Invalid filter expressions
   - Null/undefined row values
   - Performance with large datasets

#### Test Conversion Pattern:

```typescript
// LEGACY TEST
it('can filter by one field', () => {
  const filterExpression = { columnName: 'a', value: 1 }
  const filtered = filteredRows(rows, filterExpression, getCellValue)
  expect(filtered.rows).toEqual([...expected])
})

// CONVERTED HOOK TEST
it('can filter by one field', () => {
  const { result } = renderHook(() =>
    useFiltering(rows, {
      filters: [{ columnName: 'a', value: 1 }],
    })
  )
  expect(result.current.filteredData).toEqual([...expected])
})
```

#### Hook API Tests (New):

```typescript
describe('useFiltering - Hook API', () => {
  it('supports controlled mode with filters prop')
  it('supports uncontrolled mode with defaultFilters')
  it('calls onFiltersChange callback')
  it('handles columnExtensions for custom predicates')
  it('combines multiple filters with AND logic by default')
})
```

## Part 3: Implement Core Filtering Utilities

### File: `packages/core/src/utils/filtering.ts`

Port filtering logic from legacy `computeds.ts`:

- Built-in filter operations (contains, startsWith, equal, etc.)
- Filter expression evaluation (AND/OR logic)
- Custom predicate support
- Null/undefined value handling

### Key Functions to Implement:

```typescript
export function filteredRows(
  rows: Row[],
  filterExpression: FilterExpression | Filter | null,
  getCellValue: GetCellValueFn,
  getColumnPredicate?: (name: string) => FilterPredicate
): Row[]

export function createFilterPredicate(
  filterExpression: FilterExpression | Filter,
  getCellValue: GetCellValueFn,
  getColumnPredicate?: (name: string) => FilterPredicate
): (row: Row) => boolean
```

## Part 4: Implement useFiltering Hook

### File: `packages/core/src/grid/useFiltering.ts`

Hook signature:

```typescript
interface UseFilteringOptions<T> {
  filters?: Filter[] // Controlled mode
  onFiltersChange?: (filters: Filter[]) => void
  defaultFilters?: Filter[] // Uncontrolled mode
  columnExtensions?: FilteringColumnExtension[]
}

function useFiltering<T extends Row>(
  data: T[],
  options?: UseFilteringOptions<T>
): {
  filteredData: T[]
  filters: Filter[]
  setFilters: (filters: Filter[]) => void
}
```

#### Implementation Requirements:

- Use `filteredRows` utility from `utils/filtering.ts`
- Support controlled/uncontrolled modes (same pattern as useSorting)
- Handle `columnExtensions` for custom predicates
- Convert Filter[] to FilterExpression internally
- Optimize with `useMemo` for performance
- Preserve original array reference when no filters

## Part 5: Export and Integration

### Update `packages/core/src/index.ts`:

```typescript
// Add filtering exports
export * from './types/filtering.js'
export * from './utils/filtering.js'
export { useFiltering } from './grid/useFiltering.js'
```

## Success Criteria

1. **ALL legacy test cases converted** to hook format
2. **Tests initially FAIL** (red phase)
3. **Hook implementation makes ALL tests PASS** (green phase)
4. **Exact behavioral compatibility** with legacy `IntegratedFiltering`
5. **Performance optimized** with memoization
6. **TypeScript strict** throughout

## Critical Legacy Behaviors to Preserve

- **No data mutation** - always return filtered arrays
- **Reference preservation** when no filters applied
- **Built-in operations**: contains, startsWith, endsWith, equal, greaterThan, etc.
- **AND/OR logic** for complex filter expressions
- **Custom predicate** support via column extensions
- **Null/undefined handling** in filter operations
- **Case-insensitive** string operations by default

## Testing Commands

```bash
# Run tests (should fail initially)
pnpm test packages/core/src/grid/__tests__/useFiltering.test.ts

# After implementation (should pass)
pnpm test
```

## Reference Files

- Legacy tests: `../devextreme-reactive/packages/dx-grid-core/src/plugins/integrated-filtering/computeds.test.ts`
- Legacy implementation: `../devextreme-reactive/packages/dx-grid-core/src/plugins/integrated-filtering/computeds.ts`
- Legacy types: `../devextreme-reactive/packages/dx-grid-core/src/types/filtering.types.ts`
- Pattern reference: `packages/core/src/grid/useSorting.ts` (successful implementation)
