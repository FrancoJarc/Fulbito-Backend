import jwt from "jsonwebtoken";

const SECRET = "s3cr3t";

export function createToken({ id, correo, rol, nombre, apellido, telefono, dni}) {
    return jwt.sign(
        {
            id: id,
            correo,
            rol,
            nombre,
            apellido,
            telefono,
            dni
        },
        SECRET,
        {
            expiresIn: "5m",
        }
    );
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

