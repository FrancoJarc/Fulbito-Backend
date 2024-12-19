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

    static async update({ nombre, precio_hora, capacidad, calle, telefono }) {
        return prisma.canchas.update({
            where: {
                id
            },
            data: {
                nombre: nombre ?? cancha.nombre,
                precio_hora: precio_hora ?? cancha.precio_hora,
                capacidad: capacidad ?? cancha.capacidad,
                calle: calle ?? cancha.calle,
                telefono: telefono ?? cancha.telefono,
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