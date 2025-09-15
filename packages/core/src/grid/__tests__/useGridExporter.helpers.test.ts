// Converted from: packages/dx-grid-core/src/plugins/grid-exporter/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect, vi } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useGridExporterHelpers } from '../useGridExporterHelpers.js'

export const ROOT_GROUP = Symbol('root')

describe('useGridExporter.helpers - converted legacy behavior', () => {
  const helpers = (useGridExporterHelpers as any) || {}
  const { findRanges, exportHeader, exportRows, closeSheet, normalizeRanges, removeEmptyGroups } =
    helpers

  describe('#exportHeader', () => {
    it('should work', () => {
      const worksheet = { addRow: vi.fn(), views: [], columns: null, lastRow: { number: 'last' } }
      const columns = [
        { column: { name: 'a', title: 'Column A' } },
        { column: { name: 'b', title: 'Column B' }, width: 200 },
      ]
      exportHeader?.(worksheet, columns)
      expect(worksheet.columns).toEqual([
        { key: 'a', width: 18.75 },
        { key: 'b', width: 25 },
      ])
      expect(worksheet.views).toEqual([{ state: 'frozen', ySplit: 'last' }])
      expect(worksheet.addRow).toHaveBeenCalledWith({ a: 'Column A', b: 'Column B' })
    })
  })

  describe('#findRanges', () => {
    const groupTree = {
      [ROOT_GROUP]: ['group1', 'group2'],
      group1: ['group1|nested1', 'group1|nested2'],
      'group1|nested1': [4, 10],
      'group1|nested2': [12, 15],
      group2: ['group2|nested1', 'group2|nested2'],
      'group2|nested1': [18, 23],
      'group2|nested2': [25, 30],
    }
    it('range for flat rows', () => {
      expect(findRanges?.({ [ROOT_GROUP]: [5, 20] }, ROOT_GROUP, 0, 0)).toEqual([[5, 20]])
    })
  })

  describe('#exportRows', () => {
    const dataColumns = ['a', 'b', 'c'].map((name) => ({ name, title: name }))
    const tableColumns = dataColumns.map((column) => ({ column }))
    const getCellValue = (row, name) => row[name]
    const isGroupRow = ({ groupedBy }) => !!groupedBy
    const cells = [{}, {}, {}]
    const closeGroup = vi.fn()
    const getCloseGroup = vi.fn(() => closeGroup)
    const customizeCell = vi.fn()
    const getCell = vi.fn()
    const eachCell = vi.fn().mockImplementation((cb) => cells.forEach((c, i) => cb(c, i + 1)))
    let worksheet
    beforeEach(() => {
      getCell.mockReturnValue({})
      worksheet = {
        addRow: vi.fn(),
        mergeCells: vi.fn(),
        lastRow: { number: 'last index', getCell, eachCell },
      }
    })
    it('data rows', () => {
      const rows = [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 },
      ]
      exportRows?.(
        worksheet,
        rows,
        dataColumns,
        tableColumns,
        isGroupRow,
        {},
        0,
        getCellValue,
        getCloseGroup,
        customizeCell
      )
      expect(worksheet.addRow).toHaveBeenCalledTimes(2)
      expect(customizeCell).toHaveBeenCalledTimes(6)
    })
  })

  describe('#closeSheet', () => {
    it('total summaries', () => {
      const worksheet = { addRow: vi.fn(), views: [], columns: null, lastRow: { number: 'last' } }
      const groupTree = {
        [ROOT_GROUP]: ['group1', 'group2'],
        group1: ['group1|nested1', 'group1|nested2'],
        'group1|nested1': [4, 10],
        'group1|nested2': [12, 15],
        group2: ['group2|nested1', 'group2|nested2'],
        'group2|nested1': [18, 23],
        'group2|nested2': [25, 30],
      }
      const exportSummary = vi.fn()
      const totalSummaryItems = [
        { columnName: 'a', type: 'sum' },
        { columnName: 'b', type: 'count' },
      ]
      closeSheet?.(worksheet, groupTree, 1, 3, totalSummaryItems, exportSummary)
      expect(exportSummary).toHaveBeenCalledTimes(2)
    })
  })

  describe('#normalizeRanges', () => {
    it('apply offset', () => {
      expect(
        normalizeRanges?.(
          [
            [0, 3],
            [10, 15],
          ],
          5
        )
      ).toEqual([
        [5, 8],
        [15, 20],
      ])
    })
  })

  describe('#removeEmptyGroups', () => {
    const grouping = [{ columnName: 'a' }, { columnName: 'b' }]
    const isGroupRow = (r) => !!r.groupedBy
    it('leave data rows', () => {
      const rows = [{ a: 1 }, { a: 2 }]
      expect(removeEmptyGroups?.(rows, undefined, isGroupRow)).toEqual(rows)
    })
  })
})
// Converted from: packages/dx-grid-core/src/plugins/grid-exporter/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it } from 'vitest'

describe('useGridExporter.helpers - converted legacy behavior', () => {
  it.todo('should format cell value for export')
  it.todo('should apply custom exporter callbacks')
})
