import type { Operation, Value, Variables } from "../types";
import { jsonxpr } from "..";

export type VariableType = {
  $let: Operation<{ vars: Record<string, Value>; in: Value }, Value>;
};

export const variable: VariableType = {
  /**
   * Binds variables for use in the specified expression, and returns the result of the expression.
   *
   * @param args The variables and the expression (expressions evaluating to any types).
   * @param vars The variables.
   *
   * @returns The result of the expression.
   *
   * @example $let({ vars: { hasJob: true }, in: { isWorking: { $eq: ['$$hasJob', true] } } }) // { isWorking: true }
   */
  $let(
    args: { vars: Record<string, Value>; in: Value },
    vars: Variables,
  ): Value {
    const variables = Object.fromEntries(
      Object.entries(args.vars).map(([key, value]) => {
        return [`$${key}`, jsonxpr(value, vars)];
      }),
    );
    return jsonxpr(args.in, { ...vars, ...variables });
  },
};
