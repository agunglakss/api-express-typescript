import type { Rule, Schema, ValidationResult } from "./types.js";

export function validate<T extends object>(data: Partial<T>, schema: Schema<T>) {
  const errors: ValidationResult = {};

  for (const key in schema) {
    const fieldRules = schema[key];
    if (!fieldRules) continue;

    const fieldValue = data[key];

    for (const rule of fieldRules) {
      const error = (rule as Rule<any>)(fieldValue, String(key));
      if (error) {
        if (!errors[key]) errors[key] = [];
        errors[key].push(error);
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
