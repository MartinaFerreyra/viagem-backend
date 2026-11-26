import { Router } from "express";
import pool from "../config/database";

const router = Router();
/**
 * @openapi
 * /health:
 *   get:
 *     summary: Verificar el estado del backend
 *     description: Comprueba el funcionamiento del servidor y su conexión con PostgreSQL.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Servidor y base de datos funcionando correctamente.
 *         content:
 *           application/json:
 *             example:
 *               status: ok
 *               database: connected
 *       503:
 *         description: Error de conexión con la base de datos.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               database: disconnected
 */
router.get("/", async (_req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected"
    });
  } catch {
    res.status(503).json({
      status: "error",
      database: "disconnected"
    });
  }
});

export default router;

