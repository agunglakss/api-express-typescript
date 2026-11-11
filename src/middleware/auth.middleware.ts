import type { NextFunction, Response } from "express";
import { CustError } from "../utlis/errors/cust.errror.js";
import { ErrInvalidToken, ErrAuthorization, ErrExpiredToken } from "../utlis/const.js";
import UserModel from "../model/user.model.js";
import type { UserRequest } from "../type/user.request.js";
import { isExpired } from "../utlis/util.js";

const AuthMiddleware = async (req: UserRequest, _res: Response, next: NextFunction) => {
  const auth = req.headers.authorization

  if (auth && auth.startsWith("Bearer")) {
    const token = auth.split(" ")[1]
    if (!token) throw new CustError(ErrInvalidToken, 400)

    const user = await UserModel.getUserByToken(token)
    if (!user) {
      throw new CustError(ErrInvalidToken, 400)
    } else if(isExpired(user.token_expired_at!)) {
      throw new CustError(ErrExpiredToken, 400);
    }

    req.user = user
    next();
    return
  }
  throw new CustError(ErrAuthorization, 403)
}

export default AuthMiddleware;
