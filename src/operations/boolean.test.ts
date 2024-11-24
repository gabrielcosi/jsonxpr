import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: boolean", () => {
  it("$and: Evaluates one or more expressions and returns true if any of the expressions are true", () => {
    expect(jsonxpr({ $and: [true, true] })).toBe(true);
    expect(jsonxpr({ $and: [true, false, true] })).toBe(false);
  });

  it("$not: Evaluates a boolean and returns the opposite boolean value", () => {
    expect(jsonxpr({ $not: true })).toBe(false);
    expect(jsonxpr({ $not: false })).toBe(true);
  });

  it("$or: Evaluates one or more expressions and returns true if any of the expressions are true", () => {
    expect(jsonxpr({ $or: [true, false] })).toBe(true);
    expect(jsonxpr({ $or: [false, false] })).toBe(false);
  });
});
