export function hello(name: string): string {
  return `Hello, ${name}!`
}
export const version = '0.1.0'

// Types
export * from './types/grid.js'
export * from './types/sorting.js'
export * from './types/filtering.js'

// Utils
export { default as mergeSort } from './utils/merge-sort.js'
export * from './utils/sorting.js'
export * from './utils/column-extension.js'
export * from './utils/filtering.js'
export * from './utils/hierarchical-data.js'
// Hooks
export { useSorting } from './grid/useSorting.js'
export { useFiltering } from './grid/useFiltering.js'
