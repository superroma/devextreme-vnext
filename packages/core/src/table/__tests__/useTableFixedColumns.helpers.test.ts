// Converted from: packages/dx-grid-core/src/plugins/table-fixed-columns/helpers.test.ts
// Phase: RED (Step 08) – legacy parity; importing placeholder modules (not yet implemented)
import { describe, it, expect } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  getFixedColumnKeys,
  isFixedTableRow,
  calculateFixedColumnProps,
} from '../internal/tableFixedColumns.helpers.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { tableHeaderColumnChainsWithFixed } from '../internal/tableFixedColumns.computeds.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TABLE_DATA_TYPE } from '../useTable.constants.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  FIXED_COLUMN_LEFT_SIDE,
  FIXED_COLUMN_RIGHT_SIDE,
  TABLE_FIXED_TYPE,
} from '../internal/tableFixedColumns.constants.js'

// Recreate minimal constants for test expectations if real constants missing at runtime
// (Tests will still fail on missing imports until implementation phase.)
// @ts-ignore
const _TABLE_DATA_TYPE = TABLE_DATA_TYPE || Symbol('data')

describe('TableFixedColumns Plugin helpers (useTableFixedColumns.helpers placeholder)', () => {
  const sampleType: any = Symbol('sample')
  const createColumn = (name: string, fixed?: any) => ({
    key: `key_${name}`,
    type: _TABLE_DATA_TYPE,
    column: { name },
    ...(fixed ? { fixed } : {}),
  })
  const tableColumns: any[] = [
    createColumn('a', FIXED_COLUMN_LEFT_SIDE),
    createColumn('b', FIXED_COLUMN_LEFT_SIDE),
    { key: 'key_type1', type: sampleType },
    createColumn('c', FIXED_COLUMN_RIGHT_SIDE),
    createColumn('d', FIXED_COLUMN_RIGHT_SIDE),
  ]
  const tableColumnDimensions: any = {
    key_a: 20,
    key_b: 30,
    key_type1: 40,
    key_c: 70,
    key_d: 150,
  }
  // Simulated chains placeholder; real function call kept for parity.
  const columnChains: any = tableHeaderColumnChainsWithFixed!(
    [[{ start: 0, columns: tableColumns }]] as any,
    {},
    tableColumns
  )

  describe('#getFixedColumnKeys', () => {
    it('should return the correct array of column keys', () => {
      const fixedNames = ['a', 'd', sampleType]
      expect(getFixedColumnKeys!(tableColumns as any, fixedNames)).toEqual([
        'key_a',
        'key_type1',
        'key_d',
      ])
    })
  })

  describe('#isFixedTableRow', () => {
    it('should work', () => {
      expect(isFixedTableRow!({ type: TABLE_FIXED_TYPE })).toBeTruthy()
      expect(isFixedTableRow!({ type: 'undefined' })).toBeFalsy()
    })
  })

  describe('#calculateFixedColumnProps', () => {
    describe('position', () => {
      const calculatePosition = (fixedColumns: any, column: any) => {
        const { position } = calculateFixedColumnProps!(
          { tableColumn: column },
          fixedColumns,
          tableColumns,
          tableColumnDimensions,
          columnChains
        )
        return position
      }
      const findColumnByName = (name: string) =>
        tableColumns.find((c) => c.column && c.column.name === name)

      it('should calculate position of columns fixed at the right side', () => {
        const fixedColumns = { leftColumns: ['a'], rightColumns: ['c', 'd'] }
        expect(calculatePosition(fixedColumns, findColumnByName('c'))).toBe(150)
        expect(calculatePosition(fixedColumns, findColumnByName('d'))).toBe(0)
      })

      it('should calculate position of columns fixed at the left side', () => {
        const fixedColumns = { leftColumns: ['a', 'b'], rightColumns: ['c'] }
        expect(calculatePosition(fixedColumns, findColumnByName('a'))).toBe(0)
        expect(calculatePosition(fixedColumns, findColumnByName('b'))).toBe(20)
      })
    })

    describe('dividers visibility', () => {
      const extendedTableColumns: any[] = [
        createColumn('a', FIXED_COLUMN_LEFT_SIDE),
        createColumn('col0'),
        createColumn('b0', FIXED_COLUMN_LEFT_SIDE),
        createColumn('b1', FIXED_COLUMN_LEFT_SIDE),
        createColumn('b2', FIXED_COLUMN_LEFT_SIDE),
        createColumn('col1'),
        createColumn('c', FIXED_COLUMN_LEFT_SIDE),
        createColumn('col2'),
        createColumn('d', FIXED_COLUMN_RIGHT_SIDE),
        createColumn('col2'),
        createColumn('e0', FIXED_COLUMN_RIGHT_SIDE),
        createColumn('e1', FIXED_COLUMN_RIGHT_SIDE),
        createColumn('e2', FIXED_COLUMN_RIGHT_SIDE),
        createColumn('col3'),
        createColumn('f', FIXED_COLUMN_RIGHT_SIDE),
      ]
      const findColumnByName = (name: string) =>
        extendedTableColumns.find((c) => c.column && c.column.name === name)
      const extendedColumnChains: any = tableHeaderColumnChainsWithFixed!(
        [[{ start: 0, columns: extendedTableColumns }]] as any,
        {},
        extendedTableColumns
      )
      const calculateDividers = (column: any) =>
        calculateFixedColumnProps!(
          { tableColumn: column },
          { leftColumns: ['a', 'b0', 'b1', 'b2', 'c'], rightColumns: ['d', 'e0', 'e1', 'e2', 'f'] },
          extendedTableColumns,
          {},
          extendedColumnChains
        )

      it('should be visible for standalone left column', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('c'))
        expect(showLeftDivider).toBeTruthy()
        expect(showRightDivider).toBeTruthy()
      })
      it('should be visible for standalone right column', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('d'))
        expect(showLeftDivider).toBeTruthy()
        expect(showRightDivider).toBeTruthy()
      })
      it('should show only right divider for standalone leftmost column', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('a'))
        expect(showLeftDivider).toBeFalsy()
        expect(showRightDivider).toBeTruthy()
      })
      it('should show only left divider for standalone rightmost column', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('f'))
        expect(showLeftDivider).toBeTruthy()
        expect(showRightDivider).toBeFalsy()
      })
      it('should show only left divider for first left column in a group', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('b0'))
        expect(showLeftDivider).toBeTruthy()
        expect(showRightDivider).toBeFalsy()
      })
      it('should show only right divider for first right column in a group', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('e2'))
        expect(showLeftDivider).toBeFalsy()
        expect(showRightDivider).toBeTruthy()
      })
      it('should not be visible for consecutive left columns', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('b1'))
        expect(showLeftDivider).toBeFalsy()
        expect(showRightDivider).toBeFalsy()
      })
      it('should not be visible for consecutive right columns', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('e1'))
        expect(showLeftDivider).toBeFalsy()
        expect(showRightDivider).toBeFalsy()
      })
    })
  })
})
