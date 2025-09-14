# Step 01: Modern Monorepo Setup

## Task

Create modern monorepo structure with contemporary tooling.

## Files to Create

1. `package.json` - Root with pnpm workspaces
2. `pnpm-workspace.yaml` - Workspace config
3. `tsconfig.json` - Root TypeScript config
4. Basic package structure in `packages/` and `apps/`

## Requirements

- Use pnpm workspaces (not Lerna)
- TypeScript 5.2+, React 18+, Vite 4+
- ESM + CJS exports
- Basic folder structure only

## Success Criteria

```bash
pnpm install
pnpm build  # should work
```

## Reference

Look at `../devextreme-reactive/package.json` for context but modernize the tooling.
