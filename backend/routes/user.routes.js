import express from "express";
import { addUser, getUser } from "../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.post("/sign-up", addUser);
userRouter.post("/login", getUser);

export default userRouter;
