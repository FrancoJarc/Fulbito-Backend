import { UserService } from "../services/user.service.js";

export class UsuarioController {
    static async getAll(req, res) {
        try {

            const usuario = await UserService.getAll({});
            res.json(usuario)

        } catch (error) {
            res.json({
                error: "Hubo un error",
                details: error.message
            });

        }
    }


    static async create(req, res) {
        const { nombre, apellido, dni, telefono, correo, contrasena, rol } = req.body; // Segunda forma

        const rolValido = rol === "dueño" ? "dueno" : rol; // Convertir "dueño" a "dueno" si se recibe

        if (rolValido !== "jugador" && rolValido !== "dueno") {
            return res.status(400).json({
                error: "Rol no válido. Los valores válidos son 'jugador' y 'dueno'."
            });
        }


        const usuario = {
            nombre,
            apellido,
            dni: parseInt(dni),
            telefono,
            correo,
            contrasena,
            rol: rol === "dueño" ? "dueno" : rol 
        };

        try {
            const existingUser = await UserService.getByCorreo(correo);
            if (existingUser) {
                return res.status(400).json({ error: "El correo ya está registrado." });
            }

            const newUsuario = await UserService.create(usuario);

            res.status(201).json({
                mensaje: "Usuario guardado",
                usuario: newUsuario,
            });

        } catch (error) {
            res.status(500).json({
                mensaje: `Error al crear el usuario.${error}`,
            });
        }
    }

    static async getByID(req, res) {

        const { id } = req.params;

        const usuario = await UserService.getById({ id });

        if (!usuario) {
            return res.json({
                mensaje: "Usuario no encontrado",
            });
        }

        res.json({
            usuario,
        });
    };






};


