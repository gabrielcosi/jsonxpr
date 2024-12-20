import type { Operation, Value, Variables } from "../types";
import { jsonxpr } from "..";

export type ArithmeticType = {
  $abs: Operation<Value, number>;
  $add: Operation<Value[], number>;
  $ceil: Operation<Value, number>;
  $divide: Operation<[Value, Value], number>;
  $exp: Operation<Value, number>;
  $floor: Operation<Value, number>;
  $ln: Operation<Value, number>;
  $log: Operation<[Value, Value], number>;
  $log10: Operation<Value, number>;
  $mod: Operation<[Value, Value], number>;
  $multiply: Operation<Value[], number>;
  $pow: Operation<[Value, Value], number>;
  $round: Operation<[Value, Value], number>;
  $sqrt: Operation<Value, number>;
  $subtract: Operation<[Value, Value], number>;
  $trunc: Operation<[Value, Value], number>;
};

export const arithmetic: ArithmeticType = {
  /**
   * Returns the absolute value of a number.
   *
   * @param args The number (expression evaluating to a number).
   * @param vars The variables.
   *
   * @returns The absolute value of the number.
   *
   * @example $abs(-5) // 5
   * @example $abs(5) // 5
   */
  $abs(args: Value, vars: Variables): number {
    const number = jsonxpr(args, vars) as number;
    return Math.abs(number);
  },

  /**
   * Adds numbers together.
   *
   * @param args The numbers (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The sum of the numbers.
   *
   * @example $add([1, 2, 3]) // 6
   * @example $add([1, 2, 3, 4]) // 10
   */
  $add(args: Value[], vars: Variables): number {
    return args.reduce((acc: number, expr: Value) => {
      const number = jsonxpr(expr, vars) as number;
      return acc + number;
    }, 0);
  },

  /**
   * Returns the smallest integer greater than or equal to the specified number.
   *
   * @param args The number (expression evaluating to a number).
   * @param vars The variables.
   *
   * @returns The smallest integer greater than or equal to the number.
   *
   * @example $ceil(5.5) // 6
   * @example $ceil(5.1) // 6
   */
  $ceil(args: Value, vars: Variables): number {
    const number = jsonxpr(args, vars) as number;
    return Math.ceil(number);
  },

  /**
   * Divides one number by another.
   *
   * @param args The dividend and divisor (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The result of dividing the dividend by the divisor.
   *
   * @example $divide([10, 2]) // 5
   * @example $divide([10, 3]) // 3.3333333333333335
   */
  $divide(args: [Value, Value], vars: Variables): number {
    const number1 = jsonxpr(args[0], vars) as number;
    const number2 = jsonxpr(args[1], vars) as number;
    return number1 / number2;
  },

  /**
   * Raises Euler's number to the specified exponent.
   *
   * @param args The number (expression evaluating to a number).
   * @param vars The variables.
   *
   * @returns Euler's number raised to the specified power.
   *
   * @example $exp(1) // 2.718281828459045
   * @example $exp(2) // 7.3890560989306495
   */
  $exp(args: Value, vars: Variables): number {
    const number = jsonxpr(args, vars) as number;
    return Math.exp(number);
  },

  /**
   * Returns the largest integer less than or equal to the specified number.
   *
   * @param args The number (expression evaluating to a number).
   * @param vars The variables.
   *
   * @returns The largest integer less than or equal to the number.
   *
   * @example $floor(5.5) // 5
   * @example $floor(5.1) // 5
   */
  $floor(args: Value, vars: Variables): number {
    const number = jsonxpr(args, vars) as number;
    return Math.floor(number);
  },

  /**
   * Returns the natural logarithm of a number.
   *
   * @param args The number (expression evaluating to a number).
   * @param vars The variables.
   *
   * @returns The natural logarithm of the number.
   *
   * @example $ln(1) // 0
   * @example $ln(2.718281828459045) // 1
   */
  $ln(args: Value, vars: Variables): number {
    const number = jsonxpr(args, vars) as number;
    return Math.log(number);
  },

  /**
   * Returns the logarithm of a number in a specified base.
   *
   * @param args The number and base (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The logarithm of the number in the specified base.
   *
   * @example $log([10, 10]) // 1
   * @example $log([100, 10]) // 2
   */
  $log(args: [Value, Value], vars: Variables): number {
    const number1 = jsonxpr(args[0], vars) as number;
    const number2 = jsonxpr(args[1], vars) as number;
    return Math.log(number1) / Math.log(number2);
  },

  /**
   * Returns the base 10 logarithm of a number.
   *
   * @param args The number (expression evaluating to a number).
   * @param vars The variables.
   *
   * @returns The base 10 logarithm of the number.
   *
   * @example $log10(1) // 0
   * @example $log10(10) // 1
   */
  $log10(args: Value, vars: Variables): number {
    const number = jsonxpr(args, vars) as number;
    return Math.log10(number);
  },

  /**
   * Returns the remainder of dividing one number by another.
   *
   * @param args The dividend and divisor (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The remainder of dividing the dividend by the divisor.
   *
   * @example $mod([10, 3]) // 1
   * @example $mod([10, 2]) // 0
   */
  $mod(args: [Value, Value], vars: Variables): number {
    const number1 = jsonxpr(args[0], vars) as number;
    const number2 = jsonxpr(args[1], vars) as number;
    return number1 % number2;
  },

  /**
   * Multiplies numbers together.
   *
   * @param args The numbers (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The product of the numbers.
   *
   * @example $multiply([1, 2, 3]) // 6
   */
  $multiply(args: Value[], vars: Variables): number {
    return args.reduce((acc: number, expr: Value) => {
      const number = jsonxpr(expr, vars) as number;
      return acc * number;
    }, 1);
  },

  /**
   * Raises a number to the specified exponent.
   *
   * @param args The base and exponent (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The base raised to the specified power.
   *
   * @example $pow([2, 3]) // 8
   * @example $pow([3, 2]) // 9
   */
  $pow(args: [Value, Value], vars: Variables): number {
    const number1 = jsonxpr(args[0], vars) as number;
    const number2 = jsonxpr(args[1], vars) as number;
    return Math.pow(number1, number2);
  },

  /**
   * Rounds a number to the nearest integer.
   *
   * @param args The number and the number of decimal places (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The number rounded to the nearest number with the specified number of decimal places.
   *
   * @example $round([5.5, 0]) // 6
   * @example $round([5.5, 1]) // 5.5
   */
  $round(args: [Value, Value], vars: Variables): number {
    const number = jsonxpr(args[0], vars) as number;
    const places = jsonxpr(args[1], vars) as number;
    const factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
  },

  /**
   * Returns the square root of a number.
   *
   * @param args The number (expression evaluating to a number).
   * @param vars The variables.
   *
   * @returns The square root of the number.
   *
   * @example $sqrt(4) // 2
   * @example $sqrt(9) // 3
   */
  $sqrt(args: Value, vars: Variables): number {
    const number = jsonxpr(args, vars) as number;
    return Math.sqrt(number);
  },

  /**
   * Subtracts one number from another.
   *
   * @param args The minuend and subtrahend (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The result of subtracting the subtrahend from the minuend.
   *
   * @example $subtract([5, 3]) // 2
   * @example $subtract([3, 5]) // -2
   */
  $subtract(args: [Value, Value], vars: Variables): number {
    const number1 = jsonxpr(args[0], vars) as number;
    const number2 = jsonxpr(args[1], vars) as number;
    return number1 - number2;
  },

  /**
   * Truncates a number to the specified number of decimal places.
   *
   * @param args The number and the number of decimal places (expressions evaluating to numbers).
   * @param vars The variables.
   *
   * @returns The number truncated to the specified number of decimal places.
   *
   * @example $trunc(5.5) // 5
   * @example $trunc(5.5, 1) // 5.5
   */
  $trunc(args: [Value, Value], vars: Variables): number {
    const number = jsonxpr(args[0], vars) as number;
    const places = jsonxpr(args[1], vars) as number;
    const factor = Math.pow(10, places);
    return Math.trunc(number * factor) / factor;
  },
};
