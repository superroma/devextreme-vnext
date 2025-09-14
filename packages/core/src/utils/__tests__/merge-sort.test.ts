import { describe, it, expect } from "vitest";
import { mergeSort } from "../../index.js";

describe("mergeSort", () => {
  it("should sort numbers ascending", () => {
    const arr = [5, 1, 3, 2, 4];
    expect(mergeSort(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  it("should be stable sort", () => {
    const arr = [
      { v: 3, i: 0 },
      { v: 1, i: 1 },
      { v: 3, i: 2 },
      { v: 2, i: 3 },
      { v: 3, i: 4 },
    ];
    const sorted = mergeSort(arr, (a, b) => a.v - b.v);
    const threes = sorted.filter((o) => o.v === 3);
    expect(threes.map((t) => t.i)).toEqual([0, 2, 4]);
  });

  it("should handle empty array", () => {
    expect(mergeSort([])).toEqual([]);
  });
});
