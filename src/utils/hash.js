import bcrypt, { hash } from "bcrypt"


export async function hashPassword(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(10));

}

export async function verifyPassword(password, hashPassword) {
    return bcrypt.compare(password, hashPassword);
}