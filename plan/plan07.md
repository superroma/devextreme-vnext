# Step 07: Add Turbo Build Orchestration + Manual Playwright E2E Tests

## Task

Add proper build orchestration with Turbo (following original plan) and e2e tests to manually verify demos work.

## Part 1: Add Turbo Build Orchestration

### Problem

- Manual pnpm commands cause recurring TypeScript compilation issues
- Original plan specified Turbo but we deviated
- Need proper build dependency ordering

### Solution: Follow Original Plan

- Add `turbo: ^1.10.0` to root devDependencies
- Create `turbo.json` with pipeline for build, dev, test, typecheck
- Update root package.json scripts to use `turbo run [command]`
- Add `typecheck` script to all package.json files
- Reference: Original plan.md lines 370-382

## Part 2: Add Playwright E2E Tests (Manual Only)

### Legacy Reference

Legacy uses TestCafe: `../devextreme-reactive/packages/dx-react-grid-demos/src/tests.testcafe.js`

### Modern Approach: Playwright

- Add `@playwright/test` to root devDependencies
- Create `playwright.config.ts` with webServer pointing to grid demos
- Create `e2e/` directory with test files:
  - `grid-basic.spec.ts` - demo loads, data renders
  - `grid-sorting.spec.ts` - clicking headers sorts data
  - `grid-filtering.spec.ts` - filter inputs work
- Add e2e scripts: `e2e`, `e2e:ui`, `e2e:install`

## Success Criteria

1. **Turbo eliminates build issues** when adding packages
2. **E2E tests verify demo works** - data loads, sorting/filtering functional
3. **Manual testing workflow** established
4. **No more TypeScript compilation problems**

## Manual Testing Commands

```bash
# Setup
pnpm install && pnpm e2e:install

# Build everything with Turbo
turbo run build

# Start demo manually
turbo run dev --filter=@devextreme-vnext/dx-react-grid-demos

# In another terminal - run e2e tests
pnpm e2e

# Or run with UI for debugging
pnpm e2e:ui
```

This follows original plan and enables manual verification! 🎯
