# Step 03: Convert Legacy Tests + Implement useSorting Hook (TDD)

## Task

Convert ALL legacy sorting tests to modern format first, then implement the `useSorting` hook to make them pass. This ensures exact behavioral compatibility.

## Approach: Legacy Test Conversion First

1. **FIRST**: Convert existing legacy tests to `useSorting` hook format
2. **SECOND**: Run tests - they should FAIL (red phase)
3. **THIRD**: Implement hook to make all tests PASS (green phase)

## Legacy Test Sources to Convert

- `../devextreme-reactive/packages/dx-grid-core/src/plugins/integrated-sorting/computeds.test.ts` (277 lines)
- `../devextreme-reactive/packages/dx-react-grid/src/plugins/integrated-sorting.test.tsx` (51 lines)

## Part 1: Convert Legacy Tests

### File: `packages/core/src/grid/__tests__/useSorting.test.ts`

Replace the placeholder test with comprehensive test suite converted from legacy tests:

#### Test Categories to Convert:

1. **Basic Sorting Tests** (from computeds.test.ts lines 18-83)
   - No mutation when no sorting
   - Immutable properties handling
   - Single column ascending/descending
   - Multi-column sorting
   - Mixed sort directions

2. **Custom Compare Tests** (from computeds.test.ts lines 85-117)
   - Custom compare functions via columnExtensions
   - Fallback to default compare when custom returns undefined

3. **Edge Case Tests** (from computeds.test.ts lines 119-178)
   - Undefined values sorting
   - Null values sorting
   - Mixed null/undefined values
   - Proper ordering: numbers < null < undefined

4. **Advanced Features** (from computeds.test.ts lines 181-276)
   - Grouped rows sorting (if implementing grouping)
   - Hierarchical rows sorting (if implementing tree data)

#### Test Conversion Pattern:

```typescript
// LEGACY TEST (computeds.test.ts)
it("can sort ascending by one column", () => {
  const sorting: ReadonlyArray<Sorting> = [
    { columnName: "a", direction: "asc" },
  ];
  const sorted = sortedRows(rows, sorting, getCellValue);
  expect(sorted).toEqual([...expected]);
});

// CONVERTED HOOK TEST (useSorting.test.ts)
it("can sort ascending by one column", () => {
  const { result } = renderHook(() =>
    useSorting(rows, {
      sorting: [{ columnName: "a", direction: "asc" }],
    })
  );
  expect(result.current.sortedData).toEqual([...expected]);
});
```

#### Hook API Tests (New - Not in Legacy)

```typescript
describe("useSorting - Hook API", () => {
  it("should support controlled mode with sorting prop", () => {
    // Test external sorting control
  });

  it("should support uncontrolled mode with defaultSorting", () => {
    // Test internal state management
  });

  it("should call onSortingChange callback", () => {
    // Test callback invocation
  });

  it("should handle columnExtensions for custom comparers", () => {
    // Test custom compare integration
  });
});
```

### Test Data (Copy from Legacy)

Use exact same test data from legacy tests:

```typescript
const rows = [
  { a: 2, b: 2 },
  { a: 1, b: 1 },
  { a: 2, b: 1 },
  { a: 1, b: 2 },
];

const getCellValue = (row, columnName) => row[columnName];
```

## Part 2: Implement useSorting Hook

### Only After Tests Are Converted and Failing

#### File: `packages/core/src/grid/useSorting.ts`

Hook signature:

```typescript
interface UseSortingOptions<T> {
  sorting?: Sorting[]; // Controlled mode
  onSortingChange?: (sorting: Sorting[]) => void; // Controlled callback
  defaultSorting?: Sorting[]; // Uncontrolled initial value
  columnExtensions?: SortingColumnExtension[]; // Custom comparers
}

function useSorting<T>(
  data: T[],
  options?: UseSortingOptions<T>
): {
  sortedData: T[];
  sorting: Sorting[];
  setSorting: (sorting: Sorting[]) => void;
};
```

#### Implementation Requirements:

- Use existing `sortedRows` utility from `utils/sorting.ts`
- Support both controlled/uncontrolled modes
- Handle `columnExtensions` for custom comparers
- Use `useMemo` for performance optimization
- Create proper `getCellValue` function from data structure

#### File: `packages/core/src/grid/stores/sorting-store.ts` (if needed)

Only create Zustand store if uncontrolled mode needs persistent state across re-renders.

## Part 3: Export and Integration

### Update `packages/core/src/index.ts`:

```typescript
// Add hook export
export { useSorting } from "./grid/useSorting.js";
```

## Success Criteria

1. **ALL legacy test cases converted** to hook format
2. **Tests initially FAIL** (red phase)
3. **Hook implementation makes ALL tests PASS** (green phase)
4. **Exact behavioral compatibility** with legacy `IntegratedSorting`
5. **Performance optimized** with memoization
6. **TypeScript strict** throughout

## Critical Legacy Behaviors to Preserve

- **Stable sorting** algorithm (merge sort)
- **Null/undefined ordering**: numbers < null < undefined
- **No data mutation** - always return new arrays
- **Custom compare function** support
- **Multi-column priority** handling
- **Immutable data** compatibility

## Testing Commands

```bash
# Run tests (should fail initially)
pnpm test packages/core/src/grid/__tests__/useSorting.test.ts

# After implementation (should pass)
pnpm test
```

## Reference Files

- Legacy tests: `../devextreme-reactive/packages/dx-grid-core/src/plugins/integrated-sorting/computeds.test.ts`
- Legacy implementation: `../devextreme-reactive/packages/dx-grid-core/src/plugins/integrated-sorting/computeds.ts`
- Existing utilities: `packages/core/src/utils/sorting.ts`
