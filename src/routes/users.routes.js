import { Router } from "express";
import { UserService } from "../services/user.service.js";
import { UsuarioController } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";

export const usersRouter = Router();

usersRouter.get("/", authenticate, UsuarioController.getAll)

usersRouter.post("/", authenticate, authorization("jugador"), UsuarioController.create)
