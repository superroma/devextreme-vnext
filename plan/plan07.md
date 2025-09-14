# Step 07: Add Turbo Build Orchestration + Playwright E2E Tests

## Task

Add proper build orchestration with Turbo (following original plan) and e2e tests to ensure demos actually work.

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

## Part 2: Add Playwright E2E Tests

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

## Part 3: CI Integration

- Create `.github/workflows/ci.yml`
- Run: build, test, typecheck, lint, e2e
- Upload playwright reports on failure

## Success Criteria

1. **Turbo eliminates build issues** when adding packages
2. **E2E tests verify demo works** - data loads, sorting/filtering functional
3. **CI runs all tests** automatically
4. **No more TypeScript compilation problems**

## Testing Commands

```bash
pnpm install && pnpm e2e:install
turbo run build
turbo run e2e
```

This follows original plan and ensures demos actually work! 🎯
