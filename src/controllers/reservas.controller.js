import { ReservaService } from "../services/reserva.service.js";

export class ReservaController {
    static async getAll(req, res) {
        const { limit = 10, page = 1 } = req.query;

        try {
            const reservas = await ReservaService.getAll({ limit, page });

            res.json({
                reservas,
                limit: Number(limit),
                currentPage: Number(page),
                totalPages: Math.ceil(reservas.length / limit),
            });
        } catch (error) {
            res.status(500).json({ error: `Error al obtener las reservas: ${error}` });
        }
    }

    static async create(req, res) {
        const { id_cancha, id_usuario, fecha_reserva, horario_inicio, horario_fin } = req.body;

        if (!id_cancha || !id_usuario || !fecha_reserva || !horario_inicio || !horario_fin) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
    
        const fecha = new Date(fecha_reserva);  
        const fechaString = fecha.toISOString().split('T')[0]; 

        const horarioInicio = new Date(`1970-01-01T${horario_inicio}Z`);
        const horarioFin = new Date(`1970-01-01T${horario_fin}Z`);

        const horarioInicioString = horarioInicio.toTimeString().split(' ')[0]; // Formato HH:MM:SS
        const horarioFinString = horarioFin.toTimeString().split(' ')[0]; // Formato HH:MM:SS

        const reserva = {
            id_cancha,
            id_usuario,
            fecha_reserva: fechaString,
            horario_inicio: horarioInicioString,
            horario_fin: horarioFinString,
        };

        try {
            const newReserva = await ReservaService.create(reserva);
            res.status(201).json({
                mensaje: "Reserva creada",
                reserva: newReserva,
            });
        } catch (error) {
            res.status(500).json({ error: `Error al crear la reserva: ${error}` });
        }
    }


    static async getById(req, res) {
        const { id } = req.params;

        try {
            const reserva = await ReservaService.getById({ id });

            if (!reserva) {
                return res.status(404).json({ mensaje: "Reserva no encontrada" });
            }

            res.json({ reserva });
        } catch (error) {
            res.status(500).json({ error: `Error al obtener la reserva: ${error}` });
        }
    }


    static async update(req, res) {
        const { id } = req.params;

        try {
            const reserva = await ReservaService.getById({ id });

            if (!reserva) {
                return res.status(404).json({ error: "La reserva no existe" });
            }

            const { id_cancha, id_usuario, fecha_reserva, horario_inicio, horario_fin } = req.body;

            const updatedReserva = await ReservaService.update(id, {
                id_cancha,
                id_usuario,
                fecha_reserva,
                horario_inicio,
                horario_fin,
            });

            res.json({
                mensaje: "Reserva actualizada",
                reserva: updatedReserva,
            });
        } catch (error) {
            res.status(500).json({ error: `Error al actualizar la reserva: ${error}` });
        }
    }


    static async delete(req, res) {
        const { id } = req.params;

        try {
            const reserva = await ReservaService.getById({ id });

            if (!reserva) {
                return res.status(404).json({ error: "La reserva no existe" });
            }

            await ReservaService.delete({ id });

            res.json({
                mensaje: "Reserva eliminada",
                reserva,
            });
        } catch (error) {
            res.status(500).json({ error: `Error al eliminar la reserva: ${error}` });
        }
    }
}
