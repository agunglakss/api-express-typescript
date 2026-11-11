import { db } from "../config/db.js";
import type { User, UserCreate, UserLogin, UserUpdate } from "../type/user.type.js";
import { minute } from "../utlis/util.js";

export default class UserModel {

  static async createUser(user: UserCreate): Promise<number | null> {
    const text = `
      INSERT INTO
      users (id, first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [user.id, user.first_name, user.last_name, user.email, user.password];
    const result = await db.query(text, values)

    return result.rowCount;
  }

  static async getUserByEmail(email: string): Promise<UserLogin> {
    const user = await db.query('SELECT email, password FROM users WHERE email = $1 LIMIT 1', [email]);

    return user.rows[0];
  }

  static async updateUserByEmail(token: string, email: string): Promise<UserUpdate> {
    const text = `
      UPDATE users
      SET token = $1, token_expired_at = $2
      WHERE email = $3
      RETURNING id, email, token, token_expired_at;
    `;
    const value = [token, minute(15), email]
    const result = await db.query(text, value)

    return result.rows[0];
  }

  static async getUserByToken(token: string): Promise<User> {
    const sql = `
      SELECT id, email, token_expired_at
      FROM users
      WHERE token = $1 LIMIT 1`;
    const user = await db.query(sql, [token])

    return user.rows[0]
  }
}
