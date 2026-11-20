//la configuración del servidor
import express from "express";                      // trae Express
import cors from "cors";                            // trae CORS
import healthRoutes from "./routes/health.routes";  // trae la ruta de prueba

const app = express();                              // crea la aplicación

app.use(cors());                                    // permite pedidos desde otros dominios (el frontend)
app.use(express.json());                            // permite leer JSON en los pedidos (ej.: email y contraseña)

app.use("/health", healthRoutes);                   // conecta la ruta de prueba en /health

export default app;                                 // la exporta para usarla en index.ts