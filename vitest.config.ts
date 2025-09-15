import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// Ensure setup file resolves correctly when tests executed from sub-package cwd.
const rootDir = dirname(fileURLToPath(import.meta.url))
const setupFile = resolve(rootDir, 'vitest.setup.ts')

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: [setupFile],
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})
