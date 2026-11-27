import jwt from "jsonwebtoken";                           // librería de JWT

export interface TokenPayload {                           // lo que lleva el token
  userId: string;                                         // id del usuario (UUID)
}

// fábrica de tokens
const SECRET = process.env.JWT_SECRET as string;          // clave secreta (del .env)
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";    // duración (del .env, o 1 hora)

export function generateToken(userId: string): string {                              // crea el token
  return jwt.sign({ userId }, SECRET, { expiresIn: EXPIRES_IN } as jwt.SignOptions);  // sellado y con vencimiento
}

export function verifyToken(token: string): TokenPayload {   // verifica el token
  return jwt.verify(token, SECRET) as TokenPayload;          // si es válido devuelve { userId }; si no, error
}