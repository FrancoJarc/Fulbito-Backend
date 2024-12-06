import { Router } from "express";
import { usersDB } from "../data/users.data.js";

export const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.json(usersDB);
})

usersRouter.post("/", (req, res) => {
    res.json({
        mensaje: "Usuario creado"
    })
})