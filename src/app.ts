//la configuración del servidor
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";        // trae tus rutas de autenticación
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);                          // todo lo que empiece con /auth va a tus rutas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;