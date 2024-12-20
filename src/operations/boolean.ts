import type { Operation, Value, Variables } from "../types";
import { jsonxpr } from "..";

export type BooleanType = {
  $and: Operation<Value[], boolean>;
  $not: Operation<Value, boolean>;
  $or: Operation<Value[], boolean>;
};

export const boolean: BooleanType = {
  /**
   * Evaluates one or more expressions and returns true if all of the expressions are true. Otherwise, it returns false.
   *
   * @param args An array of booleans (expressions evaluating to booleans).
   * @param vars The variables.
   *
   * @returns True if all of the expressions are true. Otherwise, false.
   *
   * @example $and([true, true, true]) // true
   * @example $and([true, false, true]) // false
   */
  $and(args: Value[], vars: Variables): boolean {
    return args.every((expr) => {
      const boolean = jsonxpr(expr, vars) as boolean;
      return boolean;
    });
  },

  /**
   * Evaluates a boolean and returns the opposite boolean value.
   *
   * @param args A boolean (expression evaluating to a boolean).
   * @param vars The variables.
   *
   * @returns The opposite boolean value.
   *
   * @example $not(true) // false
   * @example $not(false) // true
   */
  $not(args: Value, vars: Variables): boolean {
    const boolean = jsonxpr(args, vars) as boolean;
    return !boolean;
  },

  /**
   * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.
   *
   * @param args An array of booleans (expressions evaluating to booleans).
   * @param vars The variables.
   *
   * @returns True if any of the expressions are true. Otherwise, false.
   *
   * @example $or([true, false, true]) // true
   * @example $or([false, false, false]) // false
   */
  $or(args: Value[], vars: Variables): boolean {
    return args.some((expr) => {
      const boolean = jsonxpr(expr, vars) as boolean;
      return boolean;
    });
  },
};
