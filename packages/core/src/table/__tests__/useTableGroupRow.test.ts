// Converted from: packages/dx-grid-core/src/plugins/table-group-row/computeds.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'
import { useTableGroupRow } from '../useTableGroupRow.js'

const TABLE_GROUP_TYPE: any = Symbol('TABLE_GROUP_TYPE')
const TABLE_DATA_TYPE: any = Symbol('TABLE_DATA_TYPE')

const tableColumns = [
  { type: 'undefined', column: { name: 'a' } },
  { type: TABLE_DATA_TYPE, column: { name: 'a' } },
  { type: TABLE_DATA_TYPE, column: { name: 'b' } },
  { type: TABLE_DATA_TYPE, column: { name: 'c' } },
  { type: TABLE_DATA_TYPE, column: { name: 'd' } },
]
const grouping = [{ columnName: 'a' }, { columnName: 'c' }]
const columns = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }]

const expectedBase = [
  {
    key: `${TABLE_GROUP_TYPE.toString()}_a`,
    type: TABLE_GROUP_TYPE,
    column: { name: 'a' },
    width: 123,
  },
  {
    key: `${TABLE_GROUP_TYPE.toString()}_c`,
    type: TABLE_GROUP_TYPE,
    column: { name: 'c' },
    width: 123,
  },
  { type: 'undefined', column: { name: 'a' } },
  { type: TABLE_DATA_TYPE, column: { name: 'b' } },
  { type: TABLE_DATA_TYPE, column: { name: 'd' } },
]

describe('useTableGroupRow - converted legacy behavior', () => {
  it('tableColumnsWithGrouping: should work', () => {
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({
        columns,
        tableColumns,
        grouping,
        draftGrouping: grouping,
        groupColumnWidth: 123,
      })
    } catch (e) {
      hookResult = { tableColumnsWithGrouping: undefined }
    }
    expect(hookResult.tableColumnsWithGrouping).toEqual(expectedBase)
  })
  it.todo('should render group row with summary')
  it.todo('should collapse/expand group rows')
})
