import bcrypt from "bcrypt"


export async function hashPassword(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(10));
    
}

export async function verifyPassword(password) {
    return bcrypt.compare(password, hashPassword);
}