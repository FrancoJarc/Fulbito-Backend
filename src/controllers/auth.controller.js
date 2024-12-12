import { UserService } from "../services/user.service.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";

export class AuthController {
    static async login(req, res) {
        const { correo, contrasena } = req.body;

        try {
            const user = await UserService.getByCorreo({ correo })

            if (!user) {
                return res.status(401).json({ error: "El usuario no existe" });
            }

            const isPasswordCorrect = await verifyPassword(contrasena, user.contrasena);

            if (!isPasswordCorrect) {
                return res.status(401).json({ error: "La contraseña es incorrecta" });
            }

            const token = createToken({
                userId: user.id,
                email: user.correo,
                role: user.rol,
            });

            res.json({
                mensaje: "Login exitoso",
                token
            })
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
            const contrasenaHash = await hashPassword(contrasena)
            const user = await UserService.create({
                nombre,
                apellido,
                dni,
                telefono,
                correo,
                contrasena: contrasenaHash,
                rol
            })

            res.json({
                user,
            });

        } catch (error) {
            res.json({
                mensaje: `Error al registrarse`,
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