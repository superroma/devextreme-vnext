# Keyboard Navigation Abstraction Plan

## Problem Statement

Current `useTableKeyboardNavigation.helpers.test.ts` (1,730 lines) represents a missed abstraction opportunity. The keyboard navigation logic is tightly coupled to grid-specific concepts, but similar patterns will be needed across:

- **dx-react-scheduler**: Calendar/appointment navigation
- **dx-react-chart**: Chart element navigation  
- **Tree-list functionality**: Hierarchical navigation
- **Pivot table**: Tabular navigation with grouping

## Proposed Abstraction Architecture

### Core Navigation Utilities Package

```typescript
// packages/core/src/navigation/
├── types.ts              // Generic navigation interfaces
├── useKeyboardNavigation.ts  // Core navigation hook
├── useFocusManagement.ts     // Focus state management  
├── useNavigationGrid.ts      // 2D grid navigation logic
└── __tests__/
    ├── useKeyboardNavigation.test.ts
    ├── useFocusManagement.test.ts
    └── useNavigationGrid.test.ts
```

### Generic Interfaces

```typescript
interface NavigationContext<T = any> {
  items: T[]
  getItemKey: (item: T) => string
  getItemPosition: (item: T) => { row: number; col: number }
  isItemFocusable: (item: T) => boolean
}

interface NavigationOptions {
  orientation: 'horizontal' | 'vertical' | 'both'
  wrap: boolean
  skipDisabled: boolean
  scrollBehavior?: 'auto' | 'smooth' | 'instant'
}

interface NavigationState {
  focusedItem: string | null
  focusedPosition: { row: number; col: number } | null
}
```

### Component-Specific Implementations

```typescript
// For Grid
const useTableKeyboardNavigation = (tableData) => {
  const navigationContext = useMemo(() => ({
    items: flattenTableCells(tableData),
    getItemKey: (cell) => `${cell.rowKey}-${cell.columnKey}`,
    getItemPosition: (cell) => ({ row: cell.rowIndex, col: cell.columnIndex }),
    isItemFocusable: (cell) => !cell.disabled
  }), [tableData])
  
  return useKeyboardNavigation(navigationContext, TABLE_NAVIGATION_OPTIONS)
}

// For Scheduler (future)
const useSchedulerKeyboardNavigation = (scheduleData) => {
  const navigationContext = useMemo(() => ({
    items: flattenScheduleCells(scheduleData),
    getItemKey: (cell) => `${cell.timeSlot}-${cell.resource}`,
    getItemPosition: (cell) => ({ row: cell.timeIndex, col: cell.resourceIndex }),
    isItemFocusable: (cell) => !cell.readonly
  }), [scheduleData])
  
  return useKeyboardNavigation(navigationContext, SCHEDULER_NAVIGATION_OPTIONS)
}

// For Tree-List (future)  
const useTreeKeyboardNavigation = (treeData) => {
  const navigationContext = useMemo(() => ({
    items: flattenTreeNodes(treeData),
    getItemKey: (node) => node.id,
    getItemPosition: (node) => ({ row: node.displayIndex, col: node.level }),
    isItemFocusable: (node) => !node.disabled
  }), [treeData])
  
  return useKeyboardNavigation(navigationContext, TREE_NAVIGATION_OPTIONS)
}
```

### Core Navigation Hook

```typescript
export const useKeyboardNavigation = <T>(
  context: NavigationContext<T>,
  options: NavigationOptions
) => {
  const [state, setState] = useState<NavigationState>({
    focusedItem: null,
    focusedPosition: null
  })

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        return navigateVertical(-1)
      case 'ArrowDown':
        return navigateVertical(1)
      case 'ArrowLeft':
        return navigateHorizontal(-1)
      case 'ArrowRight':
        return navigateHorizontal(1)
      case 'Tab':
        return navigateTab(event.shiftKey ? -1 : 1)
      case 'Home':
        return navigateToEdge('start')
      case 'End':
        return navigateToEdge('end')
      default:
        return false
    }
  }, [context, options, state])

  const navigateVertical = useCallback((direction: number) => {
    // Generic vertical navigation logic
  }, [])

  const navigateHorizontal = useCallback((direction: number) => {
    // Generic horizontal navigation logic
  }, [])

  const navigateTab = useCallback((direction: number) => {
    // Generic tab navigation logic
  }, [])

  return {
    focusedItem: state.focusedItem,
    focusedPosition: state.focusedPosition,
    handleKeyDown,
    setFocus: (itemKey: string) => {
      // Set focus programmatically
    }
  }
}
```

## Implementation Timeline

### Phase 1: Test File Split (Current - Step 08)
- **Keep existing failing test** as-is for ADR-005 compliance
- **Split into 6 focused test files**:
  - `useTableKeyboardNavigation.core.test.ts` (30-40 tests)
  - `useTableKeyboardNavigation.tab.test.ts` (25-30 tests)  
  - `useTableKeyboardNavigation.arrows.test.ts` (20-25 tests)
  - `useTableKeyboardNavigation.bands.test.ts` (15-20 tests)
  - `useTableKeyboardNavigation.virtual.test.ts` (10-15 tests)
  - `useTableKeyboardNavigation.edge-cases.test.ts` (remaining tests)

### Phase 2: Extract Abstractions (Step 09+)
- **After table navigation tests are green**
- **Create shared navigation utilities package**
- **Refactor table navigation** to use abstractions
- **Verify all tests still pass**

### Phase 3: Enable Reuse (Future Steps)
- **Apply pattern to scheduler** when migrated
- **Apply pattern to tree-list** when needed
- **Demonstrate abstraction value** with concrete reuse

## Benefits

1. **Maintainability**: Smaller, focused test files
2. **Reusability**: Shared navigation logic across components
3. **Consistency**: Same navigation behavior patterns
4. **Testability**: Core navigation logic tested independently
5. **Extensibility**: Easy to add new navigation patterns

## Constraints

- **Must maintain ADR-005 compliance**: 1:1 test mapping during Step 08
- **Must not break existing functionality**
- **Must be backwards compatible** with current grid navigation
- **Should follow established hook patterns** in the codebase

---

**Note**: This abstraction should be implemented **after** Step 08 completion to avoid violating the current RED phase requirements.
