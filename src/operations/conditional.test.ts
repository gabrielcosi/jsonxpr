import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: conditional", () => {
  it("$cond: Evaluates a boolean expression to return one of the two specified return expressions", () => {
    expect(
      jsonxpr({
        $cond: { if: true, then: "hello", else: "bye" },
      }),
    ).toBe("hello");
    expect(
      jsonxpr({
        $cond: { if: false, then: "hello", else: "bye" },
      }),
    ).toBe("bye");
  });

  it("$ifNull: Evaluates input expressions for null values and returns the first non-null expression's value", () => {
    expect(jsonxpr({ $ifNull: [null, "hello", "bye"] })).toBe("hello");
    expect(jsonxpr({ $ifNull: [null, null, "bye"] })).toBe("bye");
    expect(jsonxpr({ $ifNull: [null, null, null] })).toBe(null);
  });

  it("$switch: Evaluates a series of case expressions. When it finds an expression which evaluates to true, it executes a specified expression and breaks out of the control flow.", () => {
    expect(
      jsonxpr({
        $switch: {
          branches: [
            { case: false, then: 1 },
            { case: true, then: 2 },
          ],
          default: 3,
        },
      }),
    ).toBe(2);
    expect(
      jsonxpr({
        $switch: {
          branches: [
            { case: false, then: 1 },
            { case: false, then: 2 },
          ],
          default: 3,
        },
      }),
    ).toBe(3);
  });
});
