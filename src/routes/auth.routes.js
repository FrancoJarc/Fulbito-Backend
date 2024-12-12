import { AuthController } from "../controllers/auth.controller.js";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.get("/profile", AuthController.profile)
