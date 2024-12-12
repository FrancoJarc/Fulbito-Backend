export function authorization(...roles) {
    return (req, res, next) => {
        const { rol } = req.user

        if (!roles.includes(rol)) {
            return res.status(403).json({
                error: "No tenes acceso a este recurso"
            })
        }

        next();
    }
}