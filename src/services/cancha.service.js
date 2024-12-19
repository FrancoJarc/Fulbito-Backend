import { prisma } from "../providers/prisma.provider.js";

export class CanchaService {
    static async getAll({ limit, page }) {
        return prisma.canchas.findMany({
            take: Number(limit),

        })
    }

    static async create(cancha) {
        return prisma.canchas.create({
            data: cancha,
        })
    }

    static async getById({ id }) {
        return prisma.canchas.findFirst({
            where: {
                id
            }
        })
    }

    static async update({ id, nombre, precio_hora, capacidad, calle, telefono, id_usuario }) {
        return prisma.canchas.update({
            where: {
                id
            },
            data: {
                nombre: nombre ?? undefined,
                precio_hora: precio_hora ?? undefined,
                capacidad: capacidad ?? undefined,
                calle: calle ?? undefined,
                telefono: telefono ?? undefined,
                id_usuario: id_usuario ?? undefined,

            }

        })

    }


    static async delete({ id }) {
        return await prisma.canchas.delete({
            where: {
                id
            }
        })
    }
}