import crypto from "crypto";
import UserModel from "../model/user.model.js";
import { Password } from "../utlis/password.js";
import { UserCreateSchema, UserLoginSchema } from "../utlis/schemas/user.schema.js"
import { validate } from "../utlis/validator/validation.js";
import { CustError } from "../utlis/errors/cust.errror.js";
import { ErrUnprocessableEntity, ErrEmailAlreadyExists, ErrInternalServerError, ErrAuthentication , ErrInvalidLogin } from "../utlis/const.js";
import type { UserCreate, UserLogin } from "../type/user.type.js"
import type { responeSuccess } from "../type/response.success.js";

export default class AuthService {

  static async login(req: UserLogin): Promise<responeSuccess> {
    const result = validate(req, UserLoginSchema);
    if (!result.isValid) throw new CustError(ErrUnprocessableEntity, 422, result.errors);

    const user = await UserModel.getUserByEmail(req.email)
    if (!user) throw new CustError(ErrInvalidLogin, 400)

    const verifyPassword = await Password.verify(req.password, user.password)
    if (!verifyPassword) throw new CustError(ErrAuthentication, 401, ErrInvalidLogin)

    const hexToken = crypto.randomBytes(32).toString('hex');
    const data = await UserModel.updateUserByEmail(hexToken, req.email);

    return {
      message: "success",
      data
    }
  }

  static async register(user: UserCreate): Promise<responeSuccess> {
    const result = validate(user, UserCreateSchema);
    if (!result.isValid) {
      throw new CustError(ErrUnprocessableEntity, 422, result.errors);
    }

    const emailExists = await UserModel.getUserByEmail(user.email);
    if (emailExists) throw new CustError(ErrEmailAlreadyExists, 409);

    user.id = crypto.randomUUID();
    user.password = await Password.hash(user.password);
    const res = await UserModel.createUser(user)
    if (res === 0) throw new CustError(ErrInternalServerError, 500);

    return {
      message: "user has been successfully created",
    }
  }
}
