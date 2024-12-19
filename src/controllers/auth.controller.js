import { UserService } from "../services/user.service.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { createToken, verifyToken } from "../utils/jwt.js";

export class AuthController {
    static async login(req, res) {
        const { correo, contrasena, rol } = req.body;

        try {
            const user = await UserService.getByCorreo(correo)

            if (!user) {
                return res.status(401).json({ error: "El usuario no existe" });
            }

            const isPasswordCorrect = await verifyPassword(contrasena, user.contrasena);

            if (!isPasswordCorrect) {
                return res.status(401).json({ error: "La contraseña es incorrecta" });
            }

            if (user.rol != rol) {
                return res.status(401).json({ error: "El rol no coincide" });
            }

            const token = createToken({
                id: user.id,
                correo: user.correo,
                rol: user.rol,
                nombre: user.nombre,
                apellido: user.apellido,
                dni: user.dni,
                telefono:user.telefono
            });

            res.status(200).json({
                mensaje: "Login exitoso",
                token
            });

        } catch (error) {

            res.json({
                mensaje: `Error al iniciar sesion`,
                detail: error.message
            });
        }
    }


    static async register(req, res) {

        const { nombre, apellido, dni, telefono, correo, contrasena, rol } = req.body

        try {
            const existingUser = await UserService.getByCorreo(correo);
            if (existingUser) {
                return res.status(400).json({ error: "El correo ya está registrado." });
            }

            const contrasenaHash = await hashPassword(contrasena)
            const user = await UserService.create({
                nombre,
                apellido,
                dni: parseInt(dni),
                telefono: parseInt(dni),
                correo,
                contrasena: contrasenaHash,
                rol
            })

            res.status(201).json({ user });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                mensaje: "Error al registrarse",
                detail: error.message
            });

        }
    }

    static async profile(req, res) {

        console.log(user);

        res.json({
            user,
        });

    }
}