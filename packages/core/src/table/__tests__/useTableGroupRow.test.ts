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
  it('tableColumnsWithGrouping: should not remove column when grouping', () => {
    const draftGrouping = [{ columnName: 'a' }]
    const expected = [
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
      { type: TABLE_DATA_TYPE, column: { name: 'c' }, draft: true },
      { type: TABLE_DATA_TYPE, column: { name: 'd' } },
    ]
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({
        columns,
        tableColumns,
        grouping,
        draftGrouping,
        groupColumnWidth: 123,
      })
    } catch (e) {
      hookResult = { tableColumnsWithGrouping: undefined }
    }
    expect(hookResult.tableColumnsWithGrouping).toEqual(expected)
  })
  it('tableColumnsWithGrouping: should add a draft column when ungrouping', () => {
    const draftGrouping = [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }]
    const expected = [
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
      { type: TABLE_DATA_TYPE, column: { name: 'b' }, draft: true },
      { type: TABLE_DATA_TYPE, column: { name: 'd' } },
    ]
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({
        columns,
        tableColumns,
        grouping,
        draftGrouping,
        groupColumnWidth: 123,
      })
    } catch (e) {
      hookResult = { tableColumnsWithGrouping: undefined }
    }
    expect(hookResult.tableColumnsWithGrouping).toEqual(expected)
  })
  it('tableColumnsWithGrouping: should not add a draft column when reordering groups', () => {
    const draftGrouping = [{ columnName: 'c' }, { columnName: 'a' }]
    const expected = expectedBase
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({
        columns,
        tableColumns,
        grouping,
        draftGrouping,
        groupColumnWidth: 123,
      })
    } catch (e) {
      hookResult = { tableColumnsWithGrouping: undefined }
    }
    expect(hookResult.tableColumnsWithGrouping).toEqual(expected)
  })
  it('tableColumnsWithGrouping: can keep grouped columns in table', () => {
    const keepColumnWhileGrouping = (columnName: string) => columnName === 'c'
    const expected = [
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
      { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      { type: TABLE_DATA_TYPE, column: { name: 'd' } },
    ]
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({
        columns,
        tableColumns,
        grouping,
        draftGrouping: grouping,
        groupColumnWidth: 123,
        keepColumnWhileGrouping,
      })
    } catch (e) {
      hookResult = { tableColumnsWithGrouping: undefined }
    }
    expect(hookResult.tableColumnsWithGrouping).toEqual(expected)
  })
  it('tableRowsWithGrouping: should convert table rows containing group data to group rows', () => {
    const tableRows = [
      { type: TABLE_DATA_TYPE, row: { group: true, groupedBy: 'a', compoundKey: 'B' } },
      { type: TABLE_DATA_TYPE, row: { id: 0 } },
      { type: TABLE_DATA_TYPE, row: { id: 1 } },
      { type: TABLE_DATA_TYPE, row: { id: 2 } },
    ]
    const expected = [
      {
        key: `${TABLE_GROUP_TYPE.toString()}_B`,
        type: TABLE_GROUP_TYPE,
        row: { group: true, groupedBy: 'a', compoundKey: 'B' },
      },
      { type: TABLE_DATA_TYPE, row: { id: 0 } },
      { type: TABLE_DATA_TYPE, row: { id: 1 } },
      { type: TABLE_DATA_TYPE, row: { id: 2 } },
    ]
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({ tableRows, isGroupRow: (r: any) => r.group })
    } catch (e) {
      hookResult = { tableRowsWithGrouping: undefined }
    }
    expect(hookResult.tableRowsWithGrouping).toEqual(expected)
  })
  it('tableGroupCellColSpanGetter: should return correct colspan', () => {
    const parentGetCellColSpan = () => 'original'
    const tableColumn = {
      type: TABLE_GROUP_TYPE,
      column: { name: 'a' },
      key: `${TABLE_GROUP_TYPE.toString()}_a`,
    }
    const scenarios = [
      { tableColumns: [tableColumn, {}, {}] },
      { tableColumns: [{}, tableColumn, {}] },
      { tableColumns: [{}, {}, tableColumn] },
      {
        tableColumns: [{}, tableColumn, {}],
        tableRow: { type: TABLE_GROUP_TYPE, row: { groupedBy: 'b' } },
      },
      {
        tableColumns: [{}, tableColumn, {}],
        tableRow: { type: Symbol('undefined'), row: {} },
        expect: 'original',
      },
    ]
    scenarios.forEach((s) => {
      let hookResult: any
      try {
        hookResult = (useTableGroupRow as any)({
          parentGetCellColSpan,
          groupSummaryItems: [],
          ...s,
          tableRow: s.tableRow || { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
        })
      } catch (e) {
        hookResult = { tableGroupCellColSpanGetter: () => undefined }
      }
      const getter = hookResult.tableGroupCellColSpanGetter || (() => undefined)
      const expected = s.expect || 3
      expect(
        getter({
          tableColumn,
          tableRow: s.tableRow || { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
          tableColumns: s.tableColumns,
        })
      ).toBe(expected)
    })
  })
  it('tableGroupCellColSpanGetter: Virtual Table scenarios', () => {
    const parentGetCellColSpan = () => 'original'
    const tableColumn = {
      type: TABLE_GROUP_TYPE,
      column: { name: 'a' },
      key: `${TABLE_GROUP_TYPE.toString()}_a`,
    }
    ;[0, 1, 2].forEach((firstVisibleColumnIndex) => {
      const sets: any[] = [
        [tableColumn, {} as any, {} as any],
        [{} as any, tableColumn, {} as any],
        [{} as any, {} as any, tableColumn],
      ]
      sets.forEach((tableColumnsSet) => {
        let hookResult: any
        try {
          hookResult = (useTableGroupRow as any)({
            parentGetCellColSpan,
            groupSummaryItems: [],
            firstVisibleColumnIndex,
          })
        } catch (e) {
          hookResult = { tableGroupCellColSpanGetter: () => undefined }
        }
        const getter = hookResult.tableGroupCellColSpanGetter || (() => undefined)
        const expected =
          tableColumnsSet.length -
          Math.min(
            firstVisibleColumnIndex,
            tableColumnsSet.findIndex((c: any) => c.type === TABLE_GROUP_TYPE)
          )
        expect(
          getter({
            tableColumn,
            tableRow: { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } },
            tableColumns: tableColumnsSet,
          })
        ).toBe(expected)
      })
    })
  })
  it('tableGroupCellColSpanGetter: few columns different types', () => {
    const parentGetCellColSpan = () => 'original'
    const tableDataColumn = { column: { name: 'a' }, key: `${TABLE_DATA_TYPE.toString()}_a` }
    const tableGroupColumn = {
      type: TABLE_GROUP_TYPE,
      column: { name: 'a' },
      key: `${TABLE_GROUP_TYPE.toString()}_a`,
    }
    const tableRow = { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } }
    const tableColumnsLocal = [tableGroupColumn, tableDataColumn, {}]
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({ parentGetCellColSpan })
    } catch (e) {
      hookResult = { tableGroupCellColSpanGetter: () => undefined }
    }
    const getter = hookResult.tableGroupCellColSpanGetter || (() => undefined)
    expect(
      getter({ tableColumn: tableDataColumn, tableRow, tableColumns: tableColumnsLocal })
    ).toBe('original')
    expect(
      getter({ tableColumn: tableGroupColumn, tableRow, tableColumns: tableColumnsLocal })
    ).toBe(3)
  })
  it('tableGroupCellColSpanGetter: grouped several columns', () => {
    const parentGetCellColSpan = () => 'original'
    const tableRow = { type: TABLE_GROUP_TYPE, row: { groupedBy: 'c' } }
    const tableColumnsLocal = [
      { type: TABLE_GROUP_TYPE, column: { name: 'a' }, key: `${TABLE_GROUP_TYPE.toString()}_a` },
      { type: TABLE_GROUP_TYPE, column: { name: 'c' }, key: `${TABLE_GROUP_TYPE.toString()}_c` },
      { column: { name: 'a' }, key: `${TABLE_DATA_TYPE.toString()}_a` },
      { column: { name: 'b' }, key: `${TABLE_DATA_TYPE.toString()}_b` },
      { column: { name: 'c' }, key: `${TABLE_DATA_TYPE.toString()}_c` },
      { column: { name: 'd' }, key: `${TABLE_DATA_TYPE.toString()}_d` },
    ]
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({ parentGetCellColSpan })
    } catch (e) {
      hookResult = { tableGroupCellColSpanGetter: () => undefined }
    }
    const getter = hookResult.tableGroupCellColSpanGetter || (() => undefined)
    expect(
      tableColumnsLocal.map((tableColumn) =>
        getter({ tableColumn, tableRow, tableColumns: tableColumnsLocal })
      )
    ).toEqual([1, 5, 'original', 'original', 'original', 'original'])
  })
  it('tableGroupCellColSpanGetter: grouped and columns same name', () => {
    const parentGetCellColSpan = () => 'original'
    const tableRow = { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } }
    const tableColumnsLocal = [
      { type: TABLE_GROUP_TYPE, column: { name: 'a' }, key: `${TABLE_GROUP_TYPE.toString()}_a` },
      { column: { name: 'a' }, key: `${TABLE_DATA_TYPE.toString()}_a` },
      { column: { name: 'b' }, key: `${TABLE_DATA_TYPE.toString()}_b` },
      { column: { name: 'c' }, key: `${TABLE_DATA_TYPE.toString()}_c` },
      { column: { name: 'a' }, key: `${TABLE_DATA_TYPE.toString()}_a` },
      { column: { name: 'd' }, key: `${TABLE_DATA_TYPE.toString()}_d` },
    ]
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({ parentGetCellColSpan })
    } catch (e) {
      hookResult = { tableGroupCellColSpanGetter: () => undefined }
    }
    const getter = hookResult.tableGroupCellColSpanGetter || (() => undefined)
    expect(
      tableColumnsLocal.map((tableColumn) =>
        getter({ tableColumn, tableRow, tableColumns: tableColumnsLocal })
      )
    ).toEqual([6, 'original', 'original', 'original', 'original', 'original'])
  })
  it('tableGroupCellColSpanGetter: with summary', () => {
    const parentGetCellColSpan = () => 'original'
    const tableColumnsLocal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((name) => ({
      column: { name },
      key: `type_${name}`,
    }))
    const groupSummaryItems = [
      { columnName: 'b', type: 'sum', showInGroupFooter: false, alignByColumn: true },
      { columnName: 'd', type: 'sum', showInGroupFooter: false },
      { columnName: 'e', type: 'sum', showInGroupFooter: false, alignByColumn: true },
    ]
    let hookResult: any
    try {
      hookResult = (useTableGroupRow as any)({ parentGetCellColSpan, groupSummaryItems })
    } catch (e) {
      hookResult = { tableGroupCellColSpanGetter: () => undefined }
    }
    const getter = hookResult.tableGroupCellColSpanGetter || (() => undefined)
    const tableRow = { type: TABLE_GROUP_TYPE, row: { groupedBy: 'a' } }
    expect(
      tableColumnsLocal.map((tableColumn) =>
        getter({ tableColumn, tableRow, tableColumns: tableColumnsLocal })
      )
    ).toEqual([1, 1, 2, 'original', 1, 3, 'original', 'original'])
  })
})
