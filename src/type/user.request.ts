import type { Request } from "express";
import type { User } from "../type/user.type.js";

export interface UserRequest extends Request {
  user?: User;
}
