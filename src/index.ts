// createJsonxpr.ts
import type { Operation, Value, Variables } from "./types";
import { operations as defaultOperations } from "./operations";

/**
 * Creates a new jsonxpr instance with optional custom operators.
 * Custom operators can override existing ones.
 *
 * @param customOperations - Object containing custom operators.
 *
 * @example
 * const customJsonxpr = createJsonxpr({
 *   $formatDate: (date) => new Date(date).toLocaleDateString(),
 *   $dateAdd: ({ date, days }) => new Date(new Date(date).setDate(new Date(date).getDate() + days))
 * });
 *
 * customJsonxpr({ date: { $formatDate: "2024-01-15" } }) // "1/15/2024"
 */
export function createJsonxpr<
  T extends Record<string, Operation<Value, Value>>,
>(customOperations: T = {} as T) {
  const operations = { ...defaultOperations, ...customOperations };

  function jsonxpr(expr: Value, vars: Variables = {}): Value {
    if (isArr(expr)) return evalArr(expr, vars);
    if (isObj(expr)) return evalObj(expr, vars);
    if (isStr(expr)) return evalStr(expr, vars);
    return expr;
  }

  function isArr(expr: Value): expr is Value[] {
    return Array.isArray(expr);
  }

  function evalArr(expr: Value[], vars: Variables): Value {
    return expr.map((expression) => jsonxpr(expression, vars));
  }

  function isObj(expr: Value): expr is Record<string, Value> {
    return typeof expr === "object" && !Array.isArray(expr) && expr !== null;
  }

  function evalObj(expr: Record<string, Value>, vars: Variables): Value {
    if (isOperator(expr)) return evalOperator(expr, vars);
    return evalObjValue(expr, vars);
  }

  function isOperator(expr: Record<string, Value>): boolean {
    const keys = Object.keys(expr);
    if (keys[0] !== undefined) return keys[0] in operations;
    return false;
  }

  function evalOperator(expr: Record<string, Value>, vars: Variables): Value {
    const key = Object.keys(expr)[0];
    if (!key) throw new Error("Invalid operator expression");

    const operator = operations[key];
    if (!operator) throw new Error(`Unknown operator: ${key}`);

    return operator(expr[key], vars);
  }

  function evalObjValue(expr: Record<string, Value>, vars: Variables): Value {
    return Object.fromEntries(
      Object.entries(expr).map(([key, expr]) => {
        return [evalStrValue(key), jsonxpr(expr, vars)];
      }),
    );
  }

  function isStr(expr: Value): expr is string {
    return typeof expr === "string";
  }

  function evalStr(expr: string, vars: Variables): Value {
    if (isVariable(expr)) return evalVariable(expr, vars);
    return evalStrValue(expr);
  }

  function isVariable(expr: string): boolean {
    return expr.startsWith("$");
  }

  function evalVariable(expr: string, vars: Variables): Value {
    const parts = expr.slice(1).split(".");
    return parts.reduce((acc: Value, key: string): Value => {
      if (isObj(acc) && key in acc) return acc[key];
      if (isArr(acc) && key in acc) return acc[Number(key)];
      return null;
    }, vars);
  }

  function evalStrValue(expr: string): Value {
    if (expr.startsWith("#")) return expr.slice(1);
    return expr;
  }

  return jsonxpr;
}

/**
 * MongoDB-like expression evaluator with built-in operators.
 *
 * @param expr - The expression to evaluate.
 * @param vars - Optional variables to use in the expression.
 *
 * @example
 * jsonxpr({ $add: [1, 2, 3] }) // 6
 * jsonxpr({ name: { $toUpper: "$user.name" } }, { user: { name: "john" } }) // { name: "JOHN" }
 */
export const jsonxpr = createJsonxpr();
