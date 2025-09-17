import { useCallback, useState } from 'react'

export interface GroupingItem {
  columnName: string
}

export function changeColumnGrouping(
  state: { grouping: GroupingItem[]; expandedGroups?: string[] },
  payload: { columnName: string; groupIndex?: number }
): { grouping: GroupingItem[]; expandedGroups?: string[] } {
  const { grouping, expandedGroups = [] } = state
  const { columnName, groupIndex } = payload

  let nextGrouping = grouping
  const existingIndex = grouping.findIndex((g) => g.columnName === columnName)
  let targetIndex = groupIndex

  if (existingIndex > -1) {
    nextGrouping = [...nextGrouping]
    nextGrouping.splice(existingIndex, 1)
  } else if (groupIndex === undefined) {
    targetIndex = nextGrouping.length
  }
  if (targetIndex !== undefined && targetIndex > -1) {
    nextGrouping = [...nextGrouping]
    nextGrouping.splice(targetIndex, 0, { columnName })
  }

  // Determine first index where grouping differs (ungrouped column index)
  const ungroupedIndex = grouping.findIndex(
    (g, i) => !nextGrouping[i] || g.columnName !== nextGrouping[i].columnName
  )
  if (ungroupedIndex === -1) {
    return { grouping: nextGrouping }
  }
  const filteredExpanded = expandedGroups.filter((key) => key.split('|').length <= ungroupedIndex)
  if (filteredExpanded.length === expandedGroups.length) {
    return { grouping: nextGrouping }
  }
  return { grouping: nextGrouping, expandedGroups: filteredExpanded }
}

export function toggleExpandedGroups(
  state: { expandedGroups: string[] },
  payload: { groupKey: string }
) {
  const { expandedGroups } = state
  const { groupKey } = payload
  const list = [...expandedGroups]
  const idx = list.indexOf(groupKey)
  if (idx > -1) list.splice(idx, 1)
  else list.push(groupKey)
  return { expandedGroups: list }
}

export function draftColumnGrouping(
  state: { grouping: GroupingItem[]; draftGrouping?: GroupingItem[] | null },
  payload: { columnName: string; groupIndex?: number }
) {
  const base = state.draftGrouping || state.grouping
  return {
    draftGrouping: changeColumnGrouping({ grouping: base, expandedGroups: [] }, payload).grouping,
  }
}

export function cancelColumnGroupingDraft() {
  return { draftGrouping: null }
}

export interface UseGroupingStateOptions {
  grouping?: GroupingItem[]
  onGroupingChange?: (grouping: GroupingItem[]) => void
  defaultGrouping?: GroupingItem[]
  expandedGroups?: string[]
  onExpandedGroupsChange?: (expanded: string[]) => void
  defaultExpandedGroups?: string[]
  draftGrouping?: GroupingItem[] | null
  onDraftGroupingChange?: (draft: GroupingItem[] | null) => void
  defaultDraftGrouping?: GroupingItem[] | null
}

export function useGroupingState(options: UseGroupingStateOptions = {}) {
  const {
    grouping: controlledGrouping,
    onGroupingChange,
    defaultGrouping = [],
    expandedGroups: controlledExpanded,
    onExpandedGroupsChange,
    defaultExpandedGroups = [],
    draftGrouping: controlledDraft,
    onDraftGroupingChange,
    defaultDraftGrouping = null,
  } = options

  const [uGrouping, setUGrouping] = useState<GroupingItem[]>(defaultGrouping)
  const [uExpanded, setUExpanded] = useState<string[]>(defaultExpandedGroups)
  const [uDraft, setUDraft] = useState<GroupingItem[] | null>(defaultDraftGrouping)

  const isGroupingControlled = controlledGrouping !== undefined
  const isExpandedControlled = controlledExpanded !== undefined
  const isDraftControlled = controlledDraft !== undefined

  const effectiveGrouping = isGroupingControlled ? controlledGrouping! : uGrouping
  const effectiveExpanded = isExpandedControlled ? controlledExpanded! : uExpanded
  const effectiveDraft = isDraftControlled ? controlledDraft! : uDraft

  const setGrouping = useCallback(
    (next: GroupingItem[]) => {
      if (!isGroupingControlled) setUGrouping(next)
      onGroupingChange?.(next)
    },
    [isGroupingControlled, onGroupingChange]
  )
  const setExpandedGroupsState = useCallback(
    (next: string[]) => {
      if (!isExpandedControlled) setUExpanded(next)
      onExpandedGroupsChange?.(next)
    },
    [isExpandedControlled, onExpandedGroupsChange]
  )
  const setDraftGrouping = useCallback(
    (next: GroupingItem[] | null) => {
      if (!isDraftControlled) setUDraft(next)
      onDraftGroupingChange?.(next)
    },
    [isDraftControlled, onDraftGroupingChange]
  )
  return {
    grouping: effectiveGrouping,
    expandedGroups: effectiveExpanded,
    draftGrouping: effectiveDraft,
    setGrouping,
    setExpandedGroups: setExpandedGroupsState,
    setDraftGrouping,
  } as const
}
