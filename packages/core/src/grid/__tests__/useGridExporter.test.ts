// Converted from: packages/dx-grid-core/src/plugins/grid-exporter/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useGridExporter } from '../useGridExporter.js'

export const ROOT_GROUP = Symbol('root')
export const TABLE_GROUP_TYPE = Symbol('tableGroup')
export const TABLE_DATA_TYPE = Symbol('tableData')

describe('useGridExporter - converted legacy behavior', () => {
  const isGroupRow = ({ groupedBy }) => !!groupedBy

  describe('#groupTree', () => {
    describe('without grouping', () => {
      it('flat rows', () => {
        const rows = [{}, {}, {}]
        const { buildGroupTree } = (useGridExporter as any) || {}
        expect(buildGroupTree?.(rows, {}, undefined, isGroupRow, undefined)).toEqual({
          [ROOT_GROUP]: [0, 2],
        })
      })
    })
  })

  describe('#outlineLevels', () => {
    it('should work', () => {
      const grouping = [{ columnName: 'a' }, { columnName: 'b' }]
      const { groupOutlineLevels } = (useGridExporter as any) || {}
      expect(groupOutlineLevels?.(grouping)).toEqual({ a: 0, b: 1 })
    })
  })

  describe('#rowsToExport', () => {
    const grouping = [{ columnName: 'a' }, { columnName: 'b' }]
    it('plain rows', () => {
      const rows = [{}, {}, {}]
      const getCollapsedRows = () => null
      const getRowId = () => null
      const { rowsToExport } = (useGridExporter as any) || {}
      expect(rowsToExport?.(rows, null, grouping, getCollapsedRows, getRowId, isGroupRow)).toEqual(
        rows
      )
    })
  })

  describe('#exportSummaryGetter', () => {
    const tableColumns = [
      { column: { name: 'a' }, type: TABLE_DATA_TYPE },
      { column: { name: 'b' }, type: TABLE_DATA_TYPE },
      { column: { name: 'g' }, type: TABLE_GROUP_TYPE },
    ]
    const excelColumns = tableColumns.reduce(
      (acc, { column: { name } }) => ({ ...acc, [name]: { letter: name.toUpperCase() } }),
      {} as any
    )
    const worksheet = { getColumn: (n) => excelColumns[n], lastRow: { getCell: vi.fn() } }
    const customizeSummaryCell = vi.fn()
    const defaultMessages = { sum: 'Sum is', max: 'Max is' }
    let cells
    beforeEach(() => {
      cells = { a: {}, b: {}, g: {} }
      worksheet.lastRow.getCell.mockImplementation((n) => cells[n])
    })
    it('export summary', () => {
      const { exportSummaryGetter } = (useGridExporter as any) || {}
      const exportSummary = exportSummaryGetter?.(
        worksheet,
        tableColumns,
        customizeSummaryCell,
        defaultMessages
      )
      exportSummary?.({ columnName: 'a', type: 'sum' }, [[2, 10]])
      expect(cells.a).toEqual({
        numFmt: '"Sum is:" 0',
        value: { formula: 'SUM(A2:A10)', date1904: false },
      })
    })
  })

  describe('#closeGroupGetter', () => {
    const worksheet = { addRow: vi.fn() }
    const groupTree = {
      1: ['1|1', '1|2'],
      '1|1': ['1|1|a', '1|1|b'],
      '1|1|a': [3, 5],
      '1|1|b': [7, 11],
      '1|2': ['1|2|c'],
      '1|2|c': [13, 15],
    }
    const outlineLevels = { a: 0, b: 1, c: 2 }
    const groupSummaryItems = [
      { columnName: 'a', type: 'sum' },
      { columnName: 'b', type: 'max' },
    ]
    const exportSummary = vi.fn()
    it('export group summaries', () => {
      const expectedRanges = [
        [13, 15],
        [17, 21],
      ]
      const { closeGroupGetter } = (useGridExporter as any) || {}
      const closeGroup = closeGroupGetter?.(
        worksheet,
        groupTree,
        outlineLevels,
        2,
        groupSummaryItems,
        exportSummary
      )?.(10)
      closeGroup?.({ groupedBy: 'b', compoundKey: '1|1' })
      expect(exportSummary).toHaveBeenCalledTimes(2)
      expect(exportSummary).toHaveBeenNthCalledWith(1, groupSummaryItems[0], expectedRanges)
      expect(exportSummary).toHaveBeenNthCalledWith(2, groupSummaryItems[1], expectedRanges)
    })
  })

  describe('#maxGroupLevel', () => {
    it('should work', () => {
      const { maximumGroupLevel } = (useGridExporter as any) || {}
      expect(maximumGroupLevel?.([])).toBe(-1)
      expect(maximumGroupLevel?.([{ columnName: 'a' }, { columnName: 'b' }])).toBe(1)
    })
  })
})
// Converted from: packages/dx-grid-core/src/plugins/grid-exporter/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it } from 'vitest'

describe('useGridExporter - converted legacy behavior', () => {
  it.todo('should build export rows (basic)')
  it.todo('should respect hidden columns in export')
})
