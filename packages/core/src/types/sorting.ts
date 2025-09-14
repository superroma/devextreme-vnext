export type SortingDirection = "asc" | "desc";

export interface Sorting {
  columnName: string;
  direction: SortingDirection;
}

export interface SortingColumnExtension {
  columnName: string;
  compare?: (a: any, b: any) => number;
  sortingEnabled?: boolean;
}
