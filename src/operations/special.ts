import type { Operation, Value, Variables } from "../types";
import { jsonxpr } from "..";

export type SpecialType = {
  $isValidEmail: Operation<Value, boolean>;
  $isValidPhone: Operation<Value, boolean>;
};

export const special: SpecialType = {
  /**
   * Evaluates a string and returns true if it is a valid email address. Otherwise, it returns false.
   *
   * @param args A string
   * @param vars The variables.
   *
   * @returns True if the string is a valid email address. Otherwise, false.
   *
   * @example $isValidEmail('email@domain-one.com') // true
   */
  $isValidEmail(args: Value, vars: Variables): boolean {
    const email = jsonxpr(args, vars) as string;
    if (!email) return false;

    const emailRegex =
      /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\\-]*\.)+[A-Z]{2,}$/i;

    return emailRegex.test(email);
  },
  /**
   * Evaluates a string and returns true if it is a valid phone number. Otherwise, it returns false.
   *
   * @param args A string
   * @param vars The variables.
   *
   * @returns True if the string is a valid phone number. Otherwise, false.
   *
   * @example $isValidPhone('123-456-7890') // true
   */
  $isValidPhone(args: Value, vars: Variables): boolean {
    const phone = jsonxpr(args, vars) as string;
    if (!phone) return false;

    const phoneRegex = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;

    return phoneRegex.test(phone);
  },
};
