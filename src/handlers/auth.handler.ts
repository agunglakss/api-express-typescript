import { type NextFunction, type Request, type Response } from "express";
import type { UserCreate, UserLogin } from "../type/user.type.js";
import AuthService from "../services/auth.service.js";

export default class AuthHandler {

  static async login(req: Request, res: Response, next: NextFunction) {
    const reqBody: UserLogin = req.body;
    try {
      const user = await AuthService.login(reqBody)
      res.status(200).json({ message: user.message, data: user.data })
    } catch (err) {
      next(err)
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    const reqBody: UserCreate = req.body;
    try {
      const user = await AuthService.register(reqBody)
      res.status(201).json({ message : user.message, data: user.data })
    } catch (err) {
      next(err);
    }
  }
}
