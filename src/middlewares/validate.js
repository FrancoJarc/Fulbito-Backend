export function validateId(req, res, next) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({
            error: "El id debe ser un número",
        });
    }


    next();
}