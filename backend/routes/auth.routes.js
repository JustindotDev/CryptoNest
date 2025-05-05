import express from "express";
import { ProtectedRoute } from "../middleware/auth.middleware.js";
import {
  SignUp,
  Login,
  Logout,
  CheckAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);

router.get("/check", ProtectedRoute, CheckAuth);

export default router;
