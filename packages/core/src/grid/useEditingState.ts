import { useCallback, useState } from 'react'

export function startEditRows(state: { editingRowIds: (string | number)[] }, rowIds: (string | number)[]) {
  const set = new Set(state.editingRowIds)
  const next = [...state.editingRowIds]
  rowIds.forEach(id => { if (!set.has(id)) { set.add(id); next.push(id) } })
  return { editingRowIds: next }
}
export function stopEditRows(state: { editingRowIds: (string | number)[] }, rowIds: (string | number)[]) {
  const set = new Set(rowIds)
  return { editingRowIds: state.editingRowIds.filter((id) => !set.has(id)) }
}

export function addRow(state: { addedRows: any[] }, payload: { row?: any } = { row: {} }) {
  return { addedRows: [...state.addedRows, payload.row ?? {}] }
}
export function changeAddedRow(state: { addedRows: any[] }, payload: { rowId: number; change: any }) {
  const next = state.addedRows.slice()
  next[payload.rowId] = { ...next[payload.rowId], ...payload.change }
  return { addedRows: next }
}
export function cancelAddedRows(state: { addedRows: any[] }, payload: { rowIds: number[] }) {
  const set = new Set(payload.rowIds)
  const result: any[] = []
  state.addedRows.forEach((row, idx) => { if (!set.has(idx)) result.push(row) })
  return { addedRows: result }
}

export function changeRow(state: { rowChanges: Record<string | number, any> }, payload: { rowId: string | number; change: any }) {
  const prev = state.rowChanges[payload.rowId] || {}
  return { rowChanges: { ...state.rowChanges, [payload.rowId]: { ...prev, ...payload.change } } }
}
export function cancelChanges(state: { rowChanges: Record<string | number, any> }, payload: { rowIds: (string | number)[] }) {
  const next = { ...state.rowChanges }
  payload.rowIds.forEach((id) => { delete next[id] })
  return { rowChanges: next }
}

export function deleteRows(state: { deletedRowIds: (string | number)[]; rowChanges?: Record<string | number, any>; addedRows?: any[] }, payload: { rowIds: (string | number)[] }) {
  const nextDeleted = [...state.deletedRowIds, ...payload.rowIds]
  // Legacy also clears rowChanges for deleted rows & addedRows entirely
  const nextRowChanges = { ...(state.rowChanges || {}) }
  payload.rowIds.forEach((id) => { delete nextRowChanges[id] })
  return { deletedRowIds: nextDeleted, rowChanges: nextRowChanges, addedRows: [] }
}
export function cancelDeletedRows(state: { deletedRowIds: (string | number)[] }, payload: { rowIds: (string | number)[] }) {
  const set = new Set(payload.rowIds)
  return { deletedRowIds: state.deletedRowIds.filter((id) => !set.has(id)) }
}

export interface UseEditingStateOptions {
  editingRowIds?: (string | number)[]
  onEditingRowIdsChange?: (ids: (string | number)[]) => void
  defaultEditingRowIds?: (string | number)[]
  addedRows?: any[]
  onAddedRowsChange?: (rows: any[]) => void
  defaultAddedRows?: any[]
  rowChanges?: Record<string | number, any>
  onRowChangesChange?: (changes: Record<string | number, any>) => void
  defaultRowChanges?: Record<string | number, any>
  deletedRowIds?: (string | number)[]
  onDeletedRowIdsChange?: (ids: (string | number)[]) => void
  defaultDeletedRowIds?: (string | number)[]
}

export function useEditingState(options: UseEditingStateOptions = {}) {
  const {
    editingRowIds: cEditingRowIds, onEditingRowIdsChange, defaultEditingRowIds = [],
    addedRows: cAddedRows, onAddedRowsChange, defaultAddedRows = [],
    rowChanges: cRowChanges, onRowChangesChange, defaultRowChanges = {},
    deletedRowIds: cDeletedRowIds, onDeletedRowIdsChange, defaultDeletedRowIds = [],
  } = options

  const [uEditingRowIds, setUEditingRowIds] = useState<(string | number)[]>(defaultEditingRowIds)
  const [uAddedRows, setUAddedRows] = useState<any[]>(defaultAddedRows)
  const [uRowChanges, setURowChanges] = useState<Record<string | number, any>>(defaultRowChanges)
  const [uDeletedRowIds, setUDeletedRowIds] = useState<(string | number)[]>(defaultDeletedRowIds)

  const isEditingRowIdsControlled = cEditingRowIds !== undefined
  const isAddedRowsControlled = cAddedRows !== undefined
  const isRowChangesControlled = cRowChanges !== undefined
  const isDeletedRowIdsControlled = cDeletedRowIds !== undefined

  const editingRowIds = isEditingRowIdsControlled ? cEditingRowIds! : uEditingRowIds
  const addedRows = isAddedRowsControlled ? cAddedRows! : uAddedRows
  const rowChanges = isRowChangesControlled ? cRowChanges! : uRowChanges
  const deletedRowIds = isDeletedRowIdsControlled ? cDeletedRowIds! : uDeletedRowIds

  const setEditingRowIds = useCallback((next: (string | number)[]) => {
    if (!isEditingRowIdsControlled) setUEditingRowIds(next)
    onEditingRowIdsChange?.(next)
  }, [isEditingRowIdsControlled, onEditingRowIdsChange])
  const setAddedRows = useCallback((next: any[]) => {
    if (!isAddedRowsControlled) setUAddedRows(next)
    onAddedRowsChange?.(next)
  }, [isAddedRowsControlled, onAddedRowsChange])
  const setRowChanges = useCallback((next: Record<string | number, any>) => {
    if (!isRowChangesControlled) setURowChanges(next)
    onRowChangesChange?.(next)
  }, [isRowChangesControlled, onRowChangesChange])
  const setDeletedRowIds = useCallback((next: (string | number)[]) => {
    if (!isDeletedRowIdsControlled) setUDeletedRowIds(next)
    onDeletedRowIdsChange?.(next)
  }, [isDeletedRowIdsControlled, onDeletedRowIdsChange])

  return {
    editingRowIds,
    addedRows,
    rowChanges,
    deletedRowIds,
    setEditingRowIds,
    setAddedRows,
    setRowChanges,
    setDeletedRowIds,
  } as const
}
