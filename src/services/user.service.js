import { prisma } from "../providers/prisma.provider.js";

export class UserService {
    static async getAll() {
        return prisma.usuarios.findMany();
    }

    static async getById({ id }) {
        return prisma.usuarios.findFirst({
            where: {
                id
            }
        })
    }

    static async getByCorreo({
        correo
    }) {
        return prisma.usuarios.findFirst({
            where: {
                correo
            }
        })
    }

    static async create({ nombre, apellido, dni, telefono, correo, contrasena, rol }) {
        return prisma.usuarios.create({
            data: {
                nombre,
                apellido,
                dni,
                telefono,
                correo,
                contrasena,
                rol
            },
        })
    }

}