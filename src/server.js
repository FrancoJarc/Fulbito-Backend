import express from "express";
import { canchasRouter } from "./routes/canchas.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import morgan from "morgan";
import cors from "cors";
import { reservasRouter } from "./routes/reservas.routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173"
}));



app.get("/", (request, response) => {
    response.json({
        mensaje: "Hola Mundo",
        fecha: new Date().toLocaleDateString(),
        cantidad: 150,
    });
});



// Rutas
app.use("/api/canchas", canchasRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/reservas", reservasRouter);





app.listen(PORT, () => { console.log('Server running on http://localhost:${PORT}') })