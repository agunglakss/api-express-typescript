import type { UserCreate, UserLogin } from "../../type/user.type.js";
import { rules } from "../validator/rules.js";
import type { Schema } from "../validator/types.js";

export const UserCreateSchema: Schema<UserCreate> = {
  first_name: [
    rules.required("First name is required"),
    rules.string("First name must be letter"),
    rules.minLength(2),
    rules.maxLength(50),
  ],
  last_name: [
    rules.maxLength(50),
  ],
  email: [
    rules.required("Email is required"),
    rules.email(),
  ],
  password: [
    rules.required("Password is required"),
    rules.minLength(8),
    rules.pattern(/[A-Z]/, "Password must contain at least one uppercase letter"),
    rules.pattern(/[0-9]/, "Password must contain at least one number"),
  ],
}

export const UserLoginSchema: Schema<UserLogin> = {
  email: [
    rules.required("Email is required"),
    rules.email()
  ],
  password: [
    rules.required("Password is required"),
    rules.minLength(8),
    rules.pattern(/[A-Z]/, "Password must contain at least one uppercase letter"),
    rules.pattern(/[0-9]/, "Password must contain at least one number"),
  ]
}
