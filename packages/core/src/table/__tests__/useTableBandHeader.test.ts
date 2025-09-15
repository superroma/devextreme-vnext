// Converted from: packages/dx-grid-core/src/plugins/table-band-header/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: table-band-header/computeds.test.ts
import {
  tableRowsWithBands,
  tableHeaderColumnChainsWithBands,
  columnBandLevels,
  bandLevelsVisibility,
} from '../internal/table-band-header.computeds'
import { TABLE_BAND_TYPE } from '../internal/table-band-header.constants'
import { TABLE_DATA_TYPE } from '../internal/table.constants'
import { TABLE_GROUP_TYPE } from '../internal/table-group-row.constants'

// Helpers re-created locally for compressed chain assertions mirroring legacy test utils
const expandChainsCore = (rowChains: any[][][], getCol: (n: string) => any) =>
  rowChains.map((chains) => chains.map((cols) => ({ start: 0, columns: cols.map(getCol) })))

describe('useTableBandHeader - converted legacy behavior', () => {
  describe('#tableRowsWithBands', () => {
    const tableHeaderRows: any[] = [{}]
    it('should add zero band row if one nested level', () => {
      const columnBands = [{ title: 'title-a' }]
      const tableColumns = [{ type: TABLE_DATA_TYPE, column: { columnName: 'b' } }]
      const rows = tableRowsWithBands(
        tableHeaderRows as any,
        columnBands as any,
        tableColumns as any
      )
      expect(rows).toEqual([{}])
    })
    it('should add one band row if two nested levels', () => {
      const columnBands = [
        { title: 'title-a', children: [{ columnName: 'a' }, { columnName: 'b' }] },
      ]
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ]
      const rows = tableRowsWithBands(
        tableHeaderRows as any,
        columnBands as any,
        tableColumns as any
      )
      expect(rows).toEqual([
        { key: `${String(TABLE_BAND_TYPE)}_0`, type: TABLE_BAND_TYPE, level: 0 },
        {},
      ])
    })
    it('should add one band row if one nested level is hidden', () => {
      const columnBands = [
        {
          title: 'title-a',
          children: [
            { columnName: 'a' },
            { columnName: 'b' },
            { title: 'title-b', children: [{ columnName: 'd' }, { columnName: 'e' }] },
          ],
        },
        { columnName: 'c' },
      ]
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ]
      const rows = tableRowsWithBands(
        tableHeaderRows as any,
        columnBands as any,
        tableColumns as any
      )
      expect(rows).toEqual([
        { key: `${String(TABLE_BAND_TYPE)}_0`, type: TABLE_BAND_TYPE, level: 0 },
        {},
      ])
    })
  })

  describe('#tableHeaderColumnChainsWithBands', () => {
    const simpleColumns = 'a b c d e f g h i'
      .split(' ')
      .map((name) => ({ column: { name }, key: name, type: TABLE_DATA_TYPE }))
    const groupedColumns = 'a b c d e'
      .split(' ')
      .map((name, index) =>
        index < 2
          ? { column: { name }, key: name, type: TABLE_GROUP_TYPE }
          : { column: { name }, key: name, type: TABLE_DATA_TYPE }
      )
    const expandChains = (compressed: any) =>
      compressed && expandChainsCore(compressed, (n: string) => ({ column: { name: n } }))
    const compressChains = (chains: any) =>
      chains.map((row: any) =>
        row.map((chain: any) => chain.columns.map((c: any) => c.column.name))
      )
    const assertChainsSplit = (
      rows: any,
      columnBands: any,
      expectedCompressed: any,
      columns: any
    ) => {
      const expectedChains = expandChains(expectedCompressed)
      const result = tableHeaderColumnChainsWithBands(rows, columns, columnBands)
      const collapsed = compressChains(result)
      expect(collapsed).toMatchObject(expectedCompressed)
      expect(result).toMatchObject(expectedChains)
    }

    it('should split columns to band chains', () => {
      const bands = [
        {
          title: 'band A-0',
          children: [
            { columnName: 'a' },
            { columnName: 'b' },
            { columnName: 'c' },
            { title: 'Band B-0', children: [{ columnName: 'c' }, { columnName: 'd' }] },
            {
              title: 'Band B-1',
              children: [
                { columnName: 'e' },
                { columnName: 'f' },
                { title: 'Band C-0', children: [{ columnName: 'f' }] },
              ],
            },
          ],
        },
        { title: 'band A-1', children: [{ columnName: 'h' }] },
      ]
      const rows = [
        { key: 'band_0', type: TABLE_BAND_TYPE, level: 0 },
        { key: 'band_1', type: TABLE_BAND_TYPE, level: 1 },
        { key: 'band_2', type: TABLE_BAND_TYPE, level: 2 },
        { key: 'heading', type: 'heading' },
      ]
      assertChainsSplit(
        rows,
        bands,
        [
          [['a', 'b', 'c', 'd', 'e', 'f'], ['g'], ['h'], ['i']],
          [['a', 'b'], ['c', 'd'], ['e', 'f'], ['g'], ['h'], ['i']],
          [['a', 'b'], ['c', 'd'], ['e'], ['f'], ['g'], ['h'], ['i']],
          [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']],
        ],
        simpleColumns
      )
    })

    it('should split columns if adjust bands have the same title but different parents', () => {
      const adjacentBands = [
        {
          title: 'parent1',
          children: [{ title: 'sharedName', children: [{ columnName: 'a' }, { columnName: 'b' }] }],
        },
        {
          title: 'parent2',
          children: [{ title: 'sharedName', children: [{ columnName: 'c' }, { columnName: 'd' }] }],
        },
      ]
      const rows = [
        { key: 'band_0', type: TABLE_BAND_TYPE, level: 0 },
        { key: 'band_1', type: TABLE_BAND_TYPE, level: 1 },
        { key: 'heading', type: 'heading' },
      ]
      assertChainsSplit(
        rows,
        adjacentBands,
        [
          [
            ['a', 'b'],
            ['c', 'd'],
            ['e', 'f', 'g', 'h', 'i'],
          ],
          [
            ['a', 'b'],
            ['c', 'd'],
            ['e', 'f', 'g', 'h', 'i'],
          ],
          [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']],
        ],
        simpleColumns
      )
    })

    it('should split columns to band chains for grouped columns', () => {
      const bands = [
        { title: 'band C-0', children: [{ columnName: 'c' }, { columnName: 'b' }] },
        { title: 'band D-0', children: [{ columnName: 'd' }, { columnName: 'e' }] },
      ]
      const rows = [
        { key: 'band_0', type: TABLE_BAND_TYPE, level: 0 },
        { key: 'heading', type: 'heading' },
      ]
      assertChainsSplit(
        rows,
        bands,
        [[['a'], ['b'], ['c'], ['d', 'e']], [['a', 'b', 'c', 'd', 'e']]],
        groupedColumns
      )
    })
  })

  describe('#columnBandLevels', () => {
    it('should in simple case', () => {
      const bands = [
        { title: 'Band0', children: [{ columnName: 'a' }] },
        { title: 'Band1', children: [{ columnName: 'b' }] },
      ]
      expect(columnBandLevels(bands as any)).toEqual({ Band0: 0, Band1: 0 })
    })
    it('should work with nested bands', () => {
      const bands = [
        {
          title: 'Band0',
          children: [
            { title: 'Band1', children: [{ title: 'Band2', children: [{ columnName: 'a' }] }] },
          ],
        },
      ]
      expect(columnBandLevels(bands as any)).toEqual({ Band0: 0, Band1: 1, Band2: 2 })
    })
  })

  describe('#bandLevelsVisibility', () => {
    it('should work when all columns are visible', () => {
      const columnVisibleIntervals = [[0, 4]]
      const headerColumnChains = Array.from({ length: 3 }) // placeholder as structure validated by logic usage
      const bandLevels = { Band0: 0, Band1: 1 }
      expect(
        bandLevelsVisibility(
          columnVisibleIntervals as any,
          headerColumnChains as any,
          bandLevels as any
        )
      ).toEqual([true, true])
    })
  })
})
