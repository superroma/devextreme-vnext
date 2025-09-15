// Converted from: packages/dx-grid-core/src/plugins/selection-state/reducers.test.ts
// Phase: RED (Step 08) – Exact legacy logic referencing future toggleSelection export.
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { toggleSelection } from '../useSelectionState.js'

// Mock common reducer toggle similar to legacy jest.mock behavior
const toggle = vi.fn()

describe('useSelection.state - converted legacy behavior', () => {
  describe('#toggleSelection', () => {
    it('uses common toggle reducer', () => {
      ;(toggleSelection as any)([], { rowIds: [1], state: false }, { toggle })
      expect(toggle).toHaveBeenLastCalledWith([], [1], false)
    })
  })
})
