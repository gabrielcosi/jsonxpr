import { expect, it } from "vitest";
import { z } from "zod";

import type { Operation, Value, Variables } from "./types";
import { createJsonxpr, jsonxpr } from ".";

it("evaluates built-in operators", () => {
  const expr = {
    str: { $concat: [{ $toUpper: "$a" }, "-", { $toLower: "$b" }] },
    num: { $multiply: ["$x", "$y"] },
  };
  const vars = { a: "hello", b: "WORLD", x: 2, y: 3 };

  expect(jsonxpr(expr, vars)).toEqual({
    str: "HELLO-world",
    num: 6,
  });
});

it("supports nested object paths", () => {
  const expr = {
    value: { $multiply: ["$data.x", "$data.y"] },
  };
  const vars = { data: { x: 2, y: 3 } };

  expect(jsonxpr(expr, vars)).toEqual({
    value: 6,
  });
});

it("supports array access", () => {
  const expr = {
    sum: { $add: ["$nums.0", "$nums.1"] },
  };
  const vars = { nums: [1, 2] };

  expect(jsonxpr(expr, vars)).toEqual({
    sum: 3,
  });
});

it("escapes operator symbols", () => {
  expect(jsonxpr({ "#$add": ["#$x", "#$y"] })).toEqual({
    $add: ["$x", "$y"],
  });
});

it("allows custom operators", () => {
  const customJsonxpr = createJsonxpr({
    $parseDate: ((value: Value, vars: Variables): number => {
      const dateStr = jsonxpr(value, vars) as string;
      return new Date(dateStr).getTime();
    }) as Operation<Value, number>,
  });

  const expr = {
    timestamp: { $parseDate: "$date" },
  };

  const vars = {
    date: "2024-01-15T09:30:00Z",
  };

  expect(customJsonxpr(expr, vars)).toEqual({
    timestamp: 1705311000000,
  });
});

it("allows overriding built-in operators", () => {
  const customJsonxpr = createJsonxpr({
    $isValidEmail: ((value: Value, vars: Variables): boolean => {
      const email = jsonxpr(value, vars) as string;
      const result = z.string().email().safeParse(email);
      return result.success;
    }) as Operation<Value, boolean>,
  });

  const expr = {
    validEmail: { $isValidEmail: "test@example.com" },
    invalidEmail: { $isValidEmail: "not-an-email" },
    withVar: { $isValidEmail: "$email" },
  };

  const vars = {
    email: "user@domain.com",
  };

  expect(customJsonxpr(expr, vars)).toEqual({
    validEmail: true,
    invalidEmail: false,
    withVar: true,
  });
});
