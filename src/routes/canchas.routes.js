import { Router } from "express";
import { validateDto, validateId } from "../middlewares/validate.js";
import { canchaDto } from "../dtos/cancha.dto.js";
import { CanchaController } from "../controllers/canchas.controllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";

export const canchasRouter = Router();

canchasRouter.get("/", authenticate,CanchaController.getAll);

canchasRouter.post("/", authenticate, authorization("dueno"), validateDto(canchaDto), CanchaController.create);

canchasRouter.get("/:id", authenticate, validateId, authorization("dueno"), CanchaController.getByID);

canchasRouter.put("/:id", authenticate, authorization("dueno") ,CanchaController.update);

canchasRouter.delete("/:id", authenticate, authorization("dueno"), CanchaController.delete);