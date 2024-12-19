import { prisma } from "../providers/prisma.provider.js";

export class ReservaService {

    static async getAll({ limit, page }) {
        return prisma.reservas.findMany({
            take: Number(limit),
        });
    }

    static async create(reserva) {
        return prisma.reservas.create({
            data: reserva,
        });
    }

    static async getById({ id }) {
        return prisma.reservas.findFirst({
            where: { id },
        });
    }

    static async update(id, { id_cancha, id_usuario, fecha_reserva, horario_inicio, horario_fin }) {
        return prisma.reservas.update({
            where: { id },
            data: {
                id_cancha,
                id_usuario,
                fecha_reserva,
                horario_inicio,
                horario_fin,
            },
        });
    }
    static async delete({ id }) {
        return prisma.reservas.delete({
            where: { id },
        });
    }
}
