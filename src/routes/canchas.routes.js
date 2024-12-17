import { Router } from "express";
import { validateDto, validateId } from "../middlewares/validate.js";
import { canchaDto } from "../dtos/cancha.dto.js";
import { CanchaController } from "../controllers/canchas.controllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";

export const canchasRouter = Router();

canchasRouter.get("/", authenticate,CanchaController.getAll);

canchasRouter.post("/", authenticate, authorization("dueño"), validateDto(canchaDto), CanchaController.create);

canchasRouter.get("/:id", authenticate, validateId, authorization("dueño"), CanchaController.getByID);

canchasRouter.put("/:id", authenticate, authorization("dueño") ,CanchaController.update);

canchasRouter.delete("/:id", authenticate, authorization("dueño"), CanchaController.delete);