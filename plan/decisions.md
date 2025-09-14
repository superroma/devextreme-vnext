# Architecture Decisions

## State Management: Zustand

- Minimal bundle size (~2.5KB vs Redux ~47KB)
- No providers needed
- Perfect for component library

## Build System: tsup + tsc

- tsup for JS bundling (fast)
- tsc for declarations (reliable)
- TypeScript path mappings for development

## TDD Approach: Test-First Development

- Comprehensive test coverage
- Hook API design driven by tests
- Performance optimized with memoization
