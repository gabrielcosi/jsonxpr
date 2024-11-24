import type { ArithmeticType } from "./arithmetic";
import type { ArrayType } from "./array";
import type { BooleanType } from "./boolean";
import type { ComparisonType } from "./comparison";
import type { ConditionalType } from "./conditional";
import type { ObjectType } from "./object";
import type { SpecialType } from "./special";
import type { StringType } from "./string";
import type { TypeType } from "./type";
import type { VariableType } from "./variable";
import { arithmetic } from "./arithmetic";
import { array } from "./array";
import { boolean } from "./boolean";
import { comparison } from "./comparison";
import { conditional } from "./conditional";
import { object } from "./object";
import { special } from "./special";
import { string } from "./string";
import { type } from "./type";
import { variable } from "./variable";

type OperationsType = ArithmeticType &
  ArrayType &
  BooleanType &
  ComparisonType &
  ConditionalType &
  ObjectType &
  StringType &
  SpecialType &
  TypeType &
  VariableType;

export const operations: OperationsType = {
  ...arithmetic,
  ...array,
  ...boolean,
  ...comparison,
  ...conditional,
  ...object,
  ...special,
  ...string,
  ...type,
  ...variable,
};
