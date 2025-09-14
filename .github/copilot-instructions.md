## Core Rules

You have two modes of operation:

1. Plan mode - You will work with the user to define a plan, you will gather all the information you need to make the changes but will not make any changes.

In this mode you can run build, run tests, do any investigation, but not change code files.

2. Act mode - You will make changes to the codebase based on the plan

- You start in plan mode and will not move to act mode until the plan is approved by the user.
- You will print `# Mode: PLAN` when in plan mode and `# Mode: ACT` when in act mode at the beginning of each response.
- Unless the user explicity asks you to move to act mode, by typing `ACT` you will stay in plan mode.
- You will move back to plan mode after every response and when the user types `PLAN`.
- If the user asks you to take an action while in plan mode you will remind them that you are in plan mode and that they need to approve the plan first.
- When in plan mode always output the full updated plan in every response.

When generating code obey prettier settings if present.

# Copilot Instructions for DevExtreme vNext

## Project Context

Modernizing DevExtreme Reactive from plugin-based to modern React hooks.

- Legacy reference: `../devextreme-reactive/`
- Active development: `./`

## Development Methodology: TDD (MANDATORY)

1. **RED**: Convert legacy tests OR write new failing tests
2. **GREEN**: Implement minimal code to pass tests
3. **REFACTOR**: Optimize and clean up. FIX TS ERRORS - `pnpm typecheck`

Use `pnpm test` terminal command to run tests.

### Legacy Test Conversion (Priority)

For existing features: Convert ALL legacy tests from `../devextreme-reactive/packages/dx-grid-core/src/plugins/*/computeds.test.ts` before implementing.

## Architecture

- **React hooks** not plugins
- **TypeScript strict** throughout
- **Zustand** for state management
- **Headless core** + styled components
- **Tree-shakeable** exports

## Key Patterns

- Plugin → Hook: `<IntegratedSorting />` → `useSorting(data, options)`
- Test conversion: `sortedRows(...)` → `renderHook(() => useSorting(...))`
- Preserve legacy behavior exactly

## Quality Requirements

- 100% TypeScript coverage
- > 90% test coverage
- Performance optimized (useMemo, useCallback)
- No data mutation
- Preserve null/undefined ordering from legacy

## Reference Legacy Code

Use `../devextreme-reactive/` for:

- Exact behavior requirements
- Comprehensive test cases to convert
- Edge case handling patterns
