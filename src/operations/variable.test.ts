import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: variable", () => {
  it("$let: Binds variables for use in the specified expression, and returns the result of the expression", () => {
    expect(
      jsonxpr({
        $let: {
          vars: { hasJob: true },
          in: { isWorking: { $eq: ["$$hasJob", true] } },
        },
      }),
    ).toEqual({ isWorking: true });
  });
});
