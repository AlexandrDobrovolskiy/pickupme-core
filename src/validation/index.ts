import { validate } from "./utils/common";

export const validateWith = (...validators) => {
  return [...validators, validate];
}