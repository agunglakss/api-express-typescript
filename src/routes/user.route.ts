import express from "express";
import UserHandler from "../handlers/user.handler.js";

const userRouter = express.Router();

userRouter.get('/users', UserHandler.getUsers);
userRouter.post('/users/', UserHandler.createUser);
userRouter.get('/users/:id', UserHandler.getUserById);

export default userRouter;
