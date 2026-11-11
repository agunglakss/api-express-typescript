import type { Rule } from "./types.js";

export const rules = {
  required: (msg?: string): Rule =>
    (val, field) => {
      const isEmpty = val === undefined || val === null || (typeof val === "string" && val.trim() === "");
      return isEmpty ? (msg || `${field} is required`) : null;
    },

  string: (msg?: string): Rule =>
    (val, field) => {
      const isString = typeof val === "string";
      return isString ? null : (msg || `${field} is required`);
    },

  minLength: (min: number, msg?: string): Rule<string | undefined> =>
    (val, field) => {
      if (!val) return null;
      return val.length < min ? (msg || `${field} must be at least ${min} characters`) : null;
    },

  maxLength: (max: number, msg?: string): Rule<string | undefined> =>
    (val, field) => {
      if (!val) return null;
      return val.length > max ? (msg || `${field} must be under ${max} characters`) : null;
    },

  email: (msg?: string): Rule<string | undefined> =>
    (val, field) => {
      if (!val) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(val) ? (msg || `Invalid ${field} format`) : null;
    },

  pattern: (regex: RegExp, msg: string): Rule<string | undefined> =>
    (val) => {
      if (!val) return null;
      return !regex.test(val) ? msg : null;
    },
};
