import { useCallback, useState } from 'react'
import { toggle } from './utils/toggle.js'

export function toggleSelection(
  selection: (string | number)[],
  payload: { rowIds: (string | number)[]; state?: boolean },
  helpers = { toggle }
) {
  return helpers.toggle(selection, payload.rowIds, payload.state)
}

export interface UseSelectionStateOptions {
  selection?: (string | number)[]
  onSelectionChange?: (selection: (string | number)[]) => void
  defaultSelection?: (string | number)[]
}

export function useSelectionState(options: UseSelectionStateOptions = {}) {
  const { selection: controlled, onSelectionChange, defaultSelection = [] } = options
  const [uncontrolled, setUncontrolled] = useState<(string | number)[]>(defaultSelection)
  const isControlled = controlled !== undefined
  const effective = isControlled ? controlled! : uncontrolled
  const setSelection = useCallback(
    (next: (string | number)[]) => {
      if (!isControlled) setUncontrolled(next)
      onSelectionChange?.(next)
    },
    [isControlled, onSelectionChange]
  )
  return { selection: effective, setSelection } as const
}
