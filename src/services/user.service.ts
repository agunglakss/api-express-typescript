import type { Request } from "express";
import { db } from "../config/db.js";

export default class UserService {
  static async getUserById(req: Request) {
    const { id } = req.params;
    console.log(id)
    if (typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (!user) {
      throw Error("user not found")
    }

    return user;
  }
}
