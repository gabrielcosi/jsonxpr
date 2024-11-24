import { describe, expect, it } from "vitest";

import { jsonxpr } from "../";

describe("operations: string", () => {
  it("$concat: Concatenates strings and returns the concatenated string", () => {
    expect(jsonxpr({ $concat: ["john", " ", "doe"] })).toBe("john doe");
  });

  it("$ltrim: Removes whitespace from the beginning of a string", () => {
    expect(jsonxpr({ $ltrim: "   test   " })).toBe("test   ");
  });

  it("$regexMatch: Performs a regular expression and returns true if there is a match", () => {
    expect(jsonxpr({ $regexMatch: ["test", "est"] })).toBe(true);
    expect(jsonxpr({ $regexMatch: ["abc", "cde"] })).toBe(false);
  });

  it("$rtrim: Removes whitespace from the end of a string.", () => {
    expect(jsonxpr({ $rtrim: "   test   " })).toBe("   test");
  });

  it("$split: Divides a string into an array of substrings based on a delimiter", () => {
    expect(jsonxpr({ $split: ["November-21-2024", "-"] })).toEqual([
      "November",
      "21",
      "2024",
    ]);
    expect(jsonxpr({ $split: ["Hello World", " "] })).toEqual([
      "Hello",
      "World",
    ]);
  });

  it("$strLen: Returns the number of characters", () => {
    expect(jsonxpr({ $strLen: "abcde" })).toBe(5);
  });

  it("$substr: Returns the substring of a string", () => {
    expect(jsonxpr({ $substr: ["hello world", 1, 3] })).toBe("ell");
  });

  it("$toLower: Converts a string to lowercase", () => {
    expect(jsonxpr({ $toLower: "John Doe" })).toBe("john doe");
  });

  it("$trim: Removes whitespace from the beginning and end of a string.", () => {
    expect(jsonxpr({ $trim: "   test   " })).toBe("test");
  });

  it("$toUpper: Converts a string to uppercase", () => {
    expect(jsonxpr({ $toUpper: "John Doe" })).toBe("JOHN DOE");
  });
});
