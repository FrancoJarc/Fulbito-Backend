import { Router } from "express";
import { canchasDB } from "../data/canchas.data.js";
import { validateId } from "../middlewares/validate.js";

export const canchasRouter = Router();


canchasRouter.get("/", (req, res) => {
    const { limit = 10, page = 1 } = req.query;

    const canchas = canchasDB.slice(
        (Number(page) - 1) * Number(limit),
        Number(page) * Number(limit)
    );

    res.json({
        canchas,
        limit: Number(limit),
        currentPage: Number(page),
        totalPages: Math.ceil(canchasDB.length / limit),
    });
});


canchasRouter.post("/", (req, res) => {
    // request.body => Obtenemos la información de la petición
    // const name = req.body.name // Primer forma
    const { nombre, precio, capacidad, calle, telefono } = req.body; // Segunda forma

    if (!nombre || !precio || !capacidad || !calle || !telefono) {
        return res.status(400).json({
            error: "Todos los campos son requeridos",
        });
    }

    if (isNaN(Number(precio))) {
        return res.status(400).json({
            error: "El precio debe ser un número",
        });
    }


    if (isNaN(Number(telefono))) {
        return res.status(400).json({
            error: "El teléfono debe ser un número",
        });
    }

    const cancha = {
        id: canchasDB[canchasDB.length - 1].id + 1,
        nombre,
        precio: Number(precio),
        capacidad,
        calle,
        telefono: Number(telefono),
    };
    canchasDB.push(cancha);

    res.status(201).json({
        mensaje: "Cancha guardada",
        cancha,
    });
});


canchasRouter.get("/:id", validateId, (req, res) => {

    const { id } = req.params;
    const cancha = canchasDB.find((cancha) => cancha.id === Number(id));

    if (!cancha) {
        return res.json({
            mensaje: "Producto no encontrado",
        });
    }

    res.json({
        product,
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
