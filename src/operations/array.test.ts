import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: array", () => {
  it("$arrayElemAt: Returns the element at the specified array index", () => {
    expect(jsonxpr({ $arrayElemAt: [[1, 2, 3], 0] })).toBe(1);
    expect(jsonxpr({ $arrayElemAt: [[1, 2, 3], 1] })).toBe(2);
    expect(jsonxpr({ $arrayElemAt: [[1, 2, 3], 3] })).toBe(null);
  });

  it("$concatArrays: Concatenates arrays to return the concatenated array", () => {
    expect(jsonxpr({ $concatArrays: [["hello", " "], ["world"]] })).toEqual([
      "hello",
      " ",
      "world",
    ]);
    expect(jsonxpr({ $concatArrays: [["hello", " "], [["world"]]] })).toEqual([
      "hello",
      " ",
      ["world"],
    ]);
  });

  it("$filter: Selects a subset of an array to return based on the specified condition", () => {
    expect(
      jsonxpr({
        $filter: {
          input: [1, 2, 3, 4],
          as: "num",
          cond: { $gt: ["$$num", 2] },
        },
      }),
    ).toEqual([3, 4]);
  });

  it("$firstN: Returns the first N elements of an array", () => {
    expect(jsonxpr({ $firstN: { n: 2, input: [1, 2, 3] } })).toEqual([1, 2]);
    expect(jsonxpr({ $firstN: { n: 3, input: [1, 2] } })).toEqual([1, 2]);
    expect(jsonxpr({ $firstN: { n: 2, input: [1] } })).toEqual([1]);
  });

  it("$in: Returns a boolean indicating whether a specified value is in an array", () => {
    expect(jsonxpr({ $in: [2, [1, 2, 3]] })).toBe(true);
    expect(jsonxpr({ $in: ["abc", ["xyc", "abc"]] })).toBe(true);
    expect(jsonxpr({ $in: ["xy", ["xyc", "abc"]] })).toBe(false);
  });

  it("$indexOfArray: Returns the index of the first occurrence of a specified value in an array", () => {
    expect(jsonxpr({ $indexOfArray: [["a", "abc"], "a"] })).toBe(0);
    expect(jsonxpr({ $indexOfArray: [[1, 2], 5] })).toBe(-1);
  });

  it("$lastN: Returns the last N elements of an array", () => {
    expect(jsonxpr({ $lastN: { n: 2, input: [1, 2, 3] } })).toEqual([2, 3]);
    expect(jsonxpr({ $lastN: { n: 3, input: [1, 2] } })).toEqual([1, 2]);
    expect(jsonxpr({ $lastN: { n: 2, input: [1] } })).toEqual([1]);
  });

  it("$map: Applies an expression to each element in an array and returns an array with the applied results", () => {
    expect(
      jsonxpr({
        $map: {
          input: [1, 2, 3],
          as: "num",
          in: { $add: ["$$num", 1] },
        },
      }),
    ).toEqual([2, 3, 4]);
  });
  expect(
    jsonxpr({
      $map: {
        input: ["a", "b"],
        as: "str",
        in: { $toUpper: "$$str" },
      },
    }),
  ).toEqual(["A", "B"]);

  it("$maxN: Returns the N highest values in an array", () => {
    expect(jsonxpr({ $maxN: { n: 2, input: [3, 7, 2, 4] } })).toEqual([7, 4]);
    expect(jsonxpr({ $maxN: { n: 3, input: [3, 7, 2, 4] } })).toEqual([
      7, 4, 3,
    ]);
    expect(jsonxpr({ $maxN: { n: 5, input: [3, 7, 2, 4] } })).toEqual([
      7, 4, 3, 2,
    ]);
  });

  it("$minN: Returns the N lowest values in an array", () => {
    expect(jsonxpr({ $minN: { n: 2, input: [3, 7, 2, 4] } })).toEqual([2, 3]);
    expect(jsonxpr({ $minN: { n: 3, input: [3, 7, 2, 4] } })).toEqual([
      2, 3, 4,
    ]);
    expect(jsonxpr({ $minN: { n: 5, input: [3, 7, 2, 4] } })).toEqual([
      2, 3, 4, 7,
    ]);
  });

  it("$reduce: Applies an expression to each element in an array and combines them into a single value", () => {
    expect(
      jsonxpr({
        $reduce: {
          input: ["a", "b", "c"],
          initialValue: "",
          in: { $concat: ["$$value", "$$this"] },
        },
      }),
    ).toBe("abc");
    expect(
      jsonxpr({
        $reduce: {
          input: [1, 2, 3],
          initialValue: 0,
          in: { $add: ["$$value", "$$this"] },
        },
      }),
    ).toBe(6);
  });

  it("$reverseArray: Returns an array with the elements in reverse order", () => {
    expect(jsonxpr({ $reverseArray: [4, 2, 3] })).toEqual([3, 2, 4]);
    expect(jsonxpr({ $reverseArray: ["a", "c", "b"] })).toEqual([
      "b",
      "c",
      "a",
    ]);
  });

  it("$size: Returns the number of elements in an array", () => {
    expect(jsonxpr({ $size: [1, 2, 3] })).toBe(3);
    expect(jsonxpr({ $size: ["a", "b", "c", "d"] })).toBe(4);
    expect(jsonxpr({ $size: [] })).toBe(0);
  });

  it("$slice: Returns a subset of an array", () => {
    expect(jsonxpr({ $slice: [[1, 2, 3], 1, 1] })).toEqual([2]);
    expect(jsonxpr({ $slice: [[1, 2, 3], 1, 2] })).toEqual([2, 3]);
    expect(jsonxpr({ $slice: [[1, 2, 3], 1, 3] })).toEqual([2, 3]);
    expect(jsonxpr({ $slice: [[1, 2, 3], 3, 2] })).toEqual([]);
  });

  it("$sortArray: Returns an array with its elements sorted", () => {
    expect(
      jsonxpr({
        $sortArray: {
          input: [3, 4, 2],
          sortBy: { $cmp: ["$$first", "$$second"] },
        },
      }),
    ).toEqual([2, 3, 4]);
    expect(
      jsonxpr({
        $sortArray: {
          input: [3, 4, 2],
          sortBy: { $cmp: ["$$second", "$$first"] },
        },
      }),
    ).toEqual([4, 3, 2]);
  });
});
