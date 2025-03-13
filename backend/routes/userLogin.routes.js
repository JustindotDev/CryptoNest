import express from 'express';
import { getUser } from '../controllers/users.controller.js';

const loginRouter = express.Router();

loginRouter.post("/", getUser);

export default loginRouter;