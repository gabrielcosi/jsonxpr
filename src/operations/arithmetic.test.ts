import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: arithmetic", () => {
  it("$abs: Returns the absolute value of a number", () => {
    expect(jsonxpr({ $abs: 5 })).toBe(5);
    expect(jsonxpr({ $abs: -5 })).toBe(5);
  });

  it("$add: Adds numbers together", () => {
    expect(jsonxpr({ $add: [1, 2, 3] })).toBe(6);
    expect(jsonxpr({ $add: [-2, 4] })).toBe(2);
  });

  it("$ceil: Returns the smallest integer greater than or equal to the specified number", () => {
    expect(jsonxpr({ $ceil: 1 })).toBe(1);
    expect(jsonxpr({ $ceil: 7.8 })).toBe(8);
    expect(jsonxpr({ $ceil: -2.8 })).toBe(-2);
  });

  it("$divide: divides one number by another", () => {
    expect(jsonxpr({ $divide: [4, 2] })).toBe(2);
    expect(jsonxpr({ $divide: [5, 2] })).toBe(2.5);
  });

  it("$exp: Raises Euler's number to the specified exponent", () => {
    expect(jsonxpr({ $exp: 0 })).toBe(1);
    expect(jsonxpr({ $exp: 2 })).toBe(7.38905609893065);
    expect(jsonxpr({ $exp: -2 })).toBe(0.1353352832366127);
  });

  it("$floor: Returns the largest integer less than or equal to the specified number", () => {
    expect(jsonxpr({ $floor: 1 })).toBe(1);
    expect(jsonxpr({ $floor: 7.8 })).toBe(7);
    expect(jsonxpr({ $floor: -2.8 })).toBe(-3);
  });

  it("$ln: Calculates the natural logarithm of a number", () => {
    expect(jsonxpr({ $ln: 1 })).toBe(0);
    expect(jsonxpr({ $ln: 10 })).toBe(2.302585092994046);
  });

  it("$log: Calculates the log of a number in the specified base", () => {
    expect(jsonxpr({ $log: [100, 10] })).toBe(2);
  });

  it("$log10: Calculates the log base 10 of a number", () => {
    expect(jsonxpr({ $log10: 1 })).toBe(0);
    expect(jsonxpr({ $log10: 10 })).toBe(1);
    expect(jsonxpr({ $log10: 100 })).toBe(2);
  });

  it("$mod: Divides one number by another and returns the remainder", () => {
    expect(jsonxpr({ $mod: [5, 2] })).toBe(1);
  });

  it("$multiply: Multiplies numbers together", () => {
    expect(jsonxpr({ $multiply: [2, 3] })).toBe(6);
    expect(jsonxpr({ $multiply: [2, 2, 3] })).toBe(12);
  });

  it("$pow: Raises a number to the specified exponent", () => {
    expect(jsonxpr({ $pow: [5, 0] })).toBe(1);
    expect(jsonxpr({ $pow: [5, 2] })).toBe(25);
    expect(jsonxpr({ $pow: [5, -2] })).toBe(0.04);
  });

  it("$round: Rounds a number to a specified decimal place", () => {
    expect(jsonxpr({ $round: [5.43, 0] })).toBe(5);
    expect(jsonxpr({ $round: [5.43, 1] })).toBe(5.4);
  });

  it("$sqrt: Calculates the square root of a positive number", () => {
    expect(jsonxpr({ $sqrt: 25 })).toBe(5);
    expect(jsonxpr({ $sqrt: 30 })).toBe(5.477225575051661);
  });

  it("$subtract: Subtracts two numbers to return the difference", () => {
    expect(jsonxpr({ $subtract: [5, 2] })).toBe(3);
    expect(jsonxpr({ $subtract: [-2, 4] })).toBe(-6);
  });

  it("$trunc: Truncates a number to a specified decimal place", () => {
    expect(jsonxpr({ $trunc: [5.43, 0] })).toBe(5);
    expect(jsonxpr({ $trunc: [5.43, 1] })).toBe(5.4);
  });
});
