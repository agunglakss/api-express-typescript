import type { NextFunction, Request, Response } from "express";
import { db } from "../config/db.js";
import UserService from "../services/user.service.js";

export default class UserHandler {

  static async getUsers(_req: Request, res: Response): Promise<void> {
    const users = await db.query(`SELECT * FROM authors`);

    res.status(200).json(users.rows);
  }

  static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.getUserById(req);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
    } catch (e) {
      console.log(e)
    }
    res.status(200).json({ message: "ok" });
  }
}
