import { Router } from "express";
import { validateDto, validateId } from "../middlewares/validate.js";
import { ReservaController } from "../controllers/reservas.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";

export const reservasRouter = Router();


reservasRouter.get("/", authenticate, ReservaController.getAll);

reservasRouter.post("/", authenticate, ReservaController.create);

reservasRouter.get("/:id", authenticate, validateId, ReservaController.getById);

reservasRouter.put("/:id", authenticate, validateId, ReservaController.update);

reservasRouter.delete("/:id", authenticate, ReservaController.delete);
