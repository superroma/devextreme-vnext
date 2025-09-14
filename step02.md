# Step 02: Foundation Types + TDD Setup

## Task

Set up testing infrastructure and implement foundational data structures needed for Grid functionality, starting with sorting.

## Part 1: Testing Infrastructure Setup

### Add Testing Dependencies

Add to root `package.json` devDependencies:

```json
{
  "vitest": "^1.2.0",
  "@testing-library/react": "^14.2.0",
  "@testing-library/jest-dom": "^6.4.0",
  "@testing-library/user-event": "^14.5.0",
  "jsdom": "^24.0.0",
  "zustand": "^4.5.0"
}
```

### Create Test Configuration

Create `vitest.config.ts` in root with jsdom environment and React Testing Library setup.

## Part 2: Foundation Types & Utilities (TDD)

### Core Types to Create

Based on legacy `dx-grid-core/src/types/`:

1. `packages/core/src/types/grid.ts`:

```typescript
export type Row = any;
export type RowId = number | string;

export interface Column {
  name: string;
  title?: string;
  getCellValue?: GetCellValueFn;
}

export type GetCellValueFn = (row: Row, columnName: string) => any;
```

2. `packages/core/src/types/sorting.ts`:

```typescript
export type SortingDirection = "asc" | "desc";

export interface Sorting {
  columnName: string;
  direction: SortingDirection;
}

export interface SortingColumnExtension {
  columnName: string;
  compare?: (a: any, b: any) => number;
  sortingEnabled?: boolean;
}
```

### Core Utilities to Implement

1. `packages/core/src/utils/merge-sort.ts` - Based on legacy implementation
2. `packages/core/src/utils/column-extension.ts` - Column configuration helpers
3. `packages/core/src/utils/sorting.ts` - Core sorting logic (`sortedRows`, `createCompare`, `defaultCompare`)

### Test Structure (Write Tests First)

#### 1. Utility Tests

```typescript
// packages/core/src/utils/__tests__/merge-sort.test.ts
describe("mergeSort", () => {
  it("should sort numbers ascending", () => {});
  it("should be stable sort", () => {});
  it("should handle empty array", () => {});
});

// packages/core/src/utils/__tests__/sorting.test.ts
describe("defaultCompare", () => {
  it("should handle null/undefined values correctly", () => {});
  it("should compare numbers correctly", () => {});
  it("should compare strings correctly", () => {});
});

describe("createCompare", () => {
  it("should create multi-column comparer", () => {});
  it("should handle custom column comparers", () => {});
  it("should respect sort direction", () => {});
});

describe("sortedRows", () => {
  it("should sort rows by single column", () => {});
  it("should sort rows by multiple columns", () => {});
  it("should use custom getCellValue function", () => {});
});
```

#### 2. Hook Tests (Will Fail Initially)

```typescript
// packages/core/src/grid/__tests__/useSorting.test.ts
describe("useSorting", () => {
  it("should sort data ascending by column", () => {
    // This will fail until we implement the hook
  });
});
```

## Part 3: Implementation Order

1. **Write failing tests** for utilities
2. **Implement utilities** to make tests pass:
   - `mergeSort`
   - `defaultCompare`
   - `createCompare`
   - `sortedRows`
3. **Write failing tests** for `useSorting` hook
4. **Implement `useSorting`** using Zustand + utilities

## Reference Legacy Files

- `../devextreme-reactive/packages/dx-grid-core/src/utils/merge-sort.ts`
- `../devextreme-reactive/packages/dx-grid-core/src/plugins/integrated-sorting/computeds.ts`
- `../devextreme-reactive/packages/dx-grid-core/src/types/sorting.types.ts`

## Success Criteria

1. `pnpm test` runs successfully
2. Core utilities implemented and tested
3. Foundation ready for `useSorting` hook implementation
4. Clear separation between pure functions and React hooks
