export type ValidationResult = Record<string, string[]>;

export type Rule<T = any> = (value: T, fieldName: string) => string | null;

export type Schema<T> = {
  [K in keyof T]?: Rule<T[K]>[];
};
