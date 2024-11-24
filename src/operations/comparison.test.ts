import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: comparison", () => {
  it("$cmp: Compares two values and returns -1, 1 or 0", () => {
    expect(jsonxpr({ $cmp: [3, 5] })).toBe(-1);
    expect(jsonxpr({ $cmp: [5, 3] })).toBe(1);
    expect(jsonxpr({ $cmp: [5, 5] })).toBe(0);
  });

  it("$eq: Compares two values and returns true if they are equal", () => {
    expect(jsonxpr({ $eq: [5, 5] })).toBe(true);
    expect(jsonxpr({ $eq: ["hello", "bye"] })).toBe(false);
  });

  it("$gt: Compares two values and returns true if the first is greater than the second", () => {
    expect(jsonxpr({ $gt: [5, 2] })).toBe(true);
    expect(jsonxpr({ $gt: [5, 7] })).toBe(false);
  });

  it("$gte: Compares two values and returns true if the first is greater than or equal to the second", () => {
    expect(jsonxpr({ $gte: [5, 2] })).toBe(true);
    expect(jsonxpr({ $gte: [5, 5] })).toBe(true);
    expect(jsonxpr({ $gte: [5, 7] })).toBe(false);
  });

  it("$lt: Compares two values and returns true if the first is less than the second", () => {
    expect(jsonxpr({ $lt: [5, 7] })).toBe(true);
    expect(jsonxpr({ $lt: [5, 2] })).toBe(false);
  });

  it("$lte: Compares two values and returns true if the first is less than or equal to the second", () => {
    expect(jsonxpr({ $lte: [5, 7] })).toBe(true);
    expect(jsonxpr({ $lte: [5, 5] })).toBe(true);
    expect(jsonxpr({ $lte: [5, 2] })).toBe(false);
  });

  it("$ne: Compares two values and returns true if they are not equal", () => {
    expect(jsonxpr({ $ne: ["hello", "bye"] })).toBe(true);
    expect(jsonxpr({ $ne: [5, 5] })).toBe(false);
  });
});
