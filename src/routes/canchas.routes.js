import { Router } from "express";
import { canchasDB } from "../data/canchas.data.js";
import { validateDto, validateId } from "../middlewares/validate.js";
import { canchaDto } from "../dtos/cancha.dto.js";
import { PrismaClient } from "@prisma/client";

export const canchasRouter = Router();

const prisma = new PrismaClient;

canchasRouter.get("/", async (req, res) => {
    const { limit = 10, page = 1 } = req.query;

    const canchas = await prisma.canchas.findMany({
        take: Number(limit),

    })



    res.json({
        canchas,
        limit: Number(limit),
        currentPage: Number(page),
        totalPages: Math.ceil(canchasDB.length / limit),
    });
});


canchasRouter.post("/", validateDto(canchaDto), async (req, res) => {

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

    try {
        const newCancha = await prisma.canchas.create({
            data: cancha,
        })

        res.status(201).json({
            mensaje: "Cancha guardada",
            cancha: newCancha,
        });

    } catch (error) {
        res.status(500).json({
            mensaje: `Error al crear la cancha.${error}`,
        });
    }
});


canchasRouter.get("/:id", validateId, async (req, res) => {

    const { id } = req.params;

    const cancha = await prisma.canchas.findFirst({
        where: {
            id
        }
    })

    if (!cancha) {
        return res.json({
            mensaje: "Cancha no encontrada",
        });
    }

    res.json({
        cancha,
    });
});



canchasRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const cancha = await prisma.canchas.findFirst({
        where: {
            id
        }
    })

    if (!cancha) {
        return res.status(404).json({ error: "La cancha no existe" });
    }

    const { nombre, precio_hora, capacidad, calle, telefono } = req.body;

    const updatedCancha = await prisma.canchas.update({
        where: {
            id
        },
        data: {
            nombre: nombre ?? cancha.nombre,
            precio_hora: precio_hora ?? cancha.precio_hora,
            capacidad: capacidad ?? cancha.capacidad,
            calle: calle ?? cancha.calle,
            telefono: telefono ?? cancha.telefono
            
        }

    })


    res.json({
        mensaje: "Cancha actualizada",
        cancha: updatedCancha,
    });
});

canchasRouter.delete("/:id",  async (req, res) => {
    const { id } = req.params;

    try {
        const cancha = await prisma.canchas.delete({
            where: { id },
        });

        res.json({
            mensaje: "Cancha eliminada",
            cancha,
        });
    } catch (error) {
        res.status(404).json({ error: "La cancha no existe o no se pudo eliminar" });
    }
});