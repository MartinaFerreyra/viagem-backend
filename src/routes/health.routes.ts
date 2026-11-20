import { Router } from "express";            // trae el "enrutador" de Express

const router = Router();                      // crea un grupo de rutas

router.get("/", (_req, res) => {              // cuando alguien pide GET /health...
  res.json({ status: "ok" });                 // ...responde con { "status": "ok" }
});

export default router;                        // lo exporta para usarlo en app.ts