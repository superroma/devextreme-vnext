// Stable merge sort (ported & simplified from legacy dx-grid-core)
export type CompareFn<T = any> = (a: T, b: T) => number

export function mergeSort<T>(
  input: ReadonlyArray<T>,
  compare: CompareFn<T> = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  const array = input.slice()
  const aux = input.slice()

  const merge = (lo: number, mid: number, hi: number) => {
    let i = lo
    let j = mid + 1
    for (let k = lo; k <= hi; k++) {
      // Exhaust left side
      if (i > mid) {
        array[k] = aux[j++]
        // Exhaust right side
      } else if (j > hi) {
        array[k] = aux[i++]
      } else if (compare(aux[i], aux[j]) <= 0) {
        array[k] = aux[i++]
      } else {
        array[k] = aux[j++]
      }
    }
  }

  const sort = (lo: number, hi: number) => {
    if (hi <= lo) return
    const mid = Math.floor(lo + (hi - lo) / 2)
    sort(lo, mid)
    sort(mid + 1, hi)
    // Copy to aux
    for (let k = lo; k <= hi; k++) aux[k] = array[k]
    merge(lo, mid, hi)
  }

  sort(0, array.length - 1)
  return array
}

export default mergeSort
