# JSONxpr

A TypeScript library for evaluating expressions against JSON objects.

## Features

- 🔍 Declarative operator syntax
- 📝 Variable substitution with dot notation
- 🔢 Rich set of operators for various data types
- 🎯 Type-safe implementation
- 🔗 Nested object and array access
- 🛡️ String literal escaping

## Installation

```bash
pnpm install jsonxpr
```

## Basic Usage

```typescript
import { jsonxpr } from "jsonxpr";

// Simple mathematical operation
jsonxpr({ $add: [1, 2, 3] });
// => 6

// Simple string operation
jsonxpr({ $toUpper: "hello" });
// => "HELLO"

// Simple array operation
jsonxpr({ $size: ["a", "b", "c"] });
// => 3
```

## Working with Variables

```typescript
// Using variables
const expr = { $toLower: "$name" };
const vars = { name: "JOHN" };
jsonxpr(expr, vars)
// => "john"

// Nested variable access
const expr = { $concat: ["$user.firstName", " ", "$user.lastName"] };
const vars = {
  user: {
    firstName: "John",
    lastName: "Doe"
  }
};
jsonxpr(expr, vars)
// => "John Doe"
```

## Advanced Examples

### Filter Array with nested condition

```typescript
const expr = {
  $filter: {
    input: "$items",
    as: "item",
    cond: { $gt: ["$$item.stock", 0] },
  },
};

const vars = {
  items: [
    { id: 1, stock: 5 },
    { id: 2, stock: 0 },
    { id: 3, stock: 3 },
  ],
};

jsonxpr(expr, vars);
// => [{ id: 1, stock: 5 }, { id: 3, stock: 3 }]
```

### Complex Conditions

```typescript
const expr = {
  $switch: {
    branches: [
      {
        case: { $gt: ["$value", 100] },
        then: "high",
      },
      {
        case: { $gt: ["$value", 50] },
        then: "medium",
      },
    ],
    default: "low",
  },
};

const vars = { value: 75 };
jsonxpr(expr, vars);
// => "medium"
```

## Available Operators

See the [complete list of available operators](docs/operations.md).

## Escaping Special Characters

Use the `#` prefix to escape strings that start with `$`:

```typescript
const expr = {
  "#$special": "This is treated as a literal $special key",
};
```

## Custom Operators

You can create a custom instance of jsonxpr with your own operators using `createJsonxpr`:

```typescript
import type { Operation, Value, Variables } from "jsonxpr";
import { createJsonxpr } from "jsonxpr";

// Create instance with custom date operators
const customJsonxpr = createJsonxpr({
  $parseDate: ((value: Value, vars: Variables): number => {
    const dateStr = jsonxpr(value, vars) as string;
    return new Date(dateStr).getTime();
  }) as Operation<Value, number>,
});

// Usage
const result = customJsonxpr(
  {
    timestamp: { $parseDate: "$date" },
  },
  {
    date: "2024-01-15T09:30:00Z",
  },
);

// Result:
// {
//   timestamp: 1705311000000,
// }
```

### Overriding Built-in Operators

You can also override built-in operators with custom implementations:

```typescript
import { z } from "zod";

// Override built-in email validation with Zod
const zodJsonxpr = createJsonxpr({
  $isValidEmail: ((value: Value, vars: Variables): boolean => {
    const email = jsonxpr(value, vars) as string;
    const result = z.string().email().safeParse(email);
    return result.success;
  }) as Operation<Value, boolean>,
});

// Usage
const result = zodJsonxpr({
  isValid: { $isValidEmail: "test@example.com" },
});
// { isValid: true }
```

Custom operators can:

- Use other operators in their implementation
- Access variables with `jsonxpr(value, vars)`
- Override built-in operators
- Return any serializable value
- Integrate with third-party libraries
