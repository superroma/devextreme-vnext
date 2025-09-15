## ADR-004: Build Scripts - Two-Step Pattern

**Date**: 2024-XX-XX
**Status**: Accepted

**Decision**: Use separate build:js + build:types scripts, avoid shell && operators

**Rationale**:

- Cross-platform compatibility (Windows)
- Clear separation of concerns
- Better debugging when builds fail
- Turbo orchestrates between packages, not within

**Pattern**:

```json
"build:js": "tsup src/index.ts --format esm,cjs --clean --external react,react-dom",
"build:types": "tsc -p tsconfig.json --emitDeclarationOnly",
"build": "pnpm run build:js && pnpm run build:types"
```

## ADR-005: Test Conversion - Strict 1:1 Mapping

**Date**: 2024-XX-XX  
**Status**: Accepted

**Problem**: Copilot adding extra tests beyond legacy specifications

**Decision**: Enforce exact 1:1 test case mapping from legacy to new

**Rule**: Legacy N tests → New exactly N tests, same scenarios and expectations
