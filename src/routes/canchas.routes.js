import { Router } from "express";
import { validateDto, validateId } from "../middlewares/validate.js";
import { canchaDto } from "../dtos/cancha.dto.js";
import { CanchaController } from "../controllers/canchas.controllers.js";

export const canchasRouter = Router();

canchasRouter.get("/", CanchaController.getAll);

canchasRouter.post("/", validateDto(canchaDto), CanchaController.create);

canchasRouter.get("/:id", validateId, CanchaController.getByID);

canchasRouter.put("/:id", CanchaController.update);

canchasRouter.delete("/:id", CanchaController.delete);