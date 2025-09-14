# Step 06: Create Grid Components and Demos Following Legacy Structure

## Task

Create basic Grid components and demo package following the exact legacy repository structure and patterns, using modern tooling (Vite instead of webpack).

## Reference Structure Analysis

Study these legacy packages for structure and patterns:

- `../devextreme-reactive/packages/dx-react-grid/` - Main components
- `../devextreme-reactive/packages/dx-react-grid-demos/` - Demo structure
- `../devextreme-reactive/packages/dx-react-grid/src/plugins/` - Component patterns

## Part 1: Create dx-react-grid Package

### File: `packages/dx-react-grid/package.json`

Copy structure from `../devextreme-reactive/packages/dx-react-grid/package.json` but:

- Update name to `@devextreme-vnext/dx-react-grid`
- Use modern build system: `"build": "tsup src/index.ts --format esm,cjs --clean && tsc -p tsconfig.json --emitDeclarationOnly --outDir dist"`
- Add dependency on `@devextreme-vnext/core`
- Update to React 18+ peer dependencies
- Remove rollup, add tsup and typescript to devDependencies

### File: `packages/dx-react-grid/tsconfig.json`

Create TypeScript config extending root:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"],
  "references": [{ "path": "../core" }]
}
```

### File: `packages/dx-react-grid/src/plugins/grid.tsx`

Create main Grid component following legacy pattern:

- Reference `../devextreme-reactive/packages/dx-react-grid/src/grid.tsx`
- Convert plugin-based architecture to props-based
- Use `useGridData` hook from `@devextreme-vnext/core`
- Support children pattern like legacy Grid
- Provide React context for child components to access grid state

### File: `packages/dx-react-grid/src/plugins/table.tsx`

Create Table component:

- Reference `../devextreme-reactive/packages/dx-react-grid/src/plugins/table.tsx`
- Convert from plugin to standard React component
- Use grid data from React context
- Render table structure with rows from processed data

### File: `packages/dx-react-grid/src/plugins/table-header-row.tsx`

Create TableHeaderRow component:

- Reference `../devextreme-reactive/packages/dx-react-grid/src/plugins/table-header-row.tsx`
- Add sorting controls when `showSortingControls` prop is true
- Handle click events for sorting using grid context
- Show sort indicators (arrows) for current sorting state

### File: `packages/dx-react-grid/src/plugins/table-filter-row.tsx`

Create TableFilterRow component:

- Reference `../devextreme-reactive/packages/dx-react-grid/src/plugins/table-filter-row.tsx`
- Convert to use filtering from useGridData hook via context
- Support filter inputs per column
- Handle filter value changes

### File: `packages/dx-react-grid/src/plugins/paging-panel.tsx`

Create PagingPanel component:

- Reference `../devextreme-reactive/packages/dx-react-grid/src/plugins/paging-panel.tsx`
- Use paging data from useGridData hook via context
- Include page navigation controls (Previous, Next, page info)
- Support page size selection

### File: `packages/dx-react-grid/src/index.ts`

Export all components following legacy pattern:

- Check `../devextreme-reactive/packages/dx-react-grid/src/index.ts`
- Export Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel
- Use .js extensions for imports (compiled output references)

## Part 2: Create dx-react-grid-demos Package

### File: `packages/dx-react-grid-demos/package.json`

Create modern demo package with Vite:

```json
{
  "name": "@devextreme-vnext/dx-react-grid-demos",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@devextreme-vnext/dx-react-grid": "workspace:*",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.4.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

### File: `packages/dx-react-grid-demos/vite.config.ts`

Create Vite configuration:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
})
```

### Directory: `packages/dx-react-grid-demos/src/demo-data/`

Copy demo data from legacy:

- Copy `../devextreme-reactive/packages/dx-react-grid-demos/src/demo-data/employees.js`
- Copy `../devextreme-reactive/packages/dx-react-grid-demos/src/demo-data/generator.js`
- Convert to TypeScript (.ts) and update exports to ESM format

### File: `packages/dx-react-grid-demos/src/demos/BasicGrid.tsx`

Create basic demo (instead of complex .jsxt system):

- Reference `../devextreme-reactive/packages/dx-react-grid-demos/src/demo-sources/grid-basic/basic.jsxt`
- Convert from plugin pattern to props pattern:

```typescript
import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
} from '@devextreme-vnext/dx-react-grid';
import { employees } from '../demo-data/employees';

const columns = [
  { name: 'name', title: 'Name' },
  { name: 'position', title: 'Position' },
  { name: 'city', title: 'City' },
];

export const BasicGrid = () => {
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Grid
      rows={employees}
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
      filters={filters}
      onFiltersChange={setFilters}
      currentPage={currentPage}
      onCurrentPageChange={setCurrentPage}
      pageSize={10}
    >
      <Table />
      <TableHeaderRow showSortingControls />
      <TableFilterRow />
      <PagingPanel />
    </Grid>
  );
};
```

### File: `packages/dx-react-grid-demos/src/App.tsx`

Create demo navigation:

```typescript
import React from 'react';
import { BasicGrid } from './demos/BasicGrid';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>DevExtreme vNext Grid Demos</h1>
      <div style={{ marginTop: '20px' }}>
        <h2>Basic Grid</h2>
        <BasicGrid />
      </div>
    </div>
  );
}

export default App;
```

### File: `packages/dx-react-grid-demos/src/main.tsx`

Create Vite entry point:

```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
```

### File: `packages/dx-react-grid-demos/index.html`

Create HTML template:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DevExtreme vNext Grid Demos</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### File: `packages/dx-react-grid-demos/tsconfig.json`

Create TypeScript config:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"],
  "references": [{ "path": "../dx-react-grid" }]
}
```

## Part 3: Update Root Configuration

### Update `pnpm-workspace.yaml`:

Ensure new packages are included:

```yaml
packages:
  - 'packages/*'
```

### Update root `package.json`:

Add scripts:

```json
{
  "demo:grid": "pnpm --filter @devextreme-vnext/dx-react-grid-demos dev",
  "build:grid": "pnpm --filter @devextreme-vnext/dx-react-grid build"
}
```

### Update root `tsconfig.json`:

Add new package references:

```json
{
  "references": [
    { "path": "packages/core" },
    { "path": "packages/components" },
    { "path": "packages/integrations" },
    { "path": "packages/dx-react-grid" },
    { "path": "packages/dx-react-grid-demos" }
  ]
}
```

## Part 4: Component Architecture Requirements

### Grid Component Pattern:

- Grid component manages all state using `useGridData` hook
- Provides React context with grid state and actions
- Child components (Table, TableHeaderRow, etc.) consume context
- Support controlled/uncontrolled modes for all state (sorting, filtering, paging)

### Component Composition:

- Maintain same component composition pattern as legacy
- Grid wraps child components and provides data context
- Child components render their specific UI parts
- Support all legacy props and behaviors

### State Management:

- Use `useGridData` hook from `@devextreme-vnext/core`
- Pass all state and callbacks as props to Grid component
- Grid provides context to child components
- Support both controlled and uncontrolled usage patterns

## Part 5: Create Component Tests

### Follow Modern Testing Patterns:

Create test files using React Testing Library:

- `packages/dx-react-grid/src/plugins/__tests__/grid.test.tsx`
- `packages/dx-react-grid/src/plugins/__tests__/table.test.tsx`
- `packages/dx-react-grid/src/plugins/__tests__/table-header-row.test.tsx`

### Testing Requirements:

- Use React Testing Library (not Enzyme like legacy)
- Test component rendering with different props
- Test user interactions (clicking headers, typing in filters)
- Test integration with useGridData hook
- Test controlled/uncontrolled behavior
- Test accessibility features
- Mock `@devextreme-vnext/core` functions when needed

### Example Test Pattern:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Grid, Table, TableHeaderRow } from '../index';

describe('Grid Integration', () => {
  const rows = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 }
  ];
  const columns = [
    { name: 'name', title: 'Name' },
    { name: 'age', title: 'Age' }
  ];

  it('should render table with data and allow sorting', () => {
    render(
      <Grid rows={rows} columns={columns}>
        <Table />
        <TableHeaderRow showSortingControls />
      </Grid>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Test sorting
    fireEvent.click(screen.getByText('Name'));
    // Add assertions for sorted state
  });
});
```

## Part 6: TypeScript Requirements

### Strict TypeScript:

- All components fully typed with proper interfaces
- Export TypeScript interfaces for all props
- Maintain strict mode compliance
- Use proper generic types for data rows

### Interface Exports:

```typescript
export interface GridProps<T = any> {
  rows: T[]
  columns: Column[]
  sorting?: Sorting[]
  onSortingChange?: (sorting: Sorting[]) => void
  filters?: Filter[]
  onFiltersChange?: (filters: Filter[]) => void
  currentPage?: number
  onCurrentPageChange?: (page: number) => void
  pageSize?: number
  children: React.ReactNode
}
```

## Success Criteria

1. **Package structure** exactly matches legacy dx-react-grid pattern
2. **Modern tooling** - Vite for demos instead of webpack
3. **Working demo** at `pnpm demo:grid` showing interactive grid
4. **Component composition** works like legacy (Grid with child components)
5. **All features working** - sorting, filtering, paging with real data
6. **Modern hooks integration** using `@devextreme-vnext/core`
7. **TypeScript strict** compliance throughout
8. **Component tests** using React Testing Library
9. **Build system** working with tsup + tsc pattern

## Testing Commands

```bash
# Build grid package
pnpm build:grid

# Start demo server (Vite dev server)
pnpm demo:grid

# Type check all packages
pnpm typecheck

# Run tests
pnpm test

# Build all packages
pnpm build
```

## Expected Result

- Working Grid demo at localhost:3000 with Vite dev server
- Interactive employee data grid with sorting, filtering, paging
- Component composition identical to legacy pattern
- Modern development experience with instant HMR
- Proves modern hook architecture works with familiar component API
- Foundation for Material-UI and Bootstrap integrations
