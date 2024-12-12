import jwt from "jsonwebtoken";

const SECRET = "s3cr3t";

export function createToken({ userId, email, role }) {
    return jwt.sign(
        {
            id: userId,
            email,
            role,
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
