import type { Operation, Value, Variables } from "../types";
import { jsonxpr } from "..";

export type TypeType = {
  $isBoolean: Operation<Value, boolean>;
  $isNumber: Operation<Value, boolean>;
  $isString: Operation<Value, boolean>;
  $toBoolean: Operation<Value, boolean>;
  $toNumber: Operation<Value, number | null>;
  $toString: Operation<Value, string>;
};

export const type: TypeType = {
  /**
   * Returns true if the value is a boolean. Otherwise, it returns false.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns True if the value is a boolean. Otherwise, false.
   *
   * @example $isBoolean(false) // true
   * @example $isBoolean(2) // false
   * @example $isBoolean('test') // false
   */
  $isBoolean(args: Value, vars: Variables): boolean {
    const value = jsonxpr(args, vars);
    return typeof value === "boolean";
  },

  /**
   * Returns true if the value is a number. Otherwise, it returns false.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns True if the value is a number. Otherwise, false.
   *
   * @example $isNumber(2) // true
   * @example $isNumber(true) // false
   * @example $isNumber('test') // false
   */
  $isNumber(args: Value, vars: Variables): boolean {
    const value = jsonxpr(args, vars);
    return typeof value === "number";
  },

  /**
   * Returns true if the value is a string. Otherwise, it returns false.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns True if the value is a string. Otherwise, false.
   *
   * @example $isString('test') // true
   * @example $isString(2) // false
   * @example $isString(true) // false
   */
  $isString(args: Value, vars: Variables): boolean {
    const value = jsonxpr(args, vars);
    return typeof value === "string";
  },

  /**
   * Converts a value to a boolean.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns The converted value.
   *
   * @example $toBoolean('test') // true
   * @example $toBoolean('') // false
   * @example $toBoolean(2) // true
   * @example $toBoolean(0) // false
   */
  $toBoolean(args: Value, vars: Variables): boolean {
    const value = jsonxpr(args, vars);
    return Boolean(value);
  },

  /**
   * Converts a value to a number. If the value cannot be converted, it returns null.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns The converted value.
   *
   * @example $toNumber('2') // 2
   * @example $toNumber('test') // NaN
   */
  $toNumber(args: Value, vars: Variables): number {
    const value = jsonxpr(args, vars);
    return Number(value);
  },

  /**
   * Converts a value to a string.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns The converted value.
   *
   * @example $toString(2) // '2'
   * @example $toString(true) // 'true'
   */
  $toString(args: Value, vars: Variables): string {
    const value = jsonxpr(args, vars);
    return String(value);
  },
};
