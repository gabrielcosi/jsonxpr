import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: object", () => {
  it("$getField: Gets the value of a field in an object", () => {
    expect(
      jsonxpr({
        $getField: {
          field: "qty",
          input: { item: "apple", qty: 25, price: 4.5 },
        },
      }),
    ).toEqual(25);
  });

  it("$mergeObjects: Merges objects into a single object", () => {
    expect(
      jsonxpr({
        $mergeObjects: [
          { item: "apple", qty: 5, price: 2.5 },
          { qty: 10, price: 1.2, sale: true },
        ],
      }),
    ).toEqual({
      item: "apple",
      qty: 10,
      price: 1.2,
      sale: true,
    });
  });

  it("$setField: Sets a field in an object to a specified value", () => {
    expect(
      jsonxpr({
        $setField: {
          field: "item",
          input: { qty: 25, price: 4.5 },
          value: "apple",
        },
      }),
    ).toEqual({
      item: "apple",
      qty: 25,
      price: 4.5,
    });
  });
});
