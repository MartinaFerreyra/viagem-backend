import { Router } from "express";                                         // el enrutador
import { register, login, me } from "../controllers/auth.controller";     // los controllers
import { authMiddleware } from "../middlewares/auth.middleware";          // el middleware

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar un usuario nuevo
 *     description: Crea un usuario con la contraseña encriptada. Por seguridad, responde siempre el mismo mensaje, exista o no el email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password]
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Lucía
 *               lastName:
 *                 type: string
 *                 example: Pérez
 *               email:
 *                 type: string
 *                 example: lucia@viagem.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: viagem123
 *     responses:
 *       201:
 *         description: Registro recibido.
 *         content:
 *           application/json:
 *             example:
 *               message: Registro recibido. Ya podés iniciar sesión.
 *       400:
 *         description: Datos faltantes o inválidos.
 *         content:
 *           application/json:
 *             example:
 *               error: La contraseña debe tener al menos 8 caracteres
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Verifica el email y la contraseña y devuelve un token JWT válido por 1 hora.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: lucia@viagem.com
 *               password:
 *                 type: string
 *                 example: viagem123
 *     responses:
 *       200:
 *         description: Login correcto. Devuelve el token y los datos del usuario.
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: fbcd2289-0f8a-4cd9-84e9-625310ac7eff
 *                 firstName: Lucía
 *                 lastName: Pérez
 *                 email: lucia@viagem.com
 *       400:
 *         description: Faltan datos obligatorios.
 *       401:
 *         description: Email o contraseña incorrectos.
 *         content:
 *           application/json:
 *             example:
 *               error: Email o contraseña incorrectos
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/login", login);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Obtener el usuario logueado
 *     description: Devuelve los datos del usuario dueño del token. Requiere token JWT.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario logueado.
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: fbcd2289-0f8a-4cd9-84e9-625310ac7eff
 *                 firstName: Lucía
 *                 lastName: Pérez
 *                 email: lucia@viagem.com
 *       401:
 *         description: Falta el token, o es inválido o está vencido.
 *         content:
 *           application/json:
 *             example:
 *               error: Token inválido o vencido
 *       404:
 *         description: Usuario no encontrado.
 */
router.get("/me", authMiddleware, me);

export default router;