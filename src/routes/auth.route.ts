
import { Router } from "express";
import AuthHandler from "../handlers/auth.handler.js";

const authRouter = Router();
authRouter.post('/auth/register', AuthHandler.register);
authRouter.post('/auth/login', AuthHandler.login);

export default authRouter;
