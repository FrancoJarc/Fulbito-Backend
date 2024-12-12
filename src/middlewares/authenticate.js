import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            error: "No hay token"
        })
    }

    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "No hay token"
        })
    }

    try {
        const user = verifyToken(token);

        req.user = user;

        next();
    } catch (error) {
        res.json({
            error: "Hubo un error al mostrar el perfil",
            detail: error.message,
        });
    }

}