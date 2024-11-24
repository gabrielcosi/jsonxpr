import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: type", () => {
  it("$isBoolean: Checks if the value is a boolean", () => {
    expect(jsonxpr({ $isBoolean: false })).toBe(true);
    expect(jsonxpr({ $isBoolean: 2 })).toBe(false);
    expect(jsonxpr({ $isBoolean: "test" })).toBe(false);
  });

  it("$isNumber: Checks if the value is a number", () => {
    expect(jsonxpr({ $isNumber: 2 })).toBe(true);
    expect(jsonxpr({ $isNumber: true })).toBe(false);
    expect(jsonxpr({ $isNumber: "test" })).toBe(false);
  });

  it("$isString: Checks if the value is a string", () => {
    expect(jsonxpr({ $isString: "test" })).toBe(true);
    expect(jsonxpr({ $isString: 2 })).toBe(false);
    expect(jsonxpr({ $isString: true })).toBe(false);
  });

  it("$toBoolean: Converts the value to a boolean", () => {
    expect(jsonxpr({ $toBoolean: "test" })).toBe(true);
    expect(jsonxpr({ $toBoolean: "" })).toBe(false);
    expect(jsonxpr({ $toBoolean: 2 })).toBe(true);
    expect(jsonxpr({ $toBoolean: 0 })).toBe(false);
  });

  it("$toNumber: Converts the value to a number", () => {
    expect(jsonxpr({ $toNumber: "2" })).toBe(2);
    expect(jsonxpr({ $toNumber: "testtest" })).toBeNaN();
  });

  it("$toString: Converts the value to a string", () => {
    expect(jsonxpr({ $toString: 2 })).toBe("2");
    expect(jsonxpr({ $toString: true })).toBe("true");
  });
});
