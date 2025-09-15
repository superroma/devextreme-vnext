// Converted from: packages/dx-grid-core/src/plugins/table-band-header/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: table-band-header/helpers.test.ts (partial basic parity set)
import {
  isNoDataColumn,
  isBandedTableRow,
  isBandedOrHeaderRow,
  getColumnMeta,
} from '../internal/table-band-header.helpers'
import { TABLE_BAND_TYPE } from '../internal/table-band-header.constants'
import { TABLE_DATA_TYPE } from '../internal/table.constants'
import { TABLE_HEADING_TYPE } from '../internal/table-header-row.constants'

describe('useTableBandHeader.helpers - converted legacy behavior', () => {
  const columnBands = [
    {
      title: 'Band A',
      children: [
        { title: 'Band B', children: [{ columnName: 'a' }, { columnName: 'b' }] },
        { columnName: 'd' },
        { title: 'Band B', children: [{ columnName: 'c' }] },
      ],
    },
    { title: 'Band C', children: [{ columnName: 'e' }] },
  ]

  describe('#isNoDataColumn', () => {
    it('should work with not data column', () => {
      expect(isNoDataColumn('editCommand' as any)).toBeTruthy()
    })
    it('should work with data column', () => {
      expect(isNoDataColumn(TABLE_DATA_TYPE as any)).toBeFalsy()
    })
  })

  describe('#isBandedOrHeaderRow', () => {
    it('should work', () => {
      expect(isBandedOrHeaderRow({ type: TABLE_BAND_TYPE } as any)).toBeTruthy()
      expect(isBandedOrHeaderRow({ type: TABLE_HEADING_TYPE } as any)).toBeTruthy()
      expect(isBandedOrHeaderRow({ type: TABLE_DATA_TYPE } as any)).toBeFalsy()
    })
  })

  describe('#isBandedTableRow', () => {
    it('should work', () => {
      expect(isBandedTableRow({ type: TABLE_BAND_TYPE } as any)).toBeTruthy()
      expect(isBandedTableRow({} as any)).toBeFalsy()
    })
  })

  describe('#getColumnMeta', () => {
    it('should return correct column meta for the first level children', () => {
      expect(getColumnMeta('d', columnBands as any, 1)).toEqual({
        title: 'Band A',
        level: 1,
        key: '_Band A',
      })
    })
    it('should return correct column meta for the deeper children levels', () => {
      expect(getColumnMeta('a', columnBands as any, 2)).toEqual({
        title: 'Band B',
        level: 2,
        key: '_Band A_Band B',
      })
    })
  })
})
