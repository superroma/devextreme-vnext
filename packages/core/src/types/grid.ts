export type Row = any // Placeholder; refine later as generic
export type RowId = number | string

export type GetCellValueFn = (row: Row, columnName: string) => any

export interface Column {
  name: string
  title?: string
  getCellValue?: GetCellValueFn
}
