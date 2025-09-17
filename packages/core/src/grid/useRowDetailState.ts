import { useCallback, useState } from 'react'
import { toggle } from './utils/toggle.js'

export function toggleDetailRowExpanded(
  state: { expandedDetailRowIds: (string | number)[] },
  payload: { rowIds: (string | number)[]; state?: boolean },
  helpers = { toggle }
) {
  return {
    expandedDetailRowIds: helpers.toggle(state.expandedDetailRowIds, payload.rowIds, payload.state),
  }
}

export interface UseRowDetailStateOptions {
  expandedDetailRowIds?: (string | number)[]
  onExpandedDetailRowIdsChange?: (ids: (string | number)[]) => void
  defaultExpandedDetailRowIds?: (string | number)[]
}

export function useRowDetailState(options: UseRowDetailStateOptions = {}) {
  const {
    expandedDetailRowIds: controlled,
    onExpandedDetailRowIdsChange,
    defaultExpandedDetailRowIds = [],
  } = options
  const [uncontrolled, setUncontrolled] = useState<(string | number)[]>(
    defaultExpandedDetailRowIds
  )
  const isControlled = controlled !== undefined
  const effective = isControlled ? controlled! : uncontrolled
  const setExpandedDetailRowIds = useCallback(
    (next: (string | number)[]) => {
      if (!isControlled) setUncontrolled(next)
      onExpandedDetailRowIdsChange?.(next)
    },
    [isControlled, onExpandedDetailRowIdsChange]
  )
  return { expandedDetailRowIds: effective, setExpandedDetailRowIds } as const
}
