import { CanchaService } from "../services/cancha.service.js";

export class CanchaController {
    static async getAll(req, res) {
        const { limit = 10, page = 1 } = req.query;

        const canchas = await CanchaService.getAll({ limit, page });

        res.json({
            canchas,
            limit: Number(limit),
            currentPage: Number(page),
            totalPages: Math.ceil(canchasDB.length / limit),
        });
    }


    static async create(req, res) {
        const { nombre, precio_hora, capacidad, calle, telefono } = req.body; // Segunda forma

        const precioHoraNum = parseFloat(precio_hora);
        if (isNaN(precioHoraNum) || precioHoraNum <= 0) {
            return res.status(400).json({
                error: "El precio por hora debe ser un número positivo",
            });
        }

        const telefonoNum = Number(telefono);
        if (isNaN(telefonoNum) || telefonoNum <= 0) {
            return res.status(400).json({
                error: "El teléfono debe ser un número positivo",
            });
        }

        const capacidadNum = parseInt(capacidad);
        if (isNaN(capacidadNum)) {
            return res.status(400).json({
                error: "La capacidad debe ser un número entero",
            });
        }


        const cancha = {
            nombre,
            precio_hora: precioHoraNum,
            capacidad: capacidadNum,
            calle,
            telefono: telefonoNum,
        };

        try {
            const newCancha = await CanchaService.create(cancha);

            res.status(201).json({
                mensaje: "Cancha guardada",
                cancha: newCancha,
            });

        } catch (error) {
            res.status(500).json({
                mensaje: `Error al crear la cancha.${error}`,
            });
        }
    }

    static async getByID(req, res) {

        const { id } = req.params;

        const cancha = await CanchaService.getById({ id });

        if (!cancha) {
            return res.json({
                mensaje: "Cancha no encontrada",
            });
        }

        res.json({
            cancha,
        });
    };


    static async update(req, res) {
        const { id } = req.params;

        const cancha = await CanchaService.getById({ id });

        if (!cancha) {
            return res.status(404).json({ error: "La cancha no existe" });
        }

        const { nombre, precio_hora, capacidad, calle, telefono } = req.body;

        const updatedCancha = await CanchaService.update({
            nombre, precio_hora, capacidad, calle, telefono
        })

        res.json({
            mensaje: "Cancha actualizada",
            cancha: updatedCancha,
        });
    };



    static async delete(req, res) {
        const { id } = req.params;

        const cancha = await CanchaService.getById({ id });

        if (!cancha) {
            res.status(404).json({ error: "La cancha no existe" });
        }

        const response = await CanchaService.delete({ id });

        res.json({
            mensaje: "Cancha eliminada",
            cancha,
            response
        });


    };


}