import { Request, Response, NextFunction } from "express";   // tipos de Express
import { verifyToken } from "../utils/jwt";                  // revisa el token

export interface AuthRequest extends Request {   // pedido que puede llevar el id del usuario
  userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;                     // lee "Bearer eyJ..."

  if (!header || !header.startsWith("Bearer ")) {               // ¿trajo token?
    res.status(401).json({ error: "Falta el token" });
    return;
  }

  const token = header.split(" ")[1];                           // se queda solo con el token

  try {
    const payload = verifyToken(token);                         // ¿es verdadero y no venció?
    req.userId = payload.userId;                                // anota quién es
    next();                                                     // deja pasar
  } catch {
    res.status(401).json({ error: "Token inválido o vencido" }); // no deja pasar
  }
}