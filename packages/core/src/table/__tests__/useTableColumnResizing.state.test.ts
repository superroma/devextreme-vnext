// Converted from: packages/dx-grid-core/src/plugins/table-column-resizing/reducers.test.ts
// Phase: RED (Step 08) – 1:1 mapping of reducer tests
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
} from '../internal/tableColumnResizing.reducers.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getColumnSizes } from '../internal/tableColumnResizing.helpers.js'

vi.mock('../internal/tableColumnResizing.helpers.js', () => ({
  getColumnSizes: vi.fn(),
}))

describe('TableColumnResizing Plugin reducers (state hook placeholder)', () => {
  // Mirror legacy state structure
  const state: any = {
    columnWidths: [
      { columnName: 'a', width: 40 },
      { columnName: 'b', width: 60 },
    ],
  }

  describe('#changeTableColumnWidth', () => {
    describe('standart resizing mode', () => {
      const resizingMode = 'widget'
      it('should work', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 45 }))
        const payload: any = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }
        expect(changeTableColumnWidth!(state, payload)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 45 },
            { columnName: 'b', width: 60 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should stick size to the min', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 40 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }
        expect(changeTableColumnWidth!(state, payload)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 40 },
            { columnName: 'b', width: 40 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should stick size to the max', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 80 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions: undefined,
        }
        expect(changeTableColumnWidth!(state, payload)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 40 },
            { columnName: 'b', width: 80 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should stick size to the min defined in columnExtensions', () => {
        const columnExtensions = [{ columnName: 'b', minWidth: 50 }]
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 50 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }
        expect(changeTableColumnWidth!(state, payload)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 40 },
            { columnName: 'b', width: 50 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should stick size to the max defined in columnExtensions', () => {
        const columnExtensions = [{ columnName: 'b', maxWidth: 70 }]
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 70 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }
        expect(changeTableColumnWidth!(state, payload)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 40 },
            { columnName: 'b', width: 70 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should work if limitation is not defined in columnExtensions', () => {
        const columnExtensions = [{ columnName: 'b' }]
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 40 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }
        expect(changeTableColumnWidth!(state, payload)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 40 },
            { columnName: 'b', width: 40 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should work with immutable properties (simulated)', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 40 }))
        const immutableState: any = {
          columnWidths: [
            { columnName: 'a', width: 40 },
            { columnName: 'b', width: 60 },
          ],
        }
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }
        expect(() => changeTableColumnWidth!(immutableState, payload)).not.toThrow()
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
    })

    describe('nextColumn resizing mode', () => {
      const resizingMode = 'nextColumn'
      it('should resize both columns', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 45, nextSize: 55 }))
        const payload: any = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }
        expect(changeTableColumnWidth!(state, payload)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 45 },
            { columnName: 'b', width: 55 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should block resize if both columns have min width', () => {
        const columnExtensions = [{ columnName: 'b', minWidth: 60 }]
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 40, nextSize: 60 }))
        const payloadAdd: any = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        }
        const payloadReduce: any = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        }
        expect(changeTableColumnWidth!(state, payloadAdd)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 40 },
            { columnName: 'b', width: 60 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payloadAdd)
        expect(changeTableColumnWidth!(state, payloadReduce)).toEqual({
          columnWidths: [
            { columnName: 'a', width: 40 },
            { columnName: 'b', width: 60 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payloadReduce)
      })
    })
  })

  describe('#draftTableColumnWidth', () => {
    describe('standart resizing mode', () => {
      it('should work', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 45 }))
        const payload: any = {
          columnName: 'a',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }
        expect(draftTableColumnWidth!(state, payload)).toEqual({
          draftColumnWidths: [{ columnName: 'a', width: 45 }],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should stick size to the min', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 40 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }
        expect(draftTableColumnWidth!(state, payload)).toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 40 }],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should stick size to the max', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 80 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions: undefined,
        }
        expect(draftTableColumnWidth!(state, payload)).toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 80 }],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should stick size to the min defined in columnExtensions', () => {
        const columnExtensions = [{ columnName: 'b', minWidth: 50 }]
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 50 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }
        expect(draftTableColumnWidth!(state, payload)).toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 50 }],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should stick size to the max defined in columnExtensions', () => {
        const columnExtensions = [{ columnName: 'b', maxWidth: 70 }]
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 70 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }
        expect(draftTableColumnWidth!(state, payload)).toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 70 }],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
      it('should work if limitation does not define in columnExtensions', () => {
        const columnExtensions = [{ columnName: 'b' }]
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 40 }))
        const payload: any = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }
        expect(draftTableColumnWidth!(state, payload)).toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 40 }],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
    })
    describe('nextColumn resizing mode', () => {
      it('should return both column widths', () => {
        ;(getColumnSizes as any).mockImplementation(() => ({ size: 45, nextSize: 55 }))
        const payload: any = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode: 'nextColumn',
          cachedWidths: { a: 40, b: 60 },
          shift: +5,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions: undefined,
        }
        expect(draftTableColumnWidth!(state, payload)).toEqual({
          draftColumnWidths: [
            { columnName: 'a', width: 45 },
            { columnName: 'b', width: 55 },
          ],
        })
        expect(getColumnSizes).toHaveBeenCalledWith(state.columnWidths, payload)
      })
    })
  })

  describe('#cancelTableColumnWidthDraft', () => {
    it('should work', () => {
      expect(cancelTableColumnWidthDraft!()).toEqual({ draftColumnWidths: [] })
    })
  })
})
