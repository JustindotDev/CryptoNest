import express from "express";
import { addUser, getUser } from "../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.post("/sign-up", addUser);
userRouter.post("/login", getUser);

export default userRouter;

// Initital commit for the Homepage and remove the userLogin route and merge it to the user routes for readablity.
