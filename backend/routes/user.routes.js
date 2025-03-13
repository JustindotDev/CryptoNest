import express from 'express';
import { addUser } from '../controllers/users.controller.js';

const userRouter = express.Router();

userRouter.post("/", addUser);


export default userRouter;