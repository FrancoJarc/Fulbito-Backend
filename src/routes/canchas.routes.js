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

    const { nombre, precio, capacidad, calle, telefono } = req.body; // Segunda forma

    const precioNum = parseFloat(precio);
    if (isNaN(precioNum)) {
        return res.status(400).json({
            error: "El precio debe ser un número",
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
        telefono: telefonoNum, 
        capacidad: capacidadNum,
        precio: precioNum, 
        calle,
  
    };


    //canchasDB.push(cancha);

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


canchasRouter.get("/:id", validateId, (req, res) => {

    const { id } = req.params;
    const cancha = canchasDB.find((cancha) => cancha.id === Number(id));

    if (!cancha) {
        return res.json({
            mensaje: "Cancha no encontrada",
        });
    }

    res.json({
        cancha,
    });
});



canchasRouter.put("/:id", validateId,(req, res) => {
    const { id } = req.params;
    const cancha = canchasDB.find((p) => p.id === Number(id));

    if (!cancha) {
        return res.status(404).json({ error: "La cancha no existe" });
    }

    const canchaIndex = canchasDB.findIndex((p) => p.id === Number(id));

    const { nombre, precio, capacidad, calle, telefono } = req.body;

    const newProduct = {
        id: cancha.id,
        nombre: nombre ?? cancha.nombre,
        precio: precio ?? cancha.precio,
        capacidad: capacidad ?? cancha.capacidad,
        calle: calle ?? cancha.calle,
        telefono: telefono ?? cancha.telefono,
    };

    canchasDB[canchaIndex] = newProduct;

    res.json({
        mensaje: "Cancha actualizada",
        cancha: newProduct,
    });
});

canchasRouter.delete("/:id", validateId, (req, res) => {
    const { id } = req.params;
    const cancha = canchasDB.find((p) => p.id === Number(id));

    if (!cancha) {
        return res.status(404).json({ error: "La cancha no existe" });
    }

    const canchaIndex = canchasDB.findIndex((p) => p.id === Number(id));

    canchasDB.splice(canchaIndex, 1);

    res.json({
        mensaje: "Producto eliminado",
        cancha,
    });
});
