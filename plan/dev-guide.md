# Development Guide

## Hook Pattern

```typescript
interface UseXXXOptions<T> {
  xxx?: XXX[] // Controlled
  onXXXChange?: (xxx: XXX[]) => void
  defaultXXX?: XXX[] // Uncontrolled
}

export function useXXX<T>(data: T[], options = {}) {
  // Implementation pattern
  return { processedData, xxx, setXXX }
}
```

## Commands

- `pnpm test` - Run tests
- `pnpm build` - Build all packages
- `pnpm typecheck` - TypeScript validation
- `pnpm dev` - Development server
