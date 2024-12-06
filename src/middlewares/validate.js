export function validateId(req, res, next) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({
            error: "El id debe ser un número",
        });
    }
    next();
}


export function validateDto(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error })
        }

        next();
    }
}

