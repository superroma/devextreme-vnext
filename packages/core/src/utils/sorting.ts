import mergeSort from "./merge-sort.js";
import type { Sorting } from "../types/sorting.js";
import type { Row, GetCellValueFn } from "../types/grid.js";

export const defaultCompare = (a: any, b: any): number => {
  if (a === b) return 0;
  if (a === null) return b === undefined ? -1 : 1;
  if (a === undefined) return 1; // put undefined last
  if (b === null || b === undefined) return -1;
  return a < b ? -1 : 1;
};

export function createCompare(
  sorting: Sorting[],
  getColumnCompare:
    | ((name: string) => ((a: any, b: any) => number) | undefined)
    | undefined,
  getComparableValue: GetCellValueFn
) {
  return sorting.reduceRight<(a: Row, b: Row) => number>(
    (prev, s) => {
      const { columnName, direction } = s;
      const inverse = direction === "desc";
      const columnCompare =
        (getColumnCompare && getColumnCompare(columnName)) || defaultCompare;
      return (aRow, bRow) => {
        const a = getComparableValue(aRow, columnName);
        const b = getComparableValue(bRow, columnName);
        const result = columnCompare(a, b);
        if (result !== 0) return inverse ? -result : result;
        return prev(aRow, bRow);
      };
    },
    () => 0
  );
}

export function sortedRows(
  rows: Row[],
  sorting: Sorting[],
  getCellValue: GetCellValueFn,
  getColumnCompare?: (name: string) => ((a: any, b: any) => number) | undefined
): Row[] {
  if (!sorting.length || !rows.length) return rows;
  const compare = createCompare(sorting, getColumnCompare, getCellValue);
  return mergeSort(rows, compare as any);
}
