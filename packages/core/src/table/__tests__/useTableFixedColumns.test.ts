// Converted from: packages/dx-grid-core/src/plugins/table-fixed-columns/computeds.test.ts
// Phase: RED (Step 08) – 1:1 legacy mapping; hook & helpers not implemented yet.
import { describe, it, expect } from 'vitest'
// Intentionally importing (non-existent yet) future hook/exports to keep RED state.
// These modules will be implemented in later GREEN phase.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTableFixedColumns } from '../useTableFixedColumns.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  FIXED_COLUMN_LEFT_SIDE,
  FIXED_COLUMN_RIGHT_SIDE,
  TABLE_FIXED_TYPE,
} from '../internal/tableFixedColumns.constants.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  tableColumnsWithFixed,
  tableHeaderRowsWithFixed,
  tableHeaderColumnChainsWithFixed,
} from '../internal/tableFixedColumns.computeds.js'

// Legacy test data & helpers copied verbatim (light adjustments: path & import names)
const TABLE_DATA_TYPE: any = Symbol('data')
// Helper replicating legacy expandChainsCore used only inside tests
const expandChainsCore = (compressedChains: any, expandColumn: any) =>
  (compressedChains || []).map((rowChains: any) => {
    let start = 0
    return rowChains.map((chainColumns: any) => {
      const chain = { start, columns: chainColumns.map((col: any) => expandColumn(col)) }
      start += chainColumns.length
      return chain
    })
  })

describe('TableFixedColumns computeds (useTableFixedColumns hook placeholder)', () => {
  describe('#tableColumnsWithFixed', () => {
    it('should mark fixed table column', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: 'type1' },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: 'type2' },
        { type: 'type3' },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ]
      // Expectation copied; runtime will fail until real computeds implemented
      expect(tableColumnsWithFixed!(tableColumns as any, ['a', 'type1'], ['d', 'type3'])).toEqual([
        { type: TABLE_DATA_TYPE, column: { name: 'a' }, fixed: FIXED_COLUMN_LEFT_SIDE },
        { type: 'type1', fixed: FIXED_COLUMN_LEFT_SIDE },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: 'type2' },
        { type: 'type3', fixed: FIXED_COLUMN_RIGHT_SIDE },
        { type: TABLE_DATA_TYPE, column: { name: 'd' }, fixed: FIXED_COLUMN_RIGHT_SIDE },
      ])
    })
  })

  describe('#tableHeaderRowsWithFixed', () => {
    it('should work', () => {
      expect(tableHeaderRowsWithFixed!([{} as any])).toEqual([
        {},
        { key: TABLE_FIXED_TYPE.toString(), type: TABLE_FIXED_TYPE, height: 0 },
      ])
    })
  })

  describe('#tableHeaderColumnChainsWithFixed', () => {
    const columns = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }]
    const rows = [{}, {}]
    const expandChains = (rowChains: any) =>
      rowChains && expandChainsCore(rowChains, (col: any) => ({ key: col }))

    const assertRowsChainsSplit = (
      tableColumns: any,
      existingCompressedChains: any,
      expectedCompressedChains: any
    ) => {
      const existingChains = expandChains(existingCompressedChains)
      const expectedChains = expandChains(expectedCompressedChains)
      const result = tableHeaderColumnChainsWithFixed!(existingChains, rows as any, tableColumns)
      expect(result).toMatchObject(expectedChains)
    }

    it('should initialize chains if none provided', () => {
      const tableColumns = [{ key: 'fl', fixed: 'left' }, ...columns.slice(0, 3)]
      assertRowsChainsSplit(tableColumns, undefined, [
        [['fl'], ['a', 'b', 'c']],
        [['fl'], ['a', 'b', 'c']],
      ])
    })

    it('should split single fixed columns at boundaries', () => {
      const tableColumns = [
        { key: 'fl', fixed: 'left' },
        ...columns.slice(0, 3),
        { key: 'fr', fixed: 'right' },
      ]
      assertRowsChainsSplit(
        tableColumns,
        [[['fl', 'a', 'b', 'c', 'fr']]],
        [[['fl'], ['a', 'b', 'c'], ['fr']]]
      )
    })

    it('should group multiple fixed columns at boundaries', () => {
      const tableColumns = [
        { key: 'fl_0', fixed: 'left' },
        { key: 'fl_1', fixed: 'left' },
        ...columns.slice(0, 3),
        { key: 'fr_0', fixed: 'right' },
        { key: 'fr_1', fixed: 'right' },
      ]
      assertRowsChainsSplit(
        tableColumns,
        [[['fl_0', 'fl_1', 'a', 'b', 'c', 'fr_0', 'fr_1']]],
        [
          [
            ['fl_0', 'fl_1'],
            ['a', 'b', 'c'],
            ['fr_0', 'fr_1'],
          ],
        ]
      )
    })

    it('should split single column in the middle', () => {
      const tableColumns = [
        ...columns.slice(0, 3),
        { key: 'f0', fixed: 'left' },
        ...columns.slice(3, 5),
      ]
      assertRowsChainsSplit(
        tableColumns,
        [[['a', 'b', 'c', 'f0', 'd', 'e']]],
        [[['a', 'b', 'c'], ['f0'], ['d', 'e']]]
      )
    })

    it('should group multiple columns in the middle', () => {
      const tableColumns = [
        ...columns.slice(0, 2),
        { key: 'f0', fixed: 'left' },
        { key: 'f1', fixed: 'left' },
        ...columns.slice(3, 5),
      ]
      assertRowsChainsSplit(
        tableColumns,
        [[['a', 'b', 'f0', 'f1', 'd', 'e']]],
        [
          [
            ['a', 'b'],
            ['f0', 'f1'],
            ['d', 'e'],
          ],
        ]
      )
    })

    it('should split columns with different fixed side', () => {
      const tableColumns = [
        ...columns.slice(0, 2),
        { key: 'fl_0', fixed: 'left' },
        { key: 'fl_1', fixed: 'left' },
        { key: 'fr_0', fixed: 'right' },
        ...columns.slice(3, 5),
      ]
      assertRowsChainsSplit(
        tableColumns,
        [[['a', 'b', 'fl_0', 'fl_1', 'fr_0', 'd', 'e']]],
        [[['a', 'b'], ['fl_0', 'fl_1'], ['fr_0'], ['d', 'e']]]
      )
    })

    it('should split multiple rows', () => {
      const tableColumns = [
        { key: 'f0', fixed: 'left' },
        ...columns.slice(0, 3),
        { key: 'f1', fixed: 'left' },
        { key: 'f2', fixed: 'left' },
        ...columns.slice(3, 5),
      ]
      assertRowsChainsSplit(
        tableColumns,
        [
          [
            ['f0', 'a', 'b', 'c'],
            ['f1', 'f2', 'd', 'e'],
          ],
          [
            ['f0', 'a'],
            ['b', 'c', 'f1'],
            ['f2', 'd', 'e'],
          ],
        ],
        [
          [['f0'], ['a', 'b', 'c'], ['f1', 'f2'], ['d', 'e']],
          [['f0'], ['a'], ['b', 'c'], ['f1'], ['f2'], ['d', 'e']],
        ]
      )
    })
  })
})
