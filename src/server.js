import express from "express";
import { canchasRouter } from "./routes/canchas.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
    origin: "https://localhost:5173"
}));



app.get("/", (request, response) => {
    response.json({
        mensaje: "Hola Mundo",
        fecha: new Date().toLocaleDateString(),
        cantidad: 150,
    });
});

app.get("/info", (req, res) => {
    res.json({
        mensaje: "Información del servidor",
        version: "0.1.0",
        auto: "Pablito",
        framework: "Express",
    });
});

// Rutas
app.use("/api/canchas", canchasRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);





app.listen(PORT, () => { console.log('Server running on http://localhost:${PORT}') })