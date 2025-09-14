import { SortingColumnExtension } from "../types/sorting";

// Returns a map from columnName to extension object for quick lookup.
export function mapColumnExtensions(
  extensions: SortingColumnExtension[] | undefined
) {
  if (!extensions || !extensions.length)
    return new Map<string, SortingColumnExtension>();
  return new Map(extensions.map((e) => [e.columnName, e] as const));
}

export function getColumnCompare(
  extensions: SortingColumnExtension[] | undefined
): ((name: string) => ((a: any, b: any) => number) | undefined) | undefined {
  if (!extensions || !extensions.length) return undefined;
  const map = mapColumnExtensions(extensions);
  return (name: string) => map.get(name)?.compare;
}
