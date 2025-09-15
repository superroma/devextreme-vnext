// Converted from: packages/dx-grid-core/src/plugins/editing-state/reducers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { startEditRows, stopEditRows, addRow, changeAddedRow, cancelAddedRows, changeRow, cancelChanges, deleteRows, cancelDeletedRows } from '../useEditingState.js'

describe('useEditing.state - converted legacy behavior', () => {
  describe('#startEditRows', () => {
    it('should work', () => {
      const state = { editingRowIds: [] } as any;
      expect((startEditRows as any)(state, [1, 3]))
        .toEqual({ editingRowIds: [1, 3] });
    });

    it('should add to editingRowIds', () => {
      const state = { editingRowIds: [1] } as any;
      expect((startEditRows as any)(state, [1, 3]))
        .toEqual({ editingRowIds: [1, 3] });
    });
  });

  describe('#stopEditRows', () => {
    it('should work', () => {
      const state = { editingRowIds: [1, 3] } as any;
      expect((stopEditRows as any)(state, [1]))
        .toEqual({ editingRowIds: [3] });
    });
  });

  describe('#addRow', () => {
    it('should work', () => {
      const state = { addedRows: [] } as any;
      expect((addRow as any)(state))
        .toEqual({ addedRows: [{}] });
    });
  });

  describe('#changeAddedRow', () => {
    it('should work', () => {
      const state = { addedRows: [{}] } as any;
      expect((changeAddedRow as any)(state, { rowId: 0, change: { a: 1 } }))
        .toEqual({ addedRows: [{ a: 1 }] });
    });

    it('should add property to added row', () => {
      const state = { addedRows: [{ a: 1 }] } as any;
      expect((changeAddedRow as any)(state, { rowId: 0, change: { b: 1 } }))
        .toEqual({ addedRows: [{ a: 1, b: 1 }] });
    });
  });

  describe('#cancelAddedRows', () => {
    it('should work', () => {
      const state = { addedRows: [{}] } as any;
      expect((cancelAddedRows as any)(state, { rowIds: [0] }))
        .toEqual({ addedRows: [] });
    });
  });

  describe('#changeRow', () => {
    it('should work', () => {
      const state = { rowChanges: {} } as any;
      expect((changeRow as any)(state, { rowId: 1, change: { a: 1 } }))
        .toEqual({ rowChanges: { 1: { a: 1 } } });
    });

    it('should add changes to existing row', () => {
      const state = { rowChanges: { 1: { a: 1 } } } as any;
      expect((changeRow as any)(state, { rowId: 1, change: { b: 1 } }))
        .toEqual({ rowChanges: { 1: { a: 1, b: 1 } } });
    });
  });

  describe('#cancelChanges', () => {
    it('should work', () => {
      const state = { rowChanges: { 1: { a: 1 } } } as any;
      expect((cancelChanges as any)(state, { rowIds: [1] }))
        .toEqual({ rowChanges: {} });
    });
  });

  describe('#deleteRows', () => {
    it('should work', () => {
      const state = { deletedRowIds: [], rowChanges: { 1: { a: 1 } } } as any;
      expect((deleteRows as any)(state, { rowIds: [1] }))
        .toEqual({ deletedRowIds: [1], rowChanges: {}, addedRows: [] });
    });
  });

  describe('#cancelDeletedRows', () => {
    it('should work', () => {
      const state = { deletedRowIds: [1] } as any;
      expect((cancelDeletedRows as any)(state, { rowIds: [1] }))
        .toEqual({ deletedRowIds: [] });
    });
  });
});
