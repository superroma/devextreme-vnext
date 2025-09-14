# devextreme-vnext

next

## Step 01 Status

Modern pnpm + TypeScript monorepo scaffolded with initial packages:

Build: `pnpm install && pnpm build` (packages only). Dev playground: `pnpm dev`.

Outputs are ESM + CJS via tsup.

## Testing

This repo uses Vitest + React Testing Library.

Run the test suite:

```bash
pnpm test
```

Watch mode:

```bash
pnpm test:watch
```

Coverage (HTML + text) is generated automatically; open `coverage/index.html` after a run with `vitest run --coverage` if needed.
