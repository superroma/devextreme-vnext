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

## CRITICAL: Strict Legacy Test Conversion Rules

### Rule 1: Exact 1:1 Test Case Mapping

- **Legacy has N test cases** → **New must have EXACTLY N test cases**
- **Each legacy test case** → **One corresponding new test case**
- **Same test names and scenarios**
- **Same expected behavior and test data**
- **NO extra tests beyond legacy**
- **NO missing tests from legacy**

### Rule 2: Preserve Test Requirements

For each legacy test case:

- **Keep the SAME test scenario** being tested
- **Keep the SAME expected behavior**
- **Keep the SAME test data and edge cases**
- **Convert to appropriate modern API** (your choice how)

### Rule 3: Verification Method

```bash
# Count must match exactly
grep -c "it(" ../devextreme-reactive/packages/dx-grid-core/src/plugins/PLUGIN/computeds.test.ts
grep -c "it(" packages/core/src/grid/__tests__/useHOOK.test.ts
```

### Rule 4: Study Existing Patterns First

**BEFORE implementing anything new:**

- **Read similar files** in the current codebase
- **Follow established patterns** exactly
- **Copy naming conventions, interfaces, exports**

## Package Creation Rules

**Copy structure from existing working package** (e.g., `packages/core/`):

- Copy `package.json` and `tsconfig.json`
- Update only: package name, dependencies, entry file
- **Keep exact build script**: `tsup + tsc --emitDeclarationOnly` pattern
- Add to root `tsconfig.json`: paths and references sections

## Development Methodology: TDD

1. **RED**: Convert legacy tests EXACTLY (1:1 mapping)
2. **GREEN**: Implement to pass converted tests
3. **REFACTOR**: Optimize. Fix with `pnpm typecheck`, `pnpm build`

## Architecture

- **React hooks** not plugins
- **TypeScript strict** throughout
- **Zustand** for state management
- **Tree-shakeable** exports

## Reference Legacy Code

Use `../devextreme-reactive/` for reference.
