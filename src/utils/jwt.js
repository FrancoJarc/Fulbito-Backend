import jwt from "jsonwebtoken";

const SECRET = "s3cr3t";

export function createToken({ id, correo, rol }) {
    return jwt.sign(
        {
            id: id,
            correo,
            rol,
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

