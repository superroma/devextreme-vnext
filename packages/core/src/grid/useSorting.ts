import { useCallback, useMemo, useState } from "react";
import { sortedRows } from "../utils/sorting.js";
import type { Sorting, SortingColumnExtension } from "../types/sorting.js";
import type { Row } from "../types/grid.js";

export interface UseSortingOptions<T> {
  sorting?: Sorting[]; // controlled
  onSortingChange?: (sorting: Sorting[]) => void;
  defaultSorting?: Sorting[]; // uncontrolled initial
  columnExtensions?: SortingColumnExtension[];
}

export function useSorting<T extends Row>(
  data: T[],
  options: UseSortingOptions<T> = {}
) {
  const {
    sorting: controlledSorting,
    onSortingChange,
    defaultSorting = [],
    columnExtensions = [],
  } = options;

  const [uncontrolled, setUncontrolled] = useState<Sorting[]>(defaultSorting);
  const isControlled = controlledSorting !== undefined;
  const effectiveSorting = isControlled ? controlledSorting! : uncontrolled;

  const getColumnCompare = useCallback(
    (name: string) =>
      columnExtensions.find((c) => c.columnName === name)?.compare,
    [columnExtensions]
  );

  const getCellValue = useCallback(
    (row: any, columnName: string) =>
      row == null ? undefined : row[columnName],
    []
  );

  const sortedData = useMemo(() => {
    if (!effectiveSorting.length) return data; // preserve reference per legacy
    return sortedRows(
      data,
      effectiveSorting,
      getCellValue,
      getColumnCompare
    ) as T[];
  }, [data, effectiveSorting, getCellValue, getColumnCompare]);

  const setSorting = useCallback(
    (next: Sorting[]) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onSortingChange?.(next);
    },
    [isControlled, onSortingChange]
  );

  return { sortedData, sorting: effectiveSorting, setSorting } as const;
}
