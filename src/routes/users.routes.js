import { Router } from "express";
import { UserService } from "../services/user.service.js";
import { UsuarioController } from "../controllers/user.controller.js";

export const usersRouter = Router();

usersRouter.get("/", UsuarioController.getAll)

usersRouter.post("/", UsuarioController.create)